import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { iconPickerField } from '@/fields/iconPickerField'
import materialIcons from '@/fields/iconPickerField/material-symbols-icons.json'

import { badge } from '@/fields/badge'
import { linkGroup } from '@/fields/linkGroup'
import { media } from '@/fields/media'

import { EMPTY_CONTENT } from '@/utilities/defaultRichTextContent'

export const CallToAction: CollectionConfig<'callToAction'> = {
  slug: 'callToAction',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  labels: {
    singular: 'Call to Action',
    plural: 'Call to Action',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: '01',
      options: [
        { label: '01 - Card (Split)', value: '01' },
        { label: '02 - Card (Centered)', value: '02' },
        { label: '03 - Brief (Centered)', value: '03' },
        { label: '04 - Banner', value: '04' },
        { label: '05 - Brief (Inverted Colors)', value: '05' },
        { label: '06 - Form (Centered)', value: '06' },
        { label: '07 - Form (Card - Split)', value: '07' },
      ],
      required: true,
    },
    badge({}),
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            BlocksFeature({ blocks: ['styledListBlock'] }),
          ]
        },
      }),
      label: false,
      defaultValue: EMPTY_CONTENT,
    },
    media({}),
    linkGroup({
      overrides: {
        maxRows: 2,
      },
      caption: true,
    }),

    {
      name: 'list',
      type: 'array',
      fields: [
        iconPickerField({
          name: 'icon',
          label: 'Icon',
          icons: materialIcons,
          admin: {
            description:
              'Select an icon from the Material Symbols icon set. You can preview all available icons at https://fonts.google.com/icons',
          },
        }),
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        {
          name: 'subtitle',
          label: 'Subtitle',
          type: 'textarea',
        },
      ],
      localized: true,
      admin: {
        condition: (_, { type }) => ['02'].includes(type),
      },
    },
    // {
    //   name: 'enableForm',
    //   type: 'checkbox',
    //   label: 'Include Form',
    //   defaultValue: false,
    // },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: false,
      admin: {
        condition: (_, { type }) => ['06', '07'].includes(type),
      },
    },
  ],
}
