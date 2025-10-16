import 'dotenv/config'
import fs from 'fs'
import mime from 'mime'
import crypto from 'crypto'
import { XMLParser } from 'fast-xml-parser'
import {
  sanitizeServerEditorConfig,
  defaultEditorConfig,
  getEnabledNodes,
  UploadFeature,
  EXPERIMENTAL_TableFeature,
  ServerEditorConfig,
  defaultEditorFeatures,
} from '@payloadcms/richtext-lexical'
import { createHeadlessEditor } from '@lexical/headless'
import { $generateNodesFromDOM } from '@lexical/html'
import { $getRoot } from 'lexical'
import { JSDOM } from 'jsdom'
import * as cheerio from 'cheerio'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { BlogPost } from '@/payload-types'
import { setDefaultResultOrder } from 'dns'
setDefaultResultOrder('ipv4first')

const payload = await getPayload({ config: payloadConfig })

const { docs: categories } = await payload.find({
  collection: 'categories',
  where: {
    slug: {
      equals: 'blog-images',
    },
  },
  limit: 1,
})
const blogImageCategory = categories[0]

async function resolveWPMediaFolder() {
  const { docs } = await payload.find({
    collection: 'payload-folders',
    limit: 0,
    pagination: false,
    where: {
      name: {
        equals: 'Wordpress Media',
      },
    },
  })

  if (docs.length && docs[0].name === 'Wordpress Media') {
    return docs[0].id
  } else {
    const data = await payload.create({
      collection: 'payload-folders',
      data: { name: 'Wordpress Media' },
    })
    return data.id
  }
}
const wordpressMedia = await resolveWPMediaFolder()

async function buildServerHeadlessEditor(payloadClient: any) {
  // Mirror the field features; ensure Upload + Tables are available server-side too
  const editorConfig: ServerEditorConfig = {
    ...defaultEditorConfig,
    features: [...defaultEditorFeatures, UploadFeature(), EXPERIMENTAL_TableFeature()],
  }

  const sanitized = await sanitizeServerEditorConfig(editorConfig, payloadClient.config)

  const headlessEditor = createHeadlessEditor({
    nodes: getEnabledNodes({ editorConfig: sanitized }),
    onError: (e) => {
      throw e
    },
  })

  return headlessEditor
}

function createS3SafeFilename(filename: string): string {
  const normalized = filename.normalize('NFC')

  const lastDot = normalized.lastIndexOf('.')
  const extension = lastDot > -1 ? normalized.slice(lastDot + 1).toLowerCase() : ''
  const baseName = lastDot > -1 ? normalized.slice(0, lastDot) : normalized

  const asciiBase = baseName
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '')
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')

  const hashSuffix = crypto.createHash('sha1').update(normalized).digest('hex').slice(0, 8)
  const shouldAppendHash = asciiBase !== baseName || asciiBase.length === 0
  const safeBase = asciiBase.length > 0 ? asciiBase : `file-${hashSuffix}`
  const finalBase =
    shouldAppendHash && asciiBase.length > 0 ? `${safeBase}-${hashSuffix}` : safeBase
  const safeFilename = extension ? `${finalBase}.${extension}` : finalBase

  if (safeFilename !== normalized) {
    console.warn(`Renamed filename for S3 compatibility`, {
      original: normalized,
      safeFilename,
    })
  }

  return safeFilename
}

type MediaCacheEntry = { id: string; filename: string }

async function buildMediaCache(payload: any): Promise<Map<string, MediaCacheEntry>> {
  const map = new Map<string, MediaCacheEntry>()
  let page = 1
  while (true) {
    const res = await payload.find({ collection: 'media', page, limit: 100 })
    for (const m of res.docs) {
      if (m.filename) {
        const filename = String(m.filename)
        map.set(filename, { id: m.id, filename: m.filename })
        const normalized = normalizeWpFilename(filename)
        if (normalized && normalized !== filename && !map.has(normalized)) {
          map.set(normalized, { id: m.id, filename: m.filename })
        }
      }
    }
    if (page >= res.totalPages) break
    page++
  }
  fs.writeFileSync('./mediacache.json', JSON.stringify(Object.fromEntries(map), null, 2))
  return map
}

const failedMedia: { slug?: string; imgsrc: string }[] = []
const failedMediaSet = new Set<string>()

async function checkMediaCache(
  mediacache: Map<string, MediaCacheEntry>,
  imgsrc: string,
  slug?: string,
) {
  const normalized = normalizeWpFilename(imgsrc)
  if (!imgsrc || !normalized) return undefined

  const existing = mediacache.get(normalized)
  if (existing) {
    return existing
  }

  const uploadedId = await uploadMissingMedia(imgsrc, mediacache)
  if (uploadedId) {
    const updated = mediacache.get(normalized)
    if (updated) {
      return updated
    }
  }

  const failureKey = `${slug ?? 'unknown'}::${imgsrc}`
  if (!failedMediaSet.has(failureKey)) {
    failedMediaSet.add(failureKey)
    failedMedia.push({ slug, imgsrc })
  }

  return undefined
}

async function uploadMissingMedia(
  imgsrc: string,
  mediacache: Map<string, MediaCacheEntry>,
): Promise<string | false> {
  if (!imgsrc) return false
  if (imgsrc.endsWith('transparent.gif')) return false
  try {
    const normalized = normalizeWpFilename(imgsrc)
    console.log('uploading missing media: ', imgsrc, normalized)
    const res = await fetch(imgsrc)
    if (!res.ok) {
      console.warn(`Skipping ${imgsrc}, failed to fetch with status ${res.status}`)
      return false
    }
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(arrayBuffer))
    const mimetype = res.headers.get('content-type') || ''
    const ext = mimetype.split('/').pop()
    const safeFilename = normalized.includes('.') ? normalized : normalized + '.' + ext

    const data = await payload.create({
      collection: 'media',
      data: {
        alt: imgsrc,
        folder: wordpressMedia,
        category: [blogImageCategory],
        caption: null,
      },
      file: {
        data: buffer,
        mimetype,
        name: safeFilename,
        size: buffer.length,
      },
    })
    mediacache.set(normalized, { id: data.id, filename: safeFilename })
    return data.id
  } catch (error) {
    console.log('fetch and upload failed: ', imgsrc, error)
    return false
  }
}

function normalizeWpFilename(src: string) {
  const rawFilename = src.split('?')[0].split('/').pop() || ''
  return createS3SafeFilename(rawFilename)
}

function getSlugFromURL(url: string) {
  const u = new URL(url)
  return decodeURIComponent(u.pathname).split('/')[2]
}

function createLexicalTableJSON($: cheerio.CheerioAPI, $table: cheerio.Cheerio<any>) {
  const rows: any[] = []
  $table.find('tr').each((_, tr) => {
    const cells: any[] = []
    const $cells = $(tr).find('th,td') // ✅ use the same $
    $cells.each((__, cell) => {
      const $cell = $(cell)
      const isHeader = $cell.is('th')
      const text = $cell.text().trim()
      cells.push({
        type: 'tablecell',
        header: isHeader,
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: text ? [{ type: 'text', version: 1, text }] : [],
          },
        ],
      })
    })
    rows.push({ type: 'tablerow', version: 1, children: cells })
  })
  return { type: 'table', version: 1, children: rows }
}

type Segment =
  | { kind: 'text'; html: string }
  | { kind: 'image'; mediaId?: string; caption?: string; src?: string }
  | { kind: 'table'; json: any }
  | {
      kind: 'iframe'
      props: { src: string; height: string; width: string; title: string; allow: string }
    }

async function splitRenderedHtmlIntoSegments(
  renderedHtml: string,
  mediaCache: Map<string, MediaCacheEntry>,
): Promise<Segment[]> {
  const $ = cheerio.load(renderedHtml)
  const segments: Segment[] = []

  // Remove very small images that are likely decorative or icons
  $('img').each((_, el) => {
    const $img = $(el)
    const width = $img.attr('width')
    if (width && parseInt(width, 10) < 20) {
      $img.remove()
    }
  })

  let topNodes = $('body').length ? $('body').children().toArray() : $.root().children().toArray()

  // If there is a single generic wrapper, descend one level to preserve block order
  if (topNodes.length === 1) {
    const tag = (topNodes[0] as any).tagName?.toLowerCase?.()
    if (tag && ['div', 'section', 'article', 'main'].includes(tag)) {
      topNodes = $(topNodes[0]).children().toArray()
    }
  }

  const normalizeCandidateSrc = (value?: string | null) => value?.replace(/amp;/g, '').trim() || ''

  async function resolveImageFromElement($img: cheerio.Cheerio<any>) {
    const candidates = [
      normalizeCandidateSrc($img.attr('data-src')),
      normalizeCandidateSrc($img.attr('data-lazy-src')),
      normalizeCandidateSrc($img.attr('data-original')),
      normalizeCandidateSrc($img.attr('src')),
    ].filter(Boolean) as string[]

    let resolvedSrc: string | undefined
    let resolvedMedia: MediaCacheEntry | undefined

    for (const candidate of candidates) {
      if (!candidate) continue
      if (!resolvedSrc) {
        resolvedSrc = candidate
      }

      let parsedUrl: URL | undefined

      try {
        parsedUrl = new URL(candidate)
      } catch {
        parsedUrl = undefined
      }

      if (!parsedUrl || !['http:', 'https:'].includes(parsedUrl.protocol)) {
        continue
      }

      const mediaEntry = await checkMediaCache(mediaCache, candidate)
      if (mediaEntry && mediaEntry.id) {
        resolvedSrc = candidate
        resolvedMedia = mediaEntry
        break
      }
    }

    if (resolvedSrc) {
      $img.attr('src', resolvedSrc)
    }

    return { src: resolvedSrc, mediaEntry: resolvedMedia }
  }

  const parseNodes = async (nodes: any[]) => {
    for (const node of nodes) {
      const $node = $(node)

      // FIGURE (img + optional figcaption)
      if ($node.is('figure')) {
        const $img = $node.find('img').first()

        if ($img.length) {
          const { src, mediaEntry } = await resolveImageFromElement($img)
          const caption = $node.find('figcaption').text().trim() || undefined
          if (src) {
            segments.push({ kind: 'image', mediaId: mediaEntry?.id, caption, src })
          }
          continue
        }
        const $iframe = $node.find('iframe').first()
        if ($iframe.length) {
          const src = normalizeCandidateSrc($iframe.attr('src') || $iframe.attr('data-src'))
          const width = $iframe.attr('width') || ''
          const height = $iframe.attr('height') || ''
          const title = $iframe.attr('title') || ''
          const allow = $iframe.attr('allow') || ''
          segments.push({ kind: 'iframe', props: { src, width, height, title, allow } })
          continue
        }
      }

      if ($node.is('p') && $node.find('img').length === 1 && $node.text().trim() === '') {
        const $img = $node.find('img').first()
        const { src, mediaEntry } = await resolveImageFromElement($img)
        if (src) {
          segments.push({ kind: 'image', mediaId: mediaEntry?.id, src })
        }
        continue
      }

      if ($node.is('li') && $node.find('img').length === 1 && $node.text().trim() === '') {
        const $img = $node.find('img').first()
        const { src, mediaEntry } = await resolveImageFromElement($img)
        if (src) {
          segments.push({ kind: 'image', mediaId: mediaEntry?.id, src })
        }
        continue
      }

      // TABLE
      if ($node.is('table')) {
        segments.push({ kind: 'table', json: createLexicalTableJSON($, $node) })
        continue
      }

      // DIV
      if ($node.is('div') && $node.length === 1) {
        const childNodes = $node.children().toArray()
        if (childNodes.length) {
          await parseNodes(childNodes)
          continue
        }
      }

      // Generic text block (keep full outerHTML)
      const outer = $.html(node).trim().replace('h1', 'h2').replace('span', 'p')
      if (!outer.replace(/<[^>]+>/g, '').replace(/&nbsp;|\u00a0|\s/g, '')) continue
      segments.push({ kind: 'text', html: outer })
    }
  }

  await parseNodes(topNodes)
  console.log('done parsing nodes')
  return segments
}

function uploadNodeJSON(id: string) {
  if (typeof id !== 'string') throw Error('id is not string')
  return {
    type: 'upload',
    version: 3,
    value: id,
    fields: null,
    format: '',
    relationTo: 'media',
  }
}

function customHTMLNodeJSON(html: string) {
  return {
    type: 'block',
    format: '',
    version: 2,
    fields: {
      blockType: 'customHtmlBlock',
      blockHeader: {
        type: 'center',
        badge: {},
        links: [],
      },
      htmlContent: html.replace('"', '\"'),
    },
  }
}

function iframeToHTMLContent({ src, height, width, title, allow }) {
  return `<iframe title="${title}" width="${width}" height="${height}" data-lazy="true" frameborder="0" allow="${allow}" src="${src}"></iframe>`
}

function para(text?: string) {
  return {
    type: 'paragraph',
    version: 1,
    children: text ? [{ type: 'text', version: 1, text }] : [],
  }
}

async function htmlChunkToLexicalChildren(editor: any, html: string) {
  editor.update(
    () => {
      const dom = new JSDOM(html)
      const nodes = $generateNodesFromDOM(editor, dom.window.document)
      const root = $getRoot()
      root.clear()
      root.append(...nodes)
    },
    { discrete: true },
  )
  const json = editor.getEditorState().toJSON()
  return (json?.root?.children ?? []) as any[]
}

export async function convertRenderedToLexical({
  payload,
  mediaCache,
  renderedHtml,
}: {
  payload: any
  mediaCache: Map<string, MediaCacheEntry>
  renderedHtml: string
}) {
  const editor = await buildServerHeadlessEditor(payload)
  const segments = await splitRenderedHtmlIntoSegments(renderedHtml, mediaCache) // parse with cheerio and assign block types
  const children: any[] = []
  for (const seg of segments) {
    if (seg.kind === 'text') {
      const imported = await htmlChunkToLexicalChildren(editor, seg.html)
      children.push(...imported)
    } else if (seg.kind === 'image') {
      console.log(seg)
      if (seg.mediaId) {
        // Add a little breathing room around images (optional)
        // if (children.length && children[children.length - 1]?.type !== 'paragraph') {
        //   children.push(para())
        // }
        //
        console.log(uploadNodeJSON(seg.mediaId))
        children.push(uploadNodeJSON(seg.mediaId))
        if (seg.caption) children.push(para(seg.caption))
        children.push(para())
      } else {
        // fallback: keep original <img> with its source
        const html = `<p><img src="${seg.src || ''}" alt=""/></p>`
        const imported = await htmlChunkToLexicalChildren(editor, html)
        children.push(...imported)
      }
    } else if (seg.kind === 'table') {
      children.push(seg.json)
      children.push(para())
    } else if (seg.kind === 'iframe') {
      children.push(customHTMLNodeJSON(iframeToHTMLContent(seg.props)))
      children.push(para())
    }
  }

  // Trim trailing blank paras
  while (children.length) {
    const last = children[children.length - 1]
    if (last?.type === 'paragraph' && (!last.children || last.children.length === 0)) {
      children.pop()
    } else break
  }

  return {
    root: {
      type: 'root',
      children,
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

async function migrateBlog() {
  console.log('Starting migration')
  const payload = await getPayload({ config: payloadConfig })
  const mediaCache = await buildMediaCache(payload)

  const { docs: blogPostsData } = await payload.find({
    collection: 'blog-posts',
    limit: 0,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const blogPostsCache = new Set(blogPostsData.map((item) => item.slug))

  const { docs: categoriesData } = await payload.find({
    collection: 'categories',
    limit: 0,
    pagination: false,
    select: {
      slug: true,
      title: true,
    },
  })

  const blogCategoriesMap = new Map(categoriesData.map((category) => [category.title, category]))
  // fs.writeFileSync('./blogCategoriesMap.json', JSON.stringify([...blogCategoriesMap], null, 2))

  const xmlData = fs.readFileSync('./src/wordpress/blogWPData.xml', 'utf8')

  // const wpData = parse(xmlData)
  const parser = new XMLParser()
  const wpData = parser.parse(xmlData)
  // fs.writeFileSync('./parsedBlogData.json', JSON.stringify(wpData, null, 2))
  // console.log('Saved parsed blog xml to parsedBlogData.json')

  // console.dir(wpData.rss.channel.item)

  let i = 1
  const blogPosts = wpData.rss.channel.item.filter(
    (item) =>
      item['content:encoded'] &&
      item['wp:post_type'] === 'post' &&
      !blogPostsCache.has(getSlugFromURL(item.link)),
    // getSlugFromURL(item.link) === 'دليلك-الشامل-لإطلاق-مطعمك-مقهاك-الخاص',
  )
  for (const blogPost of blogPosts) {
    console.log(`migrating post ${i} or ${blogPosts.length}`)
    console.log(blogPost.link)
    const fetchedData = await fetch(
      `https://marn.com/blog/wp-json/wp/v2/posts/${blogPost['wp:post_id']}?context=edit`,
      {
        headers: {
          Authorization:
            'Basic ' +
            Buffer.from(`${process.env.WP_USER}:${process.env.WP_PASS}`).toString('base64'),
        },
      },
    ).then((response) => response.json())

    // const parsedData = parse(blogPost['content:encoded'])

    const renderedHtml = fetchedData?.content?.rendered ?? blogPost['content:encoded'] ?? ''
    fs.writeFileSync('./renderedHTML.html', renderedHtml)

    // fs.writeFileSync('./fetchedData.json', JSON.stringify(fetchedData, null, 2))

    const lexical = await convertRenderedToLexical({
      payload,
      mediaCache,
      renderedHtml,
    })

    const authors = await payload.find({
      collection: 'users',
      where: {
        author_login: {
          equals: blogPost['dc:creator'],
        },
      },
    })

    const author = authors.docs[0]

    let postCategories: any[] = []

    if (Array.isArray(blogPost.category)) {
      postCategories = blogPost?.category?.reduce((arr, cur: string) => {
        const categoryData = blogCategoriesMap.get(cur)
        if (categoryData) arr.push(categoryData)
        return arr
      }, [])
    } else if (
      blogPost.category &&
      typeof blogPost.category === 'string' &&
      blogCategoriesMap.has(blogPost.category)
    ) {
      postCategories.push(blogCategoriesMap.get(blogPost.category))
    }

    const { title, description, og_image } = fetchedData['yoast_head_json']

    const metadata = {
      title,
      description,
      imageURL: og_image[0].url,
    }

    const newBlogPostData: Partial<BlogPost> = {
      slug: decodeURIComponent(blogPost['wp:post_name']),
      slugLock: false,
      authors: author ? [author.id] : [],
      title: blogPost.title,
      publishedAt: new Date(blogPost.pubDate).toISOString(),
      // layout: [],
      categories: postCategories,
      heroImage: mediaCache.get(normalizeWpFilename(metadata.imageURL ?? ''))?.id,
      content: lexical as any,
      meta: {
        title: blogPost['title'],
        description: metadata.description,
        image: mediaCache.get(normalizeWpFilename(metadata.imageURL ?? ''))?.id,
      },
      _status: 'published',
    }

    // Create Blog Article
    console.log('creating new')
    console.log(newBlogPostData.meta)

    fs.writeFileSync('./blogpostdata.json', JSON.stringify(newBlogPostData, null, 2))
    await payload.create({
      collection: 'blog-posts',
      data: newBlogPostData as any,
      draft: false,
    })
    i++
  }
}

await migrateBlog()
console.log('done')
process.exit()
