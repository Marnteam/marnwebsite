import React, { Fragment } from 'react'
import type { LogoBlock } from '@/payload-types'

import { Logo01 } from './Logo01'
import { Logo02 } from './Logo02'
import { Logo03 } from './Logo03'
import { TypedLocale } from 'payload'

type LogoBlockType = LogoBlock & {
  locale: TypedLocale
}

const blockComponents = {
  '01': Logo01,
  '02': Logo02,
  '03': Logo03,
}

export const RenderLogoBlock: React.FC<LogoBlockType> = async (props) => {
  const { type, blockHeader, logos, locale } = props // blockHeader is available but not used for rendering yet
  // Ensure logos exist and are an array before proceeding
  if (!logos || !Array.isArray(logos) || logos.length === 0) {
    console.warn('LogoBlock: No logos provided.')
    return null
  }

  // Check if logos is an array of numbers or objects
  const isArrayOfObjects = logos.every((logo) => typeof logo === 'object' && logo !== null)
  if (!isArrayOfObjects) {
    console.warn('LogoBlock: Logos must be an array of objects.')
    return null
  }

  const BlockComponent = blockComponents[type as keyof typeof blockComponents]

  if (!BlockComponent) {
    console.warn(`LogoBlock: Component for type "${type}" not found.`)
    return null
  }

  return (
    <Fragment>
      <BlockComponent logos={logos} />
    </Fragment>
  )
}
