import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { BlogPost } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<BlogPost> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  // fetch all blog categories
  const { docs: categories } = await payload.find({
    collection: 'categories',
    pagination: false,
  })

  // get the categories for the post
  const postCategories = doc.categories?.map((category) => {
    return categories.find((c) => c.id === category)
  })

  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/blog/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)
      revalidatePath(path)
      payload.logger.info(`Revalidating blog at path: /blog`)
      revalidatePath('/blog')
      for (const category of postCategories || []) {
        payload.logger.info(`Revalidating category page at path: /blog/category/${category?.slug}`)
        revalidatePath(`/blog/category/${category?.slug}`)
      }
      revalidateTag('posts-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/blog/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<BlogPost> = async ({
  doc,
  req: { context, payload },
}) => {
  // fetch all blog categories
  const { docs: categories } = await payload.find({
    collection: 'categories',
    pagination: false,
  })

  // get the categories for the post
  const postCategories = doc.categories?.map((category) => {
    return categories.find((c) => c.id === category)
  })

  if (!context.disableRevalidate) {
    const path = `/blog/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/blog')
    for (const category of postCategories || []) {
      revalidatePath(`/blog/category/${category?.slug}`)
    }
    revalidateTag('posts-sitemap')
  }

  return doc
}
