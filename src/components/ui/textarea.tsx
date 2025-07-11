import * as React from 'react'

import { cn } from '@/utilities/ui'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input bg-background-neutral-subtle hover:bg-background text-base-primary placeholder:text-base-quaternary ring-ring outline-ring/50 flex field-sizing-content min-h-16 w-full rounded-xl border px-3 py-2.5 text-base font-medium transition-[color,box-shadow]',
        'focus-visible:bg-background-neutral focus-visible:border-ring focus-visible:ring-1 focus-visible:outline-none',
        'aria-invalid:outline-destructive/60 aria-invalid:ring-destructive/20 aria-invalid:border-destructive/60 aria-invalid:focus-visible:ring-[3px] aria-invalid:focus-visible:outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
