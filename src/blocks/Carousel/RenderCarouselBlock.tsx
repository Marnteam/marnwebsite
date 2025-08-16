import React from 'react'
import { CarouselBlock } from '@/payload-types'

import { Carousel01 } from './variants/Carousel01'
import { Carousel02 } from './variants/Carousel02'
import { Carousel03 } from './variants/Carousel03'
import { Carousel04 } from './variants/Carousel04'
import { Carousel05 } from './variants/Carousel05'

type CarouselBlockWithLocale = CarouselBlock & {
  locale?: string
  readMoreLabel?: string
}

const carouselVariants: Record<string, React.FC<CarouselBlockWithLocale>> = {
  '01': Carousel01 as React.FC<CarouselBlockWithLocale>,
  '02': Carousel02 as React.FC<CarouselBlockWithLocale>,
  '03': Carousel03 as React.FC<CarouselBlockWithLocale>,
  '04': Carousel04 as React.FC<CarouselBlockWithLocale>,
  '05': Carousel05 as React.FC<CarouselBlockWithLocale>,
}

export const RenderCarouselBlock: React.FC<CarouselBlockWithLocale> = (props) => {
  const { type = '01', locale } = props

  const CarouselBlockComponent = carouselVariants[type]

  return <CarouselBlockComponent {...props} locale={locale} />
}
