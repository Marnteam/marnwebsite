import { Config, Page } from '@/payload-types.js'
import type { PayloadSDK } from '@payloadcms/sdk'
import { iconNode, colors, FALLBACK_COPY, normalizeSlug, sanitizeString, truncate } from './utils'
import { container, text } from '@takumi-rs/helpers'

export default async function PagesOGCard({
  sdk,
  slug,
  locale,
}: {
  sdk: PayloadSDK<Config>
  slug: string
  locale: 'en' | 'ar'
}) {
  const buildEyebrow = (slug: string, locale: string) => {
    return FALLBACK_COPY[locale].eyebrow
  }

  const flexEnd = locale === 'ar' ? 'flex-start' : 'flex-end'
  const textAlign = locale === 'ar' ? 'right' : 'left'

  const fallback = FALLBACK_COPY[locale]

  let page: Partial<Page> | null = null

  try {
    const result = await sdk.find({
      collection: 'pages',
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
      },
    })
    page = result?.docs?.[0] ?? null
  } catch (error) {
    console.log('Failed to resolve page for OG image', error)
  }

  const metaTitle = sanitizeString(page?.meta?.title)
  const pageTitle = sanitizeString(page?.title)
  const title = truncate(metaTitle || pageTitle || fallback.title, 100)
  const eyebrow = truncate(buildEyebrow(slug, locale), 48)

  const node = container({
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
          alignContent: flexEnd,
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
              alignContent: flexEnd,
              justifyContent: 'start',
              gap: '56px',
            },
            children: [
              iconNode,
              container({
                style: {
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignContent: flexEnd,
                  justifyContent: 'space-between',
                  gap: '32px',
                },
                children: [
                  text({
                    text: eyebrow,
                    style: {
                      color: colors.base.tertiary,
                      fontFamily: 'Rubik',
                      fontSize: '48px',
                      fontWeight: 400,
                      textAlign,
                      textTransform: 'uppercase',
                    },
                  }),
                  text({
                    text: title,
                    style: {
                      color: colors.base.primary,
                      fontFamily: 'Rubik',
                      fontSize: '84px',
                      fontWeight: 500,
                      textAlign,
                    },
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  })

  return node
}

// const html = (
//   <div
//     style={{
//       width: '100%',
//       height: '100%',
//       display: 'flex',
//       padding: '32px',
//       backgroundColor: colors.bg.default,
//     }}
//   >
//     <div
//       style={{
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignContent: flexEnd,
//         justifyContent: 'space-between',
//         gap: '32px',
//         borderRadius: '32px',
//         backgroundColor: colors.bg.neutral,
//         padding: '56px',
//       }}
//     >
//       <div
//         style={{
//           width: '100%',
//           height: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           alignContent: flexEnd,
//           justifyContent: 'start',
//           gap: '56px',
//         }}
//       >
//         {iconMarkup}
//         <div
//           style={{
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//             flexDirection: 'column',
//             alignContent: flexEnd,
//             justifyContent: 'space-between',
//             gap: '32px',
//           }}
//         >
//           <div
//             style={{
//               color: colors.base.tertiary,
//               fontFamily: 'Rubik',
//               fontSize: '48px',
//               fontWeight: 400,
//               textAlign,
//               textTransform: 'uppercase',
//             }}
//           >
//             {eyebrow}
//           </div>
//           <div
//             style={{
//               color: colors.base.primary,
//               fontFamily: 'Rubik',
//               fontSize: '84px',
//               fontWeight: 500,
//               textAlign,
//             }}
//           >
//             {title}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>,
// )
