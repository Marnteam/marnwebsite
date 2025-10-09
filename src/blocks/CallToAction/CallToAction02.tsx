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
    <div className={cn('relative container overflow-hidden py-xl', className)}>
      <motion.div
        className={cn(
          'relative flex flex-col items-center gap-xl overflow-hidden rounded-3xl px-xl py-[calc(var(--spacing-xl)*2)]',
        )}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <motion.div className="z-1 flex flex-col items-center gap-lg">
          {richText && (
            <motion.div variants={itemsFling}>
              <RichText className="mb-0 text-center" data={richText} enableGutter={false} />
            </motion.div>
          )}
          <motion.div variants={itemsFling} className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...(link as CMSLinkType)} />
            })}
          </motion.div>
        </motion.div>
        <motion.hr variants={itemsFling} className="z-1 w-full border-border" />
        {list && (
          <div
            className="z-1 grid w-full grid-cols-2 gap-sm md:grid-cols-(--columns)"
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
                  className="flex flex-col items-start gap-sm"
                >
                  {icon && (
                    <div className="inline aspect-square rounded-full bg-background-neutral-subtle p-xs">
                      <Icon
                        className="size-sm text-base-secondary"
                        height="none"
                        icon={`material-symbols:${icon}`}
                        color="currentColor"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    {title && (
                      <h3 className="text-body-md font-medium text-base-primary">{title}</h3>
                    )}
                    {subtitle && <p className="text-body-sm text-base-secondary">{subtitle}</p>}
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
        <motion.div
          // style={{
          //   scaleX: useTransform(scrollYProgress, [0, 1], [0.8, 1]),
          // }}
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {
              opacity: 1,
              scale: 0.9,
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 800,
                damping: 80,
                mass: 4,
              },
            },
          }}
          viewport={{ once: false, amount: 0.05 }}
          className="absolute inset-0 mx-auto rounded-3xl bg-background-neutral"
        />
      </motion.div>
    </div>
  )
}
