'use client'
import React, { useEffect, useRef, useState } from 'react'
import type { MetricsBlock as MetricsBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'
import { SlidingNumber } from '@/components/motion-ui/sliding-number'
import { useInView } from 'motion/react'

export const Metrics02: React.FC<MetricsBlockProps> = ({
  stats,
  blockImage: { media } = {},
  enableLogos,
  logos,
}) => {
  const renderIndicator = (indicator?: 'increase' | 'decrease' | 'noChange' | null) => {
    switch (indicator) {
      case 'increase':
        return (
          <Icon
            icon="material-symbols:arrow-upward-alt-rounded"
            className="size-6 text-base-tertiary"
            height="none"
          />
        )
      case 'decrease':
        return (
          <Icon
            icon="material-symbols:arrow-downward-alt-rounded"
            className="size-6 text-base-tertiary"
            height="none"
          />
        )
      default:
        return null
    }
  }

  const { logos: logosGroup, headline } = logos || {}

  const StatDisplay: React.FC<{ value?: string | null; className?: string }> = ({
    value,
    className,
  }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [count, setCount] = useState(0)
    const isInView = useInView(ref, {
      amount: 1,
      once: true,
    })

    const match = value?.match(/^([^\d\.\,]*)?(\d+(?:[.,]\d+)?)([^\d\.\,]*)?$/)

    let prefix = ''
    let numberStr = ''
    let suffix = ''
    let valueAsNumber = 0
    let isNumber = false

    if (match) {
      ;[, prefix = '', numberStr, suffix = ''] = match
      const normalizedNumberStr = numberStr.replace(',', '.')
      valueAsNumber = Number(normalizedNumberStr)
      isNumber = !Number.isNaN(valueAsNumber)
    }

    useEffect(() => {
      if (isInView && isNumber) {
        setCount(valueAsNumber)
      }
    }, [isInView, isNumber, valueAsNumber])

    if (!match || !value) {
      return <p className={className}>{value ?? ''}</p>
    }

    return (
      <div className={'inline-flex items-center whitespace-pre ' + className} ref={ref}>
        {prefix && <span>{prefix}</span>}
        <SlidingNumber value={count} />
        {suffix && <span>{suffix}</span>}
      </div>
    )
  }

  return (
    <div className="container py-xl">
      <div className="grid gap-xl lg:grid-cols-2 lg:items-center">
        {/* Image Section */}
        {media && typeof media === 'object' && (
          <div className="order-2 lg:order-1">
            <Media
              resource={media}
              className="h-auto w-full"
              imgClassName="h-auto w-full rounded-3xl object-cover"
            />
          </div>
        )}

        <div
          className={cn(
            'grid grid-cols-1 gap-4 md:grid-cols-2',
            stats?.length === 1 && 'lg:grid-cols-2',
          )}
        >
          {stats?.map((stat, index) => (
            <div key={stat.id || index} className="rounded-3xl bg-card p-6">
              <div className="flex h-full flex-col items-center justify-between">
                <StatDisplay
                  value={stat.value}
                  className="flex-1 text-(length:--text-h3) font-medium text-base-primary"
                />
                <div className="flex flex-row items-center justify-center text-center">
                  {renderIndicator(stat.indicator)}
                  <p className="text-body-md text-base-tertiary">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
          {enableLogos && logosGroup && logosGroup.length > 0 && (
            <div
              key={'logos'}
              className={cn(
                'flex w-full flex-row items-center rounded-3xl bg-card p-6',

                stats?.length === 1 && 'lg:col-span-1',
                stats?.length === 3 && 'lg:col-span-3',
                stats?.length === 4 && 'lg:col-span-2',
              )}
            >
              <div className="flex w-full flex-col items-start gap-space-md md:gap-space-lg">
                {headline && (
                  <p className="text-body-sm font-medium text-base-quaternary">{headline}</p>
                )}
                <ul
                  dir="ltr"
                  className="-mask-x-to-10% flex w-full flex-wrap items-center justify-center mask-x-from-90% mask-x-to-100% md:justify-between"
                >
                  <InfiniteSlider gap={48} className="">
                    {logosGroup.map((logo, i) => {
                      return (
                        <li key={i} className="flex items-center justify-center">
                          {logo && typeof logo === 'object' && (
                            <Media
                              imgClassName="h-6 w-auto object-contain"
                              priority
                              resource={logo}
                            />
                          )}
                        </li>
                      )
                    })}
                  </InfiniteSlider>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
