export type HubSpotForm = {
  id: string
  name: string
  portalId: string
  fields?: HubSpotField[]
}

export type HubSpotField = {
  name: string
  label?: string
  required?: boolean
  fieldType?: string // text, textarea, select, radio, checkbox, booleancheckbox, date, number, email
  type?: string // string, number, date, enum
  options?: { label?: string; value: string }[]
}

const HUBSPOT_BASE = 'https://api.hubapi.com'

const getToken = () => process.env.HUBSPOT_ACCESS_TOKEN

export async function fetchHubSpotForms(): Promise<HubSpotForm[]> {
  const token = getToken()
  if (!token) throw new Error('HUBSPOT_ACCESS_TOKEN is not set')

  // Using legacy Forms API v2 for broader availability
  const res = await fetch(`${HUBSPOT_BASE}/forms/v2/forms`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch HubSpot forms')
  const data = (await res.json()) as any[]
  return data.map((f) => ({ id: f.guid, name: f.name, portalId: String(f.portalId) }))
}

export async function fetchHubSpotFormById(id: string): Promise<HubSpotForm> {
  const token = getToken()
  if (!token) throw new Error('HUBSPOT_ACCESS_TOKEN is not set')

  const res = await fetch(`${HUBSPOT_BASE}/forms/v2/forms/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch HubSpot form by id')
  const data = await res.json()

  return {
    id: data.guid,
    name: data.name,
    portalId: String(data.portalId),
    fields: (data.formFieldGroups[0].fields || []).map((f: any) => ({
      name: f.name,
      label: f.label,
      required: !!f.required,
      fieldType: f.fieldType,
      type: f.type,
      options: Array.isArray(f.options)
        ? f.options.map((o: any) => ({ label: o.label, value: String(o.value) }))
        : undefined,
    })),
  }
}
