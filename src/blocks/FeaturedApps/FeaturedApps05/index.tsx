import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { Media } from '@/payload-types'
import { AppsListClientWrapper } from './AppsListClientWrapper'
import { BlockHeaderType } from '@/types/blockHeader'

interface FeaturedApps05Props {
  media: Media
  blockHeader: BlockHeaderType
}

export const FeaturedApps05: React.FC<FeaturedApps05Props> = async (props) => {
  const { media, blockHeader } = props

  const payload = await getPayload({ config })

  const initialAppsData = await payload.find({
    collection: 'integrations',
    locale: 'ar',
    draft: false,
    limit: 6,
    page: 1,
    depth: 10,
    sort: '-createdAt',
    select: {
      name: true,
      tagline: true,
      icon: true,
      link: {
        type: true,
        apps: true,
        url: true,
        label: true,
        newTab: true,
      },
    },
  })

  return <AppsListClientWrapper initialData={initialAppsData as any} media={media} />
}
