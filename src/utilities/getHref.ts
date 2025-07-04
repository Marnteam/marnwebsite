export function getHref(link) {
  const { type, reference, url } = link
  const { relationTo, value } = reference || {}
  if (type !== 'reference') return url
  switch (relationTo) {
    case 'pages':
      return value.slug
    case 'blog-posts':
      return `/blog/${value.slug}`
    case 'solutions':
      return `/solutions/${value.slug}`
    case 'integrations':
      return `/marketplace/${value.slug}`
    default:
      return url
  }
}
