export const FALLBACK_COPY: Record<
  string,
  { title: string; description: string; eyebrow: string; brand: string }
> = {
  en: {
    title: 'Marn POS',
    description:
      'All your tools in one flexible platform. Explore sales, operations, and management solutions built for fast-growing businesses.',
    eyebrow: 'Marn POS Website',
    brand: 'Marn POS',
  },
  ar: {
    title: 'منظومة مرن',
    description:
      'كل أدواتك في منظومة مرنة. استكشف حلول البيع، التشغيل، والإدارة المصممة لتلبية احتياجاتك.',
    eyebrow: 'موقع نظام مرن',
    brand: 'منظومة مرن',
  },
}

export const colors = {
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

export const sanitizeString = (value?: string | null) => {
  if (!value) {
    return undefined
  }
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}
export const truncate = (value: string, maxLength: number) => {
  if (value.length <= maxLength) {
    return value
  }

  return `${value.slice(0, Math.max(0, maxLength - 1))}…`
}
export const normalizeSlug = (value?: string | null) => {
  if (!value) {
    return 'home'
  }
  const decoded = decodeURIComponent(value)
  const stripped = decoded.replace(/^\/+|\/+$/g, '')
  return stripped.length > 0 ? stripped : 'home'
}
