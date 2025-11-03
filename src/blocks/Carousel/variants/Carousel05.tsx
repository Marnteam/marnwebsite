'use client'

import React, { useState } from 'react'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselBlock } from '@/payload-types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
} from '@/components/ui/carousel'
import { Media } from '@/components/MediaResponsive'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from '@/components/motion-ui/morphing-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Icon } from '@iconify-icon/react'
import { Plus } from 'lucide-react'

type Carousel05Props = CarouselBlock & {
  locale: string
}

export const Carousel05: React.FC<Carousel05Props> = ({ columns, locale }) => {
  const [index, setIndex] = useState(0)
  if (!columns || columns.length === 0) return null

  return (
    <div className="container py-space-md">
      <Carousel
        className="w-full"
        slidesPerView={{
          sm: 1,
          md: 3,
          lg: 3,
        }}
        index={index}
        onIndexChange={setIndex}
      >
        {columns.length > 1 && (
          <CarouselNavigation className="relative mb-space-xs justify-start" />
        )}
        <CarouselContent className="">
          {columns.map((column, idx) => {
            const { image, content, link, icon } = column
            return (
              <CarouselItem key={idx} className="px-space-2xs">
                <MorphingDialog
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      setIndex((index + 1) % columns.length) // Added modulo for wraparound
                    }
                  }}
                >
                  <MorphingDialogTrigger className="h-full w-full">
                    <Card
                      dir={locale === 'ar' ? 'rtl' : 'ltr'}
                      className="relative h-full w-full border border-none pb-space-xl text-start transition-colors hover:bg-background-neutral/90"
                    >
                      <CardContent className="flex flex-col items-start gap-2 rounded-3xl pe-space-md pb-4">
                        {icon && (
                          <Icon
                            className="mb-space-sm size-md text-base-secondary"
                            icon={`material-symbols:${icon}`}
                            height="none"
                            color="currentColor"
                          />
                        )}
                        {content?.title && (
                          <MorphingDialogTitle className="text-body-lg font-medium text-base-primary">
                            {content.title}
                          </MorphingDialogTitle>
                        )}
                        {content?.subtitle && (
                          <MorphingDialogSubtitle className="text-body-md text-base-secondary">
                            {content.subtitle && <RichText data={content.subtitle} />}
                          </MorphingDialogSubtitle>
                        )}
                      </CardContent>
                      <div className="absolute end-4 bottom-4 w-full">
                        <div className="ms-auto flex size-8 items-center justify-center rounded-full bg-neutral/10 px-2 py-2 text-base-secondary hover:bg-neutral/30">
                          <Plus className="size-sm text-base-secondary" strokeWidth={2.5} />
                        </div>
                      </div>
                    </Card>
                  </MorphingDialogTrigger>
                  <MorphingDialogContainer>
                    <MorphingDialogContent
                      style={{
                        borderRadius: 'var(--radius-space-sm)',
                      }}
                      className="relative h-auto w-[calc(100vw-(var(--spacing-space-site)*2))] max-w-3xl border-border bg-background-neutral"
                    >
                      <ScrollArea
                        dir={locale === 'ar' ? 'rtl' : 'ltr'}
                        className="h-[90vh]"
                        type="scroll"
                      >
                        <Card className="h-full border border-none transition-colors">
                          <CardContent className="flex h-full flex-col items-start gap-space-xs rounded-3xl p-0">
                            <MorphingDialogClose className="h-10 w-10 rounded-full bg-neutral/10 px-2 py-2 text-base-secondary hover:bg-neutral/30" />
                            {icon && (
                              <Icon
                                className="my-2 size-md text-base-secondary"
                                icon={`material-symbols:${icon}`}
                                height="none"
                                color="currentColor"
                              />
                            )}
                            {content?.title && (
                              <MorphingDialogTitle className="text-body-lg font-medium text-base-primary">
                                {content.title}
                              </MorphingDialogTitle>
                            )}
                            {content?.subtitle && (
                              <MorphingDialogSubtitle>
                                {content.subtitle && <RichText data={content.subtitle} />}
                              </MorphingDialogSubtitle>
                            )}
                            <hr className="w-full border-border" />
                            {column.image && (
                              <Media
                                resource={column.image}
                                className="mt-space-xs h-auto w-full overflow-hidden rounded-3xl"
                                imgClassName="h-auto w-full object-cover"
                              />
                            )}
                            {content?.subtitle && (
                              <MorphingDialogDescription className="mt-space-xs">
                                <RichText data={content.subtitle} />
                                {column.link && <CMSLink {...column.link} />}
                              </MorphingDialogDescription>
                            )}
                          </CardContent>
                        </Card>
                      </ScrollArea>
                    </MorphingDialogContent>
                  </MorphingDialogContainer>
                </MorphingDialog>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
