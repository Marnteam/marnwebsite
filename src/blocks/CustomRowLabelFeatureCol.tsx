'use client'
import type { PayloadClientReactComponent, RowLabelComponent } from 'payload'
import { useRowLabel } from '@payloadcms/ui'

const CustomRowLabelCTA: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data } = useRowLabel<any>()

  const label = data.content?.title || data?.title

  return label || `Button`
}

export default CustomRowLabelCTA
