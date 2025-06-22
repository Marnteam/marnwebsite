import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'

const buttonVariants = cva(
  'ring-offset-background focus-visible:ring-ring focus-visible:secondary-none inline-flex items-center justify-center gap-2 rounded-full text-(length:--text-body-sm) font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rtl:tracking-normal [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-brand text-base-primary hover:bg-brand/90',
        primary: 'bg-brand text-base-primary hover:bg-brand/90',
        secondary: 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
        tertiary: '',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'bg-transparent',
        link: 'text-base-secondary hover:text-base-secondary/90 p-0',
      },
      color: {
        brand: '',
        neutral: '',
      },
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 py-2 text-sm',
        md: 'h-11 px-4 py-2',
        lg: 'h-12 px-6 py-3',
        icon: 'h-10 w-10',
      },
    },
    compoundVariants: [
      {
        color: 'brand',
        variant: 'primary',
        className: 'bg-brand hover:bg-brand/90 text-white',
      },
      {
        color: 'brand',
        variant: 'secondary',
        className: 'hover:bg-background-neutral text-base-secondary border-input bg-transparent',
      },
      {
        color: 'brand',
        variant: 'tertiary',
        className: 'bg-brand/10 hover:bg-brand/30 text-brand-secondary',
      },
      {
        color: 'brand',
        variant: 'ghost',
        className: 'text-brand-secondary hover:bg-brand/10',
      },
      {
        color: 'brand',
        variant: 'link',
        className: 'text-brand-primary hover:text-brand-primary/90 p-0',
      },
      {
        color: 'neutral',
        variant: 'primary',
        className: 'bg-neutral hover:bg-neutral/80 text-inverted-primary',
      },
      {
        color: 'neutral',
        variant: 'secondary',
        className:
          'hover:bg-background-neutral hover:border-neutral/20 text-base-secondary border-input bg-transparent',
      },
      {
        color: 'neutral',
        variant: 'tertiary',
        className: 'bg-neutral/10 hover:bg-neutral/30 text-base-secondary',
      },
      {
        color: 'neutral',
        variant: 'ghost',
        className: 'text-base-secondary hover:bg-neutral/10',
      },
      {
        color: 'neutral',
        variant: 'link',
        className: 'text-base-secondary hover:text-base-secondary/90 p-0',
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
