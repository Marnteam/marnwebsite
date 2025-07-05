import { getCachedGlobal } from '@/utilities/getGlobals'

import type { Footer } from '@/payload-types'

import { getTranslations } from 'next-intl/server'


import Facebook from '@/icons/facebook'
import Instagram from '@/icons/instagram'
import X from '@/icons/x'
import TikTok from '@/icons/tiktok'
import LinkedIn from '@/icons/linkedin'
import Youtube from '@/icons/youtube'
import { FooterClient } from './FooterClient'

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

export async function Footer() {
  const { columns }: Footer = await getCachedGlobal('footer', 1)()
  const t = await getTranslations('Footer')
  const currentYear = new Date().getFullYear()

  return <FooterClient columns={columns} currentYear={currentYear} />
}
