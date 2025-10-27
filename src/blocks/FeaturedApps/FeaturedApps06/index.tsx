import {
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Carousel } from '@/components/ui/carousel'

import { Icon } from '@iconify-icon/react'

import { FeaturedAppsBlock, Media as MediaType } from '@/payload-types'

interface FeaturedApps06Props {
  cards: FeaturedAppsBlock['cards']
}

export const FeaturedApps06: React.FC<FeaturedApps06Props> = ({ cards }) => {
  return (
    <div className="container py-xl">
      {/* disable carousel in less than md */}
      <Carousel
        slidesPerView={{
          sm: 1, //   ≥640px: 1 slide
          md: 2, //   ≥768px: 2 slides
          lg: 3, //  ≥1024px: 3 slides
        }}
      >
        <CarouselContent className="max-md:flex-col max-md:gap-space-xs">
          {cards?.map(({ title, subtitle, appReference, id }) => (
            <CarouselItem key={id} className="md:not-first:ps-space-xs">
              <Card key={id} className="h-full w-full space-y-sm">
                <CardHeader className="flex flex-col gap-space-xs">
                  <h3 className="text-h3">{title}</h3>
                  <p className="text-body-md font-normal text-base-secondary">{subtitle}</p>
                </CardHeader>
                <CardContent className="gap-space-sm">
                  <hr className="w-full border-border" />
                  <div className="flex w-full flex-col gap-space-xs">
                    {appReference?.map((app) => {
                      if (typeof app.value === 'string') return null

                      return (
                        <CMSLink
                          key={app.value?.id}
                          className="group flex h-fit flex-row items-center justify-between gap-space-xs text-body-lg font-medium text-base-secondary hover:text-base-primary hover:no-underline"
                          variant="inline"
                          {...app.value.link}
                          label={null}
                        >
                          <span className="inline-flex items-center gap-space-xs text-body-lg">
                            {app.value?.icon && (
                              <Media
                                resource={app.value?.icon as MediaType}
                                className="size-8 shrink-0"
                                imgClassName="aspect-square h-full w-full rounded-md"
                              />
                            )}
                            {app.value?.name}
                          </span>
                          <Icon
                            icon="tabler:caret-left-filled"
                            height="none"
                            className="size-4 translate-x-0 transition-all duration-150 group-hover:-translate-x-1 ltr:rotate-180 ltr:group-hover:translate-x-1"
                          />
                        </CMSLink>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {cards && cards.length > 1 && (
          <>
            <CarouselNavigation className="relative mt-space-xs justify-between max-md:hidden" />
            <CarouselIndicator className="absolute bottom-0 h-10 max-md:hidden" />
          </>
        )}
      </Carousel>
    </div>
  )
}
