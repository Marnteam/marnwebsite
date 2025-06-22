import { iconPickerField } from '@/fields/iconPickerField'
import type { Block } from 'payload'
import materialIcons from '@/fields/iconPickerField/material-symbols-icons.json'

export const StyledList: Block = {
  slug: 'styledListBlock',
  interfaceName: 'StyledListBlock',
  dbName: 'styledListBlock',
  labels: {
    singular: 'Styled List',
    plural: 'Styled Lists',
  },
  fields: [
    {
      name: 'listStyle',
      type: 'select',
      defaultValue: 'bullet',
      options: [
        {
          label: 'Bullets',
          value: 'bullet',
        },
        {
          label: 'Numbers',
          value: 'numbered',
        },
        {
          label: 'Icons',
          value: 'icons',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          localized: true,
        },
        iconPickerField({
          name: 'icon',
          label: 'Icon',
          icons: materialIcons,
          admin: {
            condition: (data, siblingData, { blockData }) => blockData.listStyle === 'icons',
            description:
              'Select an icon from the Material Symbols icon set. You can preview all available icons at https://fonts.google.com/icons',
          },
        }),
      ],
    },
  ],
}
