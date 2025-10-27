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
        <div className="relative aspect-square h-auto w-[33.33%] shrink-0 p-space-sm">
          {post.meta?.image && typeof post.meta?.image === 'object' ? (
            <Media
              resource={post.meta?.image}
              className="h-full w-full overflow-hidden rounded-lg"
              imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover/inner:scale-105"
            />
          ) : (
            <div className="h-full w-full rounded-lg bg-background-neutral-subtle" />
          )}
        </div>

        {/* Content */}
        <div className="flex w-full flex-col justify-between self-stretch py-space-sm pe-space-sm">
          <div>
            {/* Category Badge */}
            {category && typeof category === 'object' && (
              <Badge
                type="label"
                color="gray"
                size="md"
                className="mb-2 group-hover/inner:bg-background-neutral"
              >
                {category.title}
              </Badge>
            )}

            {/* Title */}
            <h3 className="mb-space-2xs line-clamp-2 text-h4 font-medium text-base-primary transition-colors group-hover/inner:text-brand-primary">
              <Link href={href}>{post.title}</Link>
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="mb-space-xs line-clamp-3 text-sm text-base-secondary transition-colors group-hover/inner:text-base-tertiary">
                {excerpt.slice(0, 60)}...
              </p>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between border-t border-border pt-space-xs text-sm text-base-tertiary">
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

const PostsColumn: React.FC<{
  title?: string | null
  description?: string | null
  posts: BlogPost[]
  locale: 'en' | 'ar'
}> = ({ title, description, posts, locale }) => {
  if (posts.length === 0) return null
  return (
    <div className="w-full rounded-3xl bg-background-neutral">
      {title && (
        <div className="p-space-md pb-0">
          <h3 className="mb-space-2xs text-h3 font-medium text-base-primary">{title}</h3>
          {description && <p className="text-body-lg text-base-secondary">{description}</p>}
        </div>
      )}
      <div className="group/anim-bg grid grid-cols-1 grid-rows-3 p-2 lg:p-4">
        <div className="bg col-start-1 row-start-1 h-full w-full translate-y-(--x) rounded-2xl bg-background-neutral-subtle opacity-0 ease-in-out-cubic group-[:has(article:hover)]/anim-bg:opacity-100 group-[:has(article:hover)]/anim-bg:transition-all"></div>
        {posts.slice(0, 3).map((post, index) => {
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
    <div className="container py-space-xl">
      {/* Posts Sections */}
      <div className="mx-auto flex flex-col gap-space-xs lg:flex-row">
        {/* Popular Posts */}
        <PostsColumn {...recentPostsList} locale={locale} posts={recentPosts} />

        {/* Latest Posts */}
        {editorsPicks.length > 0 && (
          <PostsColumn {...editorsPicksList} locale={locale} posts={editorsPicks} />
        )}
      </div>
    </div>
  )
}
