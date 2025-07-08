import { PayloadRequest, CollectionSlug } from 'payload'
import { Locale } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  'blog-posts': '/blog',
  pages: '',
  customers: '/customers',
  integrations: '/marketplace',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
  locale: Locale | string
}

export const generatePreviewPath = ({ collection, slug, req, locale }: Props) => {
  const localeString = typeof locale === 'string' ? locale : String(locale)

  // encode slug without encoding the slashes
  const encodedSlug = slug
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  const path = `/${collectionPrefixMap[collection]}/${encodedSlug}`

  const params = {
    slug: encodedSlug,
    collection,
    locale: localeString,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  }

  const encodedParams = new URLSearchParams(params)

  const isProduction =
    process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL)

  const protocol = isProduction ? 'https:' : req.protocol

  const url = `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`

  return url
}
