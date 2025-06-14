import React, { Fragment } from 'react'
import { getLocale, getTranslations } from 'next-intl/server'

import type { PricingBlock as PricingBlockType } from '@/payload-types'
import { PricingBlock01 } from './variants/PricingBlock01'
import { PricingBlock02 } from './variants/PricingBlock02'
import { PricingBlock03 } from './variants/PricingBlock03'
import { PricingBlock04 } from './variants/PricingBlock04'

type PricingBlockWithLocale = PricingBlockType & {
  locale?: string
}

// Map block types to components
const blockComponents: Record<string, React.FC<any>> = {
  '01': PricingBlock01,
  '02': PricingBlock02,
  '03': PricingBlock03,
  '04': PricingBlock04,
}

export const RenderPricingBlock: React.FC<PricingBlockWithLocale> = async (props) => {
  const { type, pricingCards, table } = props
  const locale = await getLocale()
  const t = await getTranslations('PricingBlock')

  const translations = {
    monthly: t('monthly'),
    annually: t('annually'),
    features: t('features'),
    includedSolutions: t('includedSolutions'),
    integrations: t('integrations'),
  }

  const BlockComponent = blockComponents[type]

  if (!BlockComponent) {
    console.warn(`No component found for pricing block type: ${type}`)
    return null
  }

  return (
    <Fragment>
      <BlockComponent
        pricingCards={pricingCards}
        table={table}
        locale={locale}
        translations={translations}
      />
    </Fragment>
  )
}
