import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { BlogPost } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<BlogPost> = async ({
  doc,
  previousDoc,
  req: { payload, context, locale },
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

  const basePath = `/${locale}/blog`
  const path = `${basePath}/${doc.slug}`

  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating post at path: ${path}`)
      revalidatePath(path)
      payload.logger.info(`Revalidating blog at path: ${basePath}`)
      revalidatePath(basePath)
      for (const category of postCategories || []) {
        payload.logger.info(
          `Revalidating category page at path: ${basePath}/category/${category?.slug}`,
        )
        revalidatePath(`${basePath}/category/${category?.slug}`)
      }
      revalidateTag('posts-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `${basePath}/${previousDoc.slug}`

      payload.logger.info(`Revalidating old post at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('posts-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<BlogPost> = async ({
  doc,
  req: { context, payload, locale },
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

  const basePath = `/${locale}/blog`
  const path = `${basePath}/${doc.slug}`

  if (!context.disableRevalidate) {
    revalidatePath(path)
    revalidatePath('/blog')
    for (const category of postCategories || []) {
      revalidatePath(`${basePath}/category/${category?.slug}`)
    }
    revalidateTag('posts-sitemap')
  }

  return doc
}
