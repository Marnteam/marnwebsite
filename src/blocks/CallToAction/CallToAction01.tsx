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
    <div className={cn('py-xl container', className)} ref={containerRef}>
      <div className="rounded-space-sm relative overflow-hidden">
        <div
          data-theme="dark"
          className="rounded-space-sm p-md gap-sm relative z-1 flex aspect-[9/16] h-auto w-full flex-col items-start justify-end overflow-hidden bg-transparent md:aspect-video md:flex-row md:items-end md:justify-between"
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
              imgClassName="object-cover rounded-space-sm overflow-hidden"
              media={mediaGroup}
            />
          </motion.div>
        )}
      </div>
    </div>
  )
}
