import type { Metadata } from 'next/types'
import type { Page as PageType } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import PageClient from './page.client'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/utilities/generateMeta'
import { PricingProvider } from '@/providers/Pricing'
import { Hero03 } from '@/heros/Hero03'
import { PricingToggle } from '@/blocks/Pricing/PricingToggle'

export const revalidate = 600

type Args = {
  params: Promise<{
    slug?: string[]
    locale?: 'ar' | 'en' | undefined
  }>
  searchParams: Promise<{
    q?: string
    category?: string
    ecosystem?: string
    sort?: string
  }>
}

export default async function Page({ params: paramsPromise, searchParams: searchParamsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug: slugSegments = [], locale = 'ar' } = await paramsPromise

  const slugPath = slugSegments.join('/') || 'pricing'
  const url = `/${locale}/${slugPath === 'pricing' ? '' : slugPath}`

  let page: PageType | null

  page = await queryPageBySlug({
    slug: slugPath,
    locale,
  })

  if (!page && slugPath === 'pricing') {
    page = null
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <PricingProvider>
      <article className="bg-background overflow-x-clip">
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />

        {draft && <LivePreviewListener />}

        {/* <RenderHero {...hero} /> */}
        <Hero03 {...hero}>
          <PricingToggle className="w-full md:max-w-[400px]" locale={locale} />
        </Hero03>

        <RenderBlocks blocks={layout as any} locale={locale} />
      </article>
    </PricingProvider>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug: slugSegments = [], locale = 'ar' } = await paramsPromise
  const slugPath = slugSegments.join('/') || 'pricing'

  const page = await queryPageBySlug({
    slug: slugPath,
    locale,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale?: 'ar' | 'en' | undefined }) => {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: draft } = await draftMode()
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
