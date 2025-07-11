'use client'

import React, { useState } from 'react'

import { cn } from '@/utilities/ui'
import { Monitor, Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'

const themes = [
  {
    key: 'auto',
    icon: Monitor,
    label: 'System theme',
  },
  {
    key: 'light',
    icon: Sun,
    label: 'Light theme',
  },
  {
    key: 'dark',
    icon: Moon,
    label: 'Dark theme',
  },
]

import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'

export const ThemeSelector: React.FC<{ locale: string }> = ({ locale }) => {
  const { setTheme } = useTheme()
  const [value, setValue] = useState('')

  const onThemeChange = (themeToSet: Theme & 'auto') => {
    if (themeToSet === 'auto') {
      setTheme(null)
      setValue('auto')
    } else {
      setTheme(themeToSet)
      setValue(themeToSet)
    }
  }

  React.useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setValue(preference ?? 'auto')
  }, [])

  return (
    <div className="flex flex-row items-center gap-2">
      <p className="text-base-tertiary text-sm font-medium">
        {locale === 'ar' ? 'المظهر' : 'Theme'}
      </p>
      <div className={cn('relative flex h-auto rounded-full border p-1')}>
        {themes.map(({ key, icon: Icon, label }) => {
          const isActive = value === key

          return (
            <button
              type="button"
              key={key}
              className="relative rounded-full p-1"
              onClick={() => onThemeChange(key as Theme & 'auto')}
              aria-label={label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTheme"
                  className="bg-background absolute inset-0 rounded-full"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
              <Icon
                className={cn(
                  'relative m-auto size-4',
                  isActive ? 'text-base-secondary' : 'text-base-tertiary',
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
