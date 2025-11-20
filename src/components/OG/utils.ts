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

export const iconNode = {
  type: 'image',
  src: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" style="width:56px;height:56px;margin-left:auto;color:#111111"><path fill="currentColor" d="M9.2559 9.01851C11.2269 6.92251 11.8644 4.00797 11.7683 0.724895C11.7562 0.311827 11.7714 0.0791508 11.5294 0.0338891C11.2873 -0.0113725 6.12272 -0.0112217 5.7818 0.0338891C5.55452 0.0639631 5.45599 0.322674 5.48619 0.810023C5.52357 2.56546 5.23659 3.67367 4.41082 4.46946C3.58205 5.26814 2.50781 5.54412 0.73857 5.61087C-0.0359893 5.64009 0.00559866 5.96035 0.00559866 6.36881V11.2416C0.005599 11.6478 -0.111692 12 0.727419 11.9991L0.773561 12C4.25363 11.9624 7.28108 11.1186 9.2559 9.01851Z"></path></svg>',
  style: {
    display: 'inline',
    width: '56px',
    height: '56px',
    marginLeft: 'auto',
    color: '#111111',
  },
}
