import type { PayloadHandler } from 'payload'
import { APIError } from 'payload'
import { fetchHubSpotFormById } from './hubspot'
import { mapHubSpotFieldsToPayloadBlocks } from './mapToPayloadFields'

export const applyFormEndpoint: PayloadHandler = async (req) => {
  if (!req.json) throw new APIError('Content-Type should be json', 400)
  const body = await req.json()
  const { hubspotFormId, docId } = body as { hubspotFormId?: string; docId?: string }
  if (!hubspotFormId || !docId) throw new APIError('Bad Request', 400)
  console.log('req', req)
  try {
    const hsForm = await fetchHubSpotFormById(hubspotFormId)

    // Only applies to the configured forms collection
    const formsCollection = req.payload.config.collections.find((c) => c.slug === 'forms')
    if (!formsCollection) throw new APIError('Forms collection not found', 500)

    // We must be in a document context; use req.params for id if available
    // But in admin we patch the current document using update with the body
    // Build new fields array
    const newBlocks = mapHubSpotFieldsToPayloadBlocks(hsForm.fields || [])
    console.log('newBlocks', newBlocks)
    console.log('docId', docId)
    // Update the form document in place
    const updated = await req.payload.update({
      collection: 'forms',
      id: docId,
      data: {
        fields: newBlocks,
        hubspotFormId: hsForm.id,
        hubspotPortalId: hsForm.portalId,
      },
      req,
    })

    return Response.json({ success: true, doc: updated })
  } catch (e) {
    req.payload.logger.error({
      message: 'HubSpot apply error',
      error: e instanceof Error ? e.message : String(e),
    })
    return Response.json({ success: false })
  }
}
