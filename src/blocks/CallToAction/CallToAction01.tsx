'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

import type { CallToActionBlock } from '@/payload-types'
import type { CMSLinkType } from '@/components/Link'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/MediaResponsive'
import { cn } from '@/utilities/ui'

type CallToActionProps = CallToActionBlock & {
  className?: string
}

export const CallToAction01: React.FC<CallToActionProps> = ({
  badge,
  richText,
  links,
  caption,
  list,
  mediaGroup,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-50%', '50%'])

  return (
    <div className={cn('container py-xl', className)} ref={containerRef}>
      <div className="relative overflow-hidden rounded-3xl">
        <div
          data-theme="dark"
          className="relative z-1 flex aspect-[9/16] h-auto w-full flex-col items-start justify-end gap-sm overflow-hidden rounded-3xl bg-transparent p-md md:aspect-video md:flex-row md:items-end md:justify-between"
        >
          {richText && (
            <RichText className="mx-0 lg:max-w-[32rem]" data={richText} enableGutter={false} />
          )}
          <div className="flex flex-row gap-4">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...(link as CMSLinkType)} />
            })}
          </div>
        </div>
        {mediaGroup?.media && (
          <motion.div
            style={{ y }}
            className={cn('absolute inset-0 z-0 h-full w-full overflow-hidden')}
          >
            <Media
              fill
              className="relative h-full w-full object-cover"
              imgClassName="overflow-hidden rounded-3xl object-cover"
              media={mediaGroup}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
