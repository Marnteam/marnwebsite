'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavigation,
  CarouselIndicator,
} from '@/components/ui/carousel'

import { Customer } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { Stat } from '../stat'
import { CMSLink } from '@/components/Link'

interface Props {
  testimonials: Customer[]
  linkLabel: string
}
interface TestimonialCardProps {
  testimonial: Customer
  linkLabel: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, linkLabel }) => {
  // Extract data from the Customer structure
  const { testimonial: testimonialData, slug, enableCaseStudy } = testimonial
  const { quote, featuredImage, stats, company, authorInfo } = testimonialData

  const { companyLogo } = company

  return (
    <div className="grid w-full max-w-[90rem] grid-cols-1 rounded-3xl bg-background-neutral lg:grid-cols-2 lg:items-stretch">
      <div className="flex w-full flex-col justify-start gap-space-md p-space-md pb-space-xs md:justify-between md:pb-space-md">
        <div className="flex flex-grow flex-col justify-start gap-space-sm">
          {companyLogo && (
            <Media
              resource={companyLogo}
              imgClassName="h-[clamp(1.75rem,1.15rem+1.5vw,2.5rem)] w-auto opacity-50 dark:invert"
            />
          )}
          {quote && (
            <RichText
              data={quote}
              enableProse={false}
              className="text-(length:--text-h3) font-medium text-base-primary"
            />
          )}
        </div>

        {stats && stats.length > 0 && (
          <div
            className="grid w-full grid-cols-2 gap-space-xs border-t border-neutral/10 pt-space-xs lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
            style={
              {
                '--cols': stats?.length || 0,
              } as React.CSSProperties
            }
          >
            {stats.map((stat, index) => (
              <Stat key={stat.id || index} stat={stat} index={index} className="w-full p-0" />
            ))}
          </div>
        )}
        <div className="flex flex-row items-center justify-between">
          {authorInfo && (
            <div className="flex flex-row items-center gap-space-xs">
              {authorInfo.avatar && (
                <Media
                  resource={authorInfo.avatar}
                  fill
                  className="relative size-lg overflow-hidden rounded-full"
                  imgClassName="object-cover"
                />
              )}
              <div>
                <p className="text-body-sm font-medium text-base-primary">{authorInfo.name}</p>
                <p className="text-body-sm text-base-secondary">{authorInfo.title}</p>
              </div>
            </div>
          )}
          {enableCaseStudy && slug && (
            <CMSLink
              className="relative text-body-md font-medium text-base-secondary"
              variant="link"
              url={`/customers/${slug}`}
            >
              {linkLabel}
            </CMSLink>
          )}
        </div>
      </div>
      {featuredImage && (
        <div className="flex items-start justify-start p-space-xs">
          <Media
            resource={featuredImage}
            fill
            className="relative aspect-[4/3] h-auto w-full overflow-hidden rounded-lg"
            imgClassName="object-cover"
          />
        </div>
      )}
    </div>
  )
}

export const TestimonialsBlock03: React.FC<Props> = ({ testimonials, linkLabel }) => {
  return (
    <section className="relative container py-xl">
      <Carousel slidesPerView={1}>
        <CarouselContent className="-ms-space-sm">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={testimonial.id || index} className="basis-full ps-space-sm">
              <TestimonialCard testimonial={testimonial} linkLabel={linkLabel} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {testimonials.length > 1 && (
          <>
            <CarouselNavigation className="relative mt-space-xs justify-between" />
            <CarouselIndicator className="absolute bottom-0 h-10" />
          </>
        )}
      </Carousel>
    </section>
  )
}
