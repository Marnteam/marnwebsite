'use client'
import React from 'react'
import { motion } from 'motion/react' // Corrected import path
import { cn } from '@/utilities/ui'

import { CMSLink, CMSLinkType } from './Link'

import { Icon } from '@iconify-icon/react'

const linkBlockVariants = {
  initial: {
    borderRadius: '1.5rem',
    // ease: [0.645, 0.045, 0.355, 1],
    // duration: 0.2,
    type: 'spring',
    stiffness: 200,
    damping: 20,
    mass: 1,
  },
  hover: {
    borderRadius: '40rem',
    // ease: [0.645, 0.045, 0.355, 1],
    // duration: 0.2,
    type: 'spring',
    stiffness: 200,
    damping: 20,
    mass: 1,
  },
}

interface LinkBlockProps {
  link: CMSLinkType
  label?: string
  CTALabel?: string
  className?: string
  position?: 'corner' | 'center'
}

export const LinkBlock: React.FC<LinkBlockProps> = ({
  link,
  label,
  CTALabel,
  position = 'center',
  className,
}) => {
  return (
    <motion.div
      variants={linkBlockVariants}
      initial="initial"
      whileHover="hover"
      layout
      className={cn('-rounded-2xl -lg:rounded-3xl h-auto w-full overflow-hidden', className)}
    >
      <CMSLink
        {...link}
        label={null}
        variant="inline"
        className={cn(
          'group relative flex h-full items-center justify-center rounded-none bg-neutral p-space-sm text-center text-h4 font-medium text-inverted-primary transition-all duration-300 ease-in-out-quad hover:bg-neutral/90 hover:no-underline',
          position === 'corner' && 'items-start justify-start text-start',
        )}
      >
        <span
          data-position={position}
          className="text-h4 transition-all duration-200 ease-in-out-cubic group-hover:opacity-0 data-[position=center]:group-hover:-translate-x-full data-[position=corner]:group-hover:translate-x-full"
        >
          {label}
        </span>

        <span className="absolute inset-0 flex translate-x-1/2 items-center justify-center text-h4 opacity-0 transition-all duration-200 ease-in-out-cubic group-hover:translate-x-0 group-hover:opacity-100">
          {/* <ArrowRight className="size-xl text-inverted-primary rtl:rotate-180" /> */}
          {CTALabel}
          <Icon
            icon="tabler:caret-left-filled"
            height="none"
            className="size-xl text-inverted-primary ltr:rotate-180"
          />
        </span>

        {position === 'corner' && (
          <span className="absolute end-space-sm bottom-space-sm transition-all duration-200 ease-in-out-cubic group-hover:-translate-x-full group-hover:opacity-0">
            <Icon
              icon="tabler:caret-left-filled"
              height="none"
              className="size-h4 text-inverted-primary ltr:rotate-180"
            />
          </span>
        )}
      </CMSLink>
    </motion.div>
  )
}
