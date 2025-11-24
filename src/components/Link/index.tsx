import { Button, type ButtonProps } from '@/components/ui/button'

import { cn } from '@/utilities/ui'
import { Link } from '@/i18n/routing'
import React from 'react'

import type { Integration, Page, BlogPost, Solution } from '@/payload-types'
import { Icon } from '@iconify-icon/react'
import { getHref } from '@/utilities/getHref'

export type CMSLinkType = {
  variant?: 'inline' | ButtonProps['variant'] | null
  color?: ButtonProps['color'] | null
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'blog-posts' | 'solutions' | 'integrations'
    value: Page | BlogPost | Solution | Integration | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  icon?: string | null
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const CMSLink = React.forwardRef<HTMLAnchorElement, CMSLinkType>((props, forwardedRef) => {
  const {
    type,
    color = 'neutral',
    variant = 'link',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    icon,
    ...rest
  } = props

  // const href =
  //   type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
  //     ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ``}/${reference.value.slug}`
  //     : url

  const href = getHref(props)

  const size = variant === 'inline' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (variant === 'inline') {
    return (
      <Link
        ref={forwardedRef}
        className={cn('text-base-secondary underline-offset-4 hover:underline', className)}
        href={href ?? url}
        {...newTabProps}
        {...rest}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button
      asChild
      className={cn('group', className)}
      size={size}
      variant={variant}
      color={color || 'neutral'}
    >
      <Link ref={forwardedRef} href={href ?? url} {...newTabProps} {...rest}>
        {icon && <Icon icon={`material-symbols:${icon}`} className="size-[0.8lh]" height="none" />}
        {label && label}
        {children && children}
        {variant === 'link' && (
          <Icon
            icon="tabler:caret-left-filled"
            height="none"
            className="size-[0.75lh] shrink-0 translate-x-1 transition-[translate] duration-150 group-hover:translate-x-0 ltr:-translate-x-1 ltr:rotate-180"
          />
        )}
      </Link>
    </Button>
  )
})

CMSLink.displayName = 'CMSLink'
