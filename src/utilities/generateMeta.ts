import type { Metadata } from 'next'

import type { Page, BlogPost, Integration } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

import { getTranslations } from 'next-intl/server'

const baseURL = getServerSideURL()

const isBlogPost = (
  doc: Partial<Page> | Partial<BlogPost> | Partial<Integration> | null,
): doc is Partial<BlogPost> => {
  return !!doc && 'content' in doc
}

const isIntegration = (
  doc: Partial<Page> | Partial<BlogPost> | Partial<Integration> | null,
): doc is Partial<Integration> => {
  return !!doc && 'icon' in doc
}

const getImageURL = ({
  doc,
  locale,
}: {
  doc: Partial<Page> | Partial<BlogPost> | Partial<Integration>
  locale: 'en' | 'ar'
}) => {
  const slug = doc.slug
  let type = 'page'
  if (isBlogPost(doc)) type = 'blog'
  if (isIntegration(doc)) type = 'marketplace'
  return `${baseURL}/next/og?locale=${locale}&type=${type}&slug=${slug}`
}

export const generateMeta = async ({
  doc,
  locale,
}: {
  doc: Partial<Page> | Partial<BlogPost> | Partial<Integration>
  locale: 'en' | 'ar'
}): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' })

  const fallbackTitle = t('defaultTitle')
  const metaTitle =
    typeof doc?.meta?.title === 'string' ? doc.meta.title.trim() : (doc?.meta?.title ?? undefined)
  const contentTitle = typeof doc?.title === 'string' ? doc.title.trim() : undefined
  const integrationName =
    isIntegration(doc) && typeof doc?.name === 'string' ? doc.name.trim() : undefined
  const title = metaTitle || contentTitle || integrationName || fallbackTitle

  const defaultDescription = t('defaultDescription')
  const description = doc?.meta?.description?.trim() || defaultDescription

  const ogImage = getImageURL({ doc, locale })

  const slug = doc?.slug || ''

  let pathSegment = slug === 'home' ? '' : slug

  if (isBlogPost(doc)) {
    pathSegment = `blog/${pathSegment}`
  } else if (isIntegration(doc)) {
    pathSegment = `marketplace/${pathSegment}`
  }

  const relativePath = `/${locale}${pathSegment ? `/${pathSegment}` : ''}`
  const canonical = `${baseURL}${relativePath}`

  const openGraphInput: Metadata['openGraph'] = isBlogPost(doc)
    ? {
        type: 'article',
        description,
        title,
        url: canonical,
        siteName: fallbackTitle,
        locale,
        publishedTime: doc?.publishedAt ?? undefined,
        modifiedTime: doc?.updatedAt ?? undefined,
        images: ogImage,
      }
    : {
        type: 'website',
        description,
        title,
        url: canonical,
        siteName: fallbackTitle,
        locale,
        images: ogImage,
      }

  const metadata: Metadata = {
    title,
    description,
    openGraph: mergeOpenGraph(openGraphInput),
    alternates: {
      canonical,
      languages: {
        ar: `${baseURL}/ar${pathSegment ? `/${pathSegment}` : ''}`,
        en: `${baseURL}/en${pathSegment ? `/${pathSegment}` : ''}`,
      },
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@marnpos',
      title,
      description,
    },
  }

  if ('disablePage' in (doc || {}) && (doc as Partial<Page>)?.disablePage) {
    metadata.robots = {
      index: false,
      follow: false,
    }
  }

  return metadata
}
