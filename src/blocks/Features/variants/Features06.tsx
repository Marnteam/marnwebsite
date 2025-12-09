'use client'
import React from 'react'
import { FeaturesBlock } from '@/payload-types'
import { Icon } from '@iconify-icon/react'

import { motion } from 'motion/react'
import { containerVariants, itemsFling } from '@/utilities/motion'

import { Media } from '@/components/MediaResponsive'
import RichText from '@/components/RichText'
import { CMSBadge as Badge } from '@/components/Badge'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'
import { motionConverters } from '@/components/RichText/motion-converters'

export const Features06: React.FC<FeaturesBlock> = ({
  columns,
  blockImage,
  blockHeader: { badge, headerText, links },
}) => {
  if (!columns || columns.length === 0) return null

  return (
    <div className="w-full bg-background py-space-xl">
      <div className="container py-space-xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-space-xs rounded-3xl bg-background-neutral p-4"
        >
          <div className="flex flex-col gap-space-xs md:flex-row">
            {blockHeader && (
              <div className="my-space-xs flex flex-col gap-space-md ps-space-xs pe-space-xl lg:basis-1/2">
                {(badge?.label || badge?.reference) && (
                  <motion.div variants={itemsFling}>
                    <Badge size="lg" {...badge} />
                  </motion.div>
                )}
                {headerText && (
                  <motion.div className="prose">
                    <RichText
                      data={headerText}
                      enableGutter={false}
                      disableContainer={true}
                      converters={motionConverters}
                    />
                  </motion.div>
                )}
                {Array.isArray(links) && links.length > 0 && (
                  <motion.ul className="col-span-2 flex w-full flex-row gap-2">
                    {links.map(({ link }, i) => {
                      return (
                        <motion.li key={i} className="" variants={itemsFling}>
                          <CMSLink className="w-full" size={'lg'} {...link} />
                        </motion.li>
                      )
                    })}
                  </motion.ul>
                )}
              </div>
            )}
            {blockImage && (
              <Media
                resource={blockImage}
                className="h-auto w-full overflow-hidden rounded-lg lg:basis-1/2"
                imgClassName="aspect-square h-auto w-full object-cover"
              />
            )}
          </div>
          <motion.div
            className="grid grid-cols-2 gap-space-xs p-space-xs md:grid-cols-(--columns)"
            style={
              { '--columns': `repeat(${columns.length}, minmax(0, 1fr))` } as React.CSSProperties
            }
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {columns.map((column, index) => {
              const { content, icon } = column
              return (
                <motion.div
                  key={index}
                  className="flex flex-col items-start gap-space-sm pe-space-sm"
                  variants={itemsFling}
                >
                  {icon && (
                    <div className="flex rounded-full bg-background-neutral-subtle p-space-xs">
                      <Icon
                        className="size-sm text-base-secondary"
                        height="none"
                        icon={`material-symbols:${icon}`}
                        color="currentColor"
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    {content?.title && (
                      <h3 className="text-body-md font-medium text-base-primary">
                        {content.title}
                      </h3>
                    )}
                    {content?.subtitle && (
                      <RichText data={content.subtitle} className="[&>p]:text-body-sm" />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
