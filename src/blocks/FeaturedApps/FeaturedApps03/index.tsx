'use client'

import React from 'react'
import type { Integration } from '@/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselIndicator,
} from '@/components/ui/carousel'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { TypedLocale } from 'payload'
import { BlockHeaderType } from '@/types/blockHeader'

// Props for the client component
interface AppsCarouselClientProps {
  apps: Integration[]
  blockHeader: BlockHeaderType
  locale?: TypedLocale
}

const AppCard: React.FC<{ app: Integration }> = ({ app }) => {
  const { name, icon, tagline, summary, link } = app

  return (
    // Use background variable and explicit rounding from Figma
    <div className="flex w-full flex-col overflow-hidden rounded-3xl bg-background-neutral lg:flex-row">
      {/* Content Section */}
      <div className="flex w-full flex-col justify-between p-md text-start">
        <div className="flex flex-col items-start justify-start gap-sm">
          {/* Integration Badge (Icon + Name) */}
          <div className="flex items-center justify-end gap-xs">
            {icon && <Media resource={icon} className="size-16 overflow-hidden rounded-xl" />}
            {name && <span className="text-h3 font-medium text-base-secondary">{name}</span>}
          </div>
          {/* Title and Description */}
          <div className="flex flex-col gap-xs">
            {tagline && <h3 className="text-h3 font-medium text-base-primary">{tagline}</h3>}
            {/* Render summary using RichText component with `data` prop */}
            {summary && (
              <div className="text-body-lg font-normal text-base-secondary">
                <RichText
                  data={summary}
                  enableGutter={false}
                  className="text-body-lg font-normal text-base-secondary"
                />
              </div>
            )}
          </div>
        </div>
        {/* Link Button */}
        {link && (
          <CMSLink
            {...link}
            className="w-fit px-0 py-0 text-body-md text-base-tertiary hover:bg-transparent hover:text-base-primary"
            label="المزيد"
          />
        )}
      </div>

      {/* Image Section - Placeholder */}
    </div>
  )
}

// Main Client Component for the Carousel
export const FeaturedApps03: React.FC<AppsCarouselClientProps> = ({ apps }) => {
  if (!apps || apps.length === 0) {
    return null // Or render an empty state
  }

  return (
    <div className="container py-md">
      <Carousel slidesPerView={1}>
        <CarouselContent className="-ms-xs">
          {apps.map((app, index) => (
            <CarouselItem key={app.id || index} className="ps-xs">
              <AppCard app={app} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {apps.length > 1 && (
          <>
            <CarouselNavigation className="relative mt-xs justify-between" />
            <CarouselIndicator className="absolute bottom-0 h-10" />
          </>
        )}
      </Carousel>
    </div>
  )
}
