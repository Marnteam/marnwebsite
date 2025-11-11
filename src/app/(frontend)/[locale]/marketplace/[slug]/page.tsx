import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { IntegrationHero } from '@/heros/IntegrationHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Media } from '@/payload-types'
import { IntegrationPane } from '@/components/IntegrationPane'
import { setRequestLocale } from 'next-intl/server'

export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const locales = ['en', 'ar']
  const params: { slug: string; locale: 'ar' | 'en' }[] = []
  for (const locale of locales) {
    const pages = await payload.find({
      collection: 'integrations',
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
          slug: encodeURIComponent(doc.slug || ''),
          locale: locale as 'ar' | 'en',
        })
      })
  }

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: 'ar' | 'en' | undefined
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', locale = 'ar' } = await paramsPromise
  const url = `/${locale}/marketplace/` + decodeURIComponent(slug)
  const integration = await queryIntegrationBySlug({ slug, locale })
  setRequestLocale(locale)
  if (!integration) return <PayloadRedirects url={url} />

  const { icon, hero, layout } = integration

  return (
    <article className="pt-header-plus-admin-bar pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <IntegrationHero type="hero03" richText={hero} icon={icon as Media} />
      <IntegrationPane integration={integration} />
      <RenderBlocks blocks={layout as any} locale={locale} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = '', locale = 'ar' } = await params
  const integration = await queryIntegrationBySlug({ slug, locale })
  return generateMeta({ doc: integration, locale })
}

const queryIntegrationBySlug = cache(
  async ({ slug, locale }: { slug: string; locale?: 'ar' | 'en' | undefined }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const integration = await payload.find({
      collection: 'integrations',
      locale: locale,
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: {
          equals: decodeURIComponent(slug),
        },
      },
      select: {
        hero: true,
        summary: true,
        tagline: true,
        layout: true,
        icon: true,
        company: true,
        ecosystem: true,
        categories: true,
        pricing: true,
      },
    })

    return integration.docs?.[0] || null
  },
)
