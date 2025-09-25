import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { badge } from '@/fields/badge'

const editorWithStyledList = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      BlocksFeature({ blocks: ['styledListBlock'] }),
    ]
  },
})

export const blockHeader: Field = {
  name: 'blockHeader',
  type: 'group',
  label: 'Block Header',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'center',
      label: 'Type',
      options: [
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Split',
          value: 'split',
        },
        {
          label: 'Start',
          value: 'start',
        },
      ],
      required: true,
    },
    badge({}),

    {
      name: 'headerText',
      type: 'richText',
      editor: editorWithStyledList,
      label: false,
      localized: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
