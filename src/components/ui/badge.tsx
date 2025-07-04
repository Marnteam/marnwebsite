import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'
import { Icon } from '@iconify-icon/react'
import { Solution, Integration, Media as MediaType } from '@/payload-types'
import { Media } from '../Media'

const badgeVariants = cva(
  'focus:ring-ring inline-flex max-w-max items-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors select-none focus:ring-2 focus:ring-offset-2 focus:outline-none',
  {
    variants: {
      color: {
        default: 'text-base-tertiary bg-transparent',
        blue: 'text-marn-500 dark:text-marn-400 bg-sky-100 disabled:bg-sky-50 disabled:text-blue-500/70 dark:bg-sky-950',
        red: 'bg-tomato-100 text-tomato-600 disabled:bg-tomato-50 disabled:text-tomato-500/70 dark:bg-tomato-950',
        green:
          'bg-lime-400 text-lime-900 disabled:bg-lime-50 disabled:text-lime-500/70 dark:bg-lime-950 dark:text-lime-500',
        yellow:
          'bg-yellow-300 text-yellow-800 disabled:bg-yellow-50 disabled:text-yellow-500/70 dark:bg-yellow-950 dark:text-yellow-400',
        violet:
          'bg-fuchsia-300 text-violet-800 disabled:bg-fuchsia-50 disabled:text-violet-500/70 dark:bg-fuchsia-950 dark:text-violet-400',
        gray: 'bg-neutral-100 text-neutral-600 disabled:bg-neutral-50 disabled:text-neutral-500/70 dark:bg-neutral-700 dark:text-neutral-400',
        inverted: 'bg-background-inverted text-inverted-secondary',
      },
      size: {
        sm: 'text-sm',
        md: 'h-6 px-3 text-(length:--text-xs)',
        lg: 'h-8 text-sm',
      },
    },
    defaultVariants: {
      color: 'blue',
      size: 'sm',
    },
  },
)

export interface BadgeProps {
  type?: ('label' | 'reference') | null
  label?: string | null
  color?: ('blue' | 'red' | 'green' | 'yellow' | 'gray' | 'violet' | 'inverted') | null
  reference?:
    | ({
        relationTo: 'solutions'
        value: string | Solution
      } | null)
    | ({
        relationTo: 'integrations'
        value: string | Integration
      } | null)
  icon?: string | null
  icon_position?: ('flex-row' | 'flex-row-reverse') | null
  className?: string | null
  size?: 'sm' | 'md' | 'lg' | null
}

function Badge({
  type,
  className,
  icon,
  icon_position,
  label,
  reference,
  color,
  size,
  ...props
}: BadgeProps) {
  const iconName = icon ? (icon as string) : undefined
  const referenceValue = reference?.value as Solution | Integration

  if (type === 'label') {
    return (
      <div className={cn(badgeVariants({ color, size }), icon_position, className)} {...props}>
        {iconName && (
          <Icon
            icon={`material-symbols:${iconName}`}
            color="currentColor"
            size={16}
            height="none"
          />
        )}
        <p>{label}</p>
      </div>
    )
  } else if (type === 'reference') {
    return (
      <div
        className={cn(
          badgeVariants({ size, color: 'default' }),
          'gap-2 rounded-none bg-transparent p-0',
          size === 'md' && 'gap-3',
          size === 'lg' && 'gap-3',
          className,
        )}
        {...props}
      >
        {referenceValue?.icon && (
          <Media
            imgClassName={cn(
              'overflow-hidden rounded-md',
              size === 'sm' && 'size-6',
              size === 'md' && 'size-8',
              size === 'lg' && 'size-10',
            )}
            resource={referenceValue?.icon as MediaType}
            priority
          />
        )}
        <p className={cn(size === 'md' && 'text-base', size === 'lg' && 'text-body-md')}>
          {referenceValue?.name}
        </p>
      </div>
    )
  }
}

export { Badge, badgeVariants }
