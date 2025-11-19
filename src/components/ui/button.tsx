import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'

const buttonVariants = cva(
  'not-prose inline-flex items-center justify-center gap-2 rounded-full text-base font-medium whitespace-nowrap transition-colors focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 rtl:tracking-normal [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-brand text-base-primary hover:bg-brand/90',
        primary: 'bg-brand text-base-primary hover:bg-brand/90',
        secondary: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        tertiary: '',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'bg-transparent',
        link: 'h-fit! p-0 text-base-secondary hover:text-base-secondary/90',
      },
      color: {
        brand: 'focus-visible:outline-brand',
        neutral: '',
      },
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 py-2 text-sm',
        md: 'h-11 px-5 py-2',
        lg: 'h-12 px-7 py-3',
        icon: 'h-10 w-10',
      },
    },
    compoundVariants: [
      {
        color: 'brand',
        variant: 'primary',
        className: 'bg-brand text-white hover:bg-brand/90',
      },
      {
        color: 'brand',
        variant: 'secondary',
        className: 'border-input bg-transparent text-base-secondary hover:bg-background-neutral',
      },
      {
        color: 'brand',
        variant: 'tertiary',
        className: 'bg-brand/10 text-brand-secondary hover:bg-brand/30',
      },
      {
        color: 'brand',
        variant: 'ghost',
        className: 'text-brand-secondary hover:bg-brand/10',
      },
      {
        color: 'brand',
        variant: 'link',
        className: 'p-0 text-brand-primary hover:text-brand-primary/90',
      },
      {
        color: 'neutral',
        variant: 'primary',
        className: 'bg-neutral text-inverted-primary hover:bg-neutral/80',
      },
      {
        color: 'neutral',
        variant: 'secondary',
        className:
          'border-input bg-transparent text-base-secondary hover:border-neutral/20 hover:bg-background-neutral',
      },
      {
        color: 'neutral',
        variant: 'tertiary',
        className: 'bg-neutral/10 text-base-secondary hover:bg-neutral/30',
      },
      {
        color: 'neutral',
        variant: 'ghost',
        className: 'text-base-secondary hover:bg-neutral/10',
      },
      {
        color: 'neutral',
        variant: 'link',
        className: 'p-0 text-base-secondary hover:text-base-secondary/90',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
      color: 'neutral',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  color?: 'brand' | 'neutral'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, color, className }))}
        ref={ref}
        suppressHydrationWarning
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
