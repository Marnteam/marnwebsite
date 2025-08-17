import React from 'react'
import { FeaturesBlock } from '@/payload-types'
import { Badge } from '@/components/ui/badge'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

import { CMSLink } from '@/components/Link'

const colSpanClass = {
  full: 'md:col-span-4 lg:col-span-12',
  half: 'md:col-span-2 lg:col-span-6',
  oneThird: 'md:col-span-2 lg:col-span-4',
  twoThirds: 'md:col-span-2 lg:col-span-2',
}

export const Features03: React.FC<FeaturesBlock> = ({ columns }) => {
  if (!columns?.length) return null

  return (
    <div className="bg-background py-xl gap-md container grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12">
      {columns.map((column, index) => {
        const { image, size = 'full', content } = column
        const lgColSpanClass = colSpanClass[size || 'full']

        return (
          <div key={index} className={cn('col-span-full', lgColSpanClass)}>
            <div
              className={cn('gap-sm flex flex-col', {
                'md:flex-row md:items-center md:justify-start': size === 'full',
              })}
            >
              {image && (
                <Media
                  resource={image}
                  className={cn('rounded-space-sm overflow-hidden', {
                    'lg:basis-1/2': size === 'full', // Adjust width for full-size columns
                    'w-full': size !== 'full', // Full width for non-full-size columns
                  })}
                  imgClassName="w-full h-auto aspect-[16/9] object-cover"
                />
              )}
              <div
                className={cn('gap-sm flex flex-col items-start', {
                  'md:px-md w-full lg:basis-1/2': size === 'full',
                  'md:px-sm': size !== 'full',
                })}
              >
                {column.enableBadge && column.badge && <Badge {...column.badge} />}
                {content && (
                  <div className="gap-xs flex flex-col">
                    {content.title && (
                      <h3 className="text-h2 text-base-primary font-medium">{content.title}</h3>
                    )}
                    {content.subtitle && <RichText data={content.subtitle} />}
                  </div>
                )}
                {column.enableCta && column.link?.label && (
                  <CMSLink className="mt-auto w-fit" size="md" {...column.link} />
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
