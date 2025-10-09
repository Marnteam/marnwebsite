import React from 'react'

import type { CallToActionBlock } from '@/payload-types'
import type { CMSLinkType } from '@/components/Link'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/MediaResponsive'

import * as motion from 'motion/react-client'
import { containerVariants } from '@/utilities/motion'
import { cn } from '@/utilities/ui'

type CallToActionProps = CallToActionBlock & {
  className?: string
}

export const CallToAction03: React.FC<CallToActionProps> = ({
  badge,
  richText,
  links,
  caption,
  list,
  mediaGroup,
  className,
}) => {
  return (
    <div className={cn('container py-xl', className)}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center gap-sm rounded-3xl bg-background-neutral"
      >
        <div className="flex flex-col items-center gap-sm px-md pt-space-2xl">
          {richText && (
            <RichText className="mb-0 text-center" data={richText} enableGutter={false} />
          )}
          <div className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...(link as CMSLinkType)} />
            })}
          </div>
        </div>
        {mediaGroup?.media && (
          <Media media={mediaGroup} imgClassName="rounded-lg" className="m-4 overflow-hidden" />
        )}
      </motion.div>
    </div>
  )
}
