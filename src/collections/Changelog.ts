import { BlocksFeature } from '@payloadcms/richtext-lexical'
import { HeadingFeature } from '@payloadcms/richtext-lexical'
import { FixedToolbarFeature, InlineToolbarFeature } from '@payloadcms/richtext-lexical'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Changelog: CollectionConfig = {
  slug: 'changelog',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    readVersions: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'version', 'date'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Title of the changelog entry.',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        description: 'Date of the changelog entry.',
        position: 'sidebar',
      },
    },
    {
      name: 'version',
      type: 'text',
      required: true,
      admin: {
        description: 'Version number associated with the changelog entry.',
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [MediaBlock] }),
          ]
        },
      }),
      localized: true,
      required: true,
      admin: {
        description: 'Detailed description of the changes.',
      },
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Bug Fix', value: 'bug-fix' },
        { label: 'Feature', value: 'feature' },
        { label: 'Improvement', value: 'improvement' },
        { label: 'Security', value: 'security' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Categories for the changelog entry.',
      },
    },
  ],
}
