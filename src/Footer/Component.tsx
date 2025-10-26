import { getCachedGlobal } from '@/utilities/getGlobals'

import type { Footer } from '@/payload-types'

import { getLocale } from 'next-intl/server'

import { FooterClient } from './FooterClient'

export async function Footer() {
  const locale = await getLocale()
  const { columns }: Footer = await getCachedGlobal('footer', locale, 1)()
  // const t = await getTranslations('Footer')
  const currentYear = new Date().getFullYear()
  return <FooterClient columns={columns} currentYear={currentYear} locale={locale} />
}
