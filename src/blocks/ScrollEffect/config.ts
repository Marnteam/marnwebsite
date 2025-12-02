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

const EMPTY_CONTENT = {
  root: {
    children: [
      { children: [], direction: null, format: '', indent: 0, type: 'paragraph', version: 1 },
    ],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
}

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
        defaultValue: EMPTY_CONTENT,
      },
    ],
  }
  return deepMerge(group, options)
}

export const ScrollEffect: Block = {
  slug: 'scrollEffectBlock',
  labels: {
    singular: 'Scroll Effect',
    plural: 'Scroll Effects',
  },
  interfaceName: 'ScrollEffectBlock',
  dbName: 'scrollEffectBlock',
  fields: [
    blockHeader,
    {
      name: 'type',
      type: 'select',
      defaultValue: '01',
      options: [
        { label: 'iPad', value: '01' },
        { label: 'Sunmi v2s', value: '02' },
        { label: 'Kiosk', value: '03' },
      ],
      required: true,
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Items',
      admin: {
        components: {
          RowLabel: 'src/blocks/CustomRowLabelFeatureCol.tsx',
        },
      },
      fields: [
        {
          name: 'tabLabel',
          type: 'text',
          label: 'Tab Label',
          localized: true,
          admin: {
            // condition: (_, siblingData, { blockData }) => ['01'].includes(blockData?.type),
            // hidden: true,
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          localized: true,
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
                condition: (_, siblingData, { blockData }) =>
                  ['01', '02', '03', '04'].includes(blockData?.type),
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
