import React from 'react'
import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { formatDateTime } from '@/utilities/formatDateTime'
import { getReadTimeFromLexical } from '@/utilities/extractTextFromLexical'
import { useTranslations } from 'next-intl'
import { extractTextFromLexical } from '@/utilities/extractTextFromLexical'

interface Blog01Props {
  featuredPost: Post | null
  recentPosts: Post[]
  editorsPicks: Post[]
  locale: 'en' | 'ar'
}

const PostCard: React.FC<{
  index: number
  post: Post
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
    <article data-index={index} className={`group ${className}`}>
      <div className="hover:bg-background-neutral-subtle flex w-full flex-row items-start rounded-3xl transition-colors">
        {/* Image */}
        <div className="relative aspect-square h-auto w-[33.33%] shrink-0 p-4">
          {post.meta?.image && typeof post.meta?.image === 'object' ? (
            <Media
              resource={post.meta?.image}
              className="h-full w-full overflow-hidden rounded-lg"
              imgClassName="h-full w-full object-cover  transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="bg-background-neutral-subtle h-full w-full" />
          )}
        </div>

        {/* Content */}
        <div className="pe-space-md py-space-sm flex w-full flex-col justify-between self-stretch ps-0">
          <div>
            {/* Category Badge */}
            {category && typeof category === 'object' && (
              <Badge type="label" label={category.title} color="blue" size="md" className="mb-2" />
            )}

            {/* Title */}
            <h3 className="mb-space-2xs text-h4 text-base-primary group-hover:text-brand-primary line-clamp-2 font-medium transition-colors">
              <Link href={href}>{post.title}</Link>
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="mb-space-xs text-base-secondary line-clamp-3 text-sm">
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
        <hr className="mx-space-md border-background-neutral-subtle group-last:hidden group-hover:hidden" />
      }
    </article>
  )
}

export const Blog01: React.FC<Blog01Props> = ({
  featuredPost,
  recentPosts,
  editorsPicks,
  locale,
}) => {
  const t = useTranslations('Blog')

  const readTime = getReadTimeFromLexical(featuredPost?.content, locale, t)
  return (
    <div className="pb-xl container pt-0">
      <div className="mx-auto">
        <div className="gap-space-sm flex flex-col">
          {/* Featured Post */}
          {featuredPost && (
            <div className="bg-background-neutral flex flex-col rounded-3xl md:flex-row">
              {/* Featured Post Image */}
              {featuredPost.meta?.image && typeof featuredPost.meta?.image === 'object' ? (
                <div className="w-full flex-1 p-4">
                  <Media
                    resource={featuredPost.meta?.image}
                    className="h-full w-full"
                    imgClassName="h-full w-full rounded-lg object-cover"
                  />
                </div>
              ) : (
                <div className="bg-background-neutral-subtle h-full w-full" />
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
                    color="blue"
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
                  <p className="text-body-lg text-base-secondary line-clamp-3">
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
                      <span className="text-base-primary font-medium">
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

          {/* Posts Sections */}
          <div className="gap-space-sm flex flex-col lg:flex-row">
            {/* Popular Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-background-neutral w-full rounded-3xl">
                <div className="p-space-md pb-0">
                  <h3 className="mb-space-2xs text-h3 text-base-primary font-medium">Popular</h3>
                  <p className="text-body-lg text-base-secondary">
                    A point of sale and operational management system designed to meet the specific
                    needs of restaurants and various businesses.
                  </p>
                </div>
                <div className="p-2 lg:p-4">
                  {recentPosts.slice(0, 3).map((post, index) => {
                    return (
                      <>
                        <PostCard
                          index={index}
                          key={post.id}
                          post={post}
                          locale={locale}
                          // className={
                          //   index < recentPosts.slice(0, 3).length - 1 ? 'border-border border-b' : ''
                          // }
                        />
                      </>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Latest Posts */}
            {editorsPicks.length > 0 && (
              <div className="bg-background-neutral w-full rounded-3xl">
                <div className="p-space-md pb-0">
                  <h3 className="mb-space-2xs text-h3 text-base-primary font-medium">Latest</h3>
                  <p className="text-body-lg text-base-secondary">
                    A point of sale and operational management system designed to meet the specific
                    needs of restaurants and various businesses.
                  </p>
                </div>
                <div className="p-2 lg:p-4">
                  {editorsPicks.slice(0, 3).map((post, index) => {
                    return (
                      <>
                        <PostCard
                          index={index}
                          key={post.id}
                          post={post}
                          locale={locale}
                          // className={
                          //   index < recentPosts.slice(0, 3).length - 1 ? 'border-border border-b' : ''
                          // }
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
