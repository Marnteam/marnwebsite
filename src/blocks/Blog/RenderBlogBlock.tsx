import React, { Fragment } from 'react'
import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { BlogBlock as BlogBlockType, Post } from '@/payload-types'
import { Blog01 } from './Blog01'

export const RenderBlogBlock: React.FC<BlogBlockType> = async (props) => {
  const { featuredPost, initialFilters } = props
  const { recentPosts, editorsPicks } = initialFilters || {}
  const locale = (await getLocale()) as 'en' | 'ar'
  const payload = await getPayload({ config })

  let featuredPostData: Post | null = null
  let recentPostsData: Post[] = []
  let editorsPicksData: Post[] = []

  try {
    // Handle featured post
    if (featuredPost) {
      if (typeof featuredPost === 'string') {
        const post = await payload.findByID({
          collection: 'posts',
          id: featuredPost,
          depth: 2,
          locale: locale,
        })
        featuredPostData = post
      } else {
        const post = await payload.findByID({
          collection: 'posts',
          id: featuredPost.id,
          depth: 2,
          locale: locale,
        })
        featuredPostData = post
      }
    }

    // Handle recent posts
    if (initialFilters?.recentPosts?.length) {
      const recentPostPromises = initialFilters.recentPosts.map((post) => {
        if (typeof post === 'string') {
          return payload.findByID({
            collection: 'posts',
            id: post,
            depth: 2,
            locale: locale,
          })
        } else {
          return payload.findByID({
            collection: 'posts',
            id: post.id,
            depth: 2,
            locale: locale,
          })
        }
      })
      recentPostsData = (await Promise.all(recentPostPromises)).filter(Boolean) as Post[]
    }

    // Handle editors picks
    if (initialFilters?.editorsPicks?.length) {
      const editorsPicksPromises = initialFilters.editorsPicks.map((post) => {
        if (typeof post === 'string') {
          return payload.findByID({
            collection: 'posts',
            id: post,
            depth: 2,
            locale: locale as 'en' | 'ar',
          })
        } else {
          return payload.findByID({
            collection: 'posts',
            id: post.id,
            depth: 2,
            locale: locale,
          })
        }
      })
      editorsPicksData = (await Promise.all(editorsPicksPromises)).filter(Boolean) as Post[]
    }

    // Fallback: if no posts are selected, fetch recent posts
    if (!featuredPostData && !recentPostsData.length && !editorsPicksData.length) {
      const fallbackPosts = await payload.find({
        collection: 'posts',
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

      if (fallbackPosts.docs.length > 0) {
        featuredPostData = fallbackPosts.docs[0]
        recentPostsData = fallbackPosts.docs.slice(1, 4)
        editorsPicksData = fallbackPosts.docs.slice(4, 7)
      }
    }
  } catch (error) {
    console.error('Error fetching blog block data:', error)
    return null
  }

  if (!featuredPostData && !recentPostsData.length && !editorsPicksData.length) {
    return null
  }

  return (
    <Fragment>
      <Blog01
        featuredPost={featuredPostData}
        recentPosts={recentPostsData}
        editorsPicks={editorsPicksData}
        locale={locale}
      />
    </Fragment>
  )
}
