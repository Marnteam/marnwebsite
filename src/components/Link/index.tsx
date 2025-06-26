import { Button, type ButtonProps } from '@/components/ui/button'

import { cn } from '@/utilities/ui'
import { Link } from '@/i18n/routing'
import React from 'react'

import type { Integration, Page, BlogPost, Solution } from '@/payload-types'
import { Icon } from '@iconify-icon/react'

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
  onClick?: () => void
}

function getHref(link) {
  const { type, reference, url } = link
  const { relationTo, value } = reference || {}
  if (type !== 'reference') return url
  switch (relationTo) {
    case 'pages':
      return value.slug
    case 'blog-posts':
      return `/blog/${value.slug}`
    case 'solutions':
      return `/solutions/${value.slug}`
    case 'integrations':
      return `/marketplace/${value.slug}`
    default:
      return url
  }
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
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
  } = props

  // const href =
  //   type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
  //     ? `${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ``}/${reference.value.slug}`
  //     : url

  const href = getHref(props)

  if (!href) return null

  const size = variant === 'inline' ? 'clear' : sizeFromProps
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  /* Ensure we don't break any styles set by richText */
  if (variant === 'inline') {
    return (
      <Link
        className={cn('text-base-secondary underline-offset-4 hover:underline', className)}
        href={href || url || ''}
        {...newTabProps}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={variant} color={color || 'neutral'}>
      <Link className={cn('group', className)} href={href || url || ''} {...newTabProps}>
        {icon && <Icon icon={`material-symbols:${icon}`} className="size-3" />}
        {label && label}
        {children && children}
        {variant === 'link' && (
          <Icon
            icon="tabler:caret-left-filled"
            height="none"
            className="size-3 shrink-0 translate-x-1 transition-all duration-150 group-hover:translate-x-0 ltr:-translate-x-1 ltr:rotate-180"
          />
        )}
      </Link>
    </Button>
  )
}
