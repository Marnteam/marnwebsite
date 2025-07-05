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
    <div className="pb-xl container pt-0">
      <div className="mx-auto">
        <div className="gap-space-sm flex flex-col">
          {featuredPost && (
            <div className="bg-background-neutral hover:shadow-border group flex flex-col rounded-3xl md:flex-row">
              {featuredPost.meta?.image && typeof featuredPost.meta?.image === 'object' ? (
                <div className="w-full flex-1 p-4">
                  <Media
                    resource={featuredPost.meta?.image}
                    className="h-full w-full overflow-hidden rounded-lg"
                    imgClassName="h-full w-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              ) : (
                <div className="bg-background-neutral-subtle h-full w-full rounded-lg" />
              )}

              <div className="pe-space-md md:py-space-md gap-space-sm ms-0 flex w-full flex-1 flex-col p-4 pt-0 lg:m-4">
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
                <h2 className="text-h2 text-base-primary font-medium">
                  <Link
                    href={`/${locale}/blog/${featuredPost.slug}`}
                    className="hover:text-brand-primary transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>

                {/* Featured Post Excerpt */}
                {featuredPost.content && (
                  <p className="text-body-lg text-base-secondary group-hover:text-base-tertiary line-clamp-3 transition-colors">
                    {extractTextFromLexical(featuredPost.content).slice(0, 180)}...
                  </p>
                )}

                <hr className="border-border" />

                {/* Featured Post Meta */}
                <div className="mt-auto flex items-center justify-between">
                  {/* Author */}
                  {Array.isArray(featuredPost.authors) && featuredPost.authors.length > 0 && (
                    <div className="gap-space-2xs flex items-center">
                      <div className="bg-background-neutral-subtle h-10 w-10 rounded-full"></div>
                      <span className="text-base-primary group-hover:text-base-tertiary font-medium transition-colors">
                        {typeof featuredPost.authors[0] === 'object' && featuredPost.authors[0].name
                          ? featuredPost.authors[0].name
                          : 'Author'}
                      </span>
                    </div>
                  )}

                  <div className="gap-space-sm text-body-sm text-base-tertiary flex items-center">
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
