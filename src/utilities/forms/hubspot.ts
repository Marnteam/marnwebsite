import type {
  SubmissionMetadata,
  SubmissionMetadataKey,
  PayloadSubmissionEntry,
} from '@/blocks/Form/types'

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

const HUBSPOT_METADATA_FIELD_MAP: Record<string, SubmissionMetadataKey> = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_term: 'utmTerm',
  utm_content: 'utmContent',
  gclid: 'gclid',
  fbclid: 'fbclid',
  ttclid: 'ttclid',
  msclkid: 'msclkid',
  gbraid: 'gbraid',
  wbraid: 'wbraid',
}

const buildContext = (metadata?: SubmissionMetadata) => {
  if (!metadata) return undefined

  const context: Record<string, string> = {}

  if (metadata.hutk) {
    context.hutk = metadata.hutk
  }

  if (metadata.ipAddress) {
    context.ipAddress = metadata.ipAddress
  }

  if (metadata.pagePath) {
    context.pageUri = metadata.pagePath
    context.pageName = metadata.pagePath
  }

  if (metadata.pageId) {
    context.pageId = metadata.pageId
  }

  if (metadata.sfdcCampaignId) {
    context.sfdcCampaignId = metadata.sfdcCampaignId
  }

  if (metadata.goToWebinarWebinarKey) {
    context.goToWebinarWebinarKey = metadata.goToWebinarWebinarKey
  }

  return Object.keys(context).length ? context : undefined
}

const buildMetadataFields = (
  metadata: SubmissionMetadata | undefined,
  usedFieldNames: Set<string>,
) => {
  if (!metadata) return []

  const fields: Array<{ name: string; value: string }> = []

  for (const [fieldName, metadataKey] of Object.entries(HUBSPOT_METADATA_FIELD_MAP)) {
    if (usedFieldNames.has(fieldName)) continue

    const value = metadata[metadataKey]

    if (!value) continue

    fields.push({ name: fieldName, value })
  }

  return fields
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

  const baseFields = values.map(({ field, value }) => ({ name: field, value }))

  const usedFieldNames = new Set(baseFields.map(({ name }) => name))
  const metadataFields = buildMetadataFields(metadata, usedFieldNames)

  const payload = {
    submittedAt: Date.now(),
    fields: [...baseFields, ...metadataFields],
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
