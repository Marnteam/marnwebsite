'use client'

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { useScroll, useTransform, useSpring, LayoutGroup, motion } from 'motion/react'
import clsx from 'clsx'
import { formatDateTime } from 'src/utilities/formatDateTime'
import type { BlogPost, Media as MediaType, User } from '@/payload-types'

import { Media } from '@/components/MediaResponsive'
import { formatAuthors } from '@/utilities/formatAuthors'
import { useTranslations, useLocale } from 'next-intl'
import { Icon } from '@iconify-icon/react'
import { Button } from '@/components/ui/button'
import Facebook from '@/icons/facebook'
import X from '@/icons/x'
import { getReadTimeFromLexical } from '@/utilities/extractTextFromLexical'
import Link from 'next/link'
import { useResizeObserver } from '@/hooks/useResizeObserver'

export const PostHero: React.FC<{
  post: BlogPost
}> = ({ post }) => {
  const t = useTranslations('Blog')
  const locale = useLocale() as 'en' | 'ar'

  const [width, setWidth] = useState(0)
  const [h1Size, setH1Size] = useState(48)
  const cardOffsetRef = useRef(0)
  const metaRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // ─── motion values that hold the *open* heights ────────────
  const [openCardHeight, setOpenCardHeight] = useState(0)
  const [openMetaHeight, setOpenMetaHeight] = useState(0)

  const { scrollYProgress } = useScroll({ target: undefined })
  const eased = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 1,
  })

  // helper: only measure while the hero is fully open
  const shouldMeasure = () => eased.get() < 0.001 // no scroll yet

  const measure = () => {
    if (!shouldMeasure()) return
    const newCardHeight = cardRef.current?.getBoundingClientRect().height
    if (newCardHeight && newCardHeight > 0) {
      setOpenCardHeight(newCardHeight)
    }
    const newMetaHeight = metaRef.current?.getBoundingClientRect().height
    if (newMetaHeight && newMetaHeight > 0) {
      setOpenMetaHeight(newMetaHeight)
    }
  }

  useLayoutEffect(() => {
    requestAnimationFrame(measure) // first paint
    const stopRO1 = useResizeObserver(cardRef.current, measure) // fonts/imgs
    const stopRO2 = useResizeObserver(metaRef.current, measure)
    window.addEventListener('resize', measure)

    return () => {
      stopRO1()
      stopRO2()
      window.removeEventListener('resize', measure)
    }
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

    // Clean up the temporary element
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
      // clamp(32px, 32px + 2vw, 48px)
      const vw = window.innerWidth / 100
      const minSize = 32
      const maxSize = 48
      const preferredSize = 32 + 2 * vw
      const calculatedSize = Math.min(Math.max(minSize, preferredSize), maxSize)
      setH1Size(calculatedSize)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const { title, meta, content, heroImage, populatedAuthors, publishedAt } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const readTime = getReadTimeFromLexical(content, locale, t)

  const cardHeight = useTransform(eased, [0, 0.12], [openCardHeight, 56])
  const cardWidth = useTransform(eased, [0, 0.12], [width - cardOffsetRef.current * 2, width])
  const cardRadius = useTransform(eased, [0, 0.12], ['24px', '0px'])

  const h1FontSize = useTransform(eased, [0, 0.12], [h1Size, 17])
  const h1LineHeight = useTransform(eased, [0, 0.12], [h1Size * 1.5, 24])

  const metaOpacity = useTransform(eased, [0, 0.12], [1, 0])
  const metaHeight = useTransform(eased, [0, 0.12], [openMetaHeight, 0])

  return (
    <LayoutGroup id="post-hero">
      <div className="sticky top-(--header-plus-admin-bar-height) z-1 mx-auto w-full max-w-[96rem] overflow-hidden">
        <motion.div
          layout="size"
          layoutId="hero-card"
          className="relative flex flex-row items-center"
          style={{ height: cardHeight }}
        >
          <div
            ref={cardRef}
            className={clsx(
              'mx-[calc(var(--spacing-space-site)*2)] w-full overflow-hidden py-(--text-h1)',
              'relative z-1',
            )}
          >
            <motion.h1
              layoutId="post-title"
              style={{
                fontSize: useTransform(h1FontSize, (value) => `${value}px`),
                lineHeight: useTransform(h1LineHeight, (value) => `${value}px`),
              }}
              className="text-base-primary relative z-2 max-w-4xl font-medium"
            >
              {title}
            </motion.h1>
            <motion.div style={{ height: useTransform(eased, [0, 0.12], ['24px', '0px']) }} />
            <motion.div
              layoutId="post-meta"
              className="relative z-1"
              style={{
                opacity: metaOpacity,
                height: metaHeight,
                overflow: 'hidden',
                maskImage: `linear-gradient(to top, transparent, var(--color-background-neutral) 0%)`,
              }}
            >
              <div ref={metaRef} className="space-y-6">
                <p className="text-h4 text-base-tertiary max-w-4xl font-medium">
                  {meta?.description}
                </p>
                <hr className="border-border" />
                <div className="flex flex-row items-center justify-between">
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
                </div>
              </div>
            </motion.div>
          </div>
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
