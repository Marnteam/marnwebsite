import * as React from 'react'

import { cn } from '@/utilities/ui'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'bg-background text-base-primary placeholder:text-base-quaternary ring-ring flex field-sizing-content min-h-16 w-full rounded-xl px-3 py-2.5 text-base font-normal transition-[color,box-shadow]',
        'border-input hover:border-neutral/20 dark:hover:border-neutral/40 border',
        'focus-visible:border-ring focus-visible:hover:border-ring focus-visible:ring focus-visible:outline-none',
        'aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
