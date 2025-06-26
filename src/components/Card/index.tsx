'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { useLocale, useTranslations } from 'next-intl'

import type { BlogPost } from '@/payload-types'

import { Media } from '@/components/Media'
import { Badge } from '../ui/badge'
import { getReadTimeFromLexical } from '@/utilities/extractTextFromLexical'

// export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'publishedAt' >

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: BlogPost
  relationTo?: 'blog-posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const locale = useLocale()
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, publishedAt, content } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  let href = ''
  switch (relationTo) {
    case 'blog-posts':
      href = `/${locale}/blog/${encodeURIComponent(slug || '')}`
      break
    default:
      href = `/${locale}/${relationTo}/${slug}`
      break
  }
  const t = useTranslations('Blog')

  const { text } = getReadTimeFromLexical(content || '', locale as 'en' | 'ar', t)

  return (
    <article
      className={cn('group overflow-hidden border-none hover:cursor-pointer', className)}
      ref={card.ref}
    >
      <div className="relative w-full">
        {!metaImage && <div className="">No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media imgClassName="rounded-2xl" resource={metaImage} size="33vw" />
        )}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="mb-4 text-sm uppercase">
            {showCategories && hasCategories && (
              <div className="flex flex-wrap gap-1">
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return <Badge key={index} size="md" label={categoryTitle} type="label" />
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <h3 className="text-h4 text-base-primary group-hover:text-brand-primary font-medium transition-colors">
            <Link className="not-prose w-full" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}
        {description && <div className="mt-4">{description && <p>{sanitizedDescription}</p>}</div>}
        <hr className="border-border my-4" />
        <div className="flex flex-row items-center gap-2">
          <p className="text-base-tertiary text-sm">
            {new Date(publishedAt || '').toLocaleDateString(locale, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-base-tertiary text-sm">{text}</p>
        </div>
      </div>
    </article>
  )
}
