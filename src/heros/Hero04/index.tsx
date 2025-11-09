'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/MediaResponsive'
import RichText from '@/components/RichText'
import { CMSBadge as Badge } from '@/components/Badge'
import { cn } from '@/utilities/ui'
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'

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
        'container flex flex-col items-center justify-center pt-(--header-plus-admin-bar-height) pb-space-xl',
        mediaGroup?.media && 'min-h-screen',
      )}
    >
      <div
        className={cn(
          'flex w-full flex-col items-center gap-4 lg:flex-row',
          // mediaGroup?.media && 'mt-header',
        )}
      >
        <div className="w-full lg:pe-space-xl">
          <div className="flex max-w-[36rem] flex-col items-start gap-space-md">
            {(badge?.label || badge?.reference) && <Badge size="lg" {...badge} />}

            {richText && (
              <RichText
                className={cn(
                  'flex w-full flex-col items-start text-start font-medium',
                  '[&>h3,h4,p]:mt-space-xs [&>h3,h4,p]:leading-normal [&>h3,h4,p]:text-base-tertiary [&>p]:text-(length:--text-body-lg) [&>p]:font-medium',
                )}
                data={richText}
                enableGutter={false}
              />
            )}

            <div className="flex flex-col items-start gap-4">
              {Array.isArray(links) && links.length > 0 && (
                <ul className="flex flex-row items-center justify-start gap-1">
                  {links.map(({ link }, i) => {
                    return (
                      <li key={i}>
                        <CMSLink className="w-full md:w-auto" size={'lg'} {...link} />
                      </li>
                    )
                  })}
                </ul>
              )}
              {caption && <p className="text-sm text-base-tertiary">{caption}</p>}
            </div>
          </div>
        </div>

        {mediaGroup?.media && typeof mediaGroup?.media === 'object' && (
          <Media
            className="relative h-auto w-full overflow-hidden rounded-3xl select-none"
            imgClassName="object-cover"
            priority
            media={mediaGroup}
            // fill
          />
        )}
      </div>
      {logos && logosGroup && logosGroup.length > 0 && (
        <div className="mt-4 flex w-full flex-col items-start gap-space-md md:gap-space-lg">
          {headline && <p className="text-body-sm font-medium text-base-tertiary">{headline}</p>}
          <div
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
          </div>
        </div>
      )}
    </section>
  )
}
