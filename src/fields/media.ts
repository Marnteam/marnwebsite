import deepMerge from '@/utilities/deepMerge'
import type { Field } from 'payload'

type MediaType = (options?: { mediaOverrides?: Partial<Field> }) => Field

export const media: MediaType = ({ mediaOverrides = {} } = {}) => {
  const generatedMediaField: Field = {
    type: 'collapsible',
    label: 'Media',
    admin: {
      initCollapsed: true,
    },
    fields: [
      {
        name: 'mediaGroup',
        type: 'group',
        label: false,
        admin: {
          hideGutter: true,
        },
        fields: [
          {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            localized: true,
          },
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
                        defaultValue: true,
                      },
                      {
                        name: 'loop',
                        type: 'checkbox',
                        label: 'Loop',
                        defaultValue: true,
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
      },
    ],
  }
  return deepMerge(generatedMediaField, mediaOverrides)
}
