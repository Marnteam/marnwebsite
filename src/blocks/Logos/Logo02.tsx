'use client'
import React, { useState, useEffect } from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { AnimatedGroup } from '@/components/motion-ui/animated-group'
import { AnimatePresence } from 'motion/react'

interface Logo02Props {
  logos: MediaType[]
  className?: string
}

export const Logo02: React.FC<Logo02Props> = ({ logos, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Split logos into groups of 6
  const logosPerGroup = 6
  const logoGroups: MediaType[][] = []

  if (logos && logos.length > 0) {
    for (let i = 0; i < logos.length; i += logosPerGroup) {
      logoGroups.push(logos.slice(i, i + logosPerGroup))
    }

    // If we don't have enough logos to fill groups, repeat them
    if (logoGroups.length === 0) {
      logoGroups.push(logos)
    }
  }

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

  const currentLogos = logoGroups[currentIndex] || []

  return (
    <div className={cn('container w-full py-space-xl', className)}>
      <AnimatePresence mode="sync">
        <AnimatedGroup
          preset="flip"
          key={`logo-group-${currentIndex}`}
          className="grid grid-cols-2 items-center gap-space-lg perspective-midrange md:grid-cols-3 lg:grid-cols-6"
        >
          {currentLogos.map((logo, index) => (
            <div
              key={`${currentIndex}-${logo.id || index}`}
              className="flex items-center justify-center dark:invert"
            >
              {typeof logo === 'object' && logo !== null && (
                <Media resource={logo} imgClassName="h-space-md w-auto object-contain" />
              )}
            </div>
          ))}
        </AnimatedGroup>
      </AnimatePresence>
    </div>
  )
}
