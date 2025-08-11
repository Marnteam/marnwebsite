import React from 'react'

import { ThemeProvider } from './Theme'
import type { Theme } from './Theme/types'
import { HeaderIntersectionObserver } from './HeaderIntersectionObserver'
import { WindowInfoProvider } from '@faceless-ui/window-info'
import { NextIntlClientProvider, useLocale, useMessages } from 'next-intl'
import { ClientProviders } from './client'

export const Providers: React.FC<{
  children: React.ReactNode
  initialTheme?: Theme
}> = ({ children, initialTheme }) => {
  const messages = useMessages()
  const locale = useLocale()

  return (
    <WindowInfoProvider
      breakpoints={{
        s: '(max-width: 768px)',
        m: '(max-width: 1024px)',
        l: '(max-width: 1680px)',
        xl: '(max-width: 1920px)',
      }}
    >
      <NextIntlClientProvider messages={messages}>
        <ThemeProvider initialTheme={initialTheme}>
          <ClientProviders locale={locale}>
            <HeaderIntersectionObserver>{children}</HeaderIntersectionObserver>
          </ClientProviders>
        </ThemeProvider>
      </NextIntlClientProvider>
    </WindowInfoProvider>
  )
}
