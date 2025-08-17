import React from 'react'
import { FeaturesBlock } from '@/payload-types'

import { Features01 } from './variants/Features01'
import { Features02 } from './variants/Features02'
import { Features03 } from './variants/Features03'
import { Features04 } from './variants/Features04'
import { Features05 } from './variants/Features05'
import { Features06 } from './variants/Features06'
import { Features07 } from './variants/Features07'
import { Features08 } from './variants/Features08'
import { Features09 } from './variants/Features09'
import { Features10 } from './variants/Features10'
import { Features11 } from './variants/Features11'
import { Features12 } from './variants/Features12'
import { useTranslations } from 'next-intl'

type FeaturesBlockWithLocale = FeaturesBlock & {
  locale?: string
  readMoreLabel?: string
}

const featureVariants: Record<string, React.FC<FeaturesBlockWithLocale>> = {
  '01': Features01 as React.FC<FeaturesBlockWithLocale>,
  '02': Features02 as React.FC<FeaturesBlockWithLocale>,
  '03': Features03 as React.FC<FeaturesBlockWithLocale>,
  '04': Features04 as React.FC<FeaturesBlockWithLocale>,
  '05': Features05 as React.FC<FeaturesBlockWithLocale>,
  '06': Features06 as React.FC<FeaturesBlockWithLocale>,
  '07': Features07 as React.FC<FeaturesBlockWithLocale>,
  '08': Features08 as React.FC<FeaturesBlockWithLocale>,
  '09': Features09 as React.FC<FeaturesBlockWithLocale>,
  '10': Features10 as React.FC<FeaturesBlockWithLocale>,
  '11': Features11 as React.FC<FeaturesBlockWithLocale>,
  '12': Features12 as React.FC<FeaturesBlockWithLocale>,
}

export const RenderFeaturesBlock: React.FC<FeaturesBlockWithLocale> = (props) => {
  const t = useTranslations('General')
  const { type = '01' } = props

  const FeaturesBlockComponent = featureVariants[type]

  return <FeaturesBlockComponent {...props} readMoreLabel={t('readMore')} />
}
