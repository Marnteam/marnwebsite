'use client'
import type { PayloadClientReactComponent, RowLabelComponent } from 'payload'
import { useRowLabel } from '@payloadcms/ui'
import { Header } from '@/payload-types'

const CustomRowLabelCTA: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data } = useRowLabel<NonNullable<Header['cta']>[number]>()

  const label = data.link.label

  return label || `Button`
}

export default CustomRowLabelCTA
