import React from 'react'
import { CMSLink } from '@/components/Link'
import { Card, CardContent } from '@/components/ui/card'
import { FeaturesBlock } from '@/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const Features11: React.FC<FeaturesBlock> = ({ columns }) => {
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
          {columns.map((column, index) => {
            const { image, content, link } = column
            return (
              <CarouselItem key={index} className="ps-xs">
                <Card className="h-full w-full bg-transparent p-0">
                  <CardContent className="flex h-full flex-col items-start gap-0">
                    {image && (
                      <Media
                        resource={image}
                        className="h-auto w-full"
                        imgClassName="w-full h-auto rounded-3xl"
                      />
                    )}
                    {content && (
                      <div className="p-sm pe-md flex flex-col">
                        {content.title && (
                          <h3 className="text-body-lg text-base-primary font-medium">
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
        {columns.length > 1 && <CarouselIndicator className="mt-xs relative bottom-0 h-10" />}
      </Carousel>
    </div>
  )
}
