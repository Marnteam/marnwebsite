'use client'

import type { PayloadAdminBarProps } from 'payload-admin-bar'

import { cn } from '@/utilities/ui'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import './index.scss'

import { getClientSideURL } from '@/utilities/getURL'

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
  const [show, setShow] = useState(false)
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'
  const router = useRouter()

  const onAuthChange = React.useCallback((user) => {
    setShow(!!user?.id)
  }, [])

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

  return (
    <PayloadAdminBar
      {...adminBarProps}
      className={cn(
        'bg-neutral container w-full',
        'text-base-secondary z-[10] h-full w-full py-0 text-sm',
        'flex flex-row items-center',
        'h-0 md:h-10',
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
        backgroundColor: 'black',
        position: 'relative',
        zIndex: 'unset',
        color: 'white',
        paddingInline: 'var(--spacing-space-site)',
        fontFamily: 'var(--font-sans)',
      }}
    />
  )
}
