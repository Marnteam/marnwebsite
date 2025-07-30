'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'
import { useTheme } from '@/providers/Theme'
import type { Props as MediaProps } from '../types'
import { getMediaUrl } from '@/utilities/getMediaURL'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, media, videoClassName } = props
  const {
    light: lightFromDesktop,
    dark: darkFromDesktop,
    videoControls: desktopControls,
  } = media?.desktop || {}
  const {
    light: lightFromMobile,
    dark: darkFromMobile,
    videoControls: mobileControls,
  } = media?.mobile || {}

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  let src = ''
  let mobileSrc = ''
  let darkSrc = ''
  let mobileDarkSrc = ''

  if (!src && resource && typeof resource === 'object') {
    const { url, updatedAt } = resource

    const cacheTag = updatedAt

    src = getMediaUrl(url, cacheTag)
    darkSrc = getMediaUrl(url, cacheTag)
  }

  if (!src && lightFromDesktop && typeof lightFromDesktop === 'object') {
    const { url, updatedAt } = lightFromDesktop

    const cacheTag = updatedAt

    src = getMediaUrl(url, cacheTag)
    darkSrc = getMediaUrl(url, cacheTag)
    mobileSrc = getMediaUrl(url, cacheTag)
    mobileDarkSrc = getMediaUrl(url, cacheTag)
  }

  if (darkFromDesktop && typeof darkFromDesktop === 'object') {
    const { url, updatedAt } = darkFromDesktop
    const cacheTag = updatedAt

    if (!src) src = getMediaUrl(url, cacheTag)
    darkSrc = getMediaUrl(url, cacheTag)
    mobileSrc = getMediaUrl(url, cacheTag)
    mobileDarkSrc = getMediaUrl(url, cacheTag)
  }

  if (lightFromMobile && typeof lightFromMobile === 'object') {
    const { url, updatedAt } = lightFromMobile
    const cacheTag = updatedAt

    mobileSrc = getMediaUrl(url, cacheTag)
    mobileDarkSrc = getMediaUrl(url, cacheTag)
  }

  if (darkFromMobile && typeof darkFromMobile === 'object') {
    const { url, updatedAt } = darkFromMobile
    const cacheTag = updatedAt

    mobileDarkSrc = getMediaUrl(url, cacheTag)
  }

  const { theme } = useTheme()

  const isDark = theme === 'dark'

  const srcToUse = isDark && darkSrc ? darkSrc : src
  const mobileSrcToUse = isDark && mobileDarkSrc ? mobileDarkSrc : mobileSrc

  if (!srcToUse && !mobileSrcToUse) return null

  const videoControls = desktopControls || mobileControls

  return (
    <video
      autoPlay={videoControls?.autoplay ?? true}
      className={cn('h-full w-full', videoClassName)}
      controls={videoControls?.controls ?? false}
      loop={videoControls?.loop ?? true}
      muted={videoControls?.autoplay ? true : (videoControls?.muted ?? true)}
      onClick={onClick}
      playsInline
      ref={videoRef}
      style={{ objectFit: videoControls?.objectFit || 'cover' }}
    >
      <source src={srcToUse} />
      <source src={mobileSrcToUse} media="(max-width: 768px)" />
    </video>
  )
}
