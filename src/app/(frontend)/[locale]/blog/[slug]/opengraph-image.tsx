import { ImageResponse } from 'next/og'

import type { BlogPost } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

export const runtime = 'nodejs'
export const alt = ''
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

const colors = {
  base: {
    primary: '#0a0a0a',
    secondary: '#404040',
    tertiary: '#737373',
  },
  bg: {
    default: '#fafafa',
    neutral: '#ffffff',
  },
}

let rubikFontData: ArrayBuffer | null = null

const loadRubikFont = async () => {
  if (rubikFontData) {
    return rubikFontData
  }

  const cssUrl = 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap'
  const css = await (await fetch(cssUrl)).text()
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

const sanitize = (value?: string | null) => {
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

export default async function Image({ params }: { params: { slug: string; locale: 'en' | 'ar' } }) {
  const { slug, locale } = params
  const url = getServerSideURL()
  const fontData = await loadRubikFont()

  let title = locale === 'ar' ? 'موقع مرن' : 'Marn POS'
  const eyebrow = locale === 'ar' ? 'المدونة' : 'Blog'
  let categories: BlogPost['categories'] = []

  try {
    const search = new URLSearchParams({
      'where[slug][equals]': encodeURIComponent(slug),
      depth: '2',
      draft: 'false',
      locale,
      limit: '1',
      pagination: 'false',
      trash: 'false',
    })

    const response = await fetch(`${url}/api/blog-posts?${search.toString()}`)
    if (response.ok) {
      const { docs } = (await response.json()) as { docs: BlogPost[] }
      if (docs && docs.length > 0) {
        const post = docs[0]
        title = sanitize(post.title) ?? title
        if (post.categories && post.categories.length > 0) {
          categories = post.categories
        }
      }
    }
  } catch (error) {
    console.error('Failed to resolve blog post for OG image', error)
  }

  const finalTitle = truncate(title, 120)

  const chips = categories
    .map((entry) => (typeof entry === 'string' ? entry : entry?.title))
    .filter((value): value is string => Boolean(sanitize(value)))
    .map((value) => truncate(value!.trim(), 28))

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
                flexDirection: locale === 'ar' ? 'row-reverse' : 'row',
                justifyContent: 'space-between',
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
              <span
                style={{
                  fontSize: 32,
                  lineHeight: '36px',
                  fontWeight: 500,
                  color: colors.base.secondary,
                }}
              >
                {eyebrow}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                textAlign: locale === 'ar' ? 'right' : 'left',
              }}
            >
              <span
                style={{
                  fontSize: 68,
                  lineHeight: '84px',
                  fontWeight: 600,
                  color: colors.base.primary,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {finalTitle}
              </span>
            </div>
          </div>
          {chips.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: locale === 'ar' ? 'row-reverse' : 'row',
                justifyContent: locale === 'ar' ? 'flex-end' : 'flex-start',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              {chips.map((chip, index) => (
                <span
                  key={`${chip}-${index}`}
                  style={{
                    borderRadius: '999px',
                    padding: '12px 24px',
                    fontSize: 28,
                    fontWeight: 500,
                    color: colors.base.secondary,
                    backgroundColor: colors.bg.default,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
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
          weight: 500,
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
