import 'dotenv/config'
import sharp from 'sharp'
import fs from 'fs'
import mime from 'mime'

import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

import { media } from '@/payload-generated-schema'
;(async () => {
  console.log('Starting script')

  const payload = await getPayload({ config: payloadConfig })

  const { docs: mediaItems } = await payload.find({
    collection: 'media',
    pagination: false,
    limit: 0,
    select: {
      blurhash: true,
      url: true,
      mimeType: true,
    },
  })

  const uploadedMediaItems = new Set(mediaItems.map((media) => media.id))

  for (const mediaItem of mediaItems) {
    const imageData = await fetch(mediaItem.url as string)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network error: ' + response.status)
        }
        return response.arrayBuffer()
      })
      .catch((error) => {
        console.error('Fetch failed:', error)
        return null
      })

    if (!imageData) {
      throw Error('Fetch failed')
    }

    const buffer = await sharp(imageData).resize({ width: 8 }).toFormat('webp').toBuffer()
    const base64 = buffer.toString('base64')
    const blurhash = `data:${mediaItem.mimeType};base64,${base64}`

    await payload.update({
      collection: 'media',
      id: mediaItem.id,
      data: {
        blurhash,
      },
    })
  }
})()
