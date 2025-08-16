import React from 'react'
import { CMSLink } from '@/components/Link'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselBlock } from '@/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel'
import { Media } from '@/components/MediaResponsive'
import RichText from '@/components/RichText'

export const Carousel04: React.FC<CarouselBlock> = ({ columns }) => {
  if (!columns || columns.length === 0) return null

  return (
    <div className="py-md container">
      <Carousel
        slidesPerView={{
          sm: 1, //   ≥640px: 1 slide
          md: 2, //   ≥768px: 2 slides
          lg: 3, //  ≥1024px: 4 slides
        }}
      >
        {columns.length > 1 && <CarouselNavigation className="mb-xs relative justify-start" />}
        <CarouselContent className="-ms-xs">
          {columns.map((column, index) => (
            <CarouselItem key={index} className="ps-xs">
              <Card className="h-full w-full bg-transparent p-0">
                <CardContent className="flex h-full flex-col items-start gap-0">
                  {column.image && (
                    <Media
                      resource={column.image}
                      className="h-auto w-full"
                      imgClassName="h-auto w-full rounded-3xl"
                    />
                  )}
                  {column.richTextContent && (
                    <RichText
                      data={column.richTextContent}
                      enableGutter={false}
                      className="p-sm pe-md mx-0 w-full"
                    />
                  )}
                  {column.link && <CMSLink {...column.link} />}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {columns.length > 1 && <CarouselIndicator className="mt-xs relative bottom-0 h-10" />}
      </Carousel>
    </div>
  )
}
