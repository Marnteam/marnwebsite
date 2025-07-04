'use client'

import { Media } from '@/components/MediaResponsive'
import { Media as MediaType } from '@/payload-types'
import { motion } from 'motion/react'
// import MarnAppIcon from 'public/marn-app-icon.svg'
import Image from 'next/image'

const parentVariants = {
  initial: {},
  animate: {},
}

const iconVariants = {
  initial: { opacity: 1 },
  animate: { opacity: [1, 0, 1] },
}

const dotVariants = {
  initial: { opacity: 1 },
  animate: { opacity: [1, 0, 1] },
}

export const ConnectingIcons = ({ icon }: { icon: MediaType }) => {
  return (
    <motion.div
      className="flex flex-row items-center gap-4"
      variants={parentVariants}
      initial="initial"
      animate="animate"
      transition={{
        staggerChildren: 0.5,
        repeat: Infinity,
        repeatType: 'loop',
        duration: 2,
      }}
    >
      <motion.div
        className="size-16 rounded-2xl"
        variants={iconVariants}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
        style={{ willChange: 'opacity' }}
      >
        <Media resource={icon} imgClassName="size-16 rounded-2xl" />
      </motion.div>
      <motion.div className="flex flex-row items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-2 rounded-full bg-neutral-400"
            variants={dotVariants}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="size-16 rounded-2xl"
        variants={iconVariants}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
        style={{ willChange: 'opacity' }}
      >
        <Image
          src="/marn-app-icon.svg"
          alt="Marn App Icon"
          width={64}
          height={64}
          className="size-16 rounded-2xl"
        />
      </motion.div>
    </motion.div>
  )
}
