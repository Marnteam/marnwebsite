'use client'
import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import type { MetricsBlock as MetricsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'
import { Media } from '@/components/MediaResponsive'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

export const Metrics01: React.FC<MetricsBlockProps> = ({ stats, enableLogos, logos }) => {
  const { logos: logosGroup, headline } = logos || {}
  const renderIndicator = (indicator?: 'increase' | 'decrease' | 'noChange' | null) => {
    switch (indicator) {
      case 'increase':
        return (
          <Icon
            icon="material-symbols:arrow-upward-alt-rounded"
            className="text-base-tertiary size-6"
            height="none"
          />
        )
      case 'decrease':
        return (
          <Icon
            icon="material-symbols:arrow-downward-alt-rounded"
            className="text-base-tertiary size-6"
            height="none"
          />
        )
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
            <div className="flex h-full flex-col items-center justify-between">
              <p className="text-h3 font-medium">{stat.value}</p>
              <div className="flex flex-1 flex-row items-center justify-center text-center">
                {renderIndicator(stat.indicator)}
                <p className="text-base-tertiary text-body-md">{stat.label}</p>
              </div>
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
