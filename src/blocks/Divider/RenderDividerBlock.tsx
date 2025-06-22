import React from 'react'
import { DividerBlock } from '@/payload-types'

export const RenderDividerBlock: React.FC<DividerBlock> = (props) => {
  const { size, enableDivider } = props
  return (
    <div
      data-size={size}
      className="data-[size=small]:py-space-xl container data-[size=large]:py-[calc(var(--spacing-space-xl)*3)] data-[size=medium]:py-[calc(var(--spacing-space-xl)*2)]"
    >
      {enableDivider && <hr className="border-border w-full" />}
    </div>
  )
}
