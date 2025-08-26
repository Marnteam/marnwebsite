import {
  toast,
  useConfig,
  useDocumentInfo,
  useForm,
  useModal,
  useAllFormFields,
  useServerFunctions,
  useTranslation,
} from '@payloadcms/ui'
import { useCallback, useMemo, useState } from 'react'

import { createClient } from '../../api'
import { HubspotFormsContext } from './context'

const modalSlug = 'hubspot-forms-modal'

export const HubspotFormsProvider = ({ children }: { children: React.ReactNode }) => {
  const modal = useModal()
  const { t } = useTranslation()
  const { getFormState } = useServerFunctions()
  const { setModified } = useForm()
  const { config } = useConfig()
  const { collectionSlug, id, getDocPreferences, globalSlug } = useDocumentInfo()
  const [_, dispatch] = useAllFormFields()

  const apiClient = useMemo(
    () => createClient({ api: config.routes.api, serverURL: config.serverURL }),
    [config.routes.api, config.serverURL],
  )

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [forms, setForms] = useState<any[]>([])
  const [query, setQuery] = useState('')

  const openModal = useCallback(() => {
    setIsOpen(true)
    modal.openModal(modalSlug)
  }, [modal])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    modal.closeModal(modalSlug)
  }, [modal])

  const loadForms = useCallback(async () => {
    setLoading(true)
    const res = await apiClient.listForms()
    if (res.success && res.forms) setForms(res.forms)
    else toast.error(t('plugin-hubspot-forms:errorMessage' as any))
    setLoading(false)
  }, [apiClient, t])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return forms
    return forms.filter((f) => f.name.toLowerCase().includes(q) || f.id.includes(q))
  }, [forms, query])

  const selectAndApply = useCallback(
    async ({ id: formId }: { id: string }) => {
      if (!id) {
        toast.error('Document must be saved before syncing from HubSpot')
        return
      }
      const res = await apiClient.applyForm({ hubspotFormId: formId, docId: String(id) })
      if (!res.success) {
        toast.error(t('plugin-hubspot-forms:errorMessage' as any))
        return
      }

      // refresh form state to reflect updated server data
      const { state } = await getFormState({
        collectionSlug,
        data: (res as any).doc || undefined,
        docPermissions: { fields: true, update: true },
        docPreferences: await getDocPreferences(),
        globalSlug,
        locale: undefined as any,
        operation: 'update',
        renderAllFields: true,
        schemaPath: collectionSlug || globalSlug || '',
      })

      if (state) {
        dispatch({ state, type: 'REPLACE_STATE' })
        setModified(true)
        toast.success(t('plugin-hubspot-forms:successMessage' as any))
      }

      closeModal()
    },
    [
      apiClient,
      getDocPreferences,
      getFormState,
      collectionSlug,
      globalSlug,
      dispatch,
      setModified,
      t,
      closeModal,
    ],
  )

  return (
    <HubspotFormsContext.Provider
      value={{
        modalSlug,
        isOpen,
        openModal,
        closeModal,
        loadForms,
        forms: filtered,
        query,
        setQuery,
        loading,
        selectAndApply,
      }}
    >
      {children}
    </HubspotFormsContext.Provider>
  )
}
