export function getHref(link) {
  const { type, reference, url } = link ?? {}

  // Handle missing or null link
  if (!link) return '/'

  // Handle custom type
  if (type === 'custom') return url ?? '/'

  // Handle reference type, including edge case: { type: 'reference', newTab: null, url: null, label: null }
  if (type === 'reference') {
    if (!reference || !reference.value) return '/'

    const { relationTo, value } = reference

    // Defensive: value may be string/number or object
    const slug = typeof value === 'object' && value?.slug ? value.slug : value

    switch (relationTo) {
      case 'pages':
        return `/${slug || ''}`
      case 'blog-posts':
        return `/blog/${slug || ''}`
      case 'solutions':
        return `/solutions/${slug || ''}`
      case 'integrations':
        return `/marketplace/${slug || ''}`
      default:
        return '/'
    }
  }

  // Fallback
  return '/'
}
