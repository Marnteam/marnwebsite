import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/MediaResponsive'
import RichText from '@/components/RichText'
import { CMSBadge as Badge } from '@/components/Badge'
import { cn } from '@/utilities/ui'
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'
import * as motion from 'motion/react-client'
import { motionConverters } from '@/components/RichText/motion-converters'
import { containerVariants, itemsFling } from '@/utilities/motion'

export const Hero04: React.FC<Page['hero']> = ({
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
        'container flex flex-col pt-(--header-plus-admin-bar-height) pb-space-xl',
        mediaGroup?.media && 'min-h-screen',
      )}
    >
      <motion.div
        className={cn(
          'my-auto flex w-full flex-col gap-4 lg:flex-row lg:items-center',
          // mediaGroup?.media && 'mt-header',
        )}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        variants={containerVariants}
      >
        <motion.div className="my-4 flex w-full flex-col items-start gap-space-md lg:pe-space-xl">
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
        </motion.div>

        {mediaGroup?.media && typeof mediaGroup?.media === 'object' && (
          <motion.div
            variants={itemsFling}
            initial="hidden"
            whileInView="visible"
            className="w-full"
          >
            <Media
              className="relative h-auto w-full overflow-hidden rounded-3xl select-none"
              imgClassName="object-cover"
              priority
              media={mediaGroup}
              // fill
            />
          </motion.div>
        )}
      </motion.div>
      {logos && logosGroup && logosGroup.length > 0 && (
        <div className="mt-4 flex w-full flex-col items-start gap-space-md md:gap-space-lg">
          {headline && (
            <motion.p variants={itemsFling} className="text-body-sm font-medium text-base-tertiary">
              {headline}
            </motion.p>
          )}
          <motion.div
            variants={itemsFling}
            dir="ltr"
            className="-mask-x-to-10% flex w-full flex-wrap items-center justify-center mask-x-from-90% mask-x-to-100% md:justify-between"
          >
            <InfiniteSlider gap={48} className="">
              {logosGroup.map((logo, i) => {
                return (
                  <li key={i} className="flex items-center justify-center">
                    {logo && typeof logo === 'object' && (
                      <Media imgClassName="h-space-xl w-auto" priority resource={logo} />
                    )}
                  </li>
                )
              })}
            </InfiniteSlider>
          </motion.div>
        </div>
      )}
    </section>
  )
}
