'use client'
import React, { useState, useEffect } from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/MediaResponsive'
import { cn } from '@/utilities/ui'
import { AnimatedGroup } from '@/components/motion-ui/animated-group'

interface Logo03Props {
  logos: MediaType[]
  className?: string
}

export const Logo03: React.FC<Logo03Props> = ({ logos, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const logoGroups: MediaType[][] = []
  // Auto-rotate every 3 seconds
  useEffect(() => {
    if (logoGroups.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logoGroups.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [logoGroups.length])

  if (!logos || logos.length === 0) {
    return null
  }

  // Split logos into groups of 12 (6 per row, 2 rows)
  const logosPerGroup = 12

  for (let i = 0; i < logos.length; i += logosPerGroup) {
    logoGroups.push(logos.slice(i, i + logosPerGroup))
  }

  // If we don't have enough logos to fill groups, repeat them
  if (logoGroups.length === 0) {
    logoGroups.push(logos)
  }

  const currentLogos = logoGroups[currentIndex] || []

  // Split current logos into two rows for better visual balance
  const midpoint = Math.ceil(currentLogos.length / 2)
  const firstRow = currentLogos.slice(0, midpoint)
  const secondRow = currentLogos.slice(midpoint)

  return (
    <div className={cn('container w-full py-space-xl', className)}>
      <div className="space-y-lg">
        {/* First Row */}
        <AnimatedGroup
          preset="flip"
          key={`${currentIndex}-row1`}
          className="grid grid-cols-2 items-center gap-space-lg perspective-midrange md:grid-cols-3 lg:grid-cols-6"
        >
          {firstRow.map((logo, index) => (
            <div
              key={`${currentIndex}-row1-${logo.id || index}`}
              className="flex items-center justify-center dark:invert"
            >
              {typeof logo === 'object' && logo !== null && (
                <Media resource={logo} imgClassName="h-space-md w-auto object-contain" />
              )}
            </div>
          ))}
        </AnimatedGroup>

        {/* Second Row */}
        {secondRow.length > 0 && (
          <AnimatedGroup
            preset="flip"
            key={`${currentIndex}-row2`}
            className="grid grid-cols-2 items-center gap-space-lg perspective-midrange md:grid-cols-3 lg:grid-cols-6"
          >
            {secondRow.map((logo, index) => (
              <div
                key={`${currentIndex}-row2-${logo.id || index}`}
                className="flex items-center justify-center dark:invert"
              >
                {typeof logo === 'object' && logo !== null && (
                  <Media resource={logo} imgClassName="h-space-md w-auto object-contain" />
                )}
              </div>
            ))}
          </AnimatedGroup>
        )}
      </div>
    </div>
  )
}
