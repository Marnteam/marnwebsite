import { PayloadRequest, CollectionSlug } from 'payload'
import { Locale } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  'blog-posts': '/blog',
  pages: '',
  customers: '/customers',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
  locale: Locale | string
}

export const generatePreviewPath = ({ collection, slug, req, locale }: Props) => {
  const localeString = typeof locale === 'string' ? locale : String(locale)

  const path = `/${collectionPrefixMap[collection]}/${slug}`

  const params = {
    slug,
    collection,
    locale: localeString,
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  }

  const encodedParams = new URLSearchParams(params)

  // Object.entries(params).forEach(([key, value]) => {
  //   encodedParams.append(key, String(value))
  // })

  const isProduction =
    process.env.NODE_ENV === 'production' || Boolean(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  const protocol = isProduction ? 'https:' : req.protocol

  const url = `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`
  console.log(encodedParams.toString())
  return url
}
