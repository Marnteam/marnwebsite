import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { badge } from '@/fields/badge'
import { media } from '@/fields/media'
import { logos } from '@/fields/logos'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  label: false,
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'hero01',
      label: 'Type',
      options: [
        {
          label: 'Hero 01',
          value: 'hero01',
        },
        {
          label: 'Hero 02',
          value: 'hero02',
        },
        {
          label: 'Hero 03',
          value: 'hero03',
        },
        {
          label: 'Hero 04',
          value: 'hero04',
        },
        {
          label: 'Hero 05',
          value: 'hero05',
        },
        {
          label: 'None',
          value: 'none',
        },
      ],
      required: true,
    },
    badge({}),
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      localized: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
      caption: true,
    }),
    media({}),

    {
      type: 'collapsible',
      label: 'Logos',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'logos',
          label: false,
          type: 'group',
          admin: {
            hideGutter: true,
          },
          fields: [
            {
              name: 'headline',
              type: 'text',
              label: 'Headline',
              required: false,
              localized: true,
              admin: {
                placeholder: 'e.g., As Featured In, Our Partners',
              },
            },
            logos({}),
          ],
        },
      ],
    },
  ],
}
