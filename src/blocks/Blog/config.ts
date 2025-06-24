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
      name: 'featuredPost',
      type: 'relationship',
      relationTo: 'posts',
      admin: {
        description: 'Select the featured post to display in the blog block.',
      },
    },
    {
      name: 'initialFilters',
      label: 'Initial filters',
      type: 'group',
      fields: [
        {
          name: 'recentPosts',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          admin: {
            description: 'Select the recent posts to display in the blog block.',
          },
        },
        {
          name: 'editorsPicks',
          type: 'relationship',
          relationTo: 'posts',
          hasMany: true,
          admin: {
            description: 'Select the editors picks to display in the blog block.',
          },
        },
      ],
    },
  ],
}
