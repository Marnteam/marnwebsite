'use client'
import React from 'react'
import type { GalleryBlock, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utilities/ui'

interface Gallery02Props {
  images: MediaType[]
  className?: string
}

export const Gallery02: React.FC<Gallery02Props> = ({ images, className }) => {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className={cn('py-xl container w-full', className)}>
      <Carousel slidesPerView={1} className="w-full">
        <CarouselContent className="-ms-xs">
          {images.map((image, index) => (
            <CarouselItem key={image.id || index} className="ps-xs">
              {typeof image === 'object' && image !== null && (
                <Media
                  resource={image}
                  className="rounded-space-sm bg-background-neutral-subtle h-full w-full overflow-clip object-cover"
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselNavigation className="mt-xs relative justify-between" />
            <CarouselIndicator className="absolute bottom-0 h-10" />
          </>
        )}
      </Carousel>
    </div>
  )
}
