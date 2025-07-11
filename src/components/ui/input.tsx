import * as React from 'react'

import { cn } from '@/utilities/ui'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'bg-background-neutral-subtle hover:bg-background text-base-primary placeholder:text-base-quaternary ring-ring outline-ring/50 flex h-12 w-full min-w-0 rounded-xl px-3 py-2.5 text-base font-medium transition-[color,box-shadow]',
        'border-input border',
        'focus-visible:bg-background-neutral focus-visible:border-ring focus-visible:ring-1 focus-visible:outline-none',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'file:text-base-primary file:inline-flex file:h-12 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'selection:bg-base-quaternary selection:text-base-primary',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
