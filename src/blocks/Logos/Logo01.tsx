'use client'
import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/MediaResponsive'
import { cn } from '@/utilities/ui'
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'

interface Logo01Props {
  logos: MediaType[]
  className?: string
}

export const Logo01: React.FC<Logo01Props> = ({ logos, className }) => {
  if (!logos || logos.length === 0) {
    return null
  }

  return (
    <div className={cn('container w-full overflow-hidden py-space-xl', className)}>
      <ul
        dir="ltr"
        className="flex w-full flex-wrap items-center justify-center mask-x-from-90% mask-x-to-100% md:justify-between"
      >
        <InfiniteSlider gap={48} className="">
          {logos.map((logo, i) => {
            return (
              <li key={i} className="flex items-center justify-center">
                {logo && typeof logo === 'object' && (
                  <Media imgClassName="h-space-md w-auto object-contain" resource={logo} />
                )}
              </li>
            )
          })}
        </InfiniteSlider>
      </ul>
    </div>
  )
}
