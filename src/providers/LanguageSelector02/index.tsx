'use client'

import { cn } from '@/utilities/ui'
import { motion } from 'motion/react'
import React, { useState, useEffect } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

export const LanguageSwitcher: React.FC<{ locale: string }> = ({ locale }) => {
  const router = useRouter()
  const [value, setValue] = useState(locale) // Set initial value to the current locale

  const languages = [
    { code: 'ar', label: 'العربية', display: 'ع' },
    { code: 'en', label: 'English', display: 'EN' },
  ]

  const onLanguageChange = (newLocale: string) => {
    const currentPath = window.location.pathname
    // Ensure the path starts with a '/'
    const formattedCurrentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`

    // Split the path and filter out empty segments and the old locale
    const pathSegments = formattedCurrentPath
      .split('/')
      .filter((segment) => segment && segment !== locale)

    // Construct the new path
    const newPath = `/${newLocale}${pathSegments.length > 0 ? `/${pathSegments.join('/')}` : ''}`

    router.push(newPath)
  }

  useEffect(() => {
    setValue(locale) // Ensure the selected value stays updated when the locale changes
  }, [locale])

  return (
    <div className="flex flex-row items-center gap-2">
      <p className="text-base-tertiary text-sm font-medium">
        {locale === 'ar' ? 'اللغة' : 'Language'}
      </p>
      <div className={cn('relative flex h-auto rounded-full border p-1')}>
        {languages.map(({ code, label, display }) => {
          const isActive = value === code

          return (
            <button
              type="button"
              key={code}
              className="relative w-6 rounded-full" // Added px-2 for better text spacing
              onClick={() => onLanguageChange(code)}
              aria-label={label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeLanguage" // Unique layoutId for language switcher
                  className="bg-background absolute inset-0 rounded-full"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <span // Using span for text
                className={cn(
                  'relative m-auto text-xs leading-0', // Adjusted text size
                  isActive ? 'text-base-primary' : 'text-base-secondary', // Adjusted colors for better contrast
                )}
              >
                {display}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
