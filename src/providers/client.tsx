'use client'
import { DirectionProvider } from '@radix-ui/react-direction'

export const ClientProviders: React.FC<{
  locale: string
  children: React.ReactNode
}> = ({ children, locale }) => {
  return <DirectionProvider dir={locale === 'ar' ? 'rtl' : 'ltr'}>{children}</DirectionProvider>
}
