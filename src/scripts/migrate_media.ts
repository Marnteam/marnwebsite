import 'dotenv/config'
import fs from 'fs'
import { XMLParser } from 'fast-xml-parser'
import mime from 'mime'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'
import { media } from '@/payload-generated-schema'
;(async () => {
  console.log('Starting migration')

  const payload = await getPayload({ config: payloadConfig })

  const wordpressMedia = await payload.create({
    collection: 'payload-folders',
    data: { name: 'Wordpress Media' },
  })

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

  const { docs: uploadedMediaData } = await payload.find({
    collection: 'media',
    pagination: false,
    select: {
      filename: true,
    },
  })

  const uploadedMediaItems = new Set(uploadedMediaData.map((media) => media.filename))

  fs.writeFileSync(
    './uploadedMedia.json',
    JSON.stringify([...uploadedMediaItems.values()], null, 2),
  )

  console.log('saved uploadedMedia.json')

  const xmlData = fs.readFileSync('./src/wordpress/mediaWPData.xml', 'utf8')

  // const wpData = parse(xmlData)
  const parser = new XMLParser()
  const wpData = parser.parse(xmlData)

  // save parsed xml to json
  fs.writeFileSync('./parsedMedia.json', JSON.stringify(wpData, null, 2))

  for (const mediaItem of wpData.rss.channel.item) {
    const filename = mediaItem.guid.split('?')[0].split('/').pop()
    console.log(mediaItem.guid)
    if (uploadedMediaItems.has(filename)) {
      console.log('item already uploaded')
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
        mimetype: mime.getType(mediaItem.guid.split('?')[0].split('/').pop()) || '',
        name: filename,
        size: buffer.length,
      },
    })
    uploadedMediaItems.add(filename)
    fs.writeFileSync(
      './uploadedMedia.json',
      JSON.stringify([...uploadedMediaItems.values()], null, 2),
    )
  }
  process.exit()
})()
