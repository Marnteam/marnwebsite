import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
// import { generateBlurHash } from '@/utilities/generateBlurHash'
import { createS3SafeFilename } from '@/utilities/createS3SafeName'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['filename', 'alt', 'category', 'locale'],
  },
  fields: [
    {
      name: 'prefix',
      type: 'text',
      defaultValue: 'media',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: 'locale',
      type: 'select',
      options: ['en', 'ar'],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      filterOptions: {
        'parent.slug': { equals: 'media' },
      },
      hasMany: true,
      admin: {
        components: {
          afterInput: ['@/components/ImageCategoryGuide'],
          Field: '@/components/RelationshipChipSelect',
        },
      },
    },
    {
      name: 'blurhash',
      type: 'text',
      admin: {
        hidden: true,
        disableListColumn: true,
        disableListFilter: true,
      },
    },
    {
      name: 'dark',
      label: 'Dark Mode Image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional: Upload an alternative image to be used when the site is viewed in dark mode.',
      },
    },
    {
      label: 'Mobile Image Variants',
      type: 'collapsible',
      admin: {
        description:
          'Add alternative images for mobile devices. These will be used on smaller screens for better performance and appearance.',
      },
      fields: [
        {
          type: 'group',
          fields: [
            {
              name: 'mobile',
              label: 'Mobile Image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional: Upload an image optimized for mobile devices.',
              },
            },
            {
              name: 'mobileDark',
              label: 'Mobile Dark Mode Image',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Optional: Upload a mobile-optimized image for dark mode.',
              },
            },
          ],
        },
      ],
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, '../../public/media'),
    // adminThumbnail: 'thumbnail',
    // focalPoint: true,
    // imageSizes: [
    //   {
    //     name: 'thumbnail',
    //     width: 300,
    //   },
    //   {
    //     name: 'square',
    //     width: 500,
    //     height: 500,
    //   },
    //   {
    //     name: 'small',
    //     width: 600,
    //   },
    //   {
    //     name: 'medium',
    //     width: 900,
    //   },
    //   {
    //     name: 'large',
    //     width: 1400,
    //   },
    //   {
    //     name: 'xlarge',
    //     width: 1920,
    //   },
    //   {
    //     name: 'og',
    //     width: 1200,
    //     height: 630,
    //     crop: 'center',
    //   },
    // ],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (typeof data === 'object' && data) {
          if (!data.alt && typeof data.filename === 'string') {
            data.alt = data.filename
          }
        }
        return data
      },
      // generateBlurHash,
      createS3SafeFilename,
    ],
  },
}
