import { Integration, Page, BlogPost, Solution } from '@/payload-types'

export interface BlockHeaderType {
  className?: string | null
  badgeClassName?: string | null
  richTextClassName?: string | null
  linksClassName?: string | null
  type: 'center' | 'split' | 'start'
  badge?: {
    type?: ('label' | 'reference') | null
    label?: string | null
    color?: ('blue' | 'red' | 'green' | 'yellow' | 'violet' | 'gray' | 'inverted') | null
    reference?:
      | ({
          relationTo: 'solutions'
          value: string | Solution
        } | null)
      | ({
          relationTo: 'integrations'
          value: string | Integration
        } | null)
    /**
     * Select an icon from the Lucide icon set. You can preview all available icons at https://lucide.dev/icons/
     */
    icon?: string | null
    icon_position?: ('flex-row' | 'flex-row-reverse') | null
  }
  headerText?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  links?:
    | {
        link: {
          type?: ('reference' | 'custom') | null
          newTab?: boolean | null
          reference?:
            | ({
                relationTo: 'pages'
                value: string | Page
              } | null)
            | ({
                relationTo: 'blog-posts'
                value: string | BlogPost
              } | null)
            | ({
                relationTo: 'solutions'
                value: string | Solution
              } | null)
          url?: string | null
          label: string

          color?: ('brand' | 'neutral') | null

          variant?: ('primary' | 'secondary' | 'tertiary' | 'ghost' | 'link') | null
        }
        id?: string | null
      }[]
    | null
}
