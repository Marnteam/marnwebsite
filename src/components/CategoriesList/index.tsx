'use client'
import { Link } from '@/i18n/routing'
import { Category } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
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

  if (categories.length === 0) return null

  return (
    <>
      <div
        className="group/anim-bg relative container grid w-full grid-rows-1 py-md max-lg:hidden"
        style={{
          gridTemplateColumns: `repeat(${categories.length + 1}, minmax(0,1fr))`,
        }}
      >
        <div className="bg z-0 col-start-1 row-start-1 h-full w-full rounded-2xl border bg-background-neutral opacity-0 transition-[opacity,translate] ease-out group-[:has(a:hover)]/anim-bg:opacity-100 ltr:translate-x-(--x) rtl:-translate-x-(--x)"></div>
        <Link
          href="/blog"
          className={cn(
            'z-1 col-start-1 row-start-1 flex items-center justify-center rounded-2xl px-4 py-4 text-center text-body-sm font-medium text-base-primary transition-colors',
            'bg-background-inverted text-inverted-primary group-[:has(a:hover)]/anim-bg:bg-transparent group-[:has(a:hover)]/anim-bg:text-base-primary',
          )}
        >
          {locale === 'ar' ? 'الكل' : 'All'}
        </Link>
        {categories?.map((category, index) => {
          return (
            <Link
              href={`/blog/category/${category.slug}`}
              key={index}
              className={`bg z-1 row-start-1 flex items-center justify-center rounded-2xl text-center col-start-${index + 2} px-4 py-4 text-body-sm font-medium text-base-secondary transition-colors hover:text-base-primary`}
            >
              {category.title}
            </Link>
          )
        })}
      </div>

      <div className="relative container w-full py-md lg:hidden">
        <Label className="mb-2 block" asChild>
          <span>{locale === 'ar' ? 'التصنيفات' : 'Categories'}</span>
        </Label>
        <Select
          value={locale === 'ar' ? 'الكل' : 'All'}
          onValueChange={(value) => router.replace(`?category=${value}`)}
        >
          <SelectTrigger className="w-full font-medium">
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
    </>
  )
}
