import { Buffer } from 'node:buffer'

import { ImageResponse } from 'next/og'

import type { Integration } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

export const runtime = 'nodejs'
export const alt = ''
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'
export const revalidate = 0

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

const toDataUrl = (buffer: ArrayBuffer, contentType: string) => {
  const base64 = Buffer.from(buffer).toString('base64')
  return `data:${contentType};base64,${base64}`
}

export default async function Image({ params }: { params: { slug: string; locale: 'en' | 'ar' } }) {
  const { slug, locale } = params
  const url = getServerSideURL()
  const fontData = await loadRubikFont()

  let title = locale === 'ar' ? 'منصة مرن' : 'Marn Marketplace'
  let tagline: string | undefined
  let iconSrc: string | undefined

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

    const response = await fetch(`${url}/api/integrations?${search.toString()}`)
    if (response.ok) {
      const { docs } = (await response.json()) as { docs: Integration[] }
      if (docs && docs.length > 0) {
        const integration = docs[0]
        title = sanitize(integration.name) ?? title
        tagline = sanitize(integration.tagline)
        if (integration.icon && typeof integration.icon === 'object' && integration.icon.url) {
          iconSrc = `${url}${integration.icon.url}`
        }
      }
    }
  } catch (error) {
    console.error('Failed to resolve integration for OG image', error)
  }

  const headline = truncate(tagline ? `${title} – ${tagline}` : title, 120)

  let iconDataUrl: string | undefined
  if (iconSrc) {
    try {
      const response = await fetch(iconSrc)
      if (response.ok) {
        const contentType = response.headers.get('content-type') || 'image/png'
        const arrayBuffer = await response.arrayBuffer()
        iconDataUrl = toDataUrl(arrayBuffer, contentType)
      }
    } catch (error) {
      console.error('Failed to load integration icon for OG image', error)
    }
  }

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
              gap: '36px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: locale === 'ar' ? 'flex-end' : 'flex-start',
                gap: '24px',
                flexDirection: locale === 'ar' ? 'row-reverse' : 'row',
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
              {iconDataUrl && (
                <span
                  style={{
                    width: 72,
                    height: 72,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '18px',
                    backgroundColor: colors.bg.default,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    alt="Integration icon"
                    src={iconDataUrl}
                    width={60}
                    height={60}
                    style={{ objectFit: 'contain' }}
                  />
                </span>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                textAlign: locale === 'ar' ? 'right' : 'left',
              }}
            >
              <span
                style={{
                  fontSize: 64,
                  lineHeight: '80px',
                  fontWeight: 600,
                  color: colors.base.primary,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {headline}
              </span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: locale === 'ar' ? 'flex-start' : 'flex-end',
            }}
          >
            <span
              style={{
                fontSize: 30,
                lineHeight: '34px',
                fontWeight: 500,
                color: colors.base.tertiary,
              }}
            >
              {locale === 'ar' ? 'متجر منظومة مرن' : 'Marn Marketplace'}
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
