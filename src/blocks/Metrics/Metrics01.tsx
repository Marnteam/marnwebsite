'use client'
import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import type { MetricsBlock as MetricsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'
import { Media } from '@/components/MediaResponsive'

export const Metrics01: React.FC<MetricsBlockProps> = ({ stats, enableLogos, logos }) => {
  const { logos: logosGroup, headline } = logos || {}
  const renderIndicator = (indicator?: 'increase' | 'decrease' | 'noChange' | null) => {
    switch (indicator) {
      case 'increase':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'decrease':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="py-xl container">
      <div
        className={cn(
          'gap-xs grid grid-cols-2 content-center',
          stats?.length === 1 && 'grid-cols-1 lg:grid-cols-2',
          stats?.length === 3 && 'lg:grid-cols-3',
        )}
      >
        {stats?.map((stat, index) => (
          <div
            key={stat.id || index}
            id={`stat-${index}`}
            className={cn(
              'bg-card rounded-space-sm p-6',
              stats?.length === 3 && index === 2 && 'max-lg:col-span-2',
            )}
          >
            <div className="flex h-full items-center justify-between">
              <div className="flex-1 text-center">
                <p className="text-h3 font-medium">{stat.value}</p>
                <p className="text-base-tertiary text-body-md">{stat.label}</p>
              </div>
              {renderIndicator(stat.indicator)}
            </div>
          </div>
        ))}
        {enableLogos && logosGroup && logosGroup.length > 0 && (
          <div
            key={'logos'}
            className={cn(
              'bg-background-neutral rounded-space-sm flex w-full flex-row items-center p-6 pb-8',
              stats?.length === 1 && 'lg:col-span-1',
              stats?.length === 3 && 'col-span-2 lg:col-span-3',
              stats?.length === 4 && 'lg:col-span-2',
              'col-span-full',
            )}
          >
            <div className="gap-space-md flex w-full flex-col items-center">
              {headline && <p className="text-body-md text-base-tertiary">{headline}</p>}
              <ul
                dir="ltr"
                className="flex w-full flex-wrap items-center justify-center mask-x-from-90% mask-x-to-100% md:justify-between"
              >
                <InfiniteSlider gap={48} className="dark:invert">
                  {logosGroup.map((logo, i) => {
                    return (
                      <li key={i} className="flex items-center justify-center">
                        {logo && typeof logo === 'object' && (
                          <Media
                            imgClassName="h-14 w-auto object-contain invert-0"
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
  )
}
