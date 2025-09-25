import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { blockHeader } from '@/components/BlockHeader/config'
import { badge } from '@/fields/badge'
import { iconPickerField } from '@/fields/iconPickerField'
import materialIcons from '@/fields/iconPickerField/material-symbols-icons.json'
import { StyledList } from '@/blocks/StyledList/config'
import deepMerge from '@/utilities/deepMerge'

const richTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      BlocksFeature({ blocks: ['styledListBlock'] }),
    ]
  },
})

const textGroup = (options: Partial<Field>) => {
  const group: Field = {
    name: 'content',
    type: 'group',
    label: false,
    fields: [
      { name: 'title', type: 'text', label: 'Title', required: true, localized: true },
      {
        name: 'subtitle',
        type: 'richText',
        label: 'Subtitle',
        localized: true,
        editor: richTextEditor,
      },
    ],
  }
  return deepMerge(group, options)
}

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
        { label: '04 - Simple', value: '04' },
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
          name: 'tabLabel',
          type: 'text',
          label: 'Tab Label',
          localized: true,
          admin: {
            condition: (_, siblingData, { blockData }) => ['01'].includes(blockData?.type),
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          // localized: true,
        },
        iconPickerField({
          name: 'icon',
          label: 'Icon',
          icons: materialIcons,
          admin: {
            condition: (_, siblingData, { blockData }) =>
              ['01', '02', '04', '05'].includes(blockData?.type),
            description:
              'Select an icon from the Material Symbols icon set. You can preview all available icons at https://fonts.google.com/icons',
          },
        }),
        textGroup({}),
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
              condition: (_, siblingData) => Boolean(siblingData?.enableBadge),
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
