'use client'
import { formatDateTime } from 'src/utilities/formatDateTime'
import React, { useRef } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { useTranslations } from 'next-intl'
import { Icon } from '@iconify-icon/react'
import { Button } from '@/components/ui/button'
import Facebook from '@/icons/facebook'
import X from '@/icons/x'
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const t = useTranslations('Blog')
  const ref = useRef<HTMLDivElement>(null)

  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    //from the point where the start of the ref hits the bottom of the header bar to the point where the bottom of the ref hits the end of the header bar
    offset: ['0 60px', '1 60px'],
  })

  const { categories, heroImage, populatedAuthors, publishedAt, title, meta } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="mx-auto flex w-full max-w-[96rem] items-start overflow-hidden">
      <div className="mx-space-site relative flex w-full items-center justify-center py-(--text-h1) will-change-transform">
        <div className="-bg-teal-500/10 mx-space-site z-2 w-full max-w-7xl">
          <h1 className="text-base-primary mb-6 max-w-4xl text-(length:--text-h1)">{title}</h1>

          <div className="mt-6 space-y-6 overflow-hidden will-change-transform">
            <p className="text-h4 text-base-tertiary max-w-4xl font-medium">{meta?.description}</p>
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
                {publishedAt && (
                  <div className="flex flex-row items-center gap-2">
                    <Icon
                      icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
                      className="text-base-tertiary size-5"
                      height="none"
                    />
                    <p className="text-body-md text-base-tertiary">٦ دقائق قراءة</p>
                  </div>
                )}
              </div>
              <div className="flex flex-row items-center justify-center gap-2">
                <Button variant="secondary" size="icon">
                  <Facebook className="size-5" />
                </Button>
                <Button variant="secondary" size="icon">
                  <X className="size-5" />
                </Button>
                <Button variant="secondary" color="neutral" size="icon">
                  <Icon
                    icon="material-symbols:link-rounded"
                    className="text-base-tertiary size-5"
                    height="none"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          ref={ref}
          className="bg-background-neutral absolute bottom-0 z-1 h-full w-full rounded-3xl will-change-transform"
          initial={{
            scale: 1,
            backgroundColor: '#fff',
            borderRadius: '24px',
          }}
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.049]),
            // backgroundColor: useTransform(scrollYProgress, [0, 1], ['#fff', '#000']),
            borderRadius: useTransform(scrollYProgress, [0, 1], ['24px', '0px']),
          }}
        />
      </div>
    </div>
  )
}
