'use client'
import type { Footer } from '@/payload-types'
import { motion, useMotionValue, animate } from 'motion/react'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { LanguageSwitcher } from '@/providers/LanguageSelector02/index'
import { CMSLink } from '@/components/Link'
import Logo from '@/components/ui/logo'

import Facebook from '@/icons/facebook'
import Instagram from '@/icons/instagram'
import X from '@/icons/x'
import TikTok from '@/icons/tiktok'
import LinkedIn from '@/icons/linkedin'
import Youtube from '@/icons/youtube'
import zatca from '@/components/Graphics/zatca.svg'
import sama from '@/components/Graphics/sama.svg'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { MailIcon } from 'lucide-react'
import Image from 'next/image'

const socialLinks = [
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/marnpos',
    icon: Facebook,
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/marnpos',
    icon: Instagram,
  },
  {
    label: 'X',
    url: 'https://www.x.com/marnpos',
    icon: X,
  },
  {
    label: 'TikTok',
    url: 'https://www.tiktok.com/@marnpos',
    icon: TikTok,
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/marnpos',
    icon: LinkedIn,
  },
  {
    label: 'Youtube',
    url: 'https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ',
    icon: Youtube,
  },
]

type Props = {
  columns: Footer['columns']
  currentYear: number
}

/* ─── knobs ──────────────────────────────────────────────────────────────── */
const MAX_PEEK = 300 // absolute cap in px
const TOUCH_GAIN = 1.2 // multiplier per px of finger travel
const WHEEL_GAIN = 45 // multiplier per wheel tick ≈ 1
const WHEEL_IDLE = 65 // ms gap that ends a wheel gesture
/* ────────────────────────────────────────────────────────────────────────── */

export function FooterClient({ columns, currentYear }: Props) {
  /* live transform */
  const y = useMotionValue(0)
  const t = useTranslations('Footer')

  /* refs that never cause React re-renders */
  const peekRef = useRef(0) // current lift in px
  const idleTimer = useRef<NodeJS.Timeout | null>(null) // wheel idle
  const touchDown = useRef(false) // finger is on screen
  const springing = useRef(false) // footer is snapping back
  const footerRef = useRef<HTMLDivElement>(null)
  const lastWheelTS = useRef(0)

  /* helpers */
  const setPeek = (val: number) => {
    peekRef.current = Math.min(Math.max(val, 0), MAX_PEEK)
    y.set(-peekRef.current) // immediate follow
  }

  const springBack = () => {
    springing.current = true
    animate(y, 0, {
      type: 'spring',
      stiffness: 550,
      damping: 44,
      onComplete: () => {
        springing.current = false
        peekRef.current = 0
      },
    })
  }

  /* unified overscroll handler */
  const overscroll = (inputDelta: number) => {
    if (springing.current) return

    // Improved bottom detection for Safari compatibility
    const scrollTop = window.scrollY
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const threshold = 5 // Safari needs more tolerance

    const atBottom = scrollTop + windowHeight >= documentHeight - threshold

    if (!atBottom || inputDelta <= 0) return

    setPeek(peekRef.current + inputDelta) // accumulate

    /* wheel: restart idle timer every tick */
    if (!touchDown.current) {
      if (idleTimer.current) {
        clearTimeout(idleTimer.current)
      }
      idleTimer.current = setTimeout(springBack, WHEEL_IDLE)
    }
  }

  /* event wiring */
  useEffect(() => {
    // Detect Safari for different behavior
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

    /* velocity-aware onWheel  */
    const onWheel = (e: WheelEvent) => {
      // Only handle downward scrolling when actually at bottom
      if (e.deltaY <= 0) return

      // Check if we're truly at the bottom before doing anything
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const threshold = isSafari ? 10 : 5 // More tolerance for Safari

      const atBottom = scrollTop + windowHeight >= documentHeight - threshold

      // Don't interfere with normal scrolling if not at bottom
      if (!atBottom) return

      /* 1 — normalise delta exactly as before */
      const gain = Math.sign(e.deltaY) * Math.max(1, Math.abs(e.deltaY)) * WHEEL_GAIN

      overscroll(gain) // <-- your existing helper

      /* 2 — compute idle time from event spacing */
      const now = performance.now()
      const gap = now - lastWheelTS.current // time since previous tick
      lastWheelTS.current = now

      const idle = Math.min(65, Math.max(40, gap * 1.5))

      if (idleTimer.current) {
        clearTimeout(idleTimer.current)
      }
      idleTimer.current = setTimeout(springBack, idle)

      /* 3 — suppress browser rubber-band while we're peeking */
      // Only prevent default if we're actually showing the footer peek
      // and we're definitely at the bottom
      if (peekRef.current > 0 && atBottom) {
        e.preventDefault()
      }
    }

    /* 2 - touch */
    let lastY = 0
    const tStart = (e: TouchEvent) => {
      touchDown.current = true
      lastY = e.touches[0].clientY
    }
    const tMove = (e: TouchEvent) => {
      const dy = lastY - e.touches[0].clientY
      lastY = e.touches[0].clientY
      overscroll(dy * TOUCH_GAIN)
    }
    const tEnd = () => {
      touchDown.current = false
      if (peekRef.current) springBack()
    }

    // Use passive wheel events for Safari to avoid interference
    const wheelOptions = isSafari ? { passive: true } : { passive: false }

    window.addEventListener('wheel', onWheel, wheelOptions)
    window.addEventListener('touchstart', tStart, { passive: true })
    window.addEventListener('touchmove', tMove, { passive: true })
    window.addEventListener('touchend', tEnd, { passive: true })
    window.addEventListener('touchcancel', tEnd, { passive: true })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', tStart)
      window.removeEventListener('touchmove', tMove)
      window.removeEventListener('touchend', tEnd)
      window.removeEventListener('touchcancel', tEnd)
    }
  }, [])

  return (
    <div className="bg-background pt-md">
      <div className="container">
        <div className="relative">
          <motion.footer
            ref={footerRef}
            // data-theme="dark"
            style={{ y }}
            className="bg-background-neutral py-md rounded-space-sm relative z-2 w-full will-change-transform"
          >
            <div className="container grid grid-cols-1 gap-4 max-lg:gap-y-8 lg:grid-cols-12">
              <div className="flex flex-wrap items-start gap-4 lg:col-span-4">
                <div id="newsletter" className="md:pe-md flex w-full flex-col gap-3">
                  <p className="text-base-tertiary text-sm font-medium">{t('newsletterTitle')}</p>
                  <p className="text-base-secondary -mt-1 text-sm">{t('newsletterDescription')}</p>
                  <div className="flex w-full max-w-96 items-center space-x-2">
                    <div className="relative w-full">
                      <Input
                        className="peer h-11 rounded-full ps-9 text-sm"
                        placeholder={t('newsletterPlaceholder')}
                        type="email"
                      />
                      <div className="text-base-quaternary peer-focus:text-base-secondary pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                        <MailIcon size={16} aria-hidden="true" />
                      </div>
                    </div>
                    <Button variant="primary" size="md" type="submit">
                      {t('newsletterButton')}
                    </Button>
                  </div>
                </div>
                <div id="social" className="flex w-full flex-col gap-1">
                  <p className="text-base-tertiary text-sm font-medium">{t('followUs')}</p>
                  <div className="flex w-full flex-row items-start justify-between lg:-ms-2.5 lg:justify-start">
                    {socialLinks.map(({ label, url, icon: Icon }, i) => (
                      <Button
                        key={i}
                        variant="ghost"
                        color="neutral"
                        size="icon"
                        className="bg-transparent hover:bg-transparent"
                        asChild
                      >
                        <Link href={url} className="group">
                          <Icon className="group-hover:text-base-primary size-5" />
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
                <div id="compliance" className="flex w-full flex-col gap-3">
                  <p className="text-base-tertiary text-sm font-medium">{t('compliance')}</p>
                  <div className="flex w-full flex-row items-center justify-start gap-8 lg:justify-start">
                    <Image
                      src={sama}
                      className="h-12 w-auto opacity-50 invert dark:invert-0"
                      alt="SAMA"
                      unoptimized
                    />
                    <Image
                      src={zatca}
                      className="h-12 w-auto opacity-50 invert dark:invert-0"
                      alt="ZATCA"
                      unoptimized
                    />
                  </div>
                </div>
                <div id="theme" className="flex flex-row items-start gap-2">
                  <ThemeSelector />
                  <LanguageSwitcher />
                </div>
              </div>
              <nav className="pb-site grid grid-cols-2 gap-4 md:col-span-2 md:grid-cols-3 lg:col-span-6 lg:col-start-7">
                {columns?.map(({ label, navItems }, i) => {
                  return (
                    <div key={i} className="grid grid-cols-1">
                      <p className="text-base-tertiary mb-1 text-sm font-medium">{label}</p>
                      {navItems?.map(({ link }, j) => {
                        return (
                          <CMSLink
                            key={j}
                            variant="inline"
                            className="hover:text-base-primary h-auto justify-start rounded-none px-0 py-2 text-sm font-medium hover:no-underline"
                            {...link}
                          />
                        )
                      })}
                    </div>
                  )
                })}
              </nav>
            </div>
          </motion.footer>

          <div className="px-site pointer-events-none absolute bottom-0 z-0 container mx-auto w-full">
            <Link href="/" className="flex h-auto w-full justify-center">
              <Logo className="text-base-primary/10 h-auto w-full" />
            </Link>
          </div>
        </div>

        <div className="col-span-full flex w-full flex-row items-start justify-between gap-1 py-4">
          <p className="text-base-tertiary text-xs md:text-sm">
            {t('allRightsReserved', { year: currentYear })}
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms"
              className="text-base-tertiary hover:text-base-secondary text-xs md:text-sm"
            >
              {t('termsAndConditions')}
            </Link>
            <Link
              href="/privacy"
              className="text-base-tertiary [&_path]:shadow-border hover:text-base-secondary text-xs md:text-sm"
            >
              {t('privacyPolicy')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
