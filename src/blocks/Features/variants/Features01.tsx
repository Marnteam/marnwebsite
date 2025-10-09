'use client'
import React from 'react'
import { FeaturesBlock } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { AppReference } from '@/components/AppReference'
import RichText from '@/components/RichText'
import { motion } from 'motion/react'
import { itemVariants } from '@/utilities/motion'

export const Features01: React.FC<FeaturesBlock> = ({ columns }) => {
  if (!columns?.length) return null

  const rows: FeaturesBlock['columns'][] = []

  let i = 0
  while (i < columns.length) {
    if (columns[i]?.size === 'full') {
      // If column is full-width, add it as a single-item row
      rows.push([columns[i]])
      i += 1
    } else {
      // Otherwise add up to two columns per row
      const row = columns.slice(i, i + 2)
      rows.push(row)
      i += 2
    }
  }

  return (
    <div className="container grid grid-cols-1 gap-xs bg-background py-xl">
      {rows.map((row, index) => (
        <div
          key={index}
          className={cn('grid w-full grid-cols-1 gap-xs', {
            'md:grid-cols-2': row?.length === 2,
          })}
        >
          {row?.map((column, index) => {
            const { content, image, appReference, size = 'half' } = column
            return (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={itemVariants}
                className={cn('w-full rounded-3xl bg-background-neutral p-4')}
              >
                {appReference && (
                  <AppReference appReference={appReference} className="px-xs py-xs" />
                )}
                <div
                  className={cn('flex flex-col gap-xs', {
                    'md:flex-row': size === 'full' || row?.length === 1,
                  })}
                >
                  {content && (
                    <div className="flex w-full flex-col gap-xs p-xs ps-xs pe-md">
                      {content.title && (
                        <h3 className="text-h3 font-medium text-base-primary">{content.title}</h3>
                      )}
                      {content.subtitle && <RichText data={content.subtitle} />}
                    </div>
                  )}
                  {image && (
                    <Media
                      resource={image}
                      className="group h-auto w-full overflow-hidden rounded-lg bg-background"
                      imgClassName="aspect-[4/3] h-auto w-full object-cover transition-all duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
