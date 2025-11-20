import { BlogPost, Config } from '@/payload-types.js'
import type { PayloadSDK } from '@payloadcms/sdk'
import { iconNode, colors, FALLBACK_COPY, normalizeSlug, sanitizeString, truncate } from './utils'
import { container, text } from '@takumi-rs/helpers'

export default async function BlogPostsOGCard({
  sdk,
  slug,
  locale,
}: {
  sdk: PayloadSDK<Config>
  slug: string
  locale: 'en' | 'ar'
}) {
  const buildEyebrow = (slug: string, locale: string) => {
    return locale === 'ar' ? 'مدونة مرن' : 'Marn Blog'
  }

  const flexEnd = locale === 'ar' ? 'flex-start' : 'flex-end'
  const textAlign = locale === 'ar' ? 'right' : 'left'

  const fallback = FALLBACK_COPY[locale]

  let post: Partial<BlogPost> | null = null

  try {
    const result = await sdk.find({
      collection: 'blog-posts',
      locale,
      draft: false,
      limit: 1,
      pagination: false,
      depth: 2,
      where: {
        slug: {
          equals: normalizeSlug(slug),
        },
      },
      select: {
        title: true,
        meta: { title: true },
        categories: true,
      },
    })
    post = result?.docs?.[0] ?? null
  } catch (error) {
    console.log('Failed to resolve page for OG image', error)
  }

  const metaTitle = sanitizeString(post?.meta?.title)
  const pageTitle = sanitizeString(post?.title)
  const title = truncate(metaTitle || pageTitle || fallback.title, 100)
  const eyebrow = truncate(buildEyebrow(slug, locale), 48)
  const categories: BlogPost['categories'] = []
  if (post?.categories && post.categories.length > 0) {
    categories.push(...post?.categories)
  }
  const categoryNodes: ReturnType<typeof container>[] = []
  categories.slice(0, 3).map((categoryEntry) => {
    const categoryTitle = typeof categoryEntry === 'string' ? categoryEntry : categoryEntry?.title

    if (!categoryTitle) {
      return null
    }

    categoryNodes.push(
      container({
        style: {
          backgroundColor: colors.bg.default,
          borderRadius: '999px',
          padding: '12px 24px',
        },
        children: [
          text(categoryTitle, {
            fontSize: '24px',
            fontWeight: 500,
            color: colors.base.tertiary,
          }),
        ],
      }),
    )
  })

  return container({
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      padding: '32px',
      backgroundColor: colors.bg.default,
    },
    children: [
      container({
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'start',
          justifyContent: 'space-between',
          gap: '32px',
          borderRadius: '32px',
          backgroundColor: colors.bg.neutral,
          padding: '56px',
        },
        children: [
          container({
            style: {
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'start',
              justifyContent: 'start',
              gap: '56px',
            },
            children: [
              container({
                style: {
                  width: '56px',
                  height: '56px',
                  marginLeft: 'auto',
                  color: colors.base.primary,
                },
                children: [iconNode],
              }),
              container({
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  alignContent: 'start',
                  gap: '24px',
                },
                children: [
                  text(eyebrow, {
                    color: colors.base.tertiary,
                    fontFamily: 'Rubik',
                    fontSize: '32px',
                    lineHeight: '32px',
                    fontWeight: 400,
                  }),
                  text(title, {
                    color: colors.base.primary,
                    fontFamily: 'Rubik',
                    fontSize: '56px',
                    lineHeight: '84px',
                    fontWeight: 500,
                    display: 'block',
                  }),
                ],
              }),
            ],
          }),
          container({
            style: {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: locale === 'en' ? 'flex-start' : 'flex-end',
              flexWrap: 'wrap',
              gap: '8px',
            },
            children: categoryNodes,
          }),
        ],
      }),
    ],
  })
}
