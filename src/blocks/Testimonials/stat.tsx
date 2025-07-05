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
      'bg-background-neutral rounded-space-sm flex flex-col justify-center p-(length:--spacing-md)',
      className,
    )}
  >
    <span className="text-h3 text-base-primary font-medium">{stat.value}</span>
    <div className="flex items-center gap-1">
      {stat.indicator === 'increase' && (
        <ChevronUp className="text-base-tertiary size-4 flex-none" />
      )}
      {stat.indicator === 'decrease' && (
        <ChevronDown className="text-base-tertiary size-4 flex-none" />
      )}
      <span className="text-base-tertiary text-body-sm font-normal">{stat.label}</span>
    </div>
  </div>
)
