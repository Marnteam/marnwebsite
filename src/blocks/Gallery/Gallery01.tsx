'use client'
import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/MediaResponsive'
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel'
import { cn } from '@/utilities/ui'

interface Gallery01Props {
  images: MediaType[]
  className?: string
}

export const Gallery01: React.FC<Gallery01Props> = ({ images, className }) => {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className={cn('container w-full py-space-xl', className)}>
      <Carousel slidesPerView={1} className="w-full">
        <CarouselContent className="-ms-space-xs">
          {images.map((image, index) => (
            <CarouselItem key={image.id || index} className="ps-space-xs">
              {typeof image === 'object' && image !== null && (
                <Media
                  resource={image}
                  //image class name w-full important to make image take full width in blog post layout
                  imgClassName="w-full"
                  className="h-full w-full overflow-clip rounded-3xl bg-background-neutral-subtle"
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselNavigation className="relative mt-space-xs justify-between" />
            <CarouselIndicator className="absolute bottom-0 h-10" />
          </>
        )}
      </Carousel>
    </div>
  )
}
