import React from 'react'
import { cn } from '@/utilities/ui'
import { Icon } from '@iconify-icon/react'
import type { StyledListBlock as StyledListBlockType } from '@/payload-types'

type Props = StyledListBlockType & {
  className?: string
}

export const StyledListBlock: React.FC<Props> = ({ className, items, listStyle = 'bullet' }) => {
  const listClassMap = {
    bullet: 'list-disc ',
    numbered: 'list-decimal ',
    icons: '',
  } as const

  const style = listStyle || 'bullet'

  if (!items || items.length === 0) {
    return null
  }

  return (
    <>
      {style === 'icons' ? (
        <ul className={cn('space-y-3', listClassMap[style], className)}>
          {items.map(
            (item, index) =>
              item.text && (
                <li
                  key={item.id || `item-${index}`}
                  className="text-base-tertiary flex list-none items-center gap-3"
                >
                  {item.icon && (
                    <Icon
                      icon={`material-symbols:${item.icon}`}
                      className="flex-shrink-0"
                      height={20}
                      width={20}
                    />
                  )}
                  <span className="mt-0">{item.text}</span>
                </li>
              ),
          )}
        </ul>
      ) : (
        <ul className={cn('space-y-2', listClassMap[style], className)}>
          {items.map(
            (item, index) =>
              item.text && (
                <li key={item.id || `item-${index}`} className="text-base-tertiary">
                  {item.text}
                </li>
              ),
          )}
        </ul>
      )}
    </>
  )
}
