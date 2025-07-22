'use client'

import React from 'react'
import type { PricingBlock } from '@/payload-types'
import { PricingCard } from '../PricingCard'
import { TooltipProvider } from '@/components/motion-ui/tooltip'
import { cn } from '@/utilities/ui'

interface PricingBlock01Props {
  pricingCards: NonNullable<PricingBlock['pricingCards']>
  locale: string
  translations: {
    monthly: string
    annually: string
    includedSolutions: string
    integrations: string
    features: string
  }
  className?: string
}

export const PricingBlock01: React.FC<PricingBlock01Props> = ({
  pricingCards,
  locale,
  translations,
  className,
}) => {
  return (
    <section className={cn('', className)}>
      <div className="container max-w-screen-xl">
        {/* Pricing Cards Grid */}
        <TooltipProvider delayDuration={0}>
          <div className="grid items-stretch gap-4 md:grid-cols-2">
            {pricingCards.map((card, index) => (
              <PricingCard key={index} {...card} translations={translations} />
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  )
}
