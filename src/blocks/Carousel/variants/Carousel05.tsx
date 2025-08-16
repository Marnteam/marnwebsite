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
    <div className="py-md container">
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
        {columns.length > 1 && <CarouselNavigation className="mb-xs relative justify-start" />}
        <CarouselContent className="">
          {columns.map((column, idx) => (
            <CarouselItem key={idx} className="px-2xs">
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
                    className="pb-xl relative h-full w-full border border-none text-start transition-colors hover:bg-background-neutral/90"
                  >
                    <CardContent className="pe-md flex flex-col items-start gap-2 rounded-3xl pb-4">
                      {column.icon && (
                        <Icon
                          className="mb-sm size-md text-base-secondary"
                          icon={`ri:${column.icon}`}
                          height="none"
                          color="currentColor"
                        />
                      )}
                      {column.content?.title && (
                        <MorphingDialogTitle className="text-body-lg font-medium text-base-primary">
                          {column.content.title}
                        </MorphingDialogTitle>
                      )}
                      {column.content?.subtitle && (
                        <MorphingDialogSubtitle className="text-body-md text-base-secondary">
                          {column.content.subtitle}
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
                        <CardContent className="gap-xs flex h-full flex-col items-start rounded-3xl p-0">
                          <MorphingDialogClose className="h-10 w-10 rounded-full bg-neutral/10 px-2 py-2 text-base-secondary hover:bg-neutral/30" />
                          {column.icon && (
                            <Icon
                              className="size-md my-2 text-base-secondary"
                              icon={`ri:${column.icon}`}
                              height="none"
                              color="currentColor"
                            />
                          )}
                          {column.content?.title && (
                            <MorphingDialogTitle className="text-body-lg font-medium text-base-primary">
                              {column.content.title}
                            </MorphingDialogTitle>
                          )}
                          {column.content?.subtitle && (
                            <MorphingDialogSubtitle className="text-body-md text-base-secondary">
                              {column.content.subtitle}
                            </MorphingDialogSubtitle>
                          )}
                          <hr className="w-full border-border" />
                          {column.image && (
                            <Media
                              resource={column.image}
                              className="mt-xs h-auto w-full overflow-hidden rounded-3xl"
                              imgClassName="h-auto w-full object-cover"
                            />
                          )}
                          {column.richTextContent && (
                            <MorphingDialogDescription className="mt-xs">
                              <RichText data={column.richTextContent} />
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
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
