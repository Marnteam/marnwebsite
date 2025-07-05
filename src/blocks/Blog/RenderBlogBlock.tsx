import React from 'react'
import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { BlogBlock, BlogPost } from '@/payload-types'
import { FeaturedPost } from './FeaturedPost'
import { TwoColumns } from './TwoColumns'

type BlogBlockType = BlogBlock & {
  recentPosts?: BlogPost[]
  editorsPicks?: BlogPost[]
  locale: 'en' | 'ar'
}

const variants: Record<string, React.FC<BlogBlockType>> = {
  featuredPost: FeaturedPost,
  '2-columns': TwoColumns,
}

export const RenderBlogBlock: React.FC<BlogBlockType> = async (props) => {
  const { type, featuredPost, recentPostsList, editorsPicksList } = props
  const { recentPosts } = recentPostsList || {}
  const { editorsPicks } = editorsPicksList || {}
  const locale = (await getLocale()) as 'en' | 'ar'
  const payload = await getPayload({ config })

  let featuredPostData: BlogPost | null = null
  let recentPostsData: BlogPost[] = []
  let editorsPicksData: BlogPost[] = []

  try {
    // Handle featured post
    if (featuredPost) {
      if (typeof featuredPost === 'string') {
        const post = await payload.findByID({
          collection: 'blog-posts',
          id: featuredPost,
          depth: 2,
          locale: locale,
        })
        featuredPostData = post
      } else {
        const post = await payload.findByID({
          collection: 'blog-posts',
          id: featuredPost.id,
          depth: 2,
          locale: locale,
        })
        featuredPostData = post
      }
    } else {
      const post = await payload.find({
        collection: 'blog-posts',
        depth: 2,
        limit: 1,
        locale: locale,
        where: {
          _status: {
            equals: 'published',
          },
        },
      })
      featuredPostData = post.docs[0]
    }

    // Handle recent posts
    if (recentPosts?.length) {
      const recentPostPromises = recentPosts.map((post) => {
        if (typeof post === 'string') {
          return payload.findByID({
            collection: 'blog-posts',
            id: post,
            depth: 2,
            locale: locale,
          })
        } else {
          return payload.findByID({
            collection: 'blog-posts',
            id: post.id,
            depth: 2,
            locale: locale,
          })
        }
      })
      recentPostsData = (await Promise.all(recentPostPromises)).filter(Boolean) as BlogPost[]
    } else {
      const recentPosts = await payload.find({
        collection: 'blog-posts',
        depth: 2,
        limit: 7,
        locale: locale as 'en' | 'ar',
        sort: '-publishedAt',
        where: {
          _status: {
            equals: 'published',
          },
        },
      })
      recentPostsData = recentPosts.docs
    }

    // Handle editors picks
    if (editorsPicks?.length) {
      const editorsPicksPromises = editorsPicks.map((post) => {
        if (typeof post === 'string') {
          return payload.findByID({
            collection: 'blog-posts',
            id: post,
            depth: 2,
            locale: locale as 'en' | 'ar',
          })
        } else {
          return payload.findByID({
            collection: 'blog-posts',
            id: post.id,
            depth: 2,
            locale: locale,
          })
        }
      })
      editorsPicksData = (await Promise.all(editorsPicksPromises)).filter(Boolean) as BlogPost[]
    } else {
      // Fetch random published posts for editors picks
      const posts = await payload.find({
        collection: 'blog-posts',
        depth: 2,
        limit: 50,
        locale: locale as 'en' | 'ar',
        where: {
          _status: {
            equals: 'published',
          },
        },
      })
      // Shuffle the posts array to randomize
      const shuffled = posts.docs
        .map((post) => ({ post, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ post }) => post)

      // Take up to 7 random posts
      const editorsPicks = { docs: shuffled.slice(0, 7) }
      editorsPicksData = editorsPicks.docs
    }
  } catch (error) {
    console.error('Error fetching blog block data:', error)
    return null
  }

  if (!featuredPostData && !recentPostsData.length && !editorsPicksData.length) {
    return null
  }

  if (!type) {
    return null
  }

  const BlogBlockComponent = variants[type]

  if (!BlogBlockComponent) {
    console.warn(`Variant "${type}" not found for BlogBlock. Rendering default (featuredPost).`)
    const DefaultVariant = variants['featuredPost']
    return <DefaultVariant {...props} />
  }

  return (
    <BlogBlockComponent
      blockType="blogBlock"
      featuredPost={featuredPostData}
      recentPosts={recentPostsData}
      editorsPicks={editorsPicksData}
      locale={locale}
    />
  )
}
