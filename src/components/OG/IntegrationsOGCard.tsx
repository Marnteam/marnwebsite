import { Config, Integration, Media } from '@/payload-types.js'
import type { PayloadSDK } from '@payloadcms/sdk'
import { iconNode, colors, FALLBACK_COPY, normalizeSlug, sanitizeString, truncate } from './utils'
import { container, image, text } from '@takumi-rs/helpers'

export default async function IntegrationsOGCard({
  sdk,
  slug,
  locale,
}: {
  sdk: PayloadSDK<Config>
  slug: string
  locale: 'en' | 'ar'
}) {
  const buildEyebrow = (slug: string, locale: string) => {
    return locale === 'ar' ? 'متجر تطبيقات مرن' : 'Marn App Marketplace'
  }

  const flexStart = locale === 'ar' ? 'flex-end' : 'flex-start'
  const flexEnd = locale === 'ar' ? 'flex-start' : 'flex-end'
  const textAlign = locale === 'ar' ? 'right' : 'left'
  const flexDirection = locale === 'ar' ? 'row-reverse' : 'row'

  const fallback = FALLBACK_COPY[locale]

  let integration: Partial<Integration> | null = null

  try {
    const result = await sdk.find({
      collection: 'integrations',
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
        icon: true,
      },
    })
    integration = result?.docs?.[0] ?? null
  } catch (error) {
    console.log('Failed to resolve page for OG image', error)
  }

  const metaTitle = sanitizeString(integration?.meta?.title)
  const pageTitle = sanitizeString(integration?.title)
  const title = truncate(metaTitle || pageTitle || fallback.title, 100)
    .replace(' | متجر تطبيقات مرن', '')
    .replace(' | Marn Marketplace', '')
  const eyebrow = truncate(buildEyebrow(slug, locale), 48)
  const iconSrc = (integration?.icon as Media).url
  const iconDataUri = (await getDataURI(iconSrc || '')) ?? ''
  console.log({ iconSrc })
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
              iconNode,
              container({
                style: {
                  display: 'flex',
                  flexDirection,
                  alignContent: flexEnd,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '56px',
                  width: '100%',
                },
                children: [
                  container({
                    style: { display: 'flex', flexDirection: 'column', gap: '48px' },
                    children: [
                      text({
                        text: eyebrow,
                        style: {
                          color: colors.base.tertiary,
                          fontFamily: 'Rubik',
                          fontSize: '32px',
                          lineHeight: '32px',
                          fontWeight: 400,
                          textTransform: 'uppercase',
                        },
                      }),
                      text({
                        text: title,
                        style: {
                          color: colors.base.primary,
                          fontFamily: 'Rubik',
                          fontSize: '96px',
                          lineHeight: '84px',
                          fontWeight: 500,
                        },
                      }),
                    ],
                  }),
                  image({
                    src: iconDataUri,
                    style: { borderRadius: '30px', width: '312px', height: '312px' },
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

async function getDataURI(src: string) {
  if (!src) return null
  const res = await fetch(src)
  if (!res.ok) {
    return null
  }
  const contentType = res.headers.get('content-type') || 'image/png'
  const arrayBuffer = await res.arrayBuffer()

  let binary = ''
  const bytes = new Uint8Array(arrayBuffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  const base64 = btoa(binary)
  const dataURI = `data:${contentType};base64,${base64}`
  return dataURI
}

// const html =(
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
//         alignContent: 'start',
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
//           alignContent: 'start',
//           justifyContent: 'start',
//           gap: '56px',
//         }}
//       >
//         {iconMarkup}

//         <div
//           style={{
//             display: 'flex',
//             flexDirection,
//             alignContent: flexEnd,
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             gap: '56px',
//             width: '100%',
//           }}
//         >
//           <div
//             style={{
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '48px',
//             }}
//           >
//             <div
//               style={{
//                 color: colors.base.tertiary,
//                 fontFamily: 'Rubik',
//                 fontSize: '32px',
//                 lineHeight: '32px',
//                 fontWeight: 400,
//                 textTransform: 'uppercase',
//               }}
//             >
//               {eyebrow}
//             </div>
//             <div
//               style={{
//                 color: colors.base.primary,
//                 fontFamily: 'Rubik',
//                 fontSize: '96px',
//                 lineHeight: '84px',
//                 fontWeight: 500,
//               }}
//             >
//               {title}
//             </div>
//           </div>
//           <img
//             src={iconSrc as string}
//             style={{ borderRadius: '30px', width: '312px', height: '312px' }}
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// )
