'use client'

import React, { useRef, useState } from 'react'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/MediaResponsive'
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
import { useMediaQuery } from '@/utilities/useMediaQuery'

export const Carousel02: React.FC<CarouselBlock> = ({ columns }) => {
  const accordionItemRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [activeAccordionId, setActiveAccordionId] = useState<string | null>(
    columns && columns.length > 0 ? String(0) : null,
  )
  const mobile = useMediaQuery('(max-width:768px)')
  const delay = 240
  const offset = 64

  function normalizeScrollPosition(accordionId: string | null) {
    if (!accordionId) return

    const accordionElement = accordionItemRefs.current[accordionId]
    if (!accordionElement) return

    const scrollToAccordion = () => {
      const rect = accordionElement.getBoundingClientRect()
      window.scrollTo({
        top: rect.top + window.scrollY - offset,
        behavior: 'smooth',
      })
    }

    setTimeout(() => {
      scrollToAccordion()
    }, delay)
  }

  if (!columns || columns.length === 0) return null

  return (
    <div className="container flex flex-col gap-space-xs py-space-xl md:grid md:grid-cols-2 md:items-start">
      <Accordion
        type="single"
        collapsible={false}
        value={activeAccordionId || undefined}
        onValueChange={(value) => {
          setActiveAccordionId(value)
          mobile && normalizeScrollPosition(value)
        }}
        className="md:sticky md:top-[calc(var(--spacing-header-plus-admin-bar)+1rem)] md:block"
      >
        {columns.map((column, index) => {
          const iconName = column.icon as string
          const isActive = activeAccordionId === String(index)

          return (
            <AccordionItem
              ref={(node) => {
                if (node) {
                  accordionItemRefs.current[String(index)] = node
                } else {
                  delete accordionItemRefs.current[String(index)]
                }
              }}
              key={index}
              value={String(index)}
              className={cn(
                '_p-space-sm rounded-3xl pb-space-sm transition-colors duration-200',
                '_data-[state=open]:p-space-sm data-[state=open]:bg-background-neutral',
              )}
            >
              <AccordionTrigger className="flex translate-0 items-center justify-start gap-space-xs bg-transparent pt-4 text-base-tertiary hover:no-underline data-[state=open]:-translate-x-space-sm">
                {column.icon && (
                  <Icon
                    className={cn(
                      'size-[1lh] shrink-0',
                      isActive ? 'text-base-primary' : 'text-base-tertiary',
                    )}
                    icon={`material-symbols:${iconName}`}
                    height="none"
                    color="currentColor"
                  />
                )}
                {column.content?.title && (
                  <h3 className="text-start text-body-md font-medium">{column.content.title}</h3>
                )}
              </AccordionTrigger>
              <AccordionContent
                className={`flex flex-col items-start gap-4 px-space-sm pb-0 ${column.icon && 'ps-[calc(var(--text-body-lg)+var(--spacing-space-xs))]'}`}
              >
                {column.content?.subtitle && <RichText data={column.content.subtitle} />}
                {column.enableCta && column.link && <CMSLink variant="link" {...column.link} />}
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
              className="hidden h-auto w-full md:sticky md:top-[calc(var(--spacing-header-plus-admin-bar)+1rem)] md:block"
              imgClassName="h-auto w-full rounded-3xl object-cover"
            />
          )}
        </>
      )}
    </div>
  )
}
