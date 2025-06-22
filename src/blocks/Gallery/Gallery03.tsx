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
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'

interface Gallery03Props {
  images: MediaType[]
  className?: string
}

export const Gallery03: React.FC<Gallery03Props> = ({ images, className }) => {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div dir="ltr" className={cn('py-xl relative w-full', className)}>
      <InfiniteSlider className="w-full">
        {images.map((image, index) => (
          <Media
            key={index}
            resource={image}
            imgClassName="rounded-space-sm h-[60vh]  w-auto object-cover"
          />
        ))}
      </InfiniteSlider>
    </div>
  )
}
