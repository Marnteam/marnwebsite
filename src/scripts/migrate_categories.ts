import 'dotenv/config'
import fs from 'fs'

import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

// import marnBlogCategories from './marn-blog-categories.json'
;(async () => {
  console.log('Migrating categoires')
  const payload = await getPayload({ config: payloadConfig })

  const { docs: categoriesData } = await payload.find({
    collection: 'categories',
    limit: 0,
    pagination: false,
  })

  const currentCategories = new Set(categoriesData.map((category) => category.slug))

  let i = 1

  const wpBlogCategoryData = fs.readFileSync('src/wordpress/wpCategoriesData.json', 'utf8')
  const blogCategoryData = JSON.parse(wpBlogCategoryData)

  const wpCategoriesMap = new Map()

  for (const item of blogCategoryData) {
    console.log(`Processing item ${i} of ${blogCategoryData.length}`)

    if (currentCategories.has(item['Slug'])) {
      console.log('category already uploaded')
      i++
      continue
    }

    const category = await payload.create({
      collection: 'categories',
      data: {
        title: item['Category name'],
        slug: item['Slug'],
      },
    })

    wpCategoriesMap.set(category.slug, category)

    if (item['Parent/ Sub'] !== 'parent' && wpCategoriesMap.has(item['Parent/ Sub'])) {
      const parent = wpCategoriesMap.get(item['Parent/ Sub'])
      await payload.update({
        collection: 'categories',
        id: category.id,
        data: {
          parent,
        },
      })
    }

    i++
  }
  process.exit()
})()
