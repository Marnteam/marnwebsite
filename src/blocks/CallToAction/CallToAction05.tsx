'use client'
import React, { useRef } from 'react'
import type { CallToActionBlock } from '@/payload-types'
import type { CMSLinkType } from '@/components/Link'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/MediaResponsive'
import { motion, useScroll } from 'motion/react'
import { useTransform } from 'motion/react'
import { cn } from '@/utilities/ui'

type CallToActionProps = CallToActionBlock & {
  className?: string
}

export const CallToAction05: React.FC<CallToActionProps> = ({
  badge,
  richText,
  links,
  caption,
  list,
  mediaGroup,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  // Parallax: as the container scrolls into view, move the image up slightly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  // Parallax: image moves up to -40px as you scroll through the block
  const y = useTransform(scrollYProgress, [0, 1], ['-50%', '50%'])

  return (
    <div data-theme="dark" className="bg-background-neutral py-xl" ref={containerRef}>
      <div
        className={cn(
          'container flex flex-col items-center gap-space-md rounded-3xl px-md py-xl md:flex-row md:items-center md:justify-between',
          className,
        )}
      >
        <motion.div
          style={{ y }}
          className="mx-auto flex flex-col items-start gap-space-sm max-md:w-full"
        >
          {richText && (
            <RichText
              className="mb-0 text-start max-md:mx-0"
              data={richText}
              enableGutter={false}
            />
          )}
          <div className="flex w-full flex-row justify-start gap-8">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...(link as CMSLinkType)} />
            })}
          </div>
        </motion.div>
        {mediaGroup?.media && (
          <Media
            media={mediaGroup}
            className="overflow-hidden rounded-3xl md:max-w-[32rem] md:basis-1/2"
          />
        )}
      </div>
    </div>
  )
}
