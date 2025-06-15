import type { Block, Field } from 'payload'

import { link } from '@/fields/link'
import { blockHeader } from '@/components/BlockHeader/config'
import { badge } from '@/fields/badge'

const pricingCard: Field[] = [
  {
    name: 'type',
    label: false,
    type: 'select',
    options: [
      { value: 'basic', label: 'Basic' },
      { value: 'featured', label: 'Featured' },
    ],
    defaultValue: 'basic',
    admin: {
      description: 'Select the type of pricing card',
      condition: (_, siblingData, { blockData }) => {
        return blockData.type === '01'
      },
    },
  },
  badge({
    overrides: {
      //   localized: true,
      admin: {
        description:
          'Optional flag for the pricing card. Example: "Most Popular", "Best Value", "New", etc.',
      },
    },
  }),
  {
    name: 'title',
    type: 'text',
    localized: true,
  },
  {
    name: 'subtitle',
    type: 'text',
    localized: true,
  },
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'price',
    type: 'group',
    label: false,
    localized: true,
    fields: [
      {
        name: 'annually',
        label: { en: 'Annual price', ar: 'السعر السنوي' },
        type: 'text',
      },
      {
        name: 'monthly',
        label: { en: 'Monthly price', ar: 'السعر الشهري' },
        type: 'text',
      },
    ],
  },
  {
    name: 'enableCta',
    label: 'Enable Link',
    type: 'checkbox',
  },
  {
    type: 'collapsible',
    label: 'Link',
    fields: [link({})],
    admin: {
      condition: (_, siblingData, { blockData }) => Boolean(siblingData?.enableCta),
    },
  },
  {
    name: 'features',
    type: 'array',
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
      },
      {
        name: 'feature',
        type: 'text',
        localized: true,
      },
    ],
    admin: {
      condition: (_, siblingData, { blockData }) => ['01', '02'].includes(blockData.type),
    },
  },

  {
    name: 'featuredSolutions',
    type: 'relationship',
    relationTo: 'solutions',
    hasMany: true,
    admin: {
      condition: (_, siblingData, { blockData }) => ['01', '02'].includes(blockData.type),
    },
  },
  {
    name: 'featuredIntegrations',
    type: 'relationship',
    relationTo: 'integrations',
    hasMany: true,
    admin: {
      condition: (_, siblingData, { blockData }) => ['01', '02'].includes(blockData.type),
    },
  },
]

export const PricingBlock: Block = {
  slug: 'pricingBlock',
  labels: {
    singular: 'Pricing',
    plural: 'Pricing',
  },
  interfaceName: 'PricingBlock',
  dbName: 'pricingBlock',
  fields: [
    blockHeader,
    {
      name: 'type',
      type: 'select',
      defaultValue: '01',
      options: [
        { label: '01 - Hero', value: '01' },
        { label: '02 - Add ons', value: '02' },
        { label: '03 - Carousel', value: '03' },
        { label: '04 - Table', value: '04' },
      ],
      required: true,
    },
    {
      name: 'pricingCards',
      type: 'array',
      fields: [...pricingCard],
      admin: {
        condition: (_, siblingData, { blockData }) => {
          return ['01', '02', '03'].includes(blockData.type)
        },
      },
    },

    {
      name: 'table',
      type: 'group',
      label: 'Table',
      localized: true,
      admin: {
        condition: (data, siblingData) => siblingData.type === '04',
        description: 'Create a structured table with defined columns and rows',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Table Title',
          localized: true,
        },
        {
          name: 'headers',
          type: 'array',
          label: 'Table Headers',
          fields: [
            {
              name: 'header',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'width',
              type: 'select',
              options: [
                { label: 'Auto', value: 'auto' },
                { label: 'Small (20%)', value: 'w-1/5' },
                { label: 'Medium (33%)', value: 'w-1/3' },
                { label: 'Large (50%)', value: 'w-1/2' },
                { label: 'Extra Large (66%)', value: 'w-2/3' },
              ],
              required: true,
              defaultValue: 'auto',
            },
          ],
          admin: {
            description: 'Define the column headers for your table',
          },
        },
        {
          name: 'rows',
          type: 'array',
          label: 'Table Rows',
          fields: [
            {
              name: 'cells',
              type: 'array',
              label: 'Row Cells',
              fields: [
                {
                  name: 'content',
                  type: 'text',
                  localized: true,
                  admin: {
                    description:
                      'Add "check" or "close" to show a checkmark or x in the cell. Add a solution slug to show a solution badge in the cell.',
                  },
                },
                {
                  name: 'isHeader',
                  type: 'checkbox',
                  label: 'Is Header Cell',
                  defaultValue: false,
                },
              ],
              admin: {
                description: 'Add content for each cell in this row.',
              },
            },
            {
              name: 'children',
              type: 'array',
              label: 'Nested Rows',
              fields: [
                {
                  name: 'cells',
                  type: 'array',
                  label: 'Child Row Cells',
                  fields: [
                    {
                      name: 'content',
                      type: 'text',
                      localized: true,
                      admin: {
                        description:
                          'Add "check" or "close" to show a checkmark or x in the cell. Add a solution slug to show a solution badge in the cell.',
                      },
                    },
                  ],
                },
              ],
              admin: {
                description: 'Add nested/child rows that will be collapsible under this row.',
              },
            },
            {
              name: 'isExpandable',
              type: 'checkbox',
              label: 'Is Expandable',
              defaultValue: false,
              admin: {
                description: 'Check if this row should show expand/collapse functionality',
              },
            },
          ],
          admin: {
            description: 'Add rows to your table with structured cell data',
          },
        },
        {
          name: 'styling',
          type: 'group',
          label: 'Table Styling',
          fields: [
            {
              name: 'striped',
              type: 'checkbox',
              label: 'Striped Rows',
              defaultValue: true,
            },
            {
              name: 'bordered',
              type: 'checkbox',
              label: 'Show Borders',
              defaultValue: true,
            },
            {
              name: 'compact',
              type: 'checkbox',
              label: 'Compact Layout',
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
