'use client'
import React from 'react'
import { motion } from 'motion/react'
import { containerVariants, itemsFling } from '@/utilities/motion'
import { cn } from '@/utilities/ui'

import type { CallToActionBlock } from '@/payload-types'
import type { CMSLinkType } from '@/components/Link'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Icon } from '@iconify-icon/react'

type CallToActionProps = CallToActionBlock & {
  className?: string
}

export const CallToAction02: React.FC<CallToActionProps> = ({
  links,
  richText,
  list,
  className,
}) => {
  return (
    <div className={cn('py-xl container', className)}>
      <motion.div
        className={cn(
          'bg-background-neutral gap-xl px-xl rounded-space-sm flex flex-col items-center py-[calc(var(--spacing-xl)*2)]',
        )}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="gap-lg flex flex-col items-center">
          {richText && (
            <RichText className="mb-0 text-center" data={richText} enableGutter={false} />
          )}
          <div className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...(link as CMSLinkType)} />
            })}
          </div>
        </div>
        <hr className="border-border w-full" />
        {list && (
          <div
            className="gap-sm grid w-full grid-cols-2 md:grid-cols-(--columns)"
            style={
              { '--columns': `repeat(${list?.length}, minmax(0, 1fr))` } as React.CSSProperties
            }
          >
            {list.map((column, index) => {
              const { title, subtitle, icon } = column
              return (
                <motion.div
                  key={index}
                  variants={itemsFling}
                  className="gap-sm flex flex-col items-start"
                >
                  {icon && (
                    <div className="bg-background-neutral-subtle p-xs inline rounded-full">
                      <Icon
                        className="text-base-secondary size-sm"
                        height="none"
                        icon={`material-symbols:${icon}`}
                        color="currentColor"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    {title && (
                      <h3 className="text-body-md text-base-primary font-medium">{title}</h3>
                    )}
                    {subtitle && <p className="text-body-sm text-base-secondary">{subtitle}</p>}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </motion.div>
    </div>
  )
}
