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
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const Carousel04: React.FC<CarouselBlock> = ({ columns }) => {
  if (!columns || columns.length === 0) return null

  return (
    <div className="container py-space-md">
      <Carousel
        slidesPerView={{
          sm: 1, //   ≥640px: 1 slide
          md: 2, //   ≥768px: 2 slides
          lg: 3, //  ≥1024px: 4 slides
        }}
      >
        {columns.length > 1 && (
          <CarouselNavigation className="relative mb-space-xs justify-start" />
        )}
        <CarouselContent className="-ms-space-xs">
          {columns.map((column, index) => {
            const { image, content, link } = column
            return (
              <CarouselItem key={index} className="ps-space-xs">
                <Card className="h-full w-full bg-transparent p-0">
                  <CardContent className="flex h-full flex-col items-start gap-0">
                    {image && (
                      <Media
                        resource={image}
                        className="h-auto w-full"
                        imgClassName="h-auto w-full rounded-3xl"
                      />
                    )}
                    {content && (
                      <div className="flex flex-col p-space-sm pe-space-md">
                        {content.title && (
                          <h3 className="text-body-lg font-medium text-base-primary">
                            {content.title}
                          </h3>
                        )}
                        {content.subtitle && (
                          <RichText data={content.subtitle} className="mx-0 w-full" />
                        )}
                      </div>
                    )}
                    {link && <CMSLink {...link} />}
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        {columns.length > 1 && <CarouselIndicator className="relative bottom-0 mt-space-xs h-10" />}
      </Carousel>
    </div>
  )
}
