import 'dotenv/config'
import crypto from 'crypto'
import fs from 'fs'
import { XMLParser } from 'fast-xml-parser'
import mime from 'mime'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'
import { media } from '@/payload-generated-schema'

const createS3SafeFilename = (filename: string): string => {
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

;(async () => {
  console.log('Starting migration')

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

  const { docs: uploadedMediaData } = await payload.find({
    collection: 'media',
    pagination: false,
    select: {
      filename: true,
    },
  })

  const uploadedMediaItems = new Set(
    uploadedMediaData.map((media) => media.filename),
    // .filter((filename): filename is string => typeof filename === 'string')
    // .map((filename) => createS3SafeFilename(filename)),
  )

  fs.writeFileSync(
    './uploadedMedia.json',
    JSON.stringify([...uploadedMediaItems.values()], null, 2),
  )

  const failedUploads: any[] = []

  console.log('saved uploadedMedia.json')

  const xmlData = fs.readFileSync('./src/wordpress/mediaWPData.xml', 'utf8')

  // const wpData = parse(xmlData)
  const parser = new XMLParser()
  const wpData = parser.parse(xmlData)

  // save parsed xml to json
  fs.writeFileSync('./parsedMedia.json', JSON.stringify(wpData, null, 2))

  for (const mediaItem of wpData.rss.channel.item) {
    const rawFilename = mediaItem.guid.split('?')[0].split('/').pop()

    if (!rawFilename) {
      console.warn(`Skipping ${mediaItem.guid}, unable to determine filename`)
      continue
    }

    const safeFilename = createS3SafeFilename(rawFilename)

    if (uploadedMediaItems.has(safeFilename)) {
      console.log('item already uploaded: ', safeFilename)
      continue
    }
    // fetch file
    const res = await fetch(mediaItem.guid)
    if (!res.ok) {
      console.log(`Skipping ${mediaItem.guid}, failed to fetch`)
      continue
    }
    const arrayBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(arrayBuffer))

    try {
      console.log(`Uploading ${safeFilename}`)
      await payload.create({
        collection: 'media',
        data: {
          alt: String(mediaItem.title),
          folder: wordpressMedia,
          category: [blogImageCategory],
          caption: generateLexicalContent([{ text: mediaItem.description, type: 'p' }]),
        },
        file: {
          data: buffer,
          mimetype: mime.getType(safeFilename) || '',
          name: safeFilename,
          size: buffer.length,
        },
      })
    } catch (error) {
      console.error(`Failed to upload ${safeFilename}`)
      console.error(error)
      failedUploads.push(mediaItem.guid)
      fs.writeFileSync('./failedUploads.json', JSON.stringify(failedUploads, null, 2))
      continue
    }
    uploadedMediaItems.add(safeFilename)
    fs.writeFileSync(
      './uploadedMedia.json',
      JSON.stringify([...uploadedMediaItems.values()], null, 2),
    )
  }
  process.exit()
})()
