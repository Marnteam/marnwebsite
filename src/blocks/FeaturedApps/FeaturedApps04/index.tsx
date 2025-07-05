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

interface AppsCarouselClientProps {
  apps: Integration[]
  blockHeader: BlockHeaderType
  locale?: TypedLocale
}

// AppCard component, similar to before but ensure fields exist
// Adapt this based on your actual App type fields
const AppCard: React.FC<{ app: Integration; locale?: TypedLocale }> = ({ app, locale }) => {
  const { name, icon, tagline, summary, link } = app

  return (
    <div className="bg-background-neutral rounded-space-sm flex h-full w-full flex-col overflow-hidden lg:flex-row">
      <div className="p-md flex w-full flex-col justify-between text-start">
        <div className="gap-sm flex flex-col items-start justify-start">
          {/* App Badge (Icon + Name) */}
          <div className="gap-xs flex items-center justify-end">
            {icon && <Media resource={icon} className="size-8 overflow-hidden rounded-md" />}
            {name && <span className="text-body-lg text-base-secondary font-medium">{name}</span>}
          </div>
          {/* Title and Description */}
          <div className="gap-xs flex flex-col">
            {tagline && <h3 className="text-h4 text-base-primary font-medium">{tagline}</h3>}
            {summary && (
              <RichText
                data={summary}
                enableGutter={true}
                className="text-body-sm text-base-secondary font-normal"
              />
            )}
          </div>
        </div>
        {/* Link Button */}
        {link && (
          <CMSLink
            {...link}
            // Use text size, color variables, and explicit gap
            className="text-body-lg mt-space-xs text-base-tertiary hover:text-base-primary w-fit px-0 py-0 hover:bg-transparent"
            label={locale === 'ar' ? 'المزيد' : 'Learn More'}
            variant="link"
          />
        )}
      </div>
    </div>
  )
}

// Main Client Component for the Carousel
export const FeaturedApps04: React.FC<AppsCarouselClientProps> = (props) => {
  const { apps, locale } = props
  if (!apps || apps.length === 0) {
    return null // Or render an empty state
  }

  return (
    <div className="py-md container">
      <Carousel
        slidesPerView={{
          sm: 1, //   ≥640px: 1 slide
          md: 2, //   ≥768px: 2 slides
          lg: 3, //  ≥1024px: 3 slides
        }}
      >
        <CarouselContent className="-ms-xs">
          {apps.map((app, index) => (
            <CarouselItem key={app.id || index} className="ps-xs">
              <AppCard app={app} locale={locale} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {apps.length > 1 && (
          <>
            <CarouselNavigation className="mt-xs relative justify-between" />
            <CarouselIndicator className="absolute bottom-0 h-10" />
          </>
        )}
      </Carousel>
    </div>
  )
}
