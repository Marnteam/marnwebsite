import { createServerFeature } from '@payloadcms/richtext-lexical'

export const ImagePasteFeature = createServerFeature({
  feature: {
    ClientFeature:
      'src/components/RichText/ImagePasteFeature/feature.client.ts#ImagePasteFeatureClient',
  },
  key: 'imagePasteFeature',
})
