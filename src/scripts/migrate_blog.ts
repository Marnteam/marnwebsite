import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { XMLParser } from 'fast-xml-parser'
setDefaultResultOrder('ipv4first')
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

async function buildMediaCache(payload: any) {
  const map = new Map<string, { id: string; filename: string }>()
  let page = 1
  while (true) {
    const res = await payload.find({ collection: 'media', page, limit: 100 })
    for (const m of res.docs) {
      if (m.filename) {
        const filename = String(m.filename).toLowerCase()
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
  // fs.writeFileSync('./mediacache.json', JSON.stringify(Object.fromEntries(map), null, 2))
  return map
}

function normalizeWpFilename(src: string) {
  // gets image src and returns the normalized filename
  try {
    const u = new URL(src)
    // console.log('created new url with source: ', src)
    const base = (decodeURIComponent(u.pathname).split('/').pop() || '').toLowerCase()
    return base.replace(/-\d+x\d+(?=\.\w+$)/, '') // strip -WxH
  } catch {
    const base = (src.split('/').pop() || '').toLowerCase()
    return base.replace(/-\d+x\d+(?=\.\w+$)/, '') // strip -WxH
  }
}

function getSlugFromURL(url: string) {
  const u = new URL(url)
  return decodeURIComponent(u.pathname).split('/')[2]
}

type Segment =
  | { kind: 'text'; html: string }
  | { kind: 'image'; mediaId?: string; caption?: string; src?: string }
  | { kind: 'table'; json: any }
  | {
      kind: 'iframe'
      props: { src: string; height: string; width: string; title: string; allow: string }
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

function splitRenderedHtmlIntoSegments(
  renderedHtml: string,
  mediaCache: Map<string, { id: string }>,
): Segment[] {
  const $ = cheerio.load(renderedHtml)
  const segments: Segment[] = []

  // Normalize common lazy attrs on images
  $('img').each((_, el) => {
    const $img = $(el)
    // discard small images
    const width = $img.attr('width')
    if (width && parseInt(width) < 20) {
      $img.remove()
    }

    const srcAttrs = [$img.attr('data-src'), $img.attr('data-lazy-src'), $img.attr('src'), '']
    const src = srcAttrs.find((src) => {
      return src && URL.canParse(src) && mediaCache.has(normalizeWpFilename(src))
    })
    // const src = $img.attr('data-src') || $img.attr('data-lazy-src') || $img.attr('src') || ''
    if (src) {
      const cleanSrc = src.replace('amp;', '')
      $img.attr('src', src)
      return
    }
  })

  // Prefer body children if present; otherwise use root children
  let topNodes = $('body').length ? $('body').children().toArray() : $.root().children().toArray()

  // If there is a single generic wrapper, descend one level to preserve block order
  if (topNodes.length === 1) {
    const tag = (topNodes[0] as any).tagName?.toLowerCase?.()
    if (tag && ['div', 'section', 'article', 'main'].includes(tag)) {
      topNodes = $(topNodes[0]).children().toArray()
    }
  }

  function parseNodes(topNodes) {
    for (const node of topNodes) {
      const $node = $(node)

      // FIGURE (img + optional figcaption)
      if ($node.is('figure')) {
        console.log('is figure')
        const $img = $node.find('img').first()

        if ($img.length) {
          const src = $img.attr('src') || ''
          const key = normalizeWpFilename(src)
          const media = mediaCache.get(key)
          const caption = $node.find('figcaption').text().trim() || undefined
          console.log('img: ', src)
          if (mediaCache.has(key))
            segments.push({ kind: 'image', mediaId: media?.id, caption, src })
          continue
        }
        const $iframe = $node.find('iframe').first()
        if ($iframe.length) {
          const src = $iframe.attr('src') || $iframe.attr('data-src') || ''
          const width = $iframe.attr('width') || ''
          const height = $iframe.attr('height') || ''
          const title = $iframe.attr('title') || ''
          const allow = $iframe.attr('allow') || ''
          segments.push({ kind: 'iframe', props: { src, width, height, title, allow } })
        }
      }

      // P that is purely an image wrapper
      if ($node.is('p') && $node.find('img').length === 1 && $node.text().trim() === '') {
        const src = $node.find('img').attr('src') || ''
        const key = normalizeWpFilename(src)
        const media = mediaCache.get(key)
        console.log('p: ', src)
        if (mediaCache.has(key)) {
          segments.push({ kind: 'image', mediaId: media?.id, src })
        }
        continue
      }

      if ($node.is('li') && $node.find('img').length === 1 && $node.text().trim() === '') {
        const src = $node.find('img').attr('src') || ''
        const key = normalizeWpFilename(src)
        const media = mediaCache.get(key)
        console.log('li: ', src)
        segments.push({ kind: 'image', mediaId: media?.id, src })
        continue
      }

      // Image
      if ($node.is('img')) {
        const src = $node.attr('src') || ''
        const key = normalizeWpFilename(src)
        const media = mediaCache.get(key)
        segments.push({ kind: 'image', mediaId: media?.id, src })
        continue
      }

      // TABLE
      if ($node.is('table')) {
        segments.push({ kind: 'table', json: createLexicalTableJSON($, $node) })
        continue
      }

      // DIV
      if ($node.is('div')) {
        if ($node.length === 1) {
          console.log('found div with one child, entering nested loop')
          const tag = 'div'
          if (tag && ['div', 'section', 'article', 'main'].includes(tag)) {
            const childNodes = $node.children().toArray()
            parseNodes(childNodes)
            continue
          }
        }
      }

      // Generic text block (keep full outerHTML)
      const outer = $.html(node).trim().replace('h1', 'h2')
      if (!outer.replace(/<[^>]+>/g, '').replace(/&nbsp;|\u00a0|\s/g, '')) continue
      segments.push({ kind: 'text', html: outer })
    }
  }

  parseNodes(topNodes)
  // console.log(segments.filter((seg) => seg.kind === 'image'))
  return segments
}

function uploadNodeJSON(id: string) {
  return {
    id,
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
  mediaCache: Map<string, { id: string }>
  renderedHtml: string
}) {
  const editor = await buildServerHeadlessEditor(payload)
  const segments = splitRenderedHtmlIntoSegments(renderedHtml, mediaCache) // parse with cheerio and assign block types
  const children: any[] = []
  for (const seg of segments) {
    if (seg.kind === 'text') {
      const imported = await htmlChunkToLexicalChildren(editor, seg.html)
      children.push(...imported)
    } else if (seg.kind === 'image') {
      if (seg.mediaId) {
        console.log('img block: ', seg.src)

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
        console.log('img else block: ', seg.src)
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
    // const parsedData = parse(fetchedData.content.rendered)
    const renderedHtml = fetchedData?.content?.rendered
    // || blogPost['content:encoded'] || ''
    //
    fs.writeFileSync('./renderedHTML.html', renderedHtml)
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

    const $post = await cheerio.fromURL(blogPost.link)

    const metadata = $post.extract({
      title: { selector: 'title' },
      description: {
        selector: 'meta[name=description]',
        value: 'content',
      },
      imageURL: {
        selector: 'meta[property="og:image"]',
        value: 'content',
      },
    })

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
    }

    // Create Blog Article
    console.log('creating new')
    console.log(newBlogPostData.meta)

    fs.writeFileSync('./blogpostdata.json', JSON.stringify(newBlogPostData, null, 2))
    await payload.create({
      collection: 'blog-posts',
      data: newBlogPostData as any,
    })
    i++
  }
}

migrateBlog()
console.log('done')
process.exit()
