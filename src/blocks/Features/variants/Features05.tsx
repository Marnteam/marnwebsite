'use client'
import React from 'react'
import { FeaturesBlock } from '@/payload-types'
import { Card, CardContent } from '@/components/ui/card'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { CMSBadge as Badge } from '@/components/Badge'
import { motion } from 'motion/react'
import { containerVariants, itemsFling } from '@/utilities/motion'

export const Features05: React.FC<FeaturesBlock> = ({ columns }) => {
  if (!columns?.length) return null
  return (
    <motion.div
      className="container grid grid-cols-1 gap-space-xs py-space-xl md:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {columns.map((column, index) => {
        const { image, enableBadge, badge, content, enableCta, link } = column
        return (
          <motion.div key={index} variants={itemsFling} className="overflow-hidden border-0">
            <Card className="overflow-hidden border-0 p-4">
              <CardContent className="flex flex-col gap-space-xs">
                {image && (
                  <div className="h-auto w-full">
                    <Media
                      resource={image}
                      className="h-auto w-full overflow-hidden rounded-lg"
                      imgClassName="h-auto w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-space-xs p-space-xs">
                  {enableBadge && badge && <Badge {...badge} />}
                  {content && (
                    <div className="flex flex-col gap-space-xs">
                      {content.title && (
                        <h3 className="text-h2 font-medium text-base-primary">{content.title}</h3>
                      )}
                      {content.subtitle && <RichText data={content.subtitle} />}
                    </div>
                  )}
                  {enableCta && link?.label && (
                    <CMSLink {...link} variant="primary" className="mt-space-xs" />
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
