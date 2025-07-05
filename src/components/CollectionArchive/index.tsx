import { cn } from '@/utilities/ui'
import React from 'react'

import type { BlogPost, Category } from '@/payload-types'

import { Card } from '@/components/Card'
import { Badge } from '../ui/badge'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export type Props = {
  posts: BlogPost[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const t = useTranslations('Blog')
  const { posts } = props

  const categories: Category[] = []

  posts.forEach((post) => {
    post.categories?.forEach((category) => {
      if (typeof category === 'object' && category !== null) {
        if (!categories.some((c) => c.id === category.id)) {
          categories.push(category)
        }
      }
    })
  })

  return (
    <div className={cn('container')}>
      <div className="gap-space-xs grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div className="col-span-4" key={index}>
                <Card className="h-full" doc={result} relationTo="blog-posts" showCategories />
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}
