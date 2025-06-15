import React from 'react'
import type { PricingBlock } from '@/payload-types'
import { getCachedSolutions } from '@/utilities/getSolution'
import { StructuredTable } from '@/components/Table'

interface PricingBlock04Props {
  table?: NonNullable<PricingBlock['table']>
}

export const PricingBlock04: React.FC<PricingBlock04Props> = async ({ table }) => {
  const solutions = await getCachedSolutions(2)()

  return (
    <div className="py-xl relative container">
      {table && <StructuredTable table={table} badges={solutions} />}
    </div>
  )
}
