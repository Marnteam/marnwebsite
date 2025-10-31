import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const locales = ['en', 'ar']
  const params: { slug: string[]; locale: 'ar' | 'en' }[] = []
  for (const locale of locales) {
    const pages = await payload.find({
      collection: 'pages',
      locale: locale as 'ar' | 'en',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })
    pages.docs
      ?.filter((doc) => {
        return doc.slug && doc.slug !== 'home'
      })
      .map((doc) => {
        params.push({
          slug: doc.slug?.split('/') || [],
          locale: locale as 'ar' | 'en',
        })
      })
  }
  return params
}

type Args = {
  params: Promise<{
    slug?: string[]
    locale?: 'ar' | 'en' | undefined
  }>
}

export default async function Page({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug: slugSegments = ['home'], locale = 'ar' } = await params
  const slugPath = slugSegments.join('/') || 'home'
  const url = `/${locale}/${slugPath}`

  let page: PageType | null

  page = await queryPageBySlug({
    slug: slugPath,
    locale,
  })

  if (!page && slugPath === 'home') {
    page = null
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="overflow-x-clip bg-background">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout as any} locale={locale} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug: slugSegments = ['home'], locale = 'ar' } = await params

  const slugPath = slugSegments.join('/') || 'home'

  const page = await queryPageBySlug({
    slug: slugPath,
    locale,
  })
  const meta = await generateMeta({ doc: page, locale })

  return meta
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
