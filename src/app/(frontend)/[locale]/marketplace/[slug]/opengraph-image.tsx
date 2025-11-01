import { Integration } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { Renderer } from '@takumi-rs/core'
import type { PersistentImage } from '@takumi-rs/core'
import { container, image, percentage, text } from '@takumi-rs/helpers'
import { fromJsx } from '@takumi-rs/helpers/jsx'
import { NextResponse } from 'next/server'

// Image metadata
export const alt = ''
export const size = {
  width: 1200,
  height: 630,
}

const colors = {
  base: {
    primary: '#0a0a0a',
    secondary: '#404040',
    tertiary: '#737373',
  },
  bg: {
    default: '#fafafa',
    neutral: '#ffffff',
    neutralSubtle: '#e5e5e5',
  },
}

export const contentType = 'image/png'
export const runtime = 'nodejs'
export const revalidate = 0

// Image generation
export default async function Image({ params }: { params: { slug: string; locale: 'en' | 'ar' } }) {
  const { slug, locale } = params

  const decodedSlug = encodeURIComponent(slug)

  const url = getServerSideURL()

  const req = await fetch(
    `${url}/api/integrations?where[slug][equals]=${decodedSlug}&depth=2&draft=false&locale=${locale}&limit=1&pagination=false&trash=false`,
  )
  const { docs } = await req.json()

  let title = 'موقع مرن'
  const eyebrow = 'متجر التطبيقات'
  const tagline = ''
  let iconSrc = ''

  if (docs && docs.length > 0) {
    const post: Integration = docs[0]
    if (post.name) title = post.name
    if (post.tagline) title += ` - ${post.tagline}`
    if (post.icon && typeof post.icon === 'object' && post.icon.url) iconSrc = url + post.icon.url
  }

  // Prepare font and renderer
  const fontData = await loadGoogleFont('Rubik')
  // Load the font file from the public/fonts directory
  // const fontData = await readFile(join(process.cwd(), 'public/fonts/Rubik-VariableFont_wght.woff2'))

  const persistentImages: PersistentImage[] = []
  if (iconSrc.length > 0) {
    try {
      const iconResponse = await fetch(iconSrc)
      if (iconResponse.ok) {
        const iconArrayBuffer: ArrayBuffer = await iconResponse.arrayBuffer()
        persistentImages.push({
          src: iconSrc,
          data: Buffer.from(iconArrayBuffer),
        })
      }
    } catch (error) {
      console.error('Failed to load persistent icon for OG image', error)
    }
  }

  const renderer = new Renderer({
    fonts: [fontData],
    loadDefaultFonts: false,
    ...(persistentImages.length > 0 ? { persistentImages } : {}),
  })

  const iconMarkup = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 12"
      style={{
        width: '56px',
        height: '56px',
        marginLeft: 'auto',
        color: colors.base.primary,
      }}
    >
      <path
        fill="currentColor"
        d="M9.2559 9.01851C11.2269 6.92251 11.8644 4.00797 11.7683 0.724895C11.7562 0.311827 11.7714 0.0791508 11.5294 0.0338891C11.2873 -0.0113725 6.12272 -0.0112217 5.7818 0.0338891C5.55452 0.0639631 5.45599 0.322674 5.48619 0.810023C5.52357 2.56546 5.23659 3.67367 4.41082 4.46946C3.58205 5.26814 2.50781 5.54412 0.73857 5.61087C-0.0359893 5.64009 0.00559866 5.96035 0.00559866 6.36881V11.2416C0.005599 11.6478 -0.111692 12 0.727419 11.9991L0.773561 12C4.25363 11.9624 7.28108 11.1186 9.2559 9.01851Z"
      />
    </svg>
  )

  const html = (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        padding: '32px',
        backgroundColor: colors.bg.default,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'start',
          justifyContent: 'space-between',
          gap: '32px',
          // borderRadius: '32px',
          backgroundColor: '#ffffff',
          padding: '56px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'start',
            justifyContent: 'start',
            gap: '56px',
          }}
        >
          {iconMarkup}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'start',
              gap: '24px',
            }}
          >
            <div
              style={{
                color: colors.base.tertiary,
                fontFamily: 'Rubik',
                fontSize: '32px',
                lineHeight: '36px',
                fontWeight: 400,
                whiteSpace: 'pre-wrap',
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                color: colors.base.primary,
                fontFamily: 'Rubik',
                fontSize: '56px',
                lineHeight: '84px',
                fontWeight: 500,
                whiteSpace: 'pre-wrap',
                display: 'block',
              }}
            >
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const iconNode = await fromJsx(iconMarkup)

  const root = container({
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
          // borderRadius: '32px',
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
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  gap: '56px',
                  // border: '1px solid red',
                },
                children: [
                  container({
                    style: {
                      display: 'flex',
                      flexDirection: 'row',
                      alignContent: 'start',
                      gap: '56px',
                      // border: '1px solid cyan',
                    },
                    children: [
                      text(title, {
                        color: colors.base.primary,
                        fontFamily: 'Rubik',
                        fontSize: '56px',
                        lineHeight: '84px',
                        fontWeight: 500,
                        display: 'block',
                        // border: '1px solid pink',
                      }),
                      image({
                        src: iconSrc,
                        width: 64,
                        height: 64,
                        style: {
                          borderRadius: '30px',
                          width: '156px',
                          height: '156px',
                          // border: '1px solid red',
                        },
                      }),
                    ],
                  }),
                  text(eyebrow, {
                    color: colors.base.tertiary,
                    fontFamily: 'Rubik',
                    fontSize: '32px',
                    lineHeight: '32px',
                    fontWeight: 400,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  })

  const imageBuffer = await renderer.render(root, {
    width: size.width,
    height: size.height,
    format: 'png',
  })

  const body = new Uint8Array(imageBuffer)

  return new NextResponse(body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}

async function loadGoogleFont(font: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:ital,wght@0,300..900;1,300..900&display=swap`
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}
