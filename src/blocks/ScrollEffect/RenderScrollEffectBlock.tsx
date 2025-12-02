import React from 'react'
import { ScrollEffectBlock } from '@/payload-types'

import { ScrollEffect01 } from './variants/ScrollEffect01'
import { ScrollEffect02 } from './variants/ScrollEffect02'
import { ScrollEffect03 } from './variants/ScrollEffect03'

import { useTranslations } from 'next-intl'

type CarouselBlockWithLocale = ScrollEffectBlock & {
  locale?: string
  readMoreLabel?: string
}

const blockVariants: Record<string, React.FC<CarouselBlockWithLocale>> = {
  '01': ScrollEffect01 as React.FC<ScrollEffectBlock>,
  '02': ScrollEffect02 as React.FC<ScrollEffectBlock>,
  '03': ScrollEffect03 as React.FC<ScrollEffectBlock>,
}

export const RenderScrollEffectBlock: React.FC<CarouselBlockWithLocale> = (props) => {
  const t = useTranslations('General')
  const { type = '01' } = props

  const BlockComponent = blockVariants[type]

  return <BlockComponent {...props} readMoreLabel={t('readMore')} />
}
