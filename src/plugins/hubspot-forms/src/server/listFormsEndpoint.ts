import type { PayloadHandler } from 'payload'
import { APIError } from 'payload'
import { fetchHubSpotForms } from './hubspot'

export const listFormsEndpoint: PayloadHandler = async (req) => {
  try {
    const forms = await fetchHubSpotForms(req)
    return Response.json({ success: true, forms })
  } catch (e) {
    req.payload.logger.error({ message: 'HubSpot list error', error: e instanceof Error ? e.message : String(e) })
    throw new APIError('Failed to fetch HubSpot forms', 500)
  }
}
