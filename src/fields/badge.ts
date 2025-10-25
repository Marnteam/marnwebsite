import type { Field } from 'payload'

import materialIcons from './iconPickerField/material-symbols-icons.json'
import deepMerge from '@/utilities/deepMerge'

import { iconPickerField } from './iconPickerField'

export type BadgeColors = 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'gray' | 'inverted'

export const colorOptions: Record<BadgeColors, { label: string; value: string }> = {
  blue: {
    label: 'Blue',
    value: 'blue',
  },
  red: {
    label: 'Red',
    value: 'red',
  },
  green: {
    label: 'Green',
    value: 'green',
  },
  yellow: {
    label: 'Yellow',
    value: 'yellow',
  },
  purple: {
    label: 'Purple',
    value: 'purple',
  },
  gray: {
    label: 'Gray',
    value: 'gray',
  },
  inverted: {
    label: 'Inverted',
    value: 'inverted',
  },
}

type BadgeType = (options?: {
  colors?: BadgeColors[]
  icon?: boolean
  label?: string
  overrides?: Record<string, unknown>
}) => Field

export const badge: BadgeType = ({ colors, icon = true, overrides = {} } = {}) => {
  let colorOptionsToUse = [...Object.values(colorOptions)]

  colorOptionsToUse = colors?.map((color) => colorOptions[color]) ?? colorOptionsToUse

  const badge: Field = {
    name: 'badge',
    type: 'group',
    label: false,
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: 'type',
        type: 'select',
        options: [
          { value: 'label', label: 'Label' },
          { value: 'reference', label: 'Reference' },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            label: 'Label',
            name: 'label',
            type: 'text',
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.type === 'label',
            },
            localized: true,
          },
          {
            name: 'color',
            type: 'select',
            admin: {
              width: '50%',
              condition: (_, siblingData) => siblingData?.type === 'label',
            },
            defaultValue: 'blue',
            options: colorOptionsToUse,
            dbName: 'badge_color',
          },
        ],
      },
      {
        name: 'reference',
        type: 'relationship',
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'reference',
        },
        label: 'Document to link to',
        relationTo: ['solutions', 'integrations'],
      },
    ],
  }

  if (icon) {
    badge.fields.push(
      iconPickerField({
        name: 'icon',
        label: 'Icon',
        icons: materialIcons,
        admin: {
          condition: (_, siblingData) => siblingData?.type === 'label',
          description:
            'Select an icon from the Material Symbols icon set. You can preview all available icons at https://fonts.google.com/icons',
        },
      }),
    )
    badge.fields.push({
      name: 'icon_position',
      label: 'Icon Position',
      defaultValue: 'flex-row',
      type: 'select',
      admin: {
        width: '50%',
        condition: (_, siblingData) => siblingData?.type === 'label',
      },
      options: [
        { label: 'Start', value: 'flex-row' },
        { label: 'End', value: 'flex-row-reverse' },
      ],
      dbName: 'badge_icon_position',
    })
  }

  const badgeGroup: Field = {
    label: 'Badge',
    type: 'collapsible',
    admin: {
      initCollapsed: true,
    },
    fields: [badge],
  }

  return deepMerge(badgeGroup, overrides)
}
