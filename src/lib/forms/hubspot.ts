import type { SubmissionMetadata, PayloadSubmissionEntry } from '@/blocks/Form/types'

type HubspotSubmissionArgs = {
  portalId: string
  formId: string
  values: PayloadSubmissionEntry[]
  metadata?: SubmissionMetadata
}

export type HubspotSubmissionResult = {
  ok: boolean
  status?: number
  error?: string
}

const HUBSPOT_SUBMIT_BASE = 'https://api.hsforms.com/submissions/v3/integration/submit'

const buildContext = (metadata?: SubmissionMetadata) => {
  if (!metadata) return undefined
  const context: Record<string, string> = {}

  if (metadata.pagePath) {
    context.pageUri = metadata.pagePath
    context.pageName = metadata.pagePath
  }

  return Object.keys(context).length ? context : undefined
}

export const sendHubspotSubmission = async ({
  portalId,
  formId,
  values,
  metadata,
}: HubspotSubmissionArgs): Promise<HubspotSubmissionResult> => {
  const token = process.env.HUBSPOT_ACCESS_TOKEN

  if (!token) {
    const message = 'HubSpot submission skipped: missing HUBSPOT_ACCESS_TOKEN.'
    console.warn(message)
    return { ok: false, error: message }
  }

  const url = `${HUBSPOT_SUBMIT_BASE}/${encodeURIComponent(portalId)}/${encodeURIComponent(formId)}`
  const payload = {
    submittedAt: Date.now(),
    fields: values.map(({ field, value }) => ({ name: field, value })),
    context: buildContext(metadata),
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => '')
      const errorMessage = errorText || response.statusText || 'Unknown HubSpot error'
      console.error('HubSpot submission failed', {
        status: response.status,
        message: errorMessage,
      })
      return { ok: false, status: response.status, error: errorMessage }
    }

    return { ok: true, status: response.status }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'HubSpot request failed'
    console.error('HubSpot submission threw', { message })
    return { ok: false, error: message }
  }
}
