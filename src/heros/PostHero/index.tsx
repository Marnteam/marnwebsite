'use client'

import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { useScroll, useTransform, useSpring, LayoutGroup, motion } from 'motion/react'
import clsx from 'clsx'
import { formatDateTime } from 'src/utilities/formatDateTime'
import type { BlogPost } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { useTranslations, useLocale } from 'next-intl'
import { Icon } from '@iconify-icon/react'
import { Button } from '@/components/ui/button'
import Facebook from '@/icons/facebook'
import X from '@/icons/x'
import { getReadTimeFromLexical } from '@/utilities/extractTextFromLexical'
import Link from 'next/link'

export const PostHero: React.FC<{
  post: BlogPost
}> = ({ post }) => {
  const t = useTranslations('Blog')
  const locale = useLocale() as 'en' | 'ar'

  const [width, setWidth] = useState(0)
  const [h1Size, setH1Size] = useState(48)
  const cardOffsetRef = useRef(0)
  const metaStart = useRef(0)
  const metaRef = useRef<HTMLDivElement>(null)
  const [metaStartHeight, setMetaStartHeight] = useState(0)

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
    const height = metaRef.current?.scrollHeight ?? 0
    console.log('height', height)
    metaStart.current = height
    setMetaStartHeight(height)
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

  const { title, meta, content, heroImage, populatedAuthors, publishedAt, categories } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  const readTime = getReadTimeFromLexical(content, locale, t)

  const { scrollYProgress } = useScroll({ target: undefined })

  // temp workaround: easing scroll values if user stops scrolling near 0.12
  const eased = useSpring(scrollYProgress, {
    stiffness: 200, // Increased from 120
    damping: 40, // Increased from 30
    mass: 1, // Reduced from 1
  })
  // const eased = scrollYProgress

  const metaOpacity = useTransform(eased, [0, 0.12], [1, 0])
  const metaHeight = useTransform(eased, [0, 0.12], [`${metaStartHeight}px`, '0px'])

  const cardRadius = useTransform(eased, [0, 0.12], ['24px', '0px'])
  const cardWidth = useTransform(eased, [0, 0.12], [width - cardOffsetRef.current * 2, width])
  const h1FontSize = useTransform(eased, [0, 0.12], [h1Size, 17])
  const h1LineHeight = useTransform(eased, [0, 0.12], [h1Size * 1.5, 24])
  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <LayoutGroup id="post-hero">
      <div className="sticky top-(--header-plus-admin-bar-height) z-1 mx-auto w-full max-w-[96rem] overflow-hidden">
        <div className="relative">
          <motion.header
            layout="size"
            layoutId="hero-card"
            id="post-hero"
            className={clsx(
              'mx-[calc(var(--spacing-space-site)*2)] py-(--text-h1)',
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
              ref={metaRef}
              style={{
                opacity: metaOpacity,
                height: metaHeight,
                overflow: 'hidden',
              }}
            >
              <div className="space-y-6">
                <p className="text-h4 text-base-tertiary max-w-4xl font-medium">
                  {meta?.description}
                </p>
                <hr className="border-border" />
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col gap-4 md:flex-row md:gap-8">
                    {hasAuthors && (
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                          <p className="text-body-md text-base-secondary">
                            {formatAuthors(populatedAuthors)}
                          </p>
                        </div>
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
                  <div className="flex flex-row items-center justify-center gap-2">
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
          </motion.header>
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
        </div>
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
