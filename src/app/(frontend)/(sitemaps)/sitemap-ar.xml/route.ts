import { getServerSideSitemapIndex } from 'next-sitemap'

export async function GET() {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'
  return getServerSideSitemapIndex([
    `${SITE_URL}/sitemap-ar-pages.xml`,
    `${SITE_URL}/sitemap-ar-posts.xml`,
  ])
}
