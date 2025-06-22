import React from 'react'
import { CallToActionBlock } from '@/payload-types'

import { useTranslations } from 'next-intl'
import { CallToAction01 } from './CallToAction01'
import { CallToAction02 } from './CallToAction02'
import { CallToAction03 } from './CallToAction03'
import { CallToAction04 } from './CallToAction04'
import { CallToAction05 } from './CallToAction05'
import { CallToAction06 } from './CallToAction06'
import { CallToAction07 } from './CallToAction07'

type CallToActionBlockWithLocale = CallToActionBlock & {
  locale?: string
  readMoreLabel?: string
  className?: string
}

const variants: Record<string, React.FC<CallToActionBlockWithLocale>> = {
  '01': CallToAction01 as React.FC<CallToActionBlockWithLocale>,
  '02': CallToAction02 as React.FC<CallToActionBlockWithLocale>,
  '03': CallToAction03 as React.FC<CallToActionBlockWithLocale>,
  '04': CallToAction04 as React.FC<CallToActionBlockWithLocale>,
  '05': CallToAction05 as React.FC<CallToActionBlockWithLocale>,
  '06': CallToAction06 as React.FC<CallToActionBlockWithLocale>,
  '07': CallToAction07 as React.FC<CallToActionBlockWithLocale>,
}

export const RenderCallToActionBlock: React.FC<CallToActionBlockWithLocale> = (props) => {
  const t = useTranslations('General')
  const { type = '01' } = props

  const CallToActionBlockComponent = variants[type]

  if (!CallToActionBlockComponent) {
    console.warn(`Variant "${type}" not found for CallToActionBlock. Rendering default (01).`)
    const DefaultVariant = variants['01']
    return <DefaultVariant {...props} />
  }

  return <CallToActionBlockComponent {...props} readMoreLabel={t('readMore')} />
}
