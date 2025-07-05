import type { Metadata } from 'next/types'
import type { Page as PageType, BlogPost, Category } from '@/payload-types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import PageClient from './page.client'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/utilities/generateMeta'
import { Link } from '@/i18n/routing'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    locale?: 'ar' | 'en' | undefined
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = 'ar' } = await paramsPromise
  const slug = 'blog'
  const payload = await getPayload({ config: configPromise })

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
    locale,
  })

  const { hero, layout } = page

  if (!page) {
    page = null
  }

  const posts = await payload.find({
    collection: 'blog-posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      content: true,
      publishedAt: true,
    },
  })

  const categories: Category[] = []

  posts.docs.forEach((post) => {
    post.categories?.forEach((category) => {
      if (typeof category === 'object' && category !== null) {
        if (!categories.some((c) => c.id === category.id)) {
          categories.push(category)
        }
      }
    })
  })

  // if (!page) {
  //   return <PayloadRedirects url={url} />
  // }

  return (
    <article className="bg-background overflow-x-clip">
      <PageClient />

      <RenderHero {...hero} />

      <RenderBlocks blocks={layout as any} locale={locale} />

      <div className="py-md container flex flex-row items-center justify-between">
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className="text-base-primary bg-background-neutral hover:text-base-secondary hover:bg-background-neutral-subtle rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              All
            </Link>
            {categories?.map((category, index) => {
              return (
                <Link
                  href={`/blog/category/${category.slug}`}
                  key={index}
                  className="text-base-primary bg-background-neutral hover:text-base-secondary hover:bg-background-neutral-subtle rounded-full px-4 py-2 text-sm font-medium transition-colors"
                >
                  {category.title}
                </Link>
              )
            })}
          </div>
        )}
        <PageRange
          className="w-fit shrink-0"
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs as BlogPost[]} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'ar' } = await paramsPromise
  const slug = 'blog'

  const page = await queryPageBySlug({
    slug,
    locale,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale?: 'ar' | 'en' }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    locale: locale,
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
