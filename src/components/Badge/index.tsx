import type React from 'react'
import type { ElementType, ComponentPropsWithoutRef } from 'react'
import { cn } from '@/utilities/ui'
import { Icon } from '@iconify-icon/react'
import type { Solution, Integration, Media as MediaType } from '@/payload-types'
import { Media } from '../MediaResponsive'
import { Badge, badgeVariants } from '../ui/badge'

type AsProp<C extends ElementType> = {
  as?: C
}

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P)

type PolymorphicComponentProp<C extends ElementType, Props = {}> = React.PropsWithChildren<
  Props & AsProp<C>
> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type BadgeProps<C extends ElementType = typeof Badge> = PolymorphicComponentProp<
  C,
  {
    type?: ('label' | 'reference') | null
    label?: string | null
    color?: 'blue' | 'red' | 'green' | 'yellow' | 'gray' | 'violet' | 'inverted' | 'default' | null
    reference?:
      | ({
          relationTo: 'solutions'
          value: string | Solution
        } | null)
      | ({
          relationTo: 'integrations'
          value: string | Integration
        } | null)
    icon?: string | null
    icon_position?: ('flex-row' | 'flex-row-reverse') | null
    className?: string | null
    size?: 'sm' | 'md' | 'lg' | null
  }
>

function CMSBadge<C extends ElementType = typeof Badge>({
  type = 'label',
  className,
  icon,
  icon_position,
  label,
  reference,
  color = 'default',
  size,
  children,
  as,
  ...props
}: BadgeProps<C>) {
  const iconName = icon ? (icon as string) : undefined
  const referenceValue =
    reference?.value && typeof reference.value === 'object'
      ? (reference.value as Solution | Integration)
      : undefined

  const badgeSize = size ?? 'sm'
  const badgeColor = type === 'reference' ? 'default' : color

  const badgeContent = (
    <>
      {iconName && (
        <Icon icon={`material-symbols:${iconName}`} color="currentColor" size={16} height="none" />
      )}
      {label && <p>{label}</p>}
      {!label && referenceValue?.icon && (
        <Media
          imgClassName="h-full overflow-hidden rounded-md"
          resource={referenceValue?.icon as MediaType}
          priority
        />
      )}
      {!label && referenceValue?.name && <p>{referenceValue?.name}</p>}
      {children}
    </>
  )

  const Component = (as || Badge) as ElementType

  return (
    <Component
      className={cn(badgeVariants({ color: badgeColor, size, type }), className)}
      data-slot="cms-badge"
      data-type={type}
      {...props}
    >
      {badgeContent}
    </Component>
  )
}
export { CMSBadge }
