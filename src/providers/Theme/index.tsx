'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { defaultTheme, getImplicitPreference, themeLocalStorageKey } from './shared'
import { themeIsValid } from './types'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({
  children,
  initialTheme,
}: {
  children: React.ReactNode
  initialTheme?: Theme
}) => {
  // Initialize with the server-provided theme to prevent hydration mismatch
  const [theme, setThemeState] = useState<Theme | undefined>(initialTheme)

  const setTheme = useCallback((themeToSet: Theme | null) => {
    if (themeToSet === null) {
      window.localStorage.removeItem(themeLocalStorageKey)
      const implicitPreference = getImplicitPreference()
      const newAppliedTheme = implicitPreference || defaultTheme
      document.documentElement.setAttribute('data-theme', newAppliedTheme)
      setThemeState(newAppliedTheme)
      document.cookie = `theme=${newAppliedTheme}; path=/; max-age=31536000`
    } else {
      setThemeState(themeToSet)
      window.localStorage.setItem(themeLocalStorageKey, themeToSet)
      document.cookie = `theme=${themeToSet}; path=/; max-age=31536000`
      document.documentElement.setAttribute('data-theme', themeToSet)
    }
  }, [])

  useEffect(() => {
    /* set theme on client */
    if (!canUseDOM) {
      return
    }

    let themeToSet: Theme = initialTheme || defaultTheme
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    const cookieTheme = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1]

    if (themeIsValid(preference)) {
      themeToSet = preference
    } else if (cookieTheme && themeIsValid(cookieTheme)) {
      themeToSet = cookieTheme as Theme
      window.localStorage.setItem(themeLocalStorageKey, themeToSet)
    } else {
      const implicitPreference = getImplicitPreference()

      if (implicitPreference) {
        themeToSet = implicitPreference
      }
    }

    // Only update if different from the initial theme to prevent unnecessary re-renders
    if (themeToSet !== initialTheme) {
      document.documentElement.setAttribute('data-theme', themeToSet)
      document.cookie = `theme=${themeToSet}; path=/; max-age=31536000`
      setThemeState(themeToSet)
    } else {
      // Ensure the document element has the correct theme attribute
      document.documentElement.setAttribute('data-theme', themeToSet)
    }

    /* watch system theme change */
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemThemeChange = () => {
      if (!window.localStorage.getItem(themeLocalStorageKey)) {
        const newImplicitPreference = getImplicitPreference()
        const themeToSet = newImplicitPreference || defaultTheme
        document.documentElement.setAttribute('data-theme', themeToSet)
        document.cookie = `theme=${themeToSet}; path=/; max-age=31536000`
        setThemeState(themeToSet)
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [initialTheme])

  return <ThemeContext.Provider value={{ setTheme, theme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => useContext(ThemeContext)
