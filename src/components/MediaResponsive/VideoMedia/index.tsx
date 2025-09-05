'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'
import { useTheme } from '@/providers/Theme'
import type { Props as MediaProps } from '../types'
import { getMediaUrl } from '@/utilities/getMediaURL'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { onClick, resource, media, videoClassName } = props
  const { media: mediaResource, videoControls } = media || {}
  const { theme } = useTheme()
  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])
  if (typeof mediaResource !== 'object') return null
  const { dark, mobile, mobileDark } = mediaResource || {}

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

  if (!src && mediaResource && typeof mediaResource === 'object') {
    const { url, updatedAt } = mediaResource

    const cacheTag = updatedAt

    src = getMediaUrl(url, cacheTag)
    darkSrc = getMediaUrl(url, cacheTag)
    mobileSrc = getMediaUrl(url, cacheTag)
    mobileDarkSrc = getMediaUrl(url, cacheTag)
  }

  if (dark && typeof dark === 'object') {
    const { url, updatedAt } = dark
    const cacheTag = updatedAt

    if (!src) src = getMediaUrl(url, cacheTag)
    darkSrc = getMediaUrl(url, cacheTag)
    mobileSrc = getMediaUrl(url, cacheTag)
    mobileDarkSrc = getMediaUrl(url, cacheTag)
  }

  if (mobile && typeof mobile === 'object') {
    const { url, updatedAt } = mobile
    const cacheTag = updatedAt

    mobileSrc = getMediaUrl(url, cacheTag)
    mobileDarkSrc = getMediaUrl(url, cacheTag)
  }

  if (mobileDark && typeof mobileDark === 'object') {
    const { url, updatedAt } = mobileDark
    const cacheTag = updatedAt

    mobileDarkSrc = getMediaUrl(url, cacheTag)
  }

  const isDark = theme === 'dark'

  const srcToUse = isDark && darkSrc ? darkSrc : src
  const mobileSrcToUse = isDark && mobileDarkSrc ? mobileDarkSrc : mobileSrc

  if (!srcToUse && !mobileSrcToUse) return null

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
