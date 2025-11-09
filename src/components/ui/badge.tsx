import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-4 py-1.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3',
  {
    variants: {
      // kept for shadcn/ui compatiblity, not needed for now
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:border-border [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
      color: {
        default: 'bg-transparent text-(color:--color-base-tertiary)',
        blue: 'bg-[#B8E6FE] text-marn-600 disabled:bg-sky-50 disabled:text-blue-500/70 dark:bg-marn-950 dark:text-[#B8E6FE]',
        red: 'bg-tomato-100 text-tomato-600 disabled:bg-tomato-50 disabled:text-tomato-500/70 dark:bg-tomato-950',
        green:
          'bg-lime-400 text-lime-900 disabled:bg-lime-50 disabled:text-lime-500/70 dark:bg-lime-950 dark:text-lime-300',
        yellow:
          'bg-yellow-300 text-yellow-800 disabled:bg-yellow-50 disabled:text-yellow-500/70 dark:bg-yellow-950 dark:text-yellow-300',
        violet:
          'bg-fuchsia-300 text-violet-800 disabled:bg-fuchsia-50 disabled:text-violet-500/70 dark:bg-fuchsia-950 dark:text-violet-300',
        gray: 'bg-background-neutral-subtle text-base-tertiary disabled:bg-neutral-50 disabled:text-neutral-500/70 [a&]:hover:bg-background-neutral [a&]:hover:text-base-primary',
        inverted: 'bg-background-inverted text-inverted-secondary',
      },
      size: {
        sm: 'text-xs',
        md: 'h-6 px-3 text-(length:--text-xs)',
        lg: 'h-8 text-sm',
      },
      type: {
        default: '',
        label: '',
        reference: 'gap-2 rounded-none bg-transparent p-0 text-base-tertiary',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'default',
      type: 'default',
    },
    compoundVariants: [
      {
        type: 'reference',
        size: 'sm',
        className: 'h-6',
      },
      {
        type: 'reference',
        size: 'md',
        className: 'h-8 text-(length:--text-body-sm)',
      },
      {
        type: 'reference',
        size: 'lg',
        className: 'h-10 text-(length:--text-body-lg)',
      },
    ],
  },
)

function Badge({
  className,
  variant,
  color = 'default',
  size,
  type,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ color, size, type }), className)}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
