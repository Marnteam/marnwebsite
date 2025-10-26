import type { GlobalConfig } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import { authenticated } from '../access/authenticated'
import { link } from '../fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      label: 'Header Menu Tabs',
      name: 'tabs',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/Header/CustomRowLabelTabs',
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'enableDirectLink',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'enableDropdown',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
        {
          type: 'collapsible',
          admin: {
            condition: (_, siblingData) => siblingData.enableDirectLink,
          },
          fields: [
            link({
              variants: false,
              colors: false,
              icon: false,
              description: false,
              disableLabel: true,
            }),
          ],
          label: 'Direct Link',
        },
        {
          type: 'collapsible',
          admin: {
            condition: (_, siblingData) => siblingData.enableDropdown,
          },
          fields: [
            {
              name: 'description',
              type: 'textarea',
              localized: true,
            },
            {
              name: 'descriptionLinks',
              type: 'array',
              fields: [
                link({
                  variants: false,
                  colors: false,
                  icon: false,
                  description: false,
                  overrides: {
                    label: false,
                  },
                }),
              ],
            },
            {
              name: 'navItems',
              type: 'array',
              admin: {
                components: {
                  RowLabel: '@/Header/CustomRowLabelNavItems',
                },
              },
              fields: [
                {
                  name: 'style',
                  type: 'select',
                  defaultValue: 'default',
                  options: [
                    {
                      label: 'Default',
                      value: 'default',
                    },
                    {
                      label: 'Featured',
                      value: 'featured',
                    },
                    {
                      label: 'List',
                      value: 'list',
                    },
                  ],
                },
                {
                  name: 'defaultLink',
                  type: 'group',
                  admin: {
                    condition: (_, siblingData) => siblingData.style === 'default',
                  },
                  fields: [
                    link({
                      variants: false,
                      colors: false,
                      icon: true,
                      description: false,
                      overrides: {
                        label: false,
                      },
                    }),
                    {
                      name: 'description',
                      type: 'textarea',
                      localized: true,
                    },
                  ],
                },
                {
                  name: 'featuredLink',
                  type: 'group',
                  admin: {
                    condition: (_, siblingData) => siblingData.style === 'featured',
                  },
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'label',
                      type: 'richText',
                      localized: true,
                    },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        link({
                          // variants: ['primary', 'secondary', 'tertiary', ''],
                          colors: false,
                          icon: true,
                          description: false,
                          overrides: {
                            label: false,
                          },
                        }),
                      ],
                    },
                  ],
                },
                {
                  name: 'listLinks',
                  type: 'group',
                  admin: {
                    condition: (_, siblingData) => siblingData.style === 'list',
                  },
                  fields: [
                    {
                      name: 'tag',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'links',
                      type: 'array',
                      fields: [
                        link({
                          variants: false,
                          colors: false,
                          icon: true,
                          description: true,
                          overrides: {
                            label: false,
                          },
                        }),
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          label: 'Dropdown Menu',
        },
      ],
    },
    {
      name: 'cta',
      label: 'Header CTA Buttons',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/Header/CustomRowLabelCTA',
        },
      },
      fields: [
        link({
          icon: false,
          overrides: {
            label: false,
          },
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        revalidatePath(`/${req.locale}`, 'layout')
        revalidateTag('global_header')
        return doc
      },
    ],
  },
}
