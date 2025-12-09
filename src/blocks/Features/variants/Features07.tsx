'use client'

import React from 'react'
import { Media } from '@/components/MediaResponsive'
import { FeaturesBlock } from '@/payload-types'
import { Icon } from '@iconify-icon/react'
import { BlockHeader } from '@/components/BlockHeader'
import { motion } from 'motion/react'
import { containerVariants, itemsFling } from '@/utilities/motion'
import RichText from '@/components/RichText'

export const Features07: React.FC<FeaturesBlock> = ({ columns, blockImage }) => {
  if (!columns || columns.length === 0) return null

  return (
    <div className="container flex flex-col gap-space-xs rounded-3xl py-space-xl">
      <motion.div
        className="flex- flex"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {blockImage && (
          <Media
            resource={blockImage}
            className="h-auto w-full overflow-hidden rounded-3xl lg:basis-1/2"
            imgClassName="aspect-[16/9] h-auto w-full object-cover"
          />
        )}
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-space-xs md:grid-cols-2 lg:grid-cols-(--columns)"
        style={{ '--columns': `repeat(${columns.length}, minmax(0, 1fr))` } as React.CSSProperties}
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
              className="flex flex-col items-start gap-space-sm rounded-3xl bg-background-neutral p-space-sm pe-space-md"
              variants={itemsFling}
            >
              {icon && (
                <div className="inline-flex grow-0 rounded-full bg-background-neutral-subtle p-space-xs">
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
                  <h3 className="text-body-md font-medium text-base-primary">{content.title}</h3>
                )}
                {content?.subtitle && (
                  <RichText data={content.subtitle} className="[&>p]:text-body-sm" />
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
