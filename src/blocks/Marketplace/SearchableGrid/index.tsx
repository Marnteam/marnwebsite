import React from 'react'
import { IntegrationsGrid, type IntegrationWithId } from './integrationsGrid'
import { SearchFilters } from './SearchFilters'
import type { Category } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'

interface SearchableIntegrationsGridProps {
  locale: 'ar' | 'en'
  initialFilters: {
    ecosystem: Category
    category: Category
    sort: string
  }
}

export const SearchableIntegrationsGrid: React.FC<SearchableIntegrationsGridProps> = async ({
  locale,
  initialFilters,
}) => {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: draft } = await draftMode()
  const [integrations, categories, ecosystems] = await Promise.all([
    getFilteredIntegrations({
      search: '',
      category: initialFilters.category?.slug || '',
      ecosystem: initialFilters.ecosystem?.slug || '',
      sort: initialFilters.sort || 'newest',
      locale,
      draft,
    }),
    payload.find({
      collection: 'categories',
      limit: 100,
      locale,
      draft,
      pagination: false,
      where: {
        'parent.slug': {
          equals: 'marketplace',
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    }),
    payload.find({
      collection: 'categories',
      limit: 100,
      locale,
      draft,
      pagination: false,
      where: {
        'parent.slug': {
          equals: 'ecosystems',
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
      },
    }),
  ])

  const filters = {
    search: '',
    category: initialFilters.category?.slug || '',
    ecosystem: initialFilters.ecosystem?.slug || '',
    sort: initialFilters.sort || 'newest',
  }

  return (
    <div className="py-xl space-y-md container">
      <SearchFilters
        categories={categories.docs}
        ecosystems={ecosystems.docs}
        locale={locale}
        initialFilters={filters}
      />
      <IntegrationsGrid integrations={integrations.docs} locale={locale} initialFilters={filters} />
    </div>
  )
}

async function getFilteredIntegrations({
  search,
  category,
  ecosystem,
  sort,
  locale,
  draft,
}: {
  search?: string
  category?: string
  ecosystem?: string
  sort?: string
  locale: 'ar' | 'en'
  draft?: boolean
}) {
  const payload = await getPayload({ config: configPromise })

  // Build where clause for filtering
  const where: any = {}

  if (search) {
    where.or = [
      {
        name: {
          contains: search,
        },
      },
      {
        tagline: {
          contains: search,
        },
      },
      {
        title: {
          contains: search,
        },
      },
    ]
  }
  if (category) {
    where['categories.slug'] = {
      equals: category,
    }
  }
  if (ecosystem) {
    // If ecosystem is a relationship field
    where['ecosystem.slug'] = {
      equals: ecosystem,
    }
    // OR if ecosystem is a select field with multiple values
    // where.ecosystem = {
    //   in: [ecosystem],
    // }
  }

  // Build sort clause
  let sortClause: any = 'name'
  switch (sort) {
    case 'name':
      sortClause = 'name'
      break
    case 'newest':
      sortClause = '-createdAt'
      break
    case 'oldest':
      sortClause = 'createdAt'
      break
    default:
      sortClause = 'name'
  }

  return payload.find({
    collection: 'integrations',
    depth: 1,
    locale,
    draft,
    limit: 50, // ✅ Add pagination for better performance
    pagination: true, // ✅ Enable pagination
    where: Object.keys(where).length > 0 ? where : undefined,
    sort: sortClause,
    select: {
      id: true,
      icon: true,
      tagline: true,
      link: true,
      name: true,
      title: true,
      summary: true,
      categories: true,
      ecosystem: true,
      slug: true,
    },
  })
}
