import type { Block, Field } from 'payload'

import { blockHeader } from '@/components/BlockHeader/config'

const fields: Field[] = [
  {
    name: 'type',
    type: 'select',
    options: [
      { value: '01', label: '01 - Apps Grid Hero' },
      { value: '02', label: '02 - Animated Icons [NOT READY]' },
      { value: '03', label: '03 - Carousel (full width card)' },
      { value: '04', label: '04 - Carousel (3 slides per view)' },
      { value: '05', label: '05 - List with image' },
      { value: '06', label: '06 - Grouped Cards' },
    ],
    required: true,
    defaultValue: '04',
  },
  {
    name: 'media',
    type: 'upload',
    localized: true,
    relationTo: 'media',
    admin: {
      condition: (_, siblingData, { blockData }) => {
        return ['05'].includes(blockData?.type)
      },
    },
  },
  {
    name: 'apps',
    type: 'relationship',
    label: 'Apps to link to',
    relationTo: ['integrations', 'solutions'],
    hasMany: true,
    // localized: true,
    admin: {
      description: 'Select the apps to link to. ',
      condition: (_, siblingData, { blockData }) => {
        return !['06'].includes(blockData?.type)
      },
    },
    defaultValue: async ({ user, locale, req }) => {
      const { docs } = await req.payload.find({
        collection: 'integrations',
        limit: 10,
        sort: 'updatedAt',
      })

      return docs.map((app) => ({ relationTo: 'integrations', value: app.id }))
    },
  },
  {
    name: 'cards',
    type: 'array',
    fields: [
      {
        name: 'title',
        type: 'text',
        localized: true,
      },
      {
        name: 'subtitle',
        type: 'textarea',
        localized: true,
      },
      {
        name: 'appReference',
        type: 'relationship',
        relationTo: ['integrations', 'solutions'],
        hasMany: true,
      },
    ],
    admin: {
      condition: (_, siblingData, { blockData }) => {
        return ['06'].includes(blockData?.type)
      },
    },
  },
]

export const FeaturedAppsBlock: Block = {
  slug: 'featuredAppsBlock',
  labels: {
    singular: 'Featured Apps',
    plural: 'Featured Apps',
  },
  fields: [blockHeader, ...fields],
  interfaceName: 'FeaturedAppsBlock',
  dbName: 'featuredAppsBlock',
}
