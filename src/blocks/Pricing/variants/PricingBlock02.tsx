'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import type { PricingBlock, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { Check, CircleCheck, X } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { BlockHeader } from '@/components/BlockHeader'
import { SaudiRiyal } from '@/icons/saudi-riyal'
import { PricingCard } from '../PricingCard'
import { PricingToggle } from '@/components/PricingToggle'

interface PricingBlock02Props {
  pricingCards: NonNullable<PricingBlock['pricingCards']>
  locale: string
  translations?: any
}

export const PricingBlock02: React.FC<PricingBlock02Props> = ({
  pricingCards,
  locale,
  translations,
}) => {
  // Get all unique features across all pricing cards for table layout
  const allFeatures = Array.from(
    new Set(pricingCards.flatMap((card) => card.features?.map((f) => f.feature) || [])),
  )

  return (
    <section className="py-space-xl">
      <div className="container">
        {/* Pricing Cards Grid */}
        <div className="gap-space-xs grid md:grid-cols-2">
          {pricingCards.map((card, index) => {
            const {
              badge,
              title,
              subtitle,
              media,
              price,
              features,
              featuredSolutions,
              featuredIntegrations,
            } = card
            const iconMedia = media as MediaType | undefined

            return (
              <PricingCard
                key={index}
                type={null}
                media={media}
                title={title}
                subtitle={subtitle}
                price={price}
                features={features}
                translations={translations}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
