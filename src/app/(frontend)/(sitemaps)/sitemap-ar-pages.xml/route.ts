import { getServerSideSitemap } from 'next-sitemap'
import { getPayload, SanitizedConfig } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { ISitemapField, IAlternateRef } from 'next-sitemap'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const locale = 'ar'
    const otherLocale = 'en'

    // Add default routes
    const defaultRoutes = [{ path: 'search' }, { path: 'profit-calculator' }, { path: 'meeting' }]

    const dateFallback = new Date().toISOString()

    const defaultSitemap: ISitemapField[] = defaultRoutes.map(({ path }) => {
      const loc = `${SITE_URL}/${locale}/${path}`
      const alternateRefs: IAlternateRef[] = [
        { href: loc, hreflang: locale },
        { href: `${SITE_URL}/${otherLocale}/${path}`, hreflang: otherLocale },
      ]
      alternateRefs.push({ href: `${SITE_URL}/${locale}/${path}`, hreflang: 'x-default' })
      return {
        loc,
        lastmod: dateFallback,
        alternateRefs,
      }
    })

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      locale,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
        disablePage: true,
      },
    })

    const otherLocaleResults = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      locale: otherLocale,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
        disablePage: true,
      },
    })

    const sitemap: ISitemapField[] = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug) && !page.disablePage)
          .map((page) => {
            const path = page.slug === 'home' ? '' : `/${page.slug}`
            const loc = `${SITE_URL}/${locale}${path}`
            const alternateRefs: IAlternateRef[] = [
              { href: loc, hreflang: 'x-default' },
              { href: loc, hreflang: locale },
            ]
            if (otherLocaleResults.docs.some((doc) => doc.slug === page.slug && !doc.disablePage)) {
              alternateRefs.push({
                href: `${SITE_URL}/${otherLocale}${path}`,
                hreflang: otherLocale,
              })
            }
            return {
              loc,
              lastmod: page.updatedAt || dateFallback,
              alternateRefs,
            }
          })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
