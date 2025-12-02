'use client'

import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { ScrollEffectBlock } from '@/payload-types'

import { Media } from '@/components/MediaResponsive'
import { cn } from '@/utilities/ui'
import { CMSBadge as Badge } from '@/components/Badge'
import { Icon } from '@iconify-icon/react'
import RichText from '@/components/RichText'
import k2mini from 'public/K2MINI-Z 2.png'
import Image from 'next/image'
import { motion, AnimatePresence, useInView, useScroll } from 'motion/react'
import {
  Carousel,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel'
import { useMediaQuery } from '@/utilities/useMediaQuery'

type ScrollEffectProps = ScrollEffectBlock & {
  readMoreLabel?: string
}

type ScrollEffectColumn = NonNullable<ScrollEffectBlock['columns']>[number]

export const ScrollEffect03: React.FC<ScrollEffectProps> = ({ columns, readMoreLabel }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  useEffect(() => {
    let lastScrollY = 0
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (!columns?.length) return

      const newIndex = Math.min(Math.floor(latest * columns.length), columns.length - 1)

      setScrollDirection(latest > lastScrollY ? 'down' : 'up')
      lastScrollY = latest

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, columns, activeIndex])

  if (!columns?.length) return null

  const slideColumns = columns as ScrollEffectColumn[]
  const activeColumn = slideColumns[activeIndex]

  const Slide: React.FC<{
    column: ScrollEffectColumn
    idx: number
    onActive: React.Dispatch<React.SetStateAction<number>>
  }> = ({ column, idx, onActive }) => {
    // const ref = useRef<HTMLDivElement | null>(null)
    // const isInView = useInView(ref, {
    //   amount: 0.6,
    //   // margin: '-20% 0px -20% 0px',
    // })

    // useEffect(() => {
    //   if (isInView && !isMobile) {
    //     console.log('running onActive')
    //     onActive((prev) => (prev === idx ? prev : idx))
    //   }
    // }, [idx, isInView, onActive])

    return (
      <
        // style={{ height: `${dimensions ? dimensions.height : columns.length * 100}vh` }}
      >
        {column.enableBadge && column.badge && <Badge {...column.badge} size="lg" />}
        {column.content && (
          <div className="flex max-w-[490px] flex-col gap-space-xs">
            {column.content.title && (
              <h3 className="text-h3 font-medium text-base-primary md:text-h2">
                {column.content.title}
              </h3>
            )}
            {column.content.subtitle && (
              <RichText data={column.content.subtitle} className="[&>p]:text-body-md" />
            )}
          </div>
        )}
        {column.enableCta && column.link?.label && (
          <span className="mt-auto flex w-fit flex-row items-center gap-2">
            {readMoreLabel}
            <Icon
              icon="tabler:caret-left-filled"
              height="none"
              className="size-3 translate-x-1 transition-all duration-300 group-hover:translate-x-0 ltr:-translate-x-1 ltr:rotate-180"
            />
          </span>
        )}
      </>
    )
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[var(--section-height)]"
      style={
        {
          '--section-height': `${columns.length * 100}vh`,
        } as CSSProperties
      }
    >
      <div className="_py-space-site sticky top-[var(--spacing-header-plus-admin-bar)] container flex h-[calc(100vh-var(--spacing-header-plus-admin-bar))] flex-col items-center gap-space-xs md:flex-row">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${activeIndex}-text`}
            initial={{
              opacity: 0,
              y: scrollDirection === 'down' ? '100%' : '-100%',
            }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: scrollDirection === 'down' ? '-100%' : '100%',
            }}
            transition={{ duration: 0.3 }}
            className="my-space-sm flex w-full grow flex-col justify-center gap-space-sm pe-space-xl"
          >
            <Slide
              key={`column-${activeIndex}`}
              column={activeColumn}
              idx={activeIndex}
              onActive={setActiveIndex}
            />
          </motion.div>
          <div className="relative isolate flex w-full overflow-hidden rounded-3xl bg-background-neutral-subtle md:h-[calc(100vh-var(--spacing-header-plus-admin-bar)-1rem)]">
            <div className="relative z-10 my-auto h-auto w-full">
              {activeColumn?.image && (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: scrollDirection === 'down' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: scrollDirection === 'down' ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-[11.2%] left-1/2 z-2 h-[53.6%] w-[36%] -translate-x-1/2"
                  style={{
                    clipPath: 'inset(0%)',
                  }}
                >
                  <Media
                    resource={activeColumn.image}
                    imgClassName="h-full w-full rounded-md object-contain"
                  />
                </motion.div>
              )}
              <Image src={k2mini} alt="" className="my-auto h-auto w-full object-contain" />
            </div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  )
}
