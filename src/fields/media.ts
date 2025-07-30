import deepMerge from '@/utilities/deepMerge'
import type { Field } from 'payload'

type MediaType = (options?: { mediaOverrides?: Partial<Field> }) => Field
type MediaGroupType = (options?: {
  mediaOverrides?: Partial<Field>
  overrides?: Partial<Field>
}) => Field

const media: MediaType = ({ mediaOverrides = {} } = {}) => {
  const generatedMediaField: Field = {
    name: 'light',
    type: 'upload',
    relationTo: 'media',
  }
  return deepMerge(generatedMediaField, mediaOverrides)
}

export const mediaGroup: MediaGroupType = ({ mediaOverrides, overrides = {} } = {}) => {
  const generatedMediaGroupField: Field = {
    name: 'media',
    label: false,
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      media({ mediaOverrides: { name: 'light', ...(mediaOverrides || {}) } }),
      media({ mediaOverrides: { name: 'dark', ...(mediaOverrides || {}) } }),
      {
        label: 'Video controls',
        type: 'collapsible',
        admin: {
          initCollapsed: true,
        },
        fields: [
          {
            name: 'videoControls',
            type: 'group',
            label: false,
            admin: {
              hideGutter: true,
            },
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'autoplay',
                    type: 'checkbox',
                    label: 'Autoplay',
                    defaultValue: false,
                  },
                  {
                    name: 'loop',
                    type: 'checkbox',
                    label: 'Loop',
                    defaultValue: false,
                  },
                  {
                    name: 'muted',
                    type: 'checkbox',
                    label: 'Muted',
                    defaultValue: false,
                  },
                  {
                    name: 'controls',
                    type: 'checkbox',
                    label: 'Show Controls',
                    defaultValue: false,
                  },
                ],
              },
              {
                name: 'objectFit',
                dbName: 'of',
                type: 'select',
                label: 'Object Fit',
                defaultValue: 'cover',
                options: [
                  {
                    label: 'Cover',
                    value: 'cover',
                  },
                  {
                    label: 'Contain',
                    value: 'contain',
                  },
                  {
                    label: 'Fill',
                    value: 'fill',
                  },
                  {
                    label: 'None',
                    value: 'none',
                  },
                  {
                    label: 'Scale Down',
                    value: 'scale-down',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }
  return deepMerge(generatedMediaGroupField, overrides)
}
