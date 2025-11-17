import type { Metadata } from 'next'

import type { Media, Page, BlogPost, Config, Integration } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const url = getServerSideURL()

const DEFAULT_TITLES: Record<'en' | 'ar', string> = {
  en: 'Marn POS',
  ar: 'منظومة مرن',
}

const DEFAULT_DESCRIPTIONS: Record<'en' | 'ar', string> = {
  en: 'All your tools in one flexible platform. Explore sales, operations, and management solutions built for fast-growing businesses.',
  ar: 'كل أدواتك في منظومة مرنة. استكشف حلول البيع، التشغيل، والإدارة المصممة لتلبية احتياجاتك.',
}

const isBlogPost = (
  doc: Partial<Page> | Partial<BlogPost> | Partial<Integration> | null,
): doc is Partial<BlogPost> => {
  return !!doc && 'content' in doc
}

const isIntegration = (
  doc: Partial<Page> | Partial<BlogPost> | Partial<Integration> | null,
): doc is Partial<Integration> => {
  return !!doc && 'company' in doc
}

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  // let url = serverUrl + '/website-template-OG.webp'
  let url = serverUrl

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async ({
  doc,
  locale,
}: {
  doc: Partial<Page> | Partial<BlogPost> | Partial<Integration>
  locale: 'en' | 'ar'
}): Promise<Metadata> => {
  // const ogImage = getImageURL(doc?.meta?.image)

  const fallbackTitle = DEFAULT_TITLES[locale]
  const metaTitle =
    typeof doc?.meta?.title === 'string' ? doc.meta.title.trim() : (doc?.meta?.title ?? undefined)
  const contentTitle = typeof doc?.title === 'string' ? doc.title.trim() : undefined
  const integrationName =
    isIntegration(doc) && typeof doc?.name === 'string' ? doc.name.trim() : undefined
  const title = metaTitle || contentTitle || integrationName || fallbackTitle

  const slugValue = doc?.slug
  const rawSlug = Array.isArray(slugValue)
    ? slugValue.filter(Boolean).join('/')
    : typeof slugValue === 'string'
      ? slugValue
      : 'home'
  const cleanedSlug = rawSlug.replace(/^\/+|\/+$/g, '') || 'home'

  const defaultDescription = DEFAULT_DESCRIPTIONS[locale]
  const description = doc?.meta?.description?.trim() || defaultDescription

  let pathSegment = cleanedSlug === 'home' ? '' : cleanedSlug

  if (isBlogPost(doc)) {
    pathSegment = pathSegment
      ? pathSegment.startsWith('blog/')
        ? pathSegment
        : `blog/${pathSegment}`
      : 'blog'
  } else if (isIntegration(doc)) {
    pathSegment = pathSegment
      ? pathSegment.startsWith('marketplace/')
        ? pathSegment
        : `marketplace/${pathSegment}`
      : 'marketplace'
  }

  const relativePath = `/${locale}${pathSegment ? `/${pathSegment}` : ''}`
  const canonical = `${url}${relativePath}`

  const isBlog = isBlogPost(doc)

  const openGraphInput: Metadata['openGraph'] = isBlog
    ? {
        type: 'article',
        description,
        title,
        url: canonical,
        siteName: fallbackTitle,
        locale,
        publishedTime: doc?.publishedAt ?? undefined,
        modifiedTime: doc?.updatedAt ?? undefined,
        images: `${url}/next/og?locale=${locale}&type=blog&slug=${pathSegment}`,
      }
    : {
        type: 'website',
        description,
        title,
        url: canonical,
        siteName: fallbackTitle,
        locale,
        images: `${url}/next/og?locale=${locale}&type=${pathSegment}&slug=${pathSegment}`,
      }

  const metadata: Metadata = {
    title,
    description,
    openGraph: mergeOpenGraph(openGraphInput),

    alternates: {
      canonical,
      languages: {
        ar: `${url}/ar${pathSegment ? `/${pathSegment}` : ''}`,
        en: `${url}/en${pathSegment ? `/${pathSegment}` : ''}`,
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
