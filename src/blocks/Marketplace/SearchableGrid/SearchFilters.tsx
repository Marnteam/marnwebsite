'use client'

import React, { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'
import type { Category } from '@/payload-types'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

interface SearchFiltersProps {
  categories: Pick<Category, 'id' | 'title' | 'slug'>[]
  ecosystems: Pick<Category, 'id' | 'title' | 'slug'>[]
  locale: 'ar' | 'en'
  initialFilters?: {
    search: string
    category: string
    ecosystem: string
    sort: string
  }
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  categories,
  ecosystems,
  locale,
  initialFilters,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  initialFilters = {
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || initialFilters?.category || '',
    ecosystem: searchParams.get('ecosystem') || initialFilters?.ecosystem || '',
    sort: searchParams.get('sort') || initialFilters?.sort || 'newest',
  }

  const updateSearchParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== '') {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })

      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const debouncedSearch = useDebouncedCallback((term: string) => {
    updateSearchParams({ q: term })
  }, 300)

  const handleCategoryChange = useCallback(
    (value: string) => {
      updateSearchParams({ category: value === 'all' ? undefined : value })
    },
    [updateSearchParams],
  )

  const handleEcosystemChange = useCallback(
    (value: string) => {
      updateSearchParams({ ecosystem: value === 'all' ? undefined : value })
    },
    [updateSearchParams],
  )

  const handleSortChange = useCallback(
    (value: string) => {
      updateSearchParams({ sort: value })
    },
    [updateSearchParams],
  )

  const labels = {
    ar: {
      search: 'البحث في التكاملات...',
      category: 'الفئة',
      ecosystem: 'الأنظمة البيئية',
      allCategories: 'الكل',
      allEcosystems: 'الكل',
      sortBy: 'ترتيب حسب',
      name: 'الاسم',
      newest: 'الأحدث',
      oldest: 'الأقدم',
      filters: 'المرشحات',
    },
    en: {
      search: 'Search integrations...',
      category: 'Category',
      ecosystem: 'Ecosystem',
      allCategories: 'All Categories',
      allEcosystems: 'All Ecosystems',
      sortBy: 'Sort by',
      name: 'Name',
      newest: 'Newest',
      oldest: 'Oldest',
      filters: 'Filters',
    },
  }

  const t = labels[locale]

  return (
    <div className="grid grid-cols-1 items-end gap-4 lg:grid-cols-3">
      {/* Search Input */}
      <div className="relative">
        {/* <Search className="text-base-tertiary peer-focus:text-base-primary absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2" /> */}
        <Input
          placeholder={t.search}
          defaultValue={initialFilters.search}
          onChange={(e) => debouncedSearch(e.target.value)}
          className="peer rounded-full ps-9"
        />
        <div className="text-base-quaternary peer-focus:text-base-secondary pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <Icon
            icon="material-symbols:search-rounded"
            height="none"
            className="size-5"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:col-span-2 lg:col-start-2">
        {/* <div className="text-base-tertiary flex items-center gap-2 text-sm font-medium">
          {t.filters}
        </div> */}

        {/* Category Filter */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-base-tertiary text-sm font-medium">{t.category}</span>
          <Select
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            defaultValue={initialFilters.category || 'all'}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t.allCategories} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allCategories}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug as string}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Ecosystem Filter */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-base-tertiary text-sm font-medium">{t.ecosystem}</span>
          <Select
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            defaultValue={initialFilters.ecosystem || 'all'}
            onValueChange={handleEcosystemChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t.allEcosystems} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allEcosystems}</SelectItem>
              {ecosystems.map((ecosystem) => (
                <SelectItem key={ecosystem.id} value={ecosystem.slug as string}>
                  {ecosystem.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Filter */}
        <div className="flex w-full flex-col gap-2">
          <span className="text-base-tertiary text-sm font-medium">{t.sortBy}</span>
          <Select
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
            defaultValue={initialFilters.sort || 'newest'}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t.sortBy} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">{t.name}</SelectItem>
              <SelectItem value="newest">{t.newest}</SelectItem>
              <SelectItem value="oldest">{t.oldest}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
