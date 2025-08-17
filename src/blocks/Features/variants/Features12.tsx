import React from 'react'
import { FeaturesBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { Card, CardContent } from '@/components/ui/card'
import { BlockHeader } from '@/components/BlockHeader'
import RichText from '@/components/RichText'

export const Features12: React.FC<FeaturesBlock> = ({ columns, blockHeader }) => {
  if (!columns?.length) return null
  const limitedColumns = columns.slice(0, 4)
  return (
    <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12">
      {blockHeader && <BlockHeader {...blockHeader} type="start" />}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2 md:gap-4">
        {limitedColumns.map((column, index) => {
          const { image, content } = column
          return (
            <Card key={index} className="overflow-hidden rounded-none border-0 bg-transparent">
              <CardContent className="gap-sm grid grid-cols-2 items-start bg-transparent p-0 md:grid-cols-1">
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
                  <div>
                    <h3 className="text-body-lg text-base-primary mb-2 font-medium">
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
      </div>
    </div>
  )
}
