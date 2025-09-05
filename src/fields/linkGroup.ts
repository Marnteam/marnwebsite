import type { ArrayField, Field } from 'payload'

import type { LinkVariants } from './link'
import type { LinkColors } from './link'

import deepMerge from '@/utilities/deepMerge'
import { link } from './link'

type LinkGroupType = (options?: {
  variants?: LinkVariants[] | false
  colors?: LinkColors[] | false
  icon?: boolean
  description?: boolean
  overrides?: Partial<ArrayField>
  caption?: boolean
}) => Field

export const linkGroup: LinkGroupType = ({
  variants,
  colors,
  description,
  icon,
  overrides = {},
  caption = false,
} = {}) => {
  const generatedLinkGroup: Field = {
    // name: 'links',
    label: 'Buttons',
    type: 'collapsible',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        name: 'links',
        type: 'array',
        label: 'Buttons',
        fields: [
          link({
            variants,
            colors,
            description,
            icon,
          }),
        ],
      },
    ],
  }
  if (caption) {
    generatedLinkGroup.fields.push({
      name: 'caption',
      type: 'text',
      label: 'Supporting text',
      required: false,
      admin: {
        placeholder: 'e.g., 30-day refund',
      },
    })
  }
  return deepMerge(generatedLinkGroup, overrides)
}
