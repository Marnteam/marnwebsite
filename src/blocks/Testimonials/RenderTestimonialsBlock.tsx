import React, { Fragment } from 'react'
import { getLocale, getTranslations } from 'next-intl/server'

import type { TestimonialsBlock as TestimonialsBlockType, Customer } from '@/payload-types'
import { TestimonialsBlock02 } from './variants/TestimonialsBlock02'
import { TestimonialsBlock03 } from './variants/TestimonialsBlock03'
import { TestimonialsBlock01 } from './variants/TestimonialsBlock01'

// Map block types to components
const blockComponents = {
  '01': TestimonialsBlock01,
  '02': TestimonialsBlock02,
  '03': TestimonialsBlock03,
}

export const RenderTestimonialsBlock: React.FC<TestimonialsBlockType> = async (props) => {
  const { type, selectedTestimonials } = props
  const locale = await getLocale()
  const t = await getTranslations('TestimonialsBlock')

  let testimonialsToRender: Customer[] = []
  testimonialsToRender = selectedTestimonials as Customer[]
  const BlockComponent = blockComponents[type]

  return (
    <Fragment>
      <BlockComponent testimonials={testimonialsToRender} linkLabel={t('readMore')} />
    </Fragment>
  )
}
