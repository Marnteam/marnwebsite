'use client'

import React from 'react'
import { usePricing } from '@/providers/Pricing'
import { cn } from '@/utilities/ui'

export const PricingToggle = ({ className }: { className?: string }) => {
  const { isMonthly, setIsMonthly } = usePricing()

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative flex items-center rounded-3xl bg-background-neutral-subtle p-1">
        <button
          onClick={() => setIsMonthly(false)}
          className={cn(
            'rounded-space-xs relative z-10 px-space-md py-space-sm text-body-sm font-medium transition-all',
            !isMonthly
              ? 'bg-background-neutral text-base-primary shadow-sm'
              : 'text-base-tertiary hover:text-base-secondary',
          )}
        >
          Annual
        </button>
        <button
          onClick={() => setIsMonthly(true)}
          className={cn(
            'rounded-space-xs relative z-10 px-space-md py-space-sm text-body-sm font-medium transition-all',
            isMonthly
              ? 'bg-background-neutral text-base-primary shadow-sm'
              : 'text-base-tertiary hover:text-base-secondary',
          )}
        >
          Monthly
        </button>
      </div>
    </div>
  )
}
