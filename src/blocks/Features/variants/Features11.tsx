import React from 'react'
import { FeaturesBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { Card, CardContent } from '@/components/ui/card'
import { LinkBlock } from '@/components/LinkBlock'
import RichText from '@/components/RichText'

export const Features11: React.FC<FeaturesBlock> = ({ columns, link, CTALabel }) => {
  if (!columns?.length) return null
  const limitedColumns = columns.slice(0, 4)
  return (
    <div className="container grid grid-cols-1 items-stretch gap-4 py-space-xl md:grid-cols-2 md:grid-rows-3">
      {limitedColumns.map((column, index) => {
        const { image, content } = column
        return (
          <Card key={index} className="p-4">
            <CardContent className="grid grid-cols-2 items-center gap-space-sm p-0">
              {image && (
                <div className="h-auto w-full">
                  <Media
                    resource={image}
                    className="h-auto w-full"
                    imgClassName="aspect-square h-auto w-full rounded-lg object-cover"
                  />
                </div>
              )}
              {content && (
                <div className="">
                  <h3 className="mb-2 text-body-lg font-medium text-base-primary">
                    {content?.title}
                  </h3>
                  {content.subtitle && (
                    <RichText
                      data={content?.subtitle}
                      className="text-body-sm text-base-secondary"
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
      {link?.label && (
        <LinkBlock
          link={link}
          className="md:col-span-2"
          label={link?.label}
          CTALabel={CTALabel || ''}
          position="corner"
        />
      )}
    </div>
  )
}
