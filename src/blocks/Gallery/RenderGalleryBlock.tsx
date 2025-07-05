import React, { Fragment } from 'react'
import type { GalleryBlock } from '@/payload-types'
// import { RenderBlockHeader } from '@/blocks/BlockHeader/RenderBlockHeader' // BlockHeader path not found
import { Gallery01 } from './Gallery01'
import { Gallery02 } from './Gallery02'
import { Gallery03 } from './Gallery03'
import { Gallery04 } from './Gallery04'
import { TypedLocale } from 'payload'

type GalleryBlockType = GalleryBlock & {
  locale: TypedLocale
  className?: string
}

const blockComponents = {
  '01': Gallery01,
  '02': Gallery02,
  '03': Gallery03,
  '04': Gallery04,
}

export const RenderGalleryBlock: React.FC<GalleryBlockType> = async (props) => {
  const { type, blockHeader, images, interactiveGallery, locale, className } = props

  // Ensure images exist and are an array before proceeding
  if (!images || !Array.isArray(images) || images.length === 0) {
    console.warn('GalleryBlock: No images provided.')
    return null
  }
  // Check if images is an array of numbers or objects
  const isArrayOfObjects = images.every((image) => typeof image === 'object' && image !== null)
  if (!isArrayOfObjects) {
    console.warn('GalleryBlock: Images must be an array of objects.')
    return null
  }

  const BlockComponent = blockComponents[type as keyof typeof blockComponents]

  if (!BlockComponent) {
    console.warn(`GalleryBlock: Component for type "${type}" not found.`)
    return null
  }

  return (
    <Fragment>
      {/* {blockHeader && <RenderBlockHeader blockHeader={blockHeader} />} // Commented out until BlockHeader is available */}
      {/* Pass only the images array to the specific variant component */}
      <BlockComponent
        images={images}
        interactiveGallery={interactiveGallery}
        locale={locale}
        className={className}
      />
    </Fragment>
  )
}
