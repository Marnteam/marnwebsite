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
import { Card, CardContent } from '@/components/ui/card'

interface AppsCarouselClientProps {
  apps: Integration[]
  blockHeader: BlockHeaderType
  locale?: TypedLocale
}

const AppCard: React.FC<{ app: Integration; locale?: TypedLocale }> = ({ app, locale }) => {
  const { name, icon, tagline, summary, link } = app

  return (
    <Card className="relative z-1 flex h-full w-full flex-col justify-between hover:border-border">
      <CardContent className="gap-space-sm">
        {/* App Badge (Icon + Name) */}
        <div className="flex items-center justify-end gap-space-xs">
          {icon && <Media resource={icon} className="size-8 overflow-hidden rounded-md" />}
          {name && <span className="text-body-lg font-medium text-base-secondary">{name}</span>}
        </div>
        {/* Title and Description */}
        <div className="flex flex-col gap-space-xs">
          {tagline && <h3 className="text-h4 font-medium text-base-primary">{tagline}</h3>}
          {summary && (
            <RichText
              data={summary}
              enableGutter={true}
              className="text-body-sm font-normal text-base-secondary"
            />
          )}
        </div>
      </CardContent>
      {/* Link Button */}
      {link && (
        <CMSLink
          {...link}
          className="mt-space-xs w-fit px-0 py-0 text-body-lg text-base-tertiary hover:bg-transparent hover:text-base-primary"
          label={locale === 'ar' ? 'المزيد' : 'Learn More'}
          variant="link"
        >
          <span className="absolute inset-0 z-0"></span>
        </CMSLink>
      )}
    </Card>
  )
}

// Main Client Component for the Carousel
export const FeaturedApps04: React.FC<AppsCarouselClientProps> = (props) => {
  const { apps, locale } = props
  if (!apps || apps.length === 0) {
    return null // Or render an empty state
  }

  return (
    <div className="container py-space-md">
      <Carousel
        slidesPerView={{
          sm: 1, //   ≥640px: 1 slide
          md: 2, //   ≥768px: 2 slides
          lg: 3, //  ≥1024px: 3 slides
        }}
      >
        <CarouselContent className="-ms-space-xs">
          {apps.map((app, index) => (
            <CarouselItem key={app.id || index} className="ps-space-xs">
              <AppCard app={app} locale={locale} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {apps.length > 1 && (
          <>
            <CarouselNavigation className="relative mt-space-xs justify-between" />
            <CarouselIndicator className="absolute bottom-0 h-10" />
          </>
        )}
      </Carousel>
    </div>
  )
}
