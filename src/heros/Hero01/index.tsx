'use client'
import React, { useRef } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/MediaResponsive'
import RichText from '@/components/RichText'
import { CMSBadge as Badge } from '@/components/Badge'
import { cn } from '@/utilities/ui'
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'
import { motion, useScroll, useTransform } from 'motion/react'
import { containerVariants, itemsFling } from '@/utilities/motion'
import { motionConverters } from '@/components/RichText/motion-converters'

export const Hero01: React.FC<Page['hero']> = ({
  richText,
  mediaGroup,
  links,
  caption,
  logos,
  badge,
}) => {
  const { logos: logosGroup, headline } = logos || {}
  const containerRef = useRef<HTMLDivElement>(null)
  // Parallax: as the container scrolls into view, move the image up slightly
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-50%', '50%'])

  // const { setHeaderTheme } = useHeaderObserver()

  // useEffect(() => {
  //   setHeaderTheme('dark')
  // }, [setHeaderTheme])

  return (
    <section ref={containerRef} className="bg-background">
      <div className="container h-screen pt-(--header-plus-admin-bar-height) pb-4">
        <div className="relative z-0 h-full w-full overflow-hidden rounded-3xl">
          <motion.div
            data-theme="dark"
            className="absolute bottom-0 z-1 flex w-full flex-col justify-between gap-4 p-space-md lg:p-space-xl"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.div className="flex w-full flex-col justify-between gap-space-lg lg:flex-row lg:items-center lg:gap-4">
              <motion.div className="flex h-full flex-col items-start justify-center gap-space-md lg:max-w-[36rem]">
                {(badge?.label || badge?.reference) && <Badge size="lg" {...badge} />}

                {richText && (
                  <motion.div
                    className={cn(
                      'prose w-full text-start font-medium',
                      '[&>h3,h4,p]:mt-space-xs [&>h3,h4,p]:leading-normal [&>h3,h4,p]:text-base-tertiary [&>p]:text-(length:--text-body-lg) [&>p]:font-medium',
                    )}
                  >
                    <RichText
                      disableContainer
                      data={richText}
                      enableGutter={false}
                      converters={motionConverters}
                    />
                  </motion.div>
                )}
              </motion.div>
              <motion.div className="flex w-full flex-col items-start gap-4 lg:w-fit">
                {Array.isArray(links) && links.length > 0 && (
                  <motion.ul className="flex flex-row items-center justify-start gap-1">
                    {links.map(({ link }, i) => {
                      return (
                        <motion.li key={i} variants={itemsFling}>
                          <CMSLink className="w-full md:w-auto" size={'lg'} {...link} />
                        </motion.li>
                      )
                    })}
                  </motion.ul>
                )}
                {caption && <p className="text-sm text-base-tertiary">{caption}</p>}
              </motion.div>
            </motion.div>
            {logos && logosGroup && logosGroup.length > 0 && (
              <motion.div
                variants={itemsFling}
                className="flex w-full flex-col items-center gap-space-md md:gap-space-lg"
              >
                {headline && (
                  <p className="text-body-sm font-medium text-base-quaternary">{headline}</p>
                )}
                <div
                  dir="ltr"
                  className="flex w-full flex-wrap items-center justify-center mask-x-from-90% mask-x-to-100% md:justify-between"
                >
                  <InfiniteSlider gap={48} className="">
                    {logosGroup.map((logo, i) => {
                      return (
                        <li key={i} className="flex items-center justify-center">
                          {logo && typeof logo === 'object' && (
                            <Media
                              imgClassName="h-space-xl w-auto object-contain"
                              priority
                              resource={logo}
                            />
                          )}
                        </li>
                      )
                    })}
                  </InfiniteSlider>
                </div>
              </motion.div>
            )}
          </motion.div>

          {mediaGroup?.media && typeof mediaGroup?.media === 'object' && (
            <motion.div
              style={{ y }}
              className={cn('absolute inset-0 z-0 h-full w-full overflow-hidden')}
            >
              <Media
                fill
                imgClassName="object-cover"
                className="relative h-full w-full select-none"
                media={mediaGroup}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
