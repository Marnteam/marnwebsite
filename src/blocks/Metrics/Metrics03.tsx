import React from 'react'
import type { MetricsBlock as MetricsBlockProps } from '@/payload-types'
import { StructuredTable } from '@/components/Table'
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'
import { Media } from '@/components/MediaResponsive'

export const Metrics03: React.FC<MetricsBlockProps> = ({ table, enableLogos, logos }) => {
  const { logos: logosGroup, headline } = logos || {}

  return (
    <div className="relative container py-space-xl">
      {table && <StructuredTable table={table} />}
      {enableLogos && logos && logosGroup && logosGroup.length > 0 && (
        <div className="mt-space-md flex w-full flex-col items-start gap-space-md md:gap-space-lg">
          {headline && <p className="text-body-sm font-medium text-base-tertiary">{headline}</p>}
          <div
            dir="ltr"
            className="-mask-x-to-10% flex w-full flex-wrap items-center justify-center mask-x-from-90% mask-x-to-100% md:justify-between"
          >
            <InfiniteSlider gap={48} className="">
              {logosGroup.map((logo, i) => {
                return (
                  <li key={i} className="flex items-center justify-center">
                    {logo && typeof logo === 'object' && (
                      <Media imgClassName="h-14 w-auto object-contain" priority resource={logo} />
                    )}
                  </li>
                )
              })}
            </InfiniteSlider>
          </div>
        </div>
      )}
    </div>
  )
}
