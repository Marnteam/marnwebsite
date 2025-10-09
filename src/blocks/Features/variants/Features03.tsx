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
    <div className="container grid grid-cols-1 gap-md bg-background py-xl md:grid-cols-4 lg:grid-cols-12">
      {columns.map((column, index) => {
        const { image, size = 'full', content } = column
        const lgColSpanClass = colSpanClass[size || 'full']

        return (
          <div key={index} className={cn('col-span-full', lgColSpanClass)}>
            <div
              className={cn('flex flex-col gap-sm', {
                'md:flex-row md:items-center md:justify-start': size === 'full',
              })}
            >
              {image && (
                <Media
                  resource={image}
                  className={cn('overflow-hidden rounded-3xl', {
                    'lg:basis-1/2': size === 'full', // Adjust width for full-size columns
                    'w-full': size !== 'full', // Full width for non-full-size columns
                  })}
                  imgClassName="aspect-[16/9] h-auto w-full object-cover"
                />
              )}
              <div
                className={cn('flex flex-col items-start gap-sm', {
                  'w-full md:px-md lg:basis-1/2': size === 'full',
                  'md:px-sm': size !== 'full',
                })}
              >
                {column.enableBadge && column.badge && <Badge {...column.badge} />}
                {content && (
                  <div className="flex flex-col gap-xs">
                    {content.title && (
                      <h3 className="text-h2 font-medium text-base-primary">{content.title}</h3>
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
