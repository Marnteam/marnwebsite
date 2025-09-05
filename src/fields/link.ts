import type { Field } from 'payload'

import materialIcons from './iconPickerField/material-symbols-icons.json'
import deepMerge from '@/utilities/deepMerge'

import { iconPickerField } from './iconPickerField'

export type LinkVariants = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link'
export type LinkColors = 'brand' | 'neutral'

export const variantOptions: Record<LinkVariants, { label: string; value: string }> = {
  primary: {
    label: 'Primary',
    value: 'primary',
  },
  secondary: {
    label: 'Secondary',
    value: 'secondary',
  },
  tertiary: {
    label: 'Tertiary',
    value: 'tertiary',
  },
  ghost: {
    label: 'Ghost',
    value: 'ghost',
  },
  link: {
    label: 'Link',
    value: 'link',
  },
}
export const colorOptions: Record<LinkColors, { label: string; value: string }> = {
  brand: {
    label: 'Brand',
    value: 'brand',
  },
  neutral: {
    label: 'Neutral',
    value: 'neutral',
  },
}
type LinkType = (options?: {
  variants?: LinkVariants[] | false
  colors?: LinkColors[] | false
  icon?: boolean
  description?: boolean
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

export const link: LinkType = ({
  variants,
  colors,
  icon = false,
  description = false,
  disableLabel = false,
  overrides = {},
} = {}) => {
  const linkResult: Field = {
    name: 'link',
    label: false,
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
            dbName: 'link_type',
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'blog-posts', 'solutions'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
        rtl: false,
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: !disableLabel,
          localized: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (description) {
    linkResult.fields.push({
      name: 'description',
      label: 'Description',
      type: 'text',
      localized: true,
    })
  }

  if (icon) {
    linkResult.fields.push(
      iconPickerField({
        name: 'icon',
        label: 'Icon',
        icons: materialIcons,
        admin: {
          description:
            'Select an icon from the Material Symbols icon set. You can preview all available icons at https://fonts.google.com/icons',
        },
      }),
    )
  }

  if (colors !== false) {
    let colorOptionsToUse = [colorOptions.brand, colorOptions.neutral]

    if (colors) {
      colorOptionsToUse = colors.map((color) => colorOptions[color])
    }

    linkResult.fields.push({
      name: 'color',
      type: 'select',
      admin: {
        description: 'Choose the button style.',
      },
      dbName: 'link_color',
      defaultValue: 'neutral',
      options: colorOptionsToUse,
    })
  }

  if (variants !== false) {
    let variantOptionsToUse = [
      variantOptions.primary,
      variantOptions.secondary,
      variantOptions.tertiary,
      variantOptions.ghost,
      variantOptions.link,
    ]

    if (variants) {
      variantOptionsToUse = variants.map((variant) => variantOptions[variant])
    }

    linkResult.fields.push({
      name: 'variant',
      type: 'select',
      dbName: 'link_variant',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'primary',
      options: variantOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
