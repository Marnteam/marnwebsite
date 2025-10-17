import React from 'react'
import type { BlogPost } from '@/payload-types'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getReadTimeFromLexical } from '@/utilities/extractTextFromLexical'
import { useTranslations } from 'next-intl'
import { extractTextFromLexical } from '@/utilities/extractTextFromLexical'
import type { BlogBlock } from '@/payload-types'

type BlogBlockType = BlogBlock & {
  locale: 'en' | 'ar'
  featuredPost: BlogPost
}

export const FeaturedPost: React.FC<BlogBlockType> = ({ featuredPost, locale }) => {
  const t = useTranslations('Blog')

  const readTime = getReadTimeFromLexical(featuredPost?.content, locale, t)
  return (
    <div className="container py-0">
      <div className="mx-auto">
        <div className="flex flex-col gap-space-sm">
          {featuredPost && (
            <div className="group flex flex-col rounded-3xl bg-background-neutral hover:shadow-border md:flex-row">
              {featuredPost.meta?.image && typeof featuredPost.meta?.image === 'object' ? (
                <div className="w-full flex-1 p-4">
                  <Media
                    resource={featuredPost.meta?.image}
                    className="h-full w-full overflow-hidden rounded-lg"
                    imgClassName="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="h-full w-full rounded-lg bg-background-neutral-subtle" />
              )}

              <div className="ms-0 flex w-full flex-1 flex-col gap-space-sm p-4 pe-space-md pt-0 md:py-space-md lg:m-4">
                {/* Category Badge */}
                {Array.isArray(featuredPost.categories) && featuredPost.categories.length > 0 && (
                  <Badge
                    type="label"
                    label={
                      typeof featuredPost.categories[0] === 'object'
                        ? featuredPost.categories[0].title
                        : 'Category'
                    }
                    color="gray"
                    size="lg"
                  />
                )}

                {/* Featured Post Title */}
                <h2 className="text-h3 font-medium text-base-primary">
                  <Link
                    href={`/${locale}/blog/${featuredPost.slug}`}
                    className="transition-colors hover:text-brand-primary"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>

                {/* Featured Post Excerpt */}
                {featuredPost.content && (
                  <p className="line-clamp-3 h-full text-body-lg text-base-secondary transition-colors group-hover:text-base-tertiary">
                    {extractTextFromLexical(featuredPost.content).slice(0, 180)}...
                  </p>
                )}

                <hr className="border-border" />

                {/* Featured Post Meta */}
                <div className="mt-auto flex items-center justify-between">
                  {/* Author */}
                  {Array.isArray(featuredPost.authors) && featuredPost.authors.length > 0 && (
                    <div className="flex items-center gap-space-2xs">
                      <div className="h-10 w-10 rounded-full bg-background-neutral-subtle"></div>
                      <span className="font-medium text-base-primary transition-colors group-hover:text-base-tertiary">
                        {typeof featuredPost.authors[0] === 'object' && featuredPost.authors[0].name
                          ? featuredPost.authors[0].name
                          : 'Author'}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-space-sm text-body-sm text-base-tertiary">
                    <span>
                      {featuredPost.publishedAt && formatDateTime(featuredPost.publishedAt)}
                    </span>
                    <span>{readTime.text}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
