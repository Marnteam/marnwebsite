'use client'

import type { PayloadAdminBarProps } from 'payload-admin-bar'

import { cn } from '@/utilities/ui'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { getClientSideURL } from '@/utilities/getURL'
import { useMediaQuery } from '@/utilities/useMediaQuery'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
  className?: string
}> = (props) => {
  const { adminBarProps, className } = props || {}
  const segments = useSelectedLayoutSegments()
  const [isAuthorized, setIsAuthorized] = useState(Boolean(adminBarProps?.preview))
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'
  const router = useRouter()
  const isMobile = useMediaQuery('(max-width:768px)')

  useEffect(() => {
    setIsAuthorized(Boolean(adminBarProps?.preview))
  }, [adminBarProps?.preview])

  const onAuthChange = React.useCallback(
    (user) => {
      setIsAuthorized(Boolean(user?.id) || Boolean(adminBarProps?.preview))
    },
    [adminBarProps?.preview],
  )

  const show = !isMobile && isAuthorized

  useEffect(() => {
    if (show) {
      document.documentElement.style.setProperty('--admin-bar-height', `2.5rem`)
    } else {
      document.documentElement.style.setProperty('--admin-bar-height', '0rem')
    }
    return () => {
      document.documentElement.style.setProperty('--admin-bar-height', '0rem')
    }
  }, [show])

  if (!show) return null

  return (
    <PayloadAdminBar
      {...adminBarProps}
      className={cn(
        'container w-full bg-neutral',
        'z-[10] h-full w-full py-0 text-sm text-base-secondary',
        'flex flex-row items-center',
        'h-(--admin-bar) max-md:hidden',
        baseClass,
        className,
      )}
      cmsURL={getClientSideURL()}
      collection={collection}
      collectionLabels={{
        plural: collectionLabels[collection]?.plural || 'Pages',
        singular: collectionLabels[collection]?.singular || 'Page',
      }}
      logo={<Title />}
      logoProps={{ style: { marginInlineEnd: '0.625rem', marginRight: 'auto' } }}
      userProps={{ style: { marginInlineEnd: '0.625rem', marginRight: 'auto' } }}
      previewProps={{ style: { marginInlineStart: '0.625rem' } }}
      onAuthChange={onAuthChange}
      onPreviewExit={() => {
        fetch('/next/exit-preview').then(() => {
          router.push('/')
          router.refresh()
        })
      }}
      style={{
        backgroundColor: 'var(--color-background-neutral-subtle)',
        position: 'relative',
        zIndex: 'unset',
        color: 'var(--color-base-secondary)',
        paddingInline: 'var(--spacing-space-site)',
        fontFamily: 'var(--font-sans)',
      }}
    />
  )
}
