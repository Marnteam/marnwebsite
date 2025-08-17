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
import { Media } from '@/components/Media'
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
          {columns.map((column, idx) => {
            const { image, content, link, icon } = column
            return (
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
                      className="pb-xl hover:bg-background-neutral/90 relative h-full w-full border border-none text-start transition-colors"
                    >
                      <CardContent className="rounded-space-sm pe-md flex flex-col items-start gap-2 pb-4">
                        {icon && (
                          <Icon
                            className="text-base-secondary mb-sm size-md"
                            icon={`material-symbols:${icon}`}
                            height="none"
                            color="currentColor"
                          />
                        )}
                        {content?.title && (
                          <MorphingDialogTitle className="text-base-primary text-body-lg font-medium">
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
                        <div className="bg-neutral/10 hover:bg-neutral/30 text-base-secondary ms-auto flex size-8 items-center justify-center rounded-full px-2 py-2">
                          <Plus className="text-base-secondary size-sm" strokeWidth={2.5} />
                        </div>
                      </div>
                    </Card>
                  </MorphingDialogTrigger>
                  <MorphingDialogContainer>
                    <MorphingDialogContent
                      style={{
                        borderRadius: 'var(--radius-space-sm)',
                      }}
                      className="border-border bg-background-neutral relative h-auto w-[calc(100vw-(var(--spacing-space-site)*2))] max-w-3xl"
                    >
                      <ScrollArea
                        dir={locale === 'ar' ? 'rtl' : 'ltr'}
                        className="h-[90vh]"
                        type="scroll"
                      >
                        <Card className="h-full border border-none transition-colors">
                          <CardContent className="rounded-space-sm gap-xs flex h-full flex-col items-start p-0">
                            <MorphingDialogClose className="bg-neutral/10 hover:bg-neutral/30 text-base-secondary h-10 w-10 rounded-full px-2 py-2" />
                            {icon && (
                              <Icon
                                className="text-base-secondary size-md my-2"
                                icon={`material-symbols:${icon}`}
                                height="none"
                                color="currentColor"
                              />
                            )}
                            {content?.title && (
                              <MorphingDialogTitle className="text-base-primary text-body-lg font-medium">
                                {content.title}
                              </MorphingDialogTitle>
                            )}
                            {content?.subtitle && (
                              <MorphingDialogSubtitle>
                                {content.subtitle && <RichText data={content.subtitle} />}
                              </MorphingDialogSubtitle>
                            )}
                            <hr className="border-border w-full" />
                            {column.image && (
                              <Media
                                resource={column.image}
                                className="rounded-space-sm mt-xs h-auto w-full overflow-hidden"
                                imgClassName="w-full h-auto object-cover"
                              />
                            )}
                            {content?.subtitle && (
                              <MorphingDialogDescription className="mt-xs">
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
