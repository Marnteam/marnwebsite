'use client'

import React, { useState } from 'react'

import { cn } from '@/utilities/ui'
import { AnimatePresence, motion } from 'motion/react'
import type { Theme } from './types'

import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import { Button } from '@/components/ui/button'

const themes = [
  {
    key: 'auto',
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 -960 960 960"
        height="20px"
        width="20px"
        fill="currentColor"
      >
        <path d="M384-240H168q-29.7 0-50.85-21.15Q96-282.3 96-312v-433q0-29.7 21.15-50.85Q138.3-817 168-817h624q29.7 0 50.85 21.15Q864-774.7 864-745v433q0 29.7-21.15 50.85Q821.7-240 792-240H576l40.89 40.89Q618-198 624-182v14.25q0 9.5-7.2 16.62Q609.6-144 600-144H353q-7.29 0-12.14-4.82-4.86-4.83-4.86-12.06V-185q0-3 5-12l43-43ZM168-432h624v-313H168v313Zm0 0v-313 313Z" />
      </svg>
    ),
    label: 'System theme',
  },
  {
    key: 'light',
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 -960 960 960"
        height="20px"
        width="20px"
        fill="currentColor"
      >
        <path d="M444-828v-48q0-15.3 10.29-25.65Q464.58-912 479.79-912t25.71 10.35Q516-891.3 516-876v48q0 15.3-10.29 25.65Q495.42-792 480.21-792t-25.71-10.35Q444-812.7 444-828Zm0 744v-48q0-15.3 10.29-25.65Q464.58-168 479.79-168t25.71 10.35Q516-147.3 516-132v48q0 15.3-10.29 25.65Q495.42-48 480.21-48T454.5-58.35Q444-68.7 444-84Zm432-360h-48q-15.3 0-25.65-10.29Q792-464.58 792-479.79t10.35-25.71Q812.7-516 828-516h48q15.3 0 25.65 10.29Q912-495.42 912-480.21t-10.35 25.71Q891.3-444 876-444Zm-744 0H84q-15.3 0-25.65-10.29Q48-464.58 48-479.79t10.35-25.71Q68.7-516 84-516h48q15.3 0 25.65 10.29Q168-495.42 168-480.21t-10.35 25.71Q147.3-444 132-444Zm653-288-34 32q-11 11-25.5 10.5T700-701q-11-11-11-25t11-25l33-35q11-11 26.51-11 15.51 0 26.45 11.17 11.04 11.17 10.54 27T785-732ZM260-209l-32 34q-11 11-26.51 11-15.51 0-26.45-11.17-11.04-11.17-10.54-27T176-229l33-31q11-11 25.5-10.5T260-259q11 11 11 25t-11 25Zm472 33-32-33q-11-11-10.5-25.5T701-260q11-11 25-11.5t25 10.5l35 33q11 11 11 26.51 0 15.51-11.17 26.45-11.17 11.04-27 10.54T732-176ZM209-700l-34-33q-11-11-11.5-26t10.5-26q11-11 27.5-11.5T229-785l32 34q10 11 9.5 25.5T259-700q-11 11-25 11t-25-11Zm271 460q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm-.25-71Q550-311 599-360.5t49-119.75q0-70.24-48.75-119-48.76-48.75-119-48.75Q410-648 361-599.25q-49 48.76-49 119 0 70.25 48.75 119.75 48.76 49.5 119 49.5ZM481-481Z" />
      </svg>
    ),
    label: 'Light theme',
  },
  {
    key: 'dark',
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        viewBox="0 -960 960 960"
        height="20px"
        width="20px"
        fill="currentColor"
      >
        <path d="M483-96q-80.47 0-150.87-30.65-70.41-30.66-122.62-82.86-52.2-52.21-82.86-122.62Q96-402.53 96-483q0-120.58 67.5-218.79T343-844q13-5 25.5-4t21.94 9q7.56 7 11.56 18.5 4 11.5 4 28.5 0 78 29 147.5T521-518q54.32 54.07 124.16 83.03Q715-406 792-406q17 0 28.5 4t18.5 11.56q8 9.44 9.5 21.94 1.5 12.5-3.21 25.2Q802-231 702.8-163.5 603.6-96 483-96Zm0-72q88 0 164-45t115-122q-83-5-158.5-39.5T469-468q-60-60-94-135t-40-159q-77 41-122 116.18-45 75.19-45 162.82 0 131.25 91.88 223.12Q351.75-168 483-168Zm-14-300Zm106-181-70-69q-11-10.91-11-25.45Q494-758 505-769l70-70q10.91-11 25.45-11Q615-850 626-839l69 70q11 10.91 11 25.45Q706-729 695-718l-69 69q-10.91 11-25.45 11Q586-638 575-649Zm191.95 95.25-21.3-21.5Q735-586 735-600.4q0-14.4 10.75-25.2l21.5-21.6Q778-658 792-658t25 10.8l22 21.6q11 10.8 11 25.2 0 14.4-11 25.15l-22 21.5Q806-543 791.8-543t-24.85-10.75Z" />
      </svg>
    ),
    label: 'Dark theme',
  },
]

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
      {/* <p className="text-base-tertiary text-sm font-medium">
        {locale === 'ar' ? 'المظهر' : 'Theme'}
      </p> */}
      <div className="relative flex gap-1">
        {themes.map(({ key, icon: Icon, label }) => {
          const isActive = value === key

          return (
            <Button
              variant="tertiary"
              size="icon"
              type="button"
              key={key}
              className={cn(
                'group text-base-tertiary hover:text-base-primary relative rounded-full p-1',
                { 'text-base-primary': isActive },
              )}
              onClick={() => onThemeChange(key as Theme & 'auto')}
              aria-label={label}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="bg-background-neutral border-border absolute inset-0 z-0 rounded-full border"
                    initial={{ scale: '0%' }}
                    animate={{ scale: '100%' }}
                    exit={{ scale: '0%' }}
                    transition={{ type: 'spring', duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
              <Icon className="relative z-1 m-auto size-5" />
            </Button>
          )
        })}
      </div>
    </div>
  )
}
