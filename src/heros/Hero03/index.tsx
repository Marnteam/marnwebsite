import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/MediaResponsive'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utilities/ui'
import { InfiniteSlider } from '@/components/motion-ui/infinite-slider'

export const Hero03: React.FC<Page['hero'] & { children?: React.ReactNode }> = ({
  richText,
  mediaGroup,
  links,
  caption,
  logos,
  badge,
  children,
}) => {
  const { logos: logosGroup, headline } = logos || {}
  // const { setHeaderTheme } = useHeaderTheme()

  // useEffect(() => {
  //   setHeaderTheme('light')
  // }, [setHeaderTheme])

  return (
    <section className="container flex flex-col items-center gap-space-3xl pt-[calc(var(--header-plus-admin-bar-height)+var(--text-h1))] pb-xl">
      <div className="flex max-w-[36rem] flex-col items-center gap-md">
        {(badge?.label || badge?.reference) && <Badge size="lg" {...badge} />}

        {richText && (
          <RichText
            className={cn(
              'flex w-full flex-col items-center text-center font-medium',
              '[&>h3,h4,p]:mt-space-xs [&>h3,h4,p]:leading-normal [&>h3,h4,p]:text-base-tertiary [&>p]:text-(length:--text-body-lg) [&>p]:font-medium',
            )}
            data={richText}
            enableGutter={false}
          />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <div className="flex flex-col items-center gap-4">
            <ul className="mb-4 flex flex-row items-center justify-center gap-1">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink className="w-full md:w-auto" size={'lg'} {...link} />
                  </li>
                )
              })}
            </ul>
            {caption && <p className="text-sm text-base-tertiary">{caption}</p>}
          </div>
        )}
        {children}
      </div>

      {logos && logosGroup && logosGroup.length > 0 && (
        <div className="flex w-full flex-col items-center gap-space-md md:gap-space-lg">
          {headline && <p className="text-body-sm font-medium text-base-quaternary">{headline}</p>}
          <ul
            dir="ltr"
            className="-mask-x-to-10% flex w-full flex-wrap items-center justify-center mask-x-from-90% mask-x-to-100% md:justify-between"
          >
            <InfiniteSlider gap={48} className="">
              {logosGroup.map((logo, i) => {
                return (
                  <li key={i} className="flex items-center justify-center">
                    {logo && typeof logo === 'object' && (
                      <Media
                        imgClassName="h-space-md w-auto object-contain"
                        priority
                        resource={logo}
                      />
                    )}
                  </li>
                )
              })}
            </InfiniteSlider>
          </ul>
        </div>
      )}
      {mediaGroup?.media && typeof mediaGroup?.media === 'object' && (
        <Media
          className="relative h-auto w-full overflow-hidden rounded-3xl select-none"
          imgClassName="object-cover"
          priority
          media={mediaGroup}
          // fill
        />
      )}
    </section>
  )
}
