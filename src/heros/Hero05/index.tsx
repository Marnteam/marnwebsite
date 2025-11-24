'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/MediaResponsive'
import RichText from '@/components/RichText'
import { CMSBadge as Badge } from '@/components/Badge'
import { cn } from '@/utilities/ui'
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'
import { motionConverters } from '@/components/RichText/motion-converters'
import * as motion from 'motion/react-client'
import { containerVariants, itemsFling } from '@/utilities/motion'

export const Hero05: React.FC<Page['hero']> = ({
  richText,
  mediaGroup,
  links,
  caption,
  logos,
  badge,
}) => {
  const { logos: logosGroup, headline } = logos || {}

  // const { setHeaderTheme } = useHeaderTheme()

  // useEffect(() => {
  //   setHeaderTheme('light')
  // }, [setHeaderTheme])

  return (
    <section
      className={cn(
        'container flex flex-col items-stretch gap-space-xs pt-(--header-plus-admin-bar-height) pb-space-xs',
        mediaGroup?.media && 'min-h-screen',
      )}
    >
      <div className="flex grow flex-col gap-space-xs lg:grid lg:grid-flow-col lg:grid-cols-3">
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          variants={{
            hidden: {
              opacity: 0,
              y: 40,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                staggerChildren: 0.2,
              },
            },
          }}
          className="flex flex-col gap-space-md rounded-3xl bg-background-neutral p-space-xl lg:col-span-1"
        >
          {(badge?.label || badge?.reference) && (
            <motion.div variants={itemsFling}>
              <Badge size="lg" {...badge} />
            </motion.div>
          )}

          {richText && (
            <motion.div
              className={cn(
                'prose w-full max-w-[36rem] text-start font-medium',
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

          <div className="flex flex-col items-start gap-4">
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex flex-row items-center justify-start gap-1">
                {links.map(({ link }, i) => {
                  return (
                    <motion.li key={i} variants={itemsFling}>
                      <CMSLink className="w-full md:w-auto" size={'lg'} {...link} />
                    </motion.li>
                  )
                })}
              </ul>
            )}
            {caption && <p className="text-sm text-base-tertiary">{caption}</p>}
          </div>

          {logos && logosGroup && logosGroup.length > 0 && (
            <div className="mt-auto flex w-full flex-col items-start gap-space-md">
              {headline && (
                <p className="text-body-sm font-medium text-base-tertiary">{headline}</p>
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
            </div>
          )}
        </motion.div>

        <motion.div
          className="relative grow overflow-hidden rounded-3xl select-none lg:col-span-2"
          variants={itemsFling}
          initial="hidden"
          whileInView="visible"
        >
          {mediaGroup && typeof mediaGroup?.media === 'object' && (
            <Media
              className="h-full"
              imgClassName="h-full object-cover"
              priority
              media={mediaGroup}
              fill
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}
