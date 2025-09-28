import 'dotenv/config'
import fs from 'fs'

import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

import wpData from './categoriesData.json'
;(async () => {
  console.log('Starting categories collection')

  //   const payload = await getPayload({ config: payloadConfig })

  //   const { docs: categories } = await payload.find({
  //     collection: 'categories',
  //     where: {
  //       slug: {
  //         equals: 'blog-images',
  //       },
  //     },
  //     limit: 1,
  //   })

  const categoriesSet = new Set()
  //   console.log('category: ', blogCategory)
  let i = 1
  const blogPosts = wpData.rss.channel.item.filter(
    (item) => item['content:encoded'] && item['wp:post_type'] === 'post',
  )

  for (const item of blogPosts) {
    console.log(`Processing item ${i} of ${blogPosts.length}`)
    if ('category' in item) {
      console.log(item.category)
      Array.isArray(item.category)
        ? item.category.forEach((cat) => {
            return categoriesSet.add(cat)
          })
        : categoriesSet.add(item.category)
    }
    i++
  }

  console.dir(categoriesSet)
  fs.writeFileSync('./blogCategoriesData.json', JSON.stringify([...categoriesSet], null, 2))
})()
