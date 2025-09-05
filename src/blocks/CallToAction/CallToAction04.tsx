import React from 'react'

import type { CallToActionBlock } from '@/payload-types'
import type { CMSLinkType } from '@/components/Link'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

import * as motion from 'motion/react-client'
import { containerVariants } from '@/utilities/motion'
import { cn } from '@/utilities/ui'

type CallToActionProps = CallToActionBlock & {
  className?: string
}

export const CallToAction04: React.FC<CallToActionProps> = ({
  badge,
  richText,
  links,
  caption,
  list,
  mediaGroup,
  className,
}) => {
  return (
    <div className={cn('py-xl container', className)}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-background-neutral gap-md p-xl rounded-space-sm flex flex-col md:flex-row md:items-center md:justify-between"
      >
        {richText && (
          <RichText className="mx-0 mb-0 lg:max-w-[32rem]" data={richText} enableGutter={false} />
        )}

        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="lg" {...(link as CMSLinkType)} />
          })}
        </div>
      </motion.div>
    </div>
  )
}
