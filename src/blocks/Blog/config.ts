import type { Block } from 'payload'

export const BlogBlock: Block = {
  slug: 'blogBlock',
  interfaceName: 'BlogBlock',
  dbName: 'blogBlock',

  labels: {
    singular: 'Blog',
    plural: 'Blog',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Featured Post',
          value: 'featuredPost',
        },
        {
          label: '2 Columns',
          value: '2-columns',
        },
      ],
      defaultValue: 'featuredPost',
    },
    {
      name: 'featuredPost',
      type: 'relationship',
      relationTo: 'blog-posts',
      admin: {
        description: 'Select the featured post to display in the blog block.',
        condition: (data, siblingData) => {
          return siblingData.type === 'featuredPost'
        },
      },
    },
    {
      name: 'recentPostsList',
      type: 'group',
      admin: {
        condition: (data, siblingData) => {
          return siblingData.type === '2-columns'
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Title of the recent posts list.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Description of the recent posts list.',
          },
        },
        {
          name: 'recentPosts',
          type: 'relationship',
          relationTo: 'blog-posts',
          hasMany: true,
          admin: {
            description:
              'Select the recent posts to display. Leave empty to dynamically fetch recent posts.',
          },
        },
      ],
    },
    {
      name: 'editorsPicksList',
      type: 'group',
      admin: {
        condition: (data, siblingData) => {
          return siblingData.type === '2-columns'
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          admin: {
            description: 'Title of the editors picks list.',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            description: 'Description of the editors picks list.',
          },
        },
        {
          name: 'editorsPicks',
          type: 'relationship',
          relationTo: 'blog-posts',
          hasMany: true,
          admin: {
            description:
              'Select the editors picks to display. Leave empty to dynamically display random posts.',
          },
        },
      ],
    },
  ],
}
