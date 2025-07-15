'use client'

import React from 'react'
import type { PricingBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
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
    <div className="py-space-md container">
      <Carousel
        slidesPerView={{
          sm: 1, //   ≥640px: 1 slide
          md: 2, //   ≥768px: 2 slides
          lg: 3, //  ≥1024px: 4 slides
        }}
      >
        {pricingCards.length > 1 && <CarouselNavigation className="mb-xs relative justify-start" />}
        <CarouselContent className="-ms-xs">
          {pricingCards.map((pricingCard, index) => {
            const { badge, title, subtitle, media, type, enableCta, link, price } = pricingCard
            return (
              <CarouselItem key={index} className="ps-xs">
                <Card className="h-full w-full bg-transparent p-0">
                  <CardContent className="gap-space-sm flex h-full flex-col items-start">
                    {media && (
                      <Media
                        resource={media}
                        className="h-auto w-full"
                        imgClassName="w-full h-auto rounded-3xl"
                      />
                    )}
                    <div className="px-space-sm pe-space-md gap-space-xs flex w-full flex-col">
                      {(badge?.label || badge?.reference) && <Badge size="md" {...badge} />}
                      <div>
                        <h3 className="text-body-lg/loose text-base-primary font-medium">
                          {title}
                        </h3>
                        <p className="text-body-md text-base-secondary">{subtitle}</p>
                      </div>
                      {price && (
                        <p className="text-base-primary inline-block space-x-[0.15em] text-start text-(length:--text-body-lg)/loose font-medium">
                          <span className="inline-block align-baseline">
                            {isMonthly ? price.monthly : price.annually}
                          </span>
                          <SaudiRiyal className="inline-block size-[0.7em] align-baseline" />
                          <span className="text-base-tertiary text-body-sm/none inline-block align-baseline font-normal">
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
        {pricingCards.length > 1 && <CarouselIndicator className="mt-xs relative bottom-0 h-10" />}
      </Carousel>
    </div>
  )
}
