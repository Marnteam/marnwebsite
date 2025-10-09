'use client'
import React from 'react'
import { Media } from '@/components/Media'
import { FeaturesBlock } from '@/payload-types'
import { Icon } from '@iconify-icon/react'
import { BlockHeader } from '@/components/BlockHeader'
import { motion } from 'motion/react'
import { containerVariants, itemsFling } from '@/utilities/motion'
import RichText from '@/components/RichText'

export const Features06: React.FC<FeaturesBlock> = ({ columns, blockImage, blockHeader }) => {
  if (!columns || columns.length === 0) return null
  return (
    <div className="w-full bg-background py-xl">
      <div className="container py-xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-xs rounded-3xl bg-background-neutral p-4"
        >
          <div className="flex flex-col gap-xs md:flex-row">
            <div className="mt-xs flex w-full flex-col gap-md px-xs lg:basis-1/2">
              {blockHeader && (
                <BlockHeader
                  {...blockHeader}
                  richTextClassName="auto-rows-auto"
                  className="h-full grid-cols-1 grid-rows-[auto_1fr_auto] px-0"
                  type="start"
                />
              )}
            </div>
            {blockImage && (
              <Media
                resource={blockImage}
                className="h-auto w-full overflow-hidden rounded-lg lg:basis-1/2"
                imgClassName="aspect-square h-auto w-full object-cover"
              />
            )}
          </div>
          <motion.div
            className="grid grid-cols-2 gap-xs p-xs md:grid-cols-(--columns)"
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
                  className="flex flex-col items-start gap-sm pe-sm"
                  variants={itemsFling}
                >
                  {icon && (
                    <div className="flex rounded-full bg-background-neutral-subtle p-xs">
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
