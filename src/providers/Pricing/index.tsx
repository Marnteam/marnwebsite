'use client'

import React, { createContext, useContext, useState } from 'react'

export interface ContextType {
  isMonthly?: boolean
  setIsMonthly: (isMonthly: boolean) => void
}

const initialContext: ContextType = {
  isMonthly: false,
  setIsMonthly: () => null,
}

const PricingContext = createContext(initialContext)

export const PricingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMonthly, setIsMonthly] = useState<boolean>(false)

  return (
    <PricingContext.Provider value={{ isMonthly, setIsMonthly }}>
      {children}
    </PricingContext.Provider>
  )
}

export const usePricing = (): ContextType => useContext(PricingContext)
