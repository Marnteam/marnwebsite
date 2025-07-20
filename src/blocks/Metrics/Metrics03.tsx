import React from 'react'
import type { MetricsBlock as MetricsBlockProps } from '@/payload-types'
import { StructuredTable } from '@/components/Table'
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'
import { Media } from '@/components/Media'

export const Metrics03: React.FC<MetricsBlockProps> = ({ table, enableLogos, logos }) => {
  const { logos: logosGroup, headline } = logos || {}

  return (
    <div className="py-xl relative container">
      {table && <StructuredTable table={table} />}
      {enableLogos && logos && logosGroup && logosGroup.length > 0 && (
        <div className="gap-space-md mt-md md:gap-space-lg flex w-full flex-col items-start">
          {headline && <p className="text-body-sm text-base-quaternary font-medium">{headline}</p>}
          <ul
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
          </ul>
        </div>
      )}
    </div>
  )
}
