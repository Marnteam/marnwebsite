'use client'
import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

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
    <div dir="ltr" className={cn('relative w-full py-xl', className)}>
      <InfiniteSlider className="w-full">
        {images.map((image, index) => (
          <Media
            key={index}
            resource={image}
            imgClassName="h-[60vh] w-auto rounded-3xl object-cover"
          />
        ))}
      </InfiniteSlider>
    </div>
  )
}
