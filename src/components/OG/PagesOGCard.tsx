import React from 'react'
import { Config, Page } from '@/payload-types.js'
import { PayloadSDK } from '@payloadcms/sdk'
import { colors, FALLBACK_COPY } from './utils'

export default async function PagesOGCard({
  sdk,
  slug,
  locale,
}: {
  sdk: PayloadSDK<Config>
  slug: string
  locale: 'en' | 'ar'
}) {
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
  const buildEyebrow = (slug: string, locale: string) => {
    return FALLBACK_COPY[locale].eyebrow
  }

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

  return (
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
          alignContent: flexEnd,
          justifyContent: 'space-between',
          gap: '32px',
          borderRadius: '32px',
          backgroundColor: colors.bg.neutral,
          padding: '56px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignContent: flexEnd,
            justifyContent: 'start',
            gap: '56px',
          }}
        >
          {iconMarkup}
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignContent: flexEnd,
              justifyContent: 'space-between',
              gap: '32px',
            }}
          >
            <div
              style={{
                color: colors.base.tertiary,
                fontFamily: 'Rubik',
                fontSize: '48px',
                fontWeight: 400,
                textAlign,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </div>
            <div
              style={{
                color: colors.base.primary,
                fontFamily: 'Rubik',
                fontSize: '84px',
                fontWeight: 500,
                textAlign,
              }}
            >
              {title}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
