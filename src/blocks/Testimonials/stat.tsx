import { ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/utilities/ui'

type Stat = {
  /**
   * Label for the stat
   */
  label?: string | null
  /**
   * Value for the stat. Example: 85% or 250 SAR
   */
  value?: string | null
  /**
   * Whether the value is an increase or decrease
   */
  indicator?: ('increase' | 'decrease' | 'noChange') | null
  id?: string | null
}

export const Stat: React.FC<{
  stat: Stat
  index: number
  className?: string
}> = ({ stat, index, className }) => (
  <div
    key={stat.id || index}
    className={cn(
      'flex flex-col justify-center rounded-3xl bg-background-neutral p-(length:--spacing-space-md)',
      className,
    )}
  >
    <span className="text-h3 font-medium text-base-primary">{stat.value}</span>
    <div className="flex items-center gap-1">
      {stat.indicator === 'increase' && (
        <ChevronUp className="size-4 flex-none text-base-tertiary" />
      )}
      {stat.indicator === 'decrease' && (
        <ChevronDown className="size-4 flex-none text-base-tertiary" />
      )}
      <span className="text-body-sm font-normal text-base-tertiary">{stat.label}</span>
    </div>
  </div>
)
