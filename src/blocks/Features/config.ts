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
      BlocksFeature({ blocks: [StyledList] }),
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

const sizeOptions = [
  { label: 'Half', value: 'half' },
  { label: 'Full', value: 'full' },
  { label: 'One Third', value: 'oneThird' },
  { label: 'Two Thirds', value: 'twoThirds' },
  { label: '60 Percent', value: 'sixtyPercent' },
  { label: '40 Percent', value: 'fortyPercent' },
]

export const FeaturesBlock: Block = {
  slug: 'featuresBlock',
  labels: {
    singular: 'Features',
    plural: 'Features',
  },
  interfaceName: 'FeaturesBlock',
  dbName: 'featuresBlock',
  fields: [
    blockHeader,
    {
      name: 'type',
      type: 'select',
      defaultValue: '01',
      options: [
        { label: '01 - Bento', value: '01' },
        { label: '02 - Bento (2)', value: '02' },
        { label: '03 - Two Column', value: '03' },
        { label: '04 - Basic Image with Text', value: '04' },
        { label: '05 - Basic Image with Text (2-Column)', value: '05' },
        { label: '06 - Brief (Card)', value: '06' },
        { label: '07 - Brief (Centered)', value: '07' },
        { label: '08 - Simple Grid (Mini cards)', value: '08' },
        { label: '09 - 3 Image with Text, Big CTA', value: '09' },
        { label: '10 - 3 Image with Text, Big CTA (2)', value: '10' },
        { label: '11 - 4 Image with Text, Big CTA ', value: '11' },
        { label: '12 - 4 Image with Text, Small CTA', value: '12' },
      ],
      required: true,
    },
    {
      name: 'blockImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      admin: {
        condition: (_, siblingData, { blockData }) => ['04', '06', '07'].includes(blockData?.type),
      },
      // localized: true,
    },
    {
      type: 'collapsible',
      label: 'CTA Link',
      fields: [
        {
          name: 'CTALabel',
          type: 'text',
          label: 'CTA Label Text',
          localized: true,
          admin: {
            description: 'Extra text to display alongside the link',
          },
        },
        link({
          variants: false,
          colors: false,
        }),
      ],
      admin: {
        condition: (_, siblingData, { blockData }) =>
          ['09', '10', '11', '12'].includes(blockData?.type),
      },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Feature Columns',
      fields: [
        {
          name: 'size',
          type: 'select',
          defaultValue: 'half',
          options: sizeOptions,
          admin: {
            condition: (_, siblingData, { blockData }) => {
              return ['01', '02', '03', '05'].includes(blockData?.type)
            },
          },
        },
        {
          name: 'appReference',
          type: 'relationship',
          relationTo: ['solutions', 'integrations'],
          label: 'App Reference',
          admin: {
            condition: (_, siblingData, { blockData }) => {
              return ['01'].includes(blockData?.type)
            },
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          localized: true,
          admin: {
            condition: (_, siblingData, { blockData }) =>
              ['01', '02', '03', '04', '05', '08', '09', '10', '11', '12'].includes(
                blockData?.type,
              ),
          },
        },
        {
          name: 'tabLabel',
          type: 'text',
          label: 'Tab Label',
          localized: true,
          admin: {
            condition: (_, siblingData, { blockData }) => false, // Removed tabLabel as it's not used in remaining variants
          },
        },
        iconPickerField({
          name: 'icon',
          label: 'Icon',
          icons: materialIcons,
          admin: {
            condition: (_, siblingData, { blockData }) =>
              ['06', '07', '08'].includes(blockData?.type),
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
                  ['02', '03', '04', '05'].includes(blockData?.type),
                width: '50%',
              },
            },
            {
              name: 'enableCta',
              label: 'Enable Link',
              type: 'checkbox',
              admin: {
                condition: (_, siblingData, { blockData }) =>
                  ['02', '03', '04', '05'].includes(blockData?.type),
                width: '50%',
              },
            },
            {
              name: 'reverseOrder',
              label: 'Reverse Order',
              type: 'checkbox',
              admin: {
                condition: (_, siblingData, { blockData }) => ['04'].includes(blockData?.type),
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
