'use client'

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import {
  useScroll,
  useTransform,
  // useSpring,
  LayoutGroup,
  motion,
  AnimatePresence,
  Variants,
} from 'motion/react'
import clsx from 'clsx'
import { formatDateTime } from 'src/utilities/formatDateTime'
import type { BlogPost, Media as MediaType, User } from '@/payload-types'

import { Media } from '@/components/MediaResponsive'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Icon } from '@iconify-icon/react'
import Facebook from '@/icons/facebook'
import X from '@/icons/x'
import { formatAuthors } from '@/utilities/formatAuthors'
import { getReadTimeFromLexical } from '@/utilities/extractTextFromLexical'

export const PostHero: React.FC<{
  post: BlogPost
}> = ({ post }) => {
  const t = useTranslations('Blog')
  const locale = useLocale() as 'en' | 'ar'

  const [width, setWidth] = useState(0)

  const cardOffsetRef = useRef(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  const { scrollYProgress } = useScroll({ target: undefined })
  // Ease in but quick out with minimal bounce spring
  // const eased = useSpring(scrollYProgress, {
  //   stiffness: 400, // higher stiffness for quick out
  //   damping: 60, // higher damping for minimal bounce
  //   mass: 0.8, // slightly lighter for snappier response
  //   restDelta: 0.001,
  //   restSpeed: 0.01,
  // })
  const eased = scrollYProgress

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleScroll = () => {
      setIsCollapsed(window.scrollY > 0.1)
    }
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getCardOffset = () => {
    if (typeof window === 'undefined') return 0
    const element = document.createElement('div')
    element.style.width = 'var(--spacing-space-site)'
    element.style.position = 'absolute'
    element.style.visibility = 'hidden'
    document.body.appendChild(element)

    const computedStyle = window.getComputedStyle(element)
    const marginStart = computedStyle.width
    const offset = parseFloat(marginStart)

    document.body.removeChild(element)

    return offset
  }

  // Pre-compute cardOffset once using useLayoutEffect
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    cardOffsetRef.current = getCardOffset()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateDimensions = () => {
      setWidth(Math.min(window.innerWidth, 1536))
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const cardWidth = useTransform(eased, [0, 0.2], [width - cardOffsetRef.current * 2, width])
  const cardRadius = useTransform(eased, [0, 0.2], ['24px', '0px'])

  const { title, meta, content, heroImage, populatedAuthors, publishedAt } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const readTime = getReadTimeFromLexical(content, locale, t)

  const metaVariants: Variants = {
    initial: { opacity: 0, y: 50, x: 0 },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 800,
        damping: 100,
        mass: 4,
      },
    },
    exit: { opacity: 0, y: 50, x: 0 },
  }

  const containerVariants: Variants = {
    initial: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        type: 'spring',
        stiffness: 900,
        damping: 80,
        mass: 10,
      },
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        type: 'spring',
        stiffness: 900,
        damping: 80,
        mass: 10,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        // staggerChildren: 0.1,
        // staggerDirection: -1,
        duration: 0.1,
      },
    },
  }

  return (
    <LayoutGroup id="post-hero">
      <div className="sticky top-(--header-plus-admin-bar-height) z-1 mx-auto w-full max-w-[96rem] overflow-hidden">
        <motion.div layout="size" layoutId="hero-card" className="relative">
          <AnimatePresence mode="popLayout">
            {isCollapsed && (
              <motion.div
                key="collapsed-hero" // Add unique key
                className={clsx(
                  'mx-[calc(var(--spacing-space-site))] overflow-hidden py-4 md:mx-[calc(var(--spacing-space-site)*2)]',
                  'relative z-1',
                )}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.h1
                  layout="size"
                  variants={metaVariants}
                  style={{
                    fontSize: `17px`,
                    lineHeight: `24px`,
                  }}
                  className="text-base-primary relative z-2 w-full font-medium"
                >
                  {title}
                </motion.h1>
              </motion.div>
            )}
            {!isCollapsed && (
              <motion.div
                ref={cardRef}
                key="expanded-hero" // Add unique key
                className={clsx(
                  'relative mx-[calc(var(--spacing-space-site)*2)] overflow-hidden py-(--text-h1)',
                  'relative z-1',
                )}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.h1
                  layout="size"
                  variants={{
                    initial: { opacity: 0, y: 50, x: 0 },
                    animate: {
                      opacity: 1,
                      y: 0,
                      x: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 800,
                        damping: 100,
                        mass: 4,
                      },
                    },
                    exit: { opacity: 0, y: 50, x: 0, zIndex: -10, position: 'absolute', inset: 0 },
                  }}
                  className="text-base-primary relative z-2 w-full max-w-4xl font-medium"
                >
                  {title}
                </motion.h1>
                <motion.div layout="size" className="z-1 mt-6 space-y-6">
                  <motion.p
                    variants={metaVariants}
                    className="text-h4 text-base-tertiary max-w-4xl font-medium"
                  >
                    {meta?.description}
                  </motion.p>
                  <motion.hr variants={metaVariants} className="border-border" />
                  <motion.div
                    variants={metaVariants}
                    className="flex flex-row items-center justify-between"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                      {hasAuthors && (
                        <div className="flex flex-row items-center gap-2">
                          <div className="flex flex-row items-center -space-x-[0.6rem]">
                            {populatedAuthors.map((author: User) => {
                              if (!author.avatar) return null
                              return (
                                <Media
                                  key={author.id}
                                  resource={author.avatar as MediaType}
                                  imgClassName="object-cover"
                                  className="ring-background-neutral size-6 shrink-0 overflow-hidden rounded-full ring-3 md:size-8 lg:size-10"
                                />
                              )
                            })}
                          </div>
                          <p className="text-body-md text-base-secondary font-medium">
                            {formatAuthors(populatedAuthors)}
                          </p>
                        </div>
                      )}
                      {publishedAt && (
                        <div className="flex flex-row items-center gap-2">
                          <Icon
                            icon="material-symbols:calendar-today-outline-rounded"
                            className="text-base-tertiary size-5"
                            height="none"
                          />
                          <time dateTime={publishedAt} className="text-body-md text-base-tertiary">
                            {formatDateTime(publishedAt)}
                          </time>
                        </div>
                      )}
                      {content && (
                        <div className="flex flex-row items-center gap-2">
                          <Icon
                            icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
                            className="text-base-tertiary size-5"
                            height="none"
                          />
                          <p className="text-body-md text-base-tertiary">{readTime.text}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex basis-1/3 flex-row flex-wrap items-center justify-end gap-2">
                      <Button variant="secondary" size="icon" asChild>
                        <Link
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            typeof window !== 'undefined' ? window.location.href : '',
                          )}`}
                        >
                          <Facebook className="size-5" />
                        </Link>
                      </Button>
                      <Button variant="secondary" size="icon" asChild>
                        <Link
                          href={`https://www.x.com/intent/tweet?url=${encodeURIComponent(
                            typeof window !== 'undefined' ? window.location.href : '',
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <X className="size-5" />
                        </Link>
                      </Button>
                      <Button variant="secondary" color="neutral" size="icon" asChild>
                        <Link href={typeof window !== 'undefined' ? window.location.href : ''}>
                          <Icon
                            icon="material-symbols:link-rounded"
                            className="size-5"
                            height="none"
                          />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Progress bar anchored to bottom */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              marginInline: 'auto',
              width: cardWidth,
              borderRadius: cardRadius,
              willChange: 'transform',
              overflow: 'hidden',
            }}
            className="bg-background-neutral z-0 h-full"
          >
            <motion.div
              style={{
                scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]),
                originX: locale === 'ar' ? 1 : 0,
                transform: 'translate3d(0, 0, 0)',
              }}
              layout="position"
              className="bg-brand absolute inset-0 h-1"
            />
          </motion.div>
        </motion.div>
        {/* Debug: % scrolled */}
        {/* <motion.div
          className="absolute right-4 bottom-2 z-10 rounded bg-white/80 px-2 py-1 font-mono text-xs text-neutral-900 shadow"
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <motion.span>
            {useTransform(scrollPercentage, (value) => `${Math.round(value)}%`)}
          </motion.span>
        </motion.div> */}
      </div>
    </LayoutGroup>
  )
}
