'use client'

import React, { useEffect, useRef } from 'react'
import { CustomHtmlBlock as CustomHtmlBlockType } from '@/payload-types'

export const RenderCustomHtmlBlock: React.FC<CustomHtmlBlockType> = ({
  blockHeader,
  htmlContent,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current || !htmlContent) return

    // Inject HTML on the client to avoid hydration mismatches
    containerRef.current.innerHTML = htmlContent

    // Re-execute any script tags within the injected HTML, in order.
    // This ensures external scripts load before dependent inline scripts run
    // (fixes cases like HubSpot where `hbspt` must exist first).
    const scripts = Array.from(containerRef.current.querySelectorAll('script'))

    const loadSequentially = async () => {
      for (const oldScript of scripts) {
        await new Promise<void>((resolve) => {
          const newScript = document.createElement('script')

          // Copy attributes (e.g., src, async, data-*)
          Array.from(oldScript.attributes).forEach((attr) => {
            // Normalize protocol-relative src to avoid edge cases
            if (attr.name === 'src') {
              const value = attr.value.startsWith('//')
                ? `${window.location.protocol}${attr.value}`
                : attr.value
              newScript.setAttribute('src', value)
            } else {
              newScript.setAttribute(attr.name, attr.value)
            }
          })

          // If inline script, set its text and resolve immediately after replace
          const hasSrc = newScript.hasAttribute('src')
          if (!hasSrc) {
            newScript.text = (oldScript as HTMLScriptElement).text
          }

          // Replace to trigger execution
          oldScript.parentNode?.replaceChild(newScript, oldScript)

          if (hasSrc) {
            // Resolve once the external script loads or errors
            newScript.addEventListener('load', () => resolve())
            newScript.addEventListener('error', () => resolve())
          } else {
            resolve()
          }
        })
      }
    }

    // Fire and forget; no special cleanup required for injected scripts
    void loadSequentially()
  }, [htmlContent])

  if (!htmlContent) {
    return null
  }

  return (
    <section className="custom-html-block container">
      <div ref={containerRef} suppressHydrationWarning />
    </section>
  )
}
