// Client API (browser)

// - Purpose: Thin wrapper around fetch to the Payload server endpoints, used by the modal/provider.
// - listForms(): GET serverURL + api + '/hubspot/forms'
//     - Returns { success, forms?: [{ id, name, portalId }] }
//     - Used to display/search forms in the modal.
// - applyForm({ hubspotFormId, docId }): POST serverURL + api + '/hubspot/forms/apply'
//     - Returns { success }
//     - Triggers the server to fetch the HubSpot form, map fields, and update the current Payload
// form.
// - Extras:
//     - Sends credentials: 'include' so admin session/auth is applied.
//     - The provider then refreshes editor state (getFormState + REPLACE_STATE) and shows toasts.

export type HubSpotFormListItem = {
  id: string
  name: string
  portalId: string
}

export const createClient = ({ api, serverURL }: { api: string; serverURL: string }) => {
  const listForms = async (): Promise<{ success: boolean; forms?: HubSpotFormListItem[] }> => {
    try {
      const res = await fetch(`${serverURL}${api}/hubspot/forms`, {
        credentials: 'include',
      })
      if (!res.ok) return { success: false }
      return res.json()
    } catch {
      return { success: false }
    }
  }

  const applyForm = async (args: {
    hubspotFormId: string
    docId?: string
  }): Promise<{ success: boolean; doc?: any }> => {
    try {
      const res = await fetch(`${serverURL}${api}/hubspot/forms/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(args),
      })
      if (!res.ok) return { success: false }
      return res.json()
    } catch {
      return { success: false }
    }
  }

  return { listForms, applyForm }
}
