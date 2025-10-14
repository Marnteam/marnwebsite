'use client'
import { Link, usePathname } from '@/i18n/routing'
import { Category } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { useMediaQuery } from '@/utilities/useMediaQuery'
import { useLocale } from 'next-intl'
import {
  useParams,
  useRouter,
  useSearchParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from 'next/navigation'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '../ui/label'

export type Props = {
  categories: Category[]
}
export const CategoriesList: React.FC<Props> = (props) => {
  const { categories } = props
  const locale = useLocale()
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const segment = useSelectedLayoutSegment()
  const pathname = usePathname()
  console.log(category)
  if (categories.length === 0) return null
  console.log(pathname)
  return (
    <>
      {isDesktop ? (
        <div
          className="group/anim-bg relative container grid w-full grid-rows-1 py-md"
          style={{
            gridTemplateColumns: `repeat(${categories.length + 1}, minmax(0,1fr))`,
          }}
        >
          <div className="bg z-0 col-start-1 row-start-1 h-full w-full rounded-2xl border bg-background-inverted opacity-0 transition-[opacity,translate] ease-in-out-cubic group-[:has(button:hover)]/anim-bg:opacity-100 ltr:translate-x-(--x) rtl:-translate-x-(--x)"></div>
          <Link
            href="/blog"
            className={cn(
              'z-1 col-start-1 row-start-1 flex items-center justify-center rounded-2xl px-4 py-4 text-center text-body-sm font-medium text-base-primary transition-colors hover:text-inverted-primary',
              {
                'bg-background-inverted text-inverted-primary group-[:has(button:hover)]/anim-bg:bg-transparent group-[:has(button:hover:not(.selected))]/anim-bg:text-base-primary hover:bg-background-inverted':
                  pathname === '/blog',
              },
              pathname === '/blog' && 'selected',
            )}
          >
            {locale === 'ar' ? 'الكل' : 'All'}
          </Link>
          {categories?.map((category, index) => {
            return (
              <button
                // href={`/blog/category/${category.slug}`}
                onClick={() => router.replace(`?category=${category.slug}`)}
                key={index}
                className={`bg z-1 row-start-1 flex items-center justify-center rounded-2xl text-center col-start-${index + 2} px-4 py-4 text-body-sm font-medium text-base-secondary transition-colors hover:text-inverted-primary`}
              >
                {category.title}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="relative container w-full py-md">
          <Label className="mb-2 block" asChild>
            <span>{locale === 'ar' ? 'التصنيفات' : 'Categories'}</span>
          </Label>
          <Select
            value={locale === 'ar' ? 'الكل' : 'All'}
            onValueChange={(value) => router.replace(`?category=${value}`)}
          >
            <SelectTrigger
              className={cn(
                'w-full bg-background-inverted font-medium text-inverted-primary',
                "hover:bg-background-inverted/90 focus-visible:border-ring focus-visible:bg-background-inverted focus-visible:ring-1 focus-visible:outline-none data-[state=open]:bg-background-inverted [&_svg:not([class*='text-'])]:text-inverted-primary",
              )}
            >
              {locale === 'ar' ? 'الكل' : 'All'}
              <SelectValue placeholder={locale === 'ar' ? 'الكل' : 'All'} />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category, index) => {
                return (
                  <SelectItem value={category.slug || ''} key={index}>
                    <span
                    // href={`/blog/category/${category.slug}`}
                    >
                      {category.title}
                    </span>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  )
}
