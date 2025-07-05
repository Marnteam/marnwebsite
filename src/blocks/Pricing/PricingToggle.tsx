'use client'

import React from 'react'
import { usePricing } from '@/providers/Pricing'
import { cn } from '@/utilities/ui'
import { Tabs, TabsList, TabsTrigger } from '@/components/motion-ui/tabs'

export const PricingToggle = ({
  className,
  locale,
}: {
  className?: string
  locale: 'en' | 'ar'
}) => {
  const { isMonthly, setIsMonthly } = usePricing()

  const handleValueChange = (value: string) => {
    setIsMonthly(value === 'monthly')
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Tabs
        value={isMonthly ? 'monthly' : 'annual'}
        onValueChange={handleValueChange}
        className="w-full"
      >
        <TabsList
          className="w-full"
          transition={{
            type: 'spring',
            stiffness: 800,
            damping: 100,
            mass: 4,
          }}
        >
          <TabsTrigger value="annual">{locale === 'ar' ? 'سنوي' : 'Yearly'}</TabsTrigger>
          <TabsTrigger value="monthly">{locale === 'ar' ? 'شهري' : 'Monthly'}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}
