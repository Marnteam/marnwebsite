'use client'

import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { ImagePastePlugin } from './ImagePastePlugin'

export const ImagePasteFeatureClient = createClientFeature({
  plugins: [
    {
      Component: ImagePastePlugin,
      position: 'normal',
    },
  ],
})
