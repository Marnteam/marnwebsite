'use client'

import React, { useState } from 'react'
import { CarouselBlock } from '@/payload-types'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { CMSBadge as Badge } from '@/components/Badge'
import { CMSLink } from '@/components/Link'
import { Icon } from '@iconify-icon/react'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'

type Carousel01Props = CarouselBlock & {
  readMoreLabel?: string
}

export const Carousel01: React.FC<Carousel01Props> = ({ columns, readMoreLabel }) => {
  const [carouselIndex, setCarouselIndex] = useState(0)
  if (!columns?.length) return null

  const carouselSlide = (column) => {
    return (
      <>
        <div
          className={cn(
            'grid h-full grid-rows-[auto_1fr_auto] items-start gap-space-sm p-space-xs',
          )}
        >
          {column.enableBadge && column.badge && <Badge {...column.badge} size="lg" />}
          {column.content && (
            <div className="flex grow auto-rows-auto flex-col gap-space-xs">
              {column.content.title && (
                <h3 className="text-h3 font-medium text-base-primary">{column.content.title}</h3>
              )}
              {column.content.subtitle && (
                <RichText data={column.content.subtitle} className="[&>p]:text-body-md" />
              )}
            </div>
          )}
          {column.enableCta && column.link?.label && (
            <span className="mt-auto flex w-fit flex-row items-center gap-2">
              {readMoreLabel}
              <Icon
                icon="tabler:caret-left-filled"
                height="none"
                className="size-3 translate-x-1 transition-all duration-300 group-hover:translate-x-0 ltr:-translate-x-1 ltr:rotate-180"
              />
            </span>
          )}
        </div>
        {column.image && (
          <Media
            resource={column.image}
            className="h-auto w-full"
            imgClassName="aspect-[4/3] h-auto w-full rounded-lg object-cover"
          />
        )}
      </>
    )
  }

  return (
    <div className="flex flex-col py-space-xl">
      <div className="container mb-space-xs flex w-full items-center justify-stretch gap-space-xs overflow-x-auto [scrollbar-width:none]">
        {columns.map((column, index) => {
          if (column.tabLabel) {
            return (
              <Button
                key={column.id || `tab-${index}`}
                type="button"
                size="lg"
                variant="ghost"
                color="neutral"
                onClick={() => setCarouselIndex(index)}
                className={cn(
                  'relative inline-flex h-20 w-full items-center gap-2 rounded-2xl px-5 text-base font-medium transition-colors duration-200',
                  index === carouselIndex
                    ? 'bg-neutral text-inverted-primary hover:bg-neutral/90'
                    : '',
                )}
              >
                {column.icon && (
                  <Icon icon={`material-symbols:${column.icon}`} className="size-5" height="none" />
                )}
                {column?.tabLabel}
              </Button>
            )
          }
          return null
        })}
      </div>

      <Carousel
        index={carouselIndex}
        onIndexChange={setCarouselIndex}
        disableDrag
        className="w-full"
      >
        <CarouselContent
          className="w-full"
          transition={{
            type: 'spring',
            stiffness: 800,
            damping: 100,
            mass: 4,
          }}
        >
          {columns.map((column, index) => {
            return (
              <CarouselItem key={column.id || `tab-content-${index}`} className="px-space-md py-px">
                {React.createElement(
                  column.enableCta && column.link?.label ? CMSLink : 'div',
                  {
                    key: index,
                    className: cn(
                      'group grid w-full grid-cols-1 gap-space-xs rounded-3xl bg-background-neutral p-4 hover:no-underline hover:shadow-border md:grid-cols-2',
                    ),
                    ...(column.link?.label
                      ? { ...column.link, label: null, variant: 'inline' }
                      : {}),
                  },
                  carouselSlide(column),
                )}
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
