import { Variants } from 'motion/react'

export const containerVariants: Variants = {
  hidden: { opacity: 1, y: 20 }, // opacity could be 0
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      type: 'spring',
      stiffness: 800,
      damping: 100,
      mass: 4,
    },
  },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: i * 0.15, // 0.2s delay between each
    },
  }),
}

export const itemsFling: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 800,
      damping: 100,
      mass: 4,
    },
  },
}
export const itemsFling2: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      mass: 1,
    },
  },
}
