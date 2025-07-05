import React from 'react'
import type { BlogBlock, BlogPost } from '@/payload-types'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getReadTimeFromLexical } from '@/utilities/extractTextFromLexical'
import { useTranslations } from 'next-intl'
import { extractTextFromLexical } from '@/utilities/extractTextFromLexical'

type BlogBlockType = BlogBlock & {
  locale: 'en' | 'ar'
  recentPosts: BlogPost[]
  editorsPicks: BlogPost[]
}

const PostCard: React.FC<{
  index: number
  post: BlogPost
  locale: 'en' | 'ar'
  className?: string
}> = ({ index, post, locale, className = '' }) => {
  const t = useTranslations('Blog')

  const href = `/${locale}/blog/${post.slug}`
  const { text } = getReadTimeFromLexical(post.content, locale as 'en' | 'ar', t)
  const excerpt = extractTextFromLexical(post.content)
  const category =
    Array.isArray(post.categories) && post.categories.length > 0 ? post.categories[0] : null
  const author = Array.isArray(post.authors) && post.authors.length > 0 ? post.authors[0] : null

  return (
    <article data-index={index} className={`group/inner z-1 ${className}`}>
      <div className="flex w-full flex-row items-start rounded-2xl transition-colors">
        {/* Image */}
        <div className="relative aspect-square h-auto w-[33.33%] shrink-0 p-4">
          {post.meta?.image && typeof post.meta?.image === 'object' ? (
            <Media
              resource={post.meta?.image}
              className="h-full w-full overflow-hidden rounded-lg"
              imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover/inner:scale-105"
            />
          ) : (
            <div className="bg-background-neutral-subtle h-full w-full rounded-lg" />
          )}
        </div>

        {/* Content */}
        <div className="pe-space-md py-space-sm flex w-full flex-col justify-between self-stretch ps-0">
          <div>
            {/* Category Badge */}
            {category && typeof category === 'object' && (
              <Badge
                type="label"
                label={category.title}
                color="gray"
                size="md"
                className="group-hover/inner:bg-background-neutral mb-2"
              />
            )}

            {/* Title */}
            <h3 className="mb-space-2xs text-h4 text-base-primary group-hover/inner:text-brand-primary line-clamp-2 font-medium transition-colors">
              <Link href={href}>{post.title}</Link>
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="mb-space-xs text-base-secondary group-hover/inner:text-base-tertiary line-clamp-3 text-sm transition-colors">
                {excerpt.slice(0, 60)}...
              </p>
            )}
          </div>

          {/* Meta */}
          <div className="text-base-tertiary border-border pt-space-xs flex items-center justify-between border-t text-sm">
            <span>{text}</span>
            <span>{post.publishedAt && formatDateTime(post.publishedAt)}</span>
          </div>
        </div>
      </div>
      {
        <hr className="mx-space-md border-background-neutral-subtle transition-opacity group-last/inner:hidden" />
      }
    </article>
  )
}

export const TwoColumns: React.FC<BlogBlockType> = ({
  recentPostsList,
  editorsPicksList,
  recentPosts,
  editorsPicks,
  locale,
}) => {
  const t = useTranslations('Blog')
  return (
    <div className="pb-xl container pt-0">
      <div className="mx-auto">
        <div className="gap-space-sm flex flex-col">
          {/* Posts Sections */}
          <div className="gap-space-sm flex flex-col lg:flex-row">
            {/* Popular Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-background-neutral w-full rounded-3xl">
                {recentPostsList?.title && (
                  <div className="p-space-md pb-0">
                    <h3 className="mb-space-2xs text-h3 text-base-primary font-medium">
                      {recentPostsList?.title}
                    </h3>

                    {recentPostsList.description && (
                      <p className="text-body-lg text-base-secondary">
                        {recentPostsList.description}
                      </p>
                    )}
                  </div>
                )}
                <div className="group/outer grid grid-cols-1 grid-rows-3 p-2 lg:p-4">
                  <div className="bg bg-background-neutral-subtle ease-in-out-cubic col-start-1 row-start-1 h-full w-full translate-y-(--x) rounded-2xl opacity-0 group-[:has(article:hover)]/outer:opacity-100 group-[:has(article:hover)]/outer:transition-all"></div>
                  {recentPosts.slice(0, 3).map((post, index) => {
                    return (
                      <PostCard
                        className={`col-start-1 row-start-${index + 1}`}
                        index={index}
                        key={post.id}
                        post={post}
                        locale={locale}
                      />
                    )
                  })}
                </div>
              </div>
            )}

            {/* Latest Posts */}
            {editorsPicks.length > 0 && (
              <div className="bg-background-neutral w-full rounded-3xl">
                {editorsPicksList?.title && (
                  <div className="p-space-md pb-0">
                    <h3 className="mb-space-2xs text-h3 text-base-primary font-medium">
                      {editorsPicksList.title}
                    </h3>
                    {editorsPicksList.description && (
                      <p className="text-body-lg text-base-secondary">
                        {editorsPicksList.description}
                      </p>
                    )}
                  </div>
                )}
                <div className="group/outer grid grid-cols-1 grid-rows-3 p-2 lg:p-4">
                  <div className="bg bg-background-neutral-subtle ease-in-out-cubic col-start-1 row-start-1 h-full w-full translate-y-(--x) rounded-2xl opacity-0 group-[:has(article:hover)]/outer:opacity-100 group-[:has(article:hover)]/outer:transition-all"></div>
                  {editorsPicks.slice(0, 3).map((post, index) => {
                    return (
                      <>
                        <PostCard
                          className={`col-start-1 row-start-${index + 1}`}
                          index={index}
                          key={post.id}
                          post={post}
                          locale={locale}
                        />
                      </>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
