import type { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'
import { getPayload } from 'payload'

import type { Page } from '@/payload-types'
import configPromise from '@payload-config'

export const runtime = 'nodejs'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const VALID_LOCALES = ['en', 'ar'] as const

type SupportedLocale = (typeof VALID_LOCALES)[number]

type Copy = {
  title: string
  description: string
  eyebrow: string
  brand: string
}

const FALLBACK_COPY: Record<SupportedLocale, Copy> = {
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

let rubikFontData: ArrayBuffer | null = null

async function loadRubikFont() {
  if (rubikFontData) {
    return rubikFontData
  }

  const url = 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap'
  const css = await (await fetch(url)).text()
  const resource = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)

  if (!resource) {
    throw new Error('failed to locate Rubik font source')
  }

  const response = await fetch(resource[1])
  if (!response.ok) {
    throw new Error('failed to download Rubik font')
  }

  rubikFontData = await response.arrayBuffer()
  return rubikFontData
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

  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const alignStart = locale === 'ar' ? 'flex-end' : 'flex-start'
  const alignEnd = locale === 'ar' ? 'flex-start' : 'flex-end'
  const textAlign = locale === 'ar' ? 'right' : 'left'

  const fontData = await loadRubikFont()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '32px',
          backgroundColor: colors.bg.default,
          fontFamily: 'Rubik',
          direction,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '48px',
            borderRadius: '32px',
            backgroundColor: colors.bg.neutral,
            padding: '56px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: alignStart,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
                width={56}
                height={56}
                style={{ color: colors.base.primary }}
              >
                <path
                  fill="currentColor"
                  d="M9.2559 9.01851C11.2269 6.92251 11.8644 4.00797 11.7683 0.724895C11.7562 0.311827 11.7714 0.0791508 11.5294 0.0338891C11.2873 -0.0113725 6.12272 -0.0112217 5.7818 0.0338891C5.55452 0.0639631 5.45599 0.322674 5.48619 0.810023C5.52357 2.56546 5.23659 3.67367 4.41082 4.46946C3.58205 5.26814 2.50781 5.54412 0.73857 5.61087C-0.0359893 5.64009 0.00559866 5.96035 0.00559866 6.36881V11.2416C0.005599 11.6478 -0.111692 12 0.727419 11.9991L0.773561 12C4.25363 11.9624 7.28108 11.1186 9.2559 9.01851Z"
                />
              </svg>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                textAlign,
              }}
            >
              <span
                style={{
                  fontSize: 32,
                  lineHeight: '36px',
                  fontWeight: 400,
                  color: colors.base.tertiary,
                }}
              >
                {eyebrow}
              </span>
              <span
                style={{
                  fontSize: 68,
                  lineHeight: '80px',
                  fontWeight: 600,
                  color: colors.base.primary,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {title}
              </span>
              <span
                style={{
                  fontSize: 32,
                  lineHeight: '48px',
                  fontWeight: 400,
                  color: colors.base.secondary,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {description}
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: alignEnd,
            }}
          >
            <span
              style={{
                fontSize: 32,
                lineHeight: '36px',
                fontWeight: 500,
                color: colors.accents.brand,
              }}
            >
              {fallback.brand}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Rubik',
          data: fontData,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Rubik',
          data: fontData,
          weight: 600,
          style: 'normal',
        },
      ],
    },
  )
}
