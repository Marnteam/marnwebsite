import { createContext, useContext } from 'react'

import type { HubSpotFormListItem } from '../../api'

type HubspotFormsContextData = {
  modalSlug: string
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  loadForms: () => Promise<void>
  forms: HubSpotFormListItem[]
  query: string
  setQuery: (q: string) => void
  loading: boolean
  selectAndApply: (args: { id: string }) => Promise<void>
}

export const HubspotFormsContext = createContext<HubspotFormsContextData | null>(null)

export const useHubspotForms = () => {
  const ctx = useContext(HubspotFormsContext)
  if (!ctx) throw new Error('useHubspotForms must be used within HubspotFormsProvider')
  return ctx
}
