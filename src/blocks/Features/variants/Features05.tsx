'use client'
import React from 'react'
import { FeaturesBlock } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Badge } from '@/components/ui/badge'
import { motion } from 'motion/react'
import { containerVariants, itemsFling } from '@/utilities/motion'

export const Features05: React.FC<FeaturesBlock> = ({ columns }) => {
  if (!columns?.length) return null
  return (
    <motion.div
      className="py-xl gap-xs container grid grid-cols-1 md:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {columns.map((column, index) => {
        const { image, enableBadge, badge, richTextContent, enableCta, link } = column
        return (
          <motion.div key={index} variants={itemsFling} className="overflow-hidden border-0">
            <Card className="overflow-hidden border-0 p-4">
              <CardContent className="gap-xs flex flex-col">
                {image && (
                  <div className="h-auto w-full">
                    <Media
                      resource={image}
                      className="h-auto w-full overflow-hidden rounded-lg"
                      imgClassName="w-full h-auto object-cover"
                    />
                  </div>
                )}
                <div className="gap-xs p-xs flex flex-col">
                  {enableBadge && badge && <Badge {...badge} />}
                  {richTextContent && (
                    <RichText className={cn('mx-0')} data={richTextContent} enableGutter={false} />
                  )}
                  {enableCta && link?.label && (
                    <CMSLink {...link} variant="primary" className="mt-xs" />
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
