const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/*', '/blog/*'],
  generateIndexSitemap: true,
  // doesn't do anything
  additionalSitemaps: [`${SITE_URL}/sitemap-ar.xml`, `${SITE_URL}/sitemap-en.xml`],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/sitemap-ar.xml`, `${SITE_URL}/sitemap-en.xml`],
  },
}
