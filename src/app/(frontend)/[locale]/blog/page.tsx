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
import { CategoriesList } from '@/components/CategoriesList'

type Args = {
  params: Promise<{
    locale?: 'ar' | 'en' | undefined
  }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: Args) {
  const { locale = 'ar' } = await params
  const { category = 'all', page = 1 } = await searchParams
  const slug = 'blog'
  const payload = await getPayload({ config: configPromise })

  let pageData: PageType | null

  pageData = await queryPageBySlug({
    slug,
    locale,
  })

  const { hero, layout } = pageData

  if (!pageData) {
    pageData = null
  }

  const posts = await payload.find({
    collection: 'blog-posts',
    depth: 1,
    limit: 6,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      content: true,
      publishedAt: true,
    },
    pagination: true,
    page: Number(page),
    where:
      category !== 'all'
        ? {
            'categories.slug': {
              in: category,
            },
          }
        : undefined,
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
    <article className="overflow-x-clip bg-background">
      <PageClient />

      <RenderHero {...hero} />

      {/* <h2 className="mb-space-sm text-h2 font-medium">{t('allArticles')}</h2> */}

      <CategoriesList categories={categories} />

      <CollectionArchive posts={posts.docs as BlogPost[]} />

      <div className="container my-space-xl flex flex-col items-center justify-between gap-4 md:flex-row">
        {posts.totalPages > 1 && posts.page && (
          <Pagination className="my-0" page={posts.page} totalPages={posts.totalPages} />
        )}
        <PageRange
          className="w-fit shrink-0"
          collection="posts"
          currentPage={posts.page}
          limit={6}
          totalDocs={posts.totalDocs}
        />
      </div>
      <RenderBlocks blocks={layout as any} locale={locale} />
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
