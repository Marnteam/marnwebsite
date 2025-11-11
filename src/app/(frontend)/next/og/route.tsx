import { NextResponse, type NextRequest } from 'next/server'
import { getPayload } from 'payload'

import type { Page } from '@/payload-types'
import configPromise from '@payload-config'

import { container, text } from '@takumi-rs/helpers'
import { fromJsx } from '@takumi-rs/helpers/jsx'
import init, { initSync, Renderer } from '@takumi-rs/wasm'
import module from '@takumi-rs/wasm/takumi_wasm_bg.wasm'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

const wasmPath = join(process.cwd(), 'public', 'takumi_wasm_bg.wasm')
const wasmReady = readFile(wasmPath).then((bytes) => init({ module_or_path: bytes }))

// await init({ module_or_path: module })
// initSync({ module })
export const maxDuration = 300
export const runtime = 'nodejs'

const size = {
  width: 1200,
  height: 630,
}
const contentType = 'image/png'

const VALID_LOCALES = ['en', 'ar'] as const
type SupportedLocale = (typeof VALID_LOCALES)[number]

const FALLBACK_COPY: Record<
  SupportedLocale,
  { title: string; description: string; eyebrow: string; brand: string }
> = {
  en: {
    title: 'Marn POS',
    description:
      'All your tools in one flexible platform. Explore sales, operations, and management solutions built for fast-growing businesses.',
    eyebrow: 'Page on Marn POS',
    brand: 'Marn POS',
  },
  ar: {
    title: 'منظومة مرن',
    description:
      'كل أدواتك في منظومة مرنة. استكشف حلول البيع، التشغيل، والإدارة المصممة لتلبية احتياجاتك.',
    eyebrow: 'صفحة من منظومة مرن',
    brand: 'منظومة مرن',
  },
}

const colors = {
  base: {
    primary: '#111111',
    secondary: '#404040',
    tertiary: '#737373',
  },
  bg: {
    default: '#f5f5f5',
    neutral: '#ffffff',
  },
  accents: {
    brand: '#0f172a',
  },
}

// let fontPromise: Promise<Buffer> | undefined
// const loadRubikFont = () => {
//   if (!fontPromise) {
//     fontPromise = readFile(join(process.cwd(), 'public/fonts/Rubik-VariableFont_wght.woff2'))
//   }
//   return fontPromise
// }

async function loadGoogleFont(font: string) {
  // const url = `https://fonts.googleapis.com/css2?family=${font}:ital,wght@0,300..900;1,300..900&display=swap`
  // const css = await fetch(url).then((res) => res.text())
  // const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype|woff2)'\)/)

  // if (resource) {
  //   const response = await fetch(resource[1])
  //   if (response.status == 200) {
  //     return await response.arrayBuffer()
  //   }
  // }

  const fontPath = join(process.cwd(), 'public', 'fonts', 'Rubik-VariableFont_wght.woff2')
  const fontData = readFile(fontPath)
  return fontData

  throw new Error('failed to load font data')
}

const sanitizeString = (value?: string | null) => {
  if (!value) {
    return undefined
  }

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

const truncate = (value: string, maxLength: number) => {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, Math.max(0, maxLength - 1))}…`
}

const normalizeSlug = (value?: string | null) => {
  if (!value) {
    return 'home'
  }
  const decoded = decodeURIComponent(value)
  const stripped = decoded.replace(/^\/+|\/+$/g, '')
  return stripped.length > 0 ? stripped : 'home'
}

const buildEyebrow = (slug: string, locale: SupportedLocale) => {
  if (slug === 'home') {
    return FALLBACK_COPY[locale].eyebrow
  }
  return slug
    .split('/')
    .filter(Boolean)
    .map((segment) =>
      segment
        .split(/[-_]/g)
        .filter(Boolean)
        .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
        .join(' '),
    )
    .join(' • ')
}

export async function GET(request: NextRequest) {
  await wasmReady
  const searchParams = request.nextUrl.searchParams
  const requestedLocale = (searchParams.get('locale') || '').toLowerCase() as SupportedLocale
  const locale: SupportedLocale = VALID_LOCALES.includes(requestedLocale) ? requestedLocale : 'ar'
  const slug = normalizeSlug(searchParams.get('slug'))

  const fallback = FALLBACK_COPY[locale]

  let page: Page | null = null

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      locale,
      draft: false,
      limit: 1,
      pagination: false,
      depth: 2,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    page = (result?.docs?.[0] as Page) ?? null
  } catch (error) {
    console.error('Failed to resolve page for OG image', error)
  }

  const metaTitle = sanitizeString(page?.meta?.title)
  const pageTitle = sanitizeString(page?.title)
  const metaDescription = sanitizeString(page?.meta?.description)

  const title = truncate(metaTitle || pageTitle || fallback.title, 100)
  const description = truncate(metaDescription || fallback.description, 180)
  const eyebrow = truncate(buildEyebrow(slug, locale), 48)
  // await initSync({ module_or_path: `http://localhost:3000/takumi_wasm_bg.wasm` })

  // Prepare font and renderer
  const fontData = await loadGoogleFont('Rubik')
  // Load the font file from the public/fonts directory
  // const fontData = await loadRubikFont()

  const renderer = new Renderer()

  renderer.loadFont({ data: fontData })

  const iconMarkup = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 12 12"
      style={{
        width: '56px',
        height: '56px',
        marginLeft: locale === 'ar' ? 'auto' : 0,
        color: colors.base.primary,
      }}
    >
      <path
        fill="currentColor"
        d="M9.2559 9.01851C11.2269 6.92251 11.8644 4.00797 11.7683 0.724895C11.7562 0.311827 11.7714 0.0791508 11.5294 0.0338891C11.2873 -0.0113725 6.12272 -0.0112217 5.7818 0.0338891C5.55452 0.0639631 5.45599 0.322674 5.48619 0.810023C5.52357 2.56546 5.23659 3.67367 4.41082 4.46946C3.58205 5.26814 2.50781 5.54412 0.73857 5.61087C-0.0359893 5.64009 0.00559866 5.96035 0.00559866 6.36881V11.2416C0.005599 11.6478 -0.111692 12 0.727419 11.9991L0.773561 12C4.25363 11.9624 7.28108 11.1186 9.2559 9.01851Z"
      />
    </svg>
  )

  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const flexStart = locale === 'ar' ? 'flex-end' : 'flex-start'
  const flexEnd = locale === 'ar' ? 'flex-start' : 'flex-end'
  const textAlign = locale === 'ar' ? 'right' : 'left'

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
                    textAlign,
                  }),
                  text(title, {
                    color: colors.base.primary,
                    fontFamily: 'Rubik',
                    fontSize: '56px',
                    lineHeight: '84px',
                    fontWeight: 500,
                    display: 'block',
                    textAlign,
                  }),
                ],
              }),
            ],
          }),
          // container({
          //   style: {
          //     display: 'flex',
          //     flexDirection: 'row',
          //     justifyContent: locale === 'en' ? 'flex-start' : 'flex-end',
          //     flexWrap: 'wrap',
          //     gap: '8px',
          //   },
          //   children: categoryNodes,
          // }),
        ],
      }),
    ],
  })

  const imageBuffer = renderer.render(root, {
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
