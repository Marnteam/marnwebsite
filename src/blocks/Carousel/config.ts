import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { blockHeader } from '@/components/BlockHeader/config'
import { badge } from '@/fields/badge'
import { iconPickerField } from '@/fields/iconPickerField'
import remixIcons from '@/fields/iconPickerField/remix-icons.json'
import { StyledList } from '@/blocks/StyledList/config'

const richTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
      BlocksFeature({ blocks: [StyledList] }),
    ]
  },
})

export const CarouselBlock: Block = {
  slug: 'carouselBlock',
  labels: {
    singular: 'Carousel',
    plural: 'Carousels',
  },
  interfaceName: 'CarouselBlock',
  dbName: 'carouselBlock',
  fields: [
    blockHeader,
    {
      name: 'type',
      type: 'select',
      defaultValue: '01',
      options: [
        { label: '01 - Tabs', value: '01' },
        { label: '02 - Accordion', value: '02' },
        { label: '03 - Cards', value: '03' },
        { label: '04 - Rich Content', value: '04' },
        { label: '05 - With Modals', value: '05' },
      ],
      required: true,
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Carousel Items',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          localized: true,
          admin: {
            condition: (_, siblingData, { blockData }) =>
              ['01', '02', '04', '05'].includes(blockData?.type),
          },
        },
        {
          name: 'tabLabel',
          type: 'text',
          label: 'Tab Label',
          localized: true,
          admin: {
            condition: (_, siblingData, { blockData }) => ['01'].includes(blockData?.type),
          },
        },
        iconPickerField({
          name: 'icon',
          label: 'Icon',
          icons: remixIcons,
          admin: {
            condition: (_, siblingData, { blockData }) =>
              ['01', '02', '05'].includes(blockData?.type),
            description:
              'Select an icon from the Remix icon library. You can preview all available icons at https://remixicon.com/',
          },
        }),
        {
          type: 'group',
          label: false,
          name: 'content',
          fields: [
            { name: 'title', type: 'text', label: 'Title', required: true, localized: true },
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Subtitle',
              localized: true,
            },
          ],
          admin: {
            condition: (_, siblingData, { blockData }) => !['04'].includes(blockData?.type),
          },
        },
        {
          name: 'richTextContent',
          label: 'Content',
          type: 'richText',
          editor: richTextEditor,
          admin: {
            condition: (_, siblingData, { blockData }) => ['04', '05'].includes(blockData?.type),
          },
          localized: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'enableBadge',
              label: 'Enable Badge',
              type: 'checkbox',
              admin: {
                condition: (_, siblingData, { blockData }) => ['01'].includes(blockData?.type),
                width: '50%',
              },
            },
            {
              name: 'enableCta',
              label: 'Enable Link',
              type: 'checkbox',
              admin: {
                condition: (_, siblingData, { blockData }) =>
                  ['01', '02', '03', '04'].includes(blockData?.type),
                width: '50%',
              },
            },
          ],
        },
        badge({
          overrides: {
            admin: {
              condition: (_: Partial<any>, siblingData: Partial<any>) =>
                Boolean(siblingData?.enableBadge),
            },
          },
        }),
        {
          type: 'collapsible',
          label: 'Link',
          fields: [
            link({
              variants: false,
              colors: false,
            }),
          ],
          admin: {
            condition: (_, siblingData, { blockData }) => Boolean(siblingData?.enableCta),
          },
        },
      ],
    },
  ],
}
