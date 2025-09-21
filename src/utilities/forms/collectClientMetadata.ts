import { type SubmissionMetadata } from '@/blocks/Form/types'

const ATTRIBUTION_STORAGE_KEY = 'marn:form:attribution'
const STORAGE_ENABLED = process.env.NEXT_PUBLIC_FORM_METADATA_STORAGE !== 'false'

const UTM_PARAM_MAP: Record<string, string> = {
  utmSource: 'utm_source',
  utmMedium: 'utm_medium',
  utmCampaign: 'utm_campaign',
  utmTerm: 'utm_term',
  utmContent: 'utm_content',
}

const CLICK_ID_PARAM_MAP: Record<string, string> = {
  gclid: 'gclid',
  fbclid: 'fbclid',
  ttclid: 'ttclid',
  msclkid: 'msclkid',
  gbraid: 'gbraid',
  wbraid: 'wbraid',
}

const PERSISTED_KEYS = [...Object.keys(UTM_PARAM_MAP), ...Object.keys(CLICK_ID_PARAM_MAP)]

const isBrowser = () => typeof window !== 'undefined'

const normaliseValue = (value?: string | null): string | null | undefined => {
  if (!value) return undefined
  const trimmed = value.trim()
  return trimmed.length ? trimmed : undefined
}

const readStoredMetadata = (): SubmissionMetadata => {
  if (!isBrowser() || !STORAGE_ENABLED) return {}

  try {
    const stored = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    if (!stored) return {}
    const parsed = JSON.parse(stored) as Record<string, unknown>
    if (!parsed || typeof parsed !== 'object') return {}

    return Object.entries(parsed).reduce<SubmissionMetadata>((acc, [key, value]) => {
      if (typeof value === 'string' && value.length) {
        acc[key] = value
      }
      return acc
    }, {})
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to read stored form metadata', error)
    }
    return {}
  }
}

const persistMetadata = (metadata: SubmissionMetadata) => {
  if (!isBrowser() || !STORAGE_ENABLED) return

  try {
    const payload: Record<string, string> = {}
    for (const key of PERSISTED_KEYS) {
      const value = metadata[key]
      if (typeof value === 'string' && value.length) {
        payload[key] = value
      }
    }

    if (Object.keys(payload).length) {
      window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(payload))
    } else {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY)
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Failed to persist form metadata', error)
    }
  }
}

const buildAttributionFromSearch = (params: URLSearchParams): SubmissionMetadata => {
  const result: SubmissionMetadata = {}

  for (const [key, param] of Object.entries(UTM_PARAM_MAP)) {
    const value = normaliseValue(params.get(param))
    if (value) {
      result[key] = value
    }
  }

  for (const [key, param] of Object.entries(CLICK_ID_PARAM_MAP)) {
    const value = normaliseValue(params.get(param))
    if (value) {
      result[key] = value
    }
  }

  return result
}

const extractReferrerHost = (referrer: string): string | undefined => {
  try {
    const url = new URL(referrer)
    return url.host || url.hostname || undefined
  } catch {
    return undefined
  }
}

const collectBrowserMetadata = (): SubmissionMetadata => {
  if (!isBrowser()) return {}

  const metadata: SubmissionMetadata = {}

  if (typeof document !== 'undefined') {
    const rawReferrer = normaliseValue(document.referrer)
    if (rawReferrer) {
      metadata.referringUrl = rawReferrer
      const host = extractReferrerHost(rawReferrer)
      metadata.referrer = host ?? rawReferrer
    }
  }

  if (typeof navigator !== 'undefined') {
    const language = normaliseValue(navigator.language)
    if (language) {
      metadata.deviceLocale = language
    }

    const userAgent = normaliseValue(navigator.userAgent)
    if (userAgent) {
      metadata.userAgent = userAgent
    }
  }

  if (typeof window !== 'undefined') {
    const pagePath = normaliseValue(window.location?.pathname || '')
    if (pagePath) {
      metadata.pagePath = pagePath
    }
  }

  return metadata
}

const mergeMetadata = (target: SubmissionMetadata, source: SubmissionMetadata) => {
  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined && value !== null) {
      target[key] = value
    }
  }
}

export type CollectClientMetadataOptions = {
  persist?: boolean
}

export const collectClientMetadata = (
  options: CollectClientMetadataOptions = {},
): SubmissionMetadata => {
  if (!isBrowser()) return {}

  const { persist = true } = options
  const params = new URLSearchParams(window.location?.search || '')

  const stored = readStoredMetadata()
  const collected: SubmissionMetadata = {}

  mergeMetadata(collected, stored)
  mergeMetadata(collected, buildAttributionFromSearch(params))
  mergeMetadata(collected, collectBrowserMetadata())

  if (persist) {
    persistMetadata(collected)
  }

  return collected
}
