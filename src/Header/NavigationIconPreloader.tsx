import Image from 'next/image'
import type { Header as HeaderType, Solution } from '@/payload-types'
import React from 'react'
import { getMediaUrl } from '@/utilities/getMediaURL'

// Component to preload all navigation images
export function NavigationImagePreloader({ tabs }: { tabs: HeaderType['tabs'] }) {
  const imageUrls = React.useMemo(() => {
    const urls: { url: string; cacheTag: string }[] = []

    if (!tabs) return urls

    for (const tab of tabs) {
      if (tab.navItems) {
        for (const navItem of tab.navItems) {
          if (navItem.listLinks?.links) {
            for (const subLink of navItem.listLinks.links) {
              if (
                subLink.link.type === 'reference' &&
                subLink.link.reference?.value &&
                typeof subLink.link.reference.value === 'object'
              ) {
                const referenceValue = subLink.link.reference.value as Solution
                if (typeof referenceValue.icon === 'object' && referenceValue.icon?.url) {
                  urls.push({
                    url: referenceValue.icon.url,
                    cacheTag: referenceValue.icon.updatedAt,
                  })
                }
              }
            }
          }
        }
      }
    }

    return urls
  }, [tabs])

  return (
    <div className="sr-only" aria-hidden="true">
      {imageUrls.map(({ url, cacheTag }, index) => {
        const mediaUrl = getMediaUrl(url, cacheTag)
        return (
          <Image
            key={`preload-${index}`}
            src={mediaUrl}
            alt=""
            width={40}
            height={40}
            sizes="40px"
            priority
            style={{ display: 'none' }}
          />
        )
      })}
    </div>
  )
}
