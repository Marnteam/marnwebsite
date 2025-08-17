'use client'

import React from 'react'
import { Media } from '@/components/Media'
import { FeaturesBlock } from '@/payload-types'
import { Icon } from '@iconify-icon/react'
import { BlockHeader } from '@/components/BlockHeader'
import { motion } from 'motion/react'
import { containerVariants, itemsFling } from '@/utilities/motion'
import RichText from '@/components/RichText'

export const Features07: React.FC<FeaturesBlock> = ({ columns, blockImage, blockHeader }) => {
  if (!columns || columns.length === 0) return null

  return (
    <div className="gap-md rounded-space-sm py-xl container flex flex-col">
      <div className="gap-md flex flex-col">
        {blockHeader && <BlockHeader {...blockHeader} className="px-0" />}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {blockImage && (
            <Media
              resource={blockImage}
              className="rounded-space-sm h-auto w-full overflow-hidden lg:basis-1/2"
              imgClassName="w-full h-auto aspect-[16/9] object-cover"
            />
          )}
        </motion.div>
      </div>
      <hr className="border-border" />
      <motion.div
        className="gap-xs grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
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
              className="gap-sm bg-background-neutral rounded-space-sm p-sm flex flex-col items-start"
              variants={itemsFling}
            >
              {icon && (
                <div className="bg-background-neutral-subtle p-xs inline grow-0 rounded-full">
                  <Icon
                    className="text-base-secondary size-sm"
                    height="none"
                    icon={`material-symbols:${icon}`}
                    color="currentColor"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                {content?.title && (
                  <h3 className="text-body-md text-base-primary font-medium">{content.title}</h3>
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
