'use client'
import { ReactNode } from 'react'
import { motion, Variants } from 'motion/react'
import React from 'react'

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing'

export type AnimatedGroupProps = {
  children: ReactNode
  className?: string
  variants?: {
    container?: Variants
    item?: Variants
  }
  preset?: PresetType
  as?: keyof React.JSX.IntrinsicElements
  asChild?: keyof React.JSX.IntrinsicElements
}

const defaultContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const presetVariants: Record<PresetType, Variants> = {
  fade: {
    exit: { opacity: 0 },
  },
  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
    exit: { y: -20 },
  },
  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
    exit: { scale: 0.8 },
  },
  blur: {
    hidden: { filter: 'blur(4px)' },
    visible: { filter: 'blur(0px)' },
    exit: { filter: 'blur(4px)' },
  },
  'blur-slide': {
    hidden: { filter: 'blur(4px)', y: 20 },
    visible: { filter: 'blur(0px)', y: 0 },
    exit: { filter: 'blur(4px)', y: -20 },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    exit: {
      scale: 0.5,
    },
  },
  //requires a perspective-* on parent
  flip: {
    hidden: {
      transform: 'rotateX(-90deg)',
    },
    visible: {
      transform: 'rotateX(0deg)',
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 25,
        duration: 0.6,
      },
    },
    exit: {
      transform: 'rotateX(90deg)',
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 25,
        duration: 0.6,
      },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
    exit: {
      y: 50,
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
    exit: {
      rotate: 180,
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: { type: 'spring', stiffness: 300, damping: 8 },
    },
    exit: {
      rotate: 10,
    },
  },
}

const addDefaultVariants = (variants: Variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
  exit: { ...defaultItemVariants.exit, ...variants.exit },
})

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = 'div',
  asChild = 'div',
}: AnimatedGroupProps) {
  const selectedVariants = {
    item: addDefaultVariants(preset ? presetVariants[preset] : {}),
    container: defaultContainerVariants,
  }
  const containerVariants = variants?.container || selectedVariants.container
  const itemVariants = variants?.item || selectedVariants.item

  const MotionComponent = React.useMemo(() => motion(as), [as])
  const MotionChild = React.useMemo(() => motion(asChild), [asChild])

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  )
}

export { AnimatedGroup }
