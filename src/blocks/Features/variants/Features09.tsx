'use client'
import React from 'react'
import { FeaturesBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { Card, CardContent } from '@/components/ui/card'
import { LinkBlock } from '@/components/LinkBlock'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

export const Features09: React.FC<FeaturesBlock> = ({ columns, link, CTALabel }) => {
  if (!columns?.length) return null
  const limitedColumns = columns.slice(0, 3)
  return (
    <div className="py-xl container grid grid-cols-1 gap-4 md:grid-cols-4">
      {limitedColumns.map((column, index) => {
        const { image, content } = column
        return (
          <Card key={index} className="overflow-hidden !rounded-none bg-transparent !p-0">
            <CardContent className="gap-sm grid grid-cols-2 items-center rounded-none bg-transparent p-0 md:grid-cols-1 md:flex-col">
              {image && (
                <div className="h-auto w-full">
                  <Media
                    resource={image}
                    className="h-auto w-full"
                    imgClassName="w-full h-auto aspect-square object-cover rounded-space-sm"
                  />
                </div>
              )}
              {content && (
                <div className="flex flex-col gap-2">
                  <h3 className="text-body-lg text-base-primary font-medium">{content?.title}</h3>
                  {content?.subtitle && (
                    <RichText data={content.subtitle} className="text-body-md text-base-tertiary" />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
      <div
        className={cn({
          'col-span-2': columns.length < 3,
        })}
      >
        <LinkBlock className="md:aspect-square" link={link} label={link?.label} position="corner" />
      </div>
    </div>
  )
}
