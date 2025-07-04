type BadgeColors = 'blue' | 'red' | 'green' | 'yellow' | 'gray' | 'violet' | 'inverted'

// Map ecosystem slugs to badge colors
const ecosystemColorMap: Record<string, BadgeColors> = {
  sell: 'blue',
  operate: 'yellow',
  manage: 'violet',
}

/**
 * Get the appropriate badge color for an ecosystem based on its slug
 * @param ecosystemSlug - The ecosystem slug (e.g., 'sell', 'operate', 'manage')
 * @param fallback - Fallback color if ecosystem not found
 * @returns BadgeColors value
 */
export function getEcosystemBadgeColor(
  ecosystemSlug: string | undefined,
  fallback: BadgeColors = 'gray',
): BadgeColors {
  if (!ecosystemSlug) return fallback
  return ecosystemColorMap[ecosystemSlug] || fallback
}

/**
 * Get badge color for an ecosystem object with slug property
 * @param ecosystem - Ecosystem object with slug property
 * @param fallback - Fallback color if ecosystem not found
 * @returns BadgeColors value
 */
export function getEcosystemBadgeColorFromObject(
  ecosystem: { slug?: string | null } | undefined,
  fallback: BadgeColors = 'gray',
): BadgeColors {
  return getEcosystemBadgeColor(ecosystem?.slug || undefined, fallback)
}
