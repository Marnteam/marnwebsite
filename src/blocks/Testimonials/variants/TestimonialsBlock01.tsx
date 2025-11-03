'use client'

import React from 'react'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import type { Customer, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/MediaResponsive'

interface TestimonialsBlock01 {
  testimonials: Customer[]
  linkLabel?: string // Optional link label from parent
}

// Define predictable cell size patterns WITH associated types
const cellPatterns = [
  { classes: 'col-span-2', type: 'quote' }, // Wide Quote
  { classes: 'col-span-1', type: 'image' }, // Standard Image
  // { classes: 'col-span-1', type: 'stat' }, // Standard Stat
  { classes: 'col-span-1', type: 'logo' }, // Standard Logo
  { classes: 'col-span-2', type: 'quote' }, // Standard Quote
  { classes: 'col-span-1', type: 'image' }, // Standard Image
  // Add more patterns as needed, combining size and intended type
]

export const TestimonialsBlock01: React.FC<TestimonialsBlock01> = ({ testimonials }) => {
  const gridItems = testimonials.map((customer, index) => {
    // Get the pattern for the current index
    const pattern = cellPatterns[index % cellPatterns.length]
    const assignedType = pattern.type as 'quote' | 'image' | 'logo' // Removed 'stat'
    const sizeClasses = pattern.classes

    return {
      ...customer,
      cellType: assignedType, // The type used for rendering content (might be fallback)
      sizeClasses, // The size classes from the pattern
    }
  })
  return (
    <section className="container py-space-xl md:py-space-2xl lg:py-space-3xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {gridItems.map((customer) => {
          const { id, testimonial: testimonialData, cellType, sizeClasses } = customer
          const { authorInfo, company, quote } = testimonialData
          const { companyLogo } = company

          const avatar = authorInfo?.avatar as MediaType | undefined
          const logo = companyLogo as MediaType | undefined // Renamed for clarity
          // const firstStat = stats && stats.length > 0 ? stats[0] : null

          // Theme V: Background, Radius (Padding removed)
          const baseClasses =
            'bg-background-neutral flex flex-col justify-between overflow-hidden rounded-3xl'
          // Apply size classes and conditionally add padding
          const itemClasses = cn(
            baseClasses,
            sizeClasses,
            // Add p-space-md unless it's an image or logo cell
            cellType !== 'image' ? 'p-space-md' : 'p-0',
            cellType === 'quote' ? '' : 'aspect-square h-auto w-full',
          )

          return (
            <div key={id} className={itemClasses}>
              {cellType === 'quote' && quote && (
                <>
                  <div className="mb-4 w-full">
                    <RichText
                      data={quote}
                      enableProse={false}
                      className="text-h4 font-medium text-base-primary"
                    />
                  </div>
                  <div className="border-base mt-auto border-t pt-space-sm text-body-sm font-medium">
                    {authorInfo?.name}
                    {authorInfo?.title && (
                      <span className="text-caption block text-muted-foreground">
                        {authorInfo.title}
                      </span>
                    )}
                  </div>
                </>
              )}

              {cellType === 'image' && avatar && (
                <Media
                  resource={avatar}
                  fill
                  className="relative h-full w-full rounded-lg"
                  imgClassName="h-full w-full rounded-lg object-cover"
                />
              )}

              {/* {cellType === 'stat' && firstStat && ( */}
              {/*  <> */}
              {/*    <div className="text-h3 text-base-primary flex flex-grow flex-col items-start text-start font-medium"> */}
              {/*      <p className=""> */}
              {/*        {firstStat.value} */}
              {/*        {firstStat.isPercentage ? '%' : ''} */}
              {/*      </p> */}
              {/*      <p className="">{firstStat.label}</p> */}
              {/*    </div> */}
              {/*  </> */}
              {/* )} */}

              {cellType === 'logo' && logo && (
                <div className="flex h-full w-full flex-col items-center justify-center p-space-md">
                  <Media
                    resource={logo}
                    className="w-full"
                    imgClassName="mx-auto h-auto w-full opacity-70"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
