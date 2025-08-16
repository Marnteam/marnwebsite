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

export const Carousel03: React.FC<CarouselBlock> = ({ columns }) => {
  if (!columns || columns.length === 0) return null

  return (
    <div className="py-md container pt-0">
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
              <Card className="h-full w-full p-4 transition-colors">
                <CardContent className="gap-xs flex h-full flex-col items-start rounded-3xl">
                  {column.image && (
                    <Media
                      resource={column.image}
                      className="h-auto w-full overflow-hidden rounded-lg"
                      imgClassName="aspect-square h-auto w-full object-cover"
                    />
                  )}
                  {column.content && (
                    <div className="p-xs pe-md flex flex-col">
                      <h3 className="text-body-lg font-medium text-base-primary">
                        {column.content.title}
                      </h3>
                      <p className="text-body-md text-base-secondary">{column.content.subtitle}</p>
                    </div>
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
