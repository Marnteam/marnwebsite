import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import type { PayloadAdminBarProps } from 'payload-admin-bar'

export async function Header({ adminBarProps }: { adminBarProps: PayloadAdminBarProps }) {
  const headerData = (await getCachedGlobal('header', 2)()) as Header
  return <HeaderClient {...headerData} adminBarProps={adminBarProps} />
}
