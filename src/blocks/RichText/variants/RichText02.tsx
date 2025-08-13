import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { RichTextBlock } from '@/payload-types'

type RichText01Props = RichTextBlock & {
  locale?: string
}

export const RichText02: React.FC<RichText01Props> = ({
  content,
  maxWidth = 'default',
  columns,
}) => {
  const maxWidthClasses = {
    small: 'max-w-2xl',
    default: 'max-w-4xl',
    large: 'max-w-6xl',
    full: 'max-w-none',
  }
  const columnsClasses = {
    1: 'columns-1',
    2: 'columns-2',
    3: 'columns-3',
  }

  return (
    <div className="bg-background py-space-xl">
      <div className="container">
        <div className="bg-background-neutral rounded-space-sm p-space-md lg:py-space-xl">
          <RichText
            data={content}
            enableGutter={true}
            className={cn(
              'mx-auto',
              columnsClasses[columns as keyof typeof columnsClasses],
              maxWidthClasses[maxWidth as keyof typeof maxWidthClasses],
            )}
          />
        </div>
      </div>
    </div>
  )
}
