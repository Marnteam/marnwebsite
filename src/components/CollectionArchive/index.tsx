import { cn } from '@/utilities/ui'
import React from 'react'

import type { BlogPost } from '@/payload-types'

import { Card } from '@/components/Card'

export type Props = {
  posts: BlogPost[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div>
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
    </div>
  )
}
