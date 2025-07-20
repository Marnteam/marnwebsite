import {
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel } from '@/components/ui/carousel'

import { Icon } from '@iconify-icon/react'

import { FeaturedAppsBlock, Media as MediaType } from '@/payload-types'

interface FeaturedApps06Props {
  cards: FeaturedAppsBlock['cards']
}

export const FeaturedApps06: React.FC<FeaturedApps06Props> = ({ cards }) => {
  return (
    <div className="py-xl container">
      {/* disable carousel in less than md */}
      <Carousel
        slidesPerView={{
          sm: 1, //   ≥640px: 1 slide
          md: 2, //   ≥768px: 2 slides
          lg: 3, //  ≥1024px: 3 slides
        }}
      >
        <CarouselContent className="max-md:gap-space-xs max-md:flex-col">
          {cards?.map(({ title, subtitle, appReference, id }) => (
            <CarouselItem key={id} className="md:not-first:ps-space-xs">
              <Card key={id} className="h-full w-full">
                <CardContent className="rounded-space-sm gap-sm bg-background-neutral">
                  <div className="gap-xs flex flex-col">
                    <h3 className="text-h3">{title}</h3>
                    <p className="text-body-md text-base-secondary font-normal">{subtitle}</p>
                  </div>
                  <hr className="border-border w-full" />
                  <div className="gap-xs flex flex-col">
                    {appReference?.map((app) => {
                      if (typeof app.value === 'string') return null

                      return (
                        <CMSLink
                          key={app.value?.id}
                          className="text-body-lg group text-base-secondary hover:text-base-primary gap-xs flex h-fit flex-row items-center justify-between font-medium hover:no-underline"
                          variant="inline"
                          {...app.value.link}
                          label={null}
                        >
                          <span className="gap-xs text-body-lg inline-flex items-center">
                            {app.value?.icon && (
                              <Media
                                resource={app.value?.icon as MediaType}
                                className="size-8 shrink-0"
                                imgClassName="w-full h-full rounded-md aspect-square"
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
            <CarouselNavigation className="mt-xs relative justify-between max-md:hidden" />
            <CarouselIndicator className="absolute bottom-0 h-10 max-md:hidden" />
          </>
        )}
      </Carousel>
    </div>
  )
}
