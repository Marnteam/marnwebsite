import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  defaultPopulate: { name: true, avatar: true },
  auth: { loginWithUsername: false },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'author_login',
      type: 'text',
      admin: {
        description: 'Temporary field for uniyfing user data shape with Wordpress site',
      },
    },
  ],
  timestamps: true,
}
