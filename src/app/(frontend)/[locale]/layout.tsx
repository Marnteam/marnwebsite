import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { cookies, draftMode } from 'next/headers'

import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { setRequestLocale } from 'next-intl/server'

const rubik = Rubik({
  weight: ['400', '500', '600'],
  subsets: ['latin', 'arabic'],
  variable: '--font-rubik',
})

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  setRequestLocale(locale)

  const { isEnabled } = await draftMode()

  const cookieStore = await cookies()
  const initialTheme = (cookieStore.get('theme')?.value as 'light' | 'dark' | undefined) ?? 'light'

  return (
    <html
      className={`${rubik.variable}`}
      lang={locale}
      dir={locale == 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <meta name="theme-color" content={initialTheme === 'dark' ? '#000000' : '#fafafa'} />
      </head>
      <body>
        <Providers initialTheme={initialTheme}>
          <Header adminBarProps={{ preview: isEnabled }} />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@marnpos',
  },
}
