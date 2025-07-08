import type { Block } from 'payload'

export const Marketplace: Block = {
  slug: 'marketplaceBlock',
  interfaceName: 'MarketplaceBlock',
  labels: {
    singular: 'Marketplace',
    plural: 'Marketplace',
  },
  fields: [
    {
      name: 'initialFilters',
      label: 'Initial filters',
      type: 'group',
      fields: [
        {
          name: 'ecosystem',
          type: 'relationship',
          relationTo: 'categories',
          filterOptions: (data) => {
            return {
              'parent.slug': {
                equals: 'ecosystems',
              },
            }
          },
          admin: {
            description:
              'Select the ecosystem to initially filter the integrations by. Leave empty to show all ecosystems.',
          },
        },
        {
          name: 'category',
          type: 'relationship',
          relationTo: 'categories',
          filterOptions: (data) => {
            return {
              'parent.slug': {
                equals: 'marketplace',
              },
            }
          },
          admin: {
            description:
              'Select the category to initially filter the integrations by. Leave empty to show all categories.',
          },
        },
        {
          name: 'sort',
          type: 'select',
          options: [
            {
              label: 'Name',
              value: 'name',
            },
            {
              label: 'Newest',
              value: 'newest',
            },
            {
              label: 'Oldest',
              value: 'oldest',
            },
          ],
          defaultValue: 'newest',
          admin: {
            description:
              'Select the order to initially sort the integrations by. Leave empty to sort by newest.',
          },
        },
      ],
    },
  ],
  dbName: 'marketplaceBlock',
}
