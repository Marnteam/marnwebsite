'use client'

import React from 'react'
import type { PricingBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { CMSBadge as Badge } from '@/components/Badge'
import { CMSLink } from '@/components/Link'
import { SaudiRiyal } from '@/icons/saudi-riyal'
import { usePricing } from '@/providers/Pricing'

import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel'

import { Card, CardContent } from '@/components/ui/card'

interface PricingBlock03Props {
  pricingCards: NonNullable<PricingBlock['pricingCards']>
  locale: string
  translations?: any
}

export const PricingBlock03: React.FC<PricingBlock03Props> = ({
  pricingCards,
  locale,
  translations,
}) => {
  const { isMonthly } = usePricing()

  return (
    <div className="container py-space-md">
      <Carousel
        slidesPerView={{
          sm: 1, //   ≥640px: 1 slide
          md: 2, //   ≥768px: 2 slides
          lg: 3, //  ≥1024px: 4 slides
        }}
      >
        {pricingCards.length > 1 && <CarouselNavigation className="relative mb-xs justify-start" />}
        <CarouselContent className="-ms-xs">
          {pricingCards.map((pricingCard, index) => {
            const { badge, title, subtitle, media, type, enableCta, link, price } = pricingCard
            return (
              <CarouselItem key={index} className="ps-xs">
                <Card className="h-full w-full bg-transparent p-0">
                  <CardContent className="flex h-full flex-col items-start gap-space-sm">
                    {media && (
                      <Media
                        resource={media}
                        className="h-auto w-full"
                        imgClassName="h-auto w-full rounded-3xl"
                      />
                    )}
                    <div className="flex w-full flex-col gap-space-xs px-space-sm pe-space-md">
                      {(badge?.label || badge?.reference) && <Badge size="md" {...badge} />}
                      <div>
                        <h3 className="text-body-lg/loose font-medium text-base-primary">
                          {title}
                        </h3>
                        <p className="text-body-md text-base-secondary">{subtitle}</p>
                      </div>
                      {price && (
                        <p className="inline-block space-x-[0.15em] text-start text-(length:--text-body-lg)/loose font-medium text-base-primary">
                          <span className="inline-block align-baseline">
                            {isMonthly ? price.monthly : price.annually}
                          </span>
                          <SaudiRiyal className="inline-block size-[0.7em] align-baseline" />
                          <span className="inline-block align-baseline text-body-sm/none font-normal text-base-tertiary">
                            /{isMonthly ? translations.monthly : translations.annually}
                          </span>
                        </p>
                      )}
                      {enableCta && link && <CMSLink {...link} />}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        {pricingCards.length > 1 && <CarouselIndicator className="relative bottom-0 mt-xs h-10" />}
      </Carousel>
    </div>
  )
}
