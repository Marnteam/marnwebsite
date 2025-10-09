'use client'

import React, { useState } from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { Icon } from '@iconify-icon/react'
import { CarouselBlock } from '@/payload-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'

export const Carousel02: React.FC<CarouselBlock> = ({ columns }) => {
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(
    columns && columns.length > 0 ? String(0) : null,
  )

  if (!columns || columns.length === 0) return null

  return (
    <div className="container flex flex-col gap-xs py-xl md:grid md:grid-cols-2 md:items-start">
      <Accordion
        type="single"
        collapsible={false}
        value={activeAccordionId || undefined}
        onValueChange={(value) => setActiveAccordionId(value)}
        className="flex flex-col md:pe-xs"
      >
        {columns.map((column, index) => {
          const iconName = column.icon as string
          const isActive = activeAccordionId === String(index)

          return (
            <AccordionItem
              key={index}
              value={String(index)}
              className={cn(
                'rounded-3xl border-0 p-sm transition-colors duration-200',
                isActive && 'bg-background-neutral',
              )}
            >
              <AccordionTrigger className="flex items-center justify-start gap-xs bg-transparent p-0 text-base-tertiary hover:no-underline">
                {column.icon && (
                  <div className={`flex-shrink-0`}>
                    <Icon
                      className={cn(
                        'size-md',
                        isActive ? 'text-base-primary' : 'text-base-tertiary',
                      )}
                      icon={`material-symbols:${iconName}`}
                      height="none"
                      color="currentColor"
                    />
                  </div>
                )}
                {column.content?.title && (
                  <h3 className="text-start text-body-lg font-medium">{column.content.title}</h3>
                )}
              </AccordionTrigger>
              <AccordionContent
                className={`flex flex-col items-start gap-4 p-0 ${column.icon && 'ps-[clamp(2rem,1.2rem+2vw,3rem)]'}`}
              >
                {column.content?.subtitle && (
                  <RichText data={column.content.subtitle} className="[&>p]:text-body-md" />
                )}
                {column.link && <CMSLink variant="inline" {...column.link} />}
                {column.image && (
                  <Media
                    resource={column.image}
                    className="h-auto w-full overflow-hidden rounded-lg md:hidden"
                    imgClassName="h-auto w-full object-cover"
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
      {activeAccordionId !== null && columns[parseInt(activeAccordionId)] && (
        <>
          {columns[parseInt(activeAccordionId)].image && (
            <Media
              resource={columns[parseInt(activeAccordionId)].image || undefined}
              className="hidden h-auto w-full overflow-hidden rounded-3xl md:sticky md:top-[calc(var(--header-height)+var(--admin-bar-height))] md:block"
              imgClassName="h-auto w-full object-cover"
            />
          )}
        </>
      )}
    </div>
  )
}
