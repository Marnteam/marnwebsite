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
    <div className="bg-background gap-xs py-xl container grid grid-cols-1">
      {rows.map((row, index) => (
        <div
          key={index}
          className={cn('gap-xs grid w-full grid-cols-1', {
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
                className={cn('rounded-space-sm bg-background-neutral w-full p-4')}
              >
                {appReference && (
                  <AppReference appReference={appReference} className="py-xs px-xs" />
                )}
                <div
                  className={cn('gap-xs flex flex-col', {
                    'md:flex-row': size === 'full' || row?.length === 1,
                  })}
                >
                  {content && (
                    <div className="pe-md p-xs ps-xs gap-xs flex w-full flex-col">
                      {content.title && (
                        <h3 className="text-h3 text-base-primary font-medium">{content.title}</h3>
                      )}
                      {content.subtitle && <RichText data={content.subtitle} />}
                    </div>
                  )}
                  {image && (
                    <Media
                      resource={image}
                      className="group bg-background h-auto w-full overflow-hidden rounded-lg"
                      imgClassName="w-full group-hover:scale-105 transition-all duration-300 h-auto aspect-[4/3] object-cover"
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
