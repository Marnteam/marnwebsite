'use client'
import React from 'react'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { CMSBadge as Badge } from '@/components/Badge'
import { cn } from '@/utilities/ui'
import { BlockHeaderType } from '@/types/blockHeader'
import { countWords, extractTextFromLexical } from '@/utilities/extractTextFromLexical'
import { motionConverters } from '../RichText/motion-converters'
import { motion } from 'motion/react'
import { containerVariants, itemsFling } from '@/utilities/motion'

export const BlockHeader: React.FC<BlockHeaderType> = (props) => {
  const {
    headerText,
    links,
    badge,
    className,
    badgeClassName,
    richTextClassName,
    linksClassName,
    type,
  } = props

  const headerTextLength = countWords(extractTextFromLexical(headerText))

  if (!headerTextLength) return null

  return (
    <motion.div
      className={cn(
        'container grid grid-cols-1 justify-items-start gap-y-space-md pt-[clamp(4rem,2.4rem+4vw,6rem)]',
        type === 'split' && 'md:grid-cols-2 md:gap-space-sm',
        type === 'center' && 'justify-items-center',
        className,
      )}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      variants={containerVariants}
      viewport={{ once: true }}
    >
      {(badge?.label || badge?.reference) && (
        <motion.div className="col-span-2" variants={itemsFling}>
          <Badge size="lg" {...badge} className={badgeClassName} />
        </motion.div>
      )}

      {headerText && (
        <motion.div
          className={cn(
            'prose',
            'mx-0 w-full max-w-4xl',
            type === 'center' && 'text-center text-pretty',
            type === 'split' &&
              'md:col-span-2 md:grid md:grid-cols-subgrid *:md:pe-(length:--spacing-space-xl)',
            '[&_p]:text-body-lg',
            richTextClassName,
          )}
        >
          <RichText
            data={headerText}
            enableGutter={false}
            disableContainer={true}
            converters={motionConverters}
          />
        </motion.div>
      )}
      {Array.isArray(links) && links.length > 0 && (
        <motion.ul
          className={cn(
            'col-span-2 flex w-full flex-row gap-1',
            type === 'center' && 'justify-center',
            type === 'split' && 'md:col-start-2',
            linksClassName,
          )}
        >
          {links.map(({ link }, i) => {
            return (
              <motion.li key={i} className="" variants={itemsFling}>
                <CMSLink className="w-full" size={'lg'} {...link} />
              </motion.li>
            )
          })}
        </motion.ul>
      )}
    </motion.div>
  )
}

const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  },
}
