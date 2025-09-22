'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'

import {
  normaliseSubmissionMetadata,
  type Form,
  type SubmissionInput,
  type SubmitFormResult,
} from '@/blocks/Form/types'

import { buildSubmissionPayload } from '@/blocks/Form/buildPayloadSubmission'

import { sendHubspotSubmission } from '@/utilities/forms/hubspot'

const mapHubspotSuccess = (status?: number) => ({
  forwarded: true as const,
  status,
})

const mapHubspotFailure = ({ status, error }: { status?: number; error?: string }) => ({
  forwarded: false as const,
  status,
  error,
})

export const submitFormAction = async (input: SubmissionInput): Promise<SubmitFormResult> => {
  const { formId, values, metadata } = input

  if (!formId) {
    return {
      status: 'error',
      message: 'Form ID is required.',
      code: 'missing_form_id',
    }
  }

  const payload = await getPayload({ config: configPromise })

  let form: Form | null = null

  try {
    const result = await payload.findByID({
      collection: 'forms',
      id: formId,
    })
    form = result as Form
  } catch (error) {
    payload.logger?.error?.('Failed to load form for submission', {
      formId,
      error,
    })
    return {
      status: 'error',
      message: 'Form not found.',
      code: 'form_not_found',
    }
  }

  if (!form || !form.fields) {
    payload.logger?.error?.('Attempted submission with invalid form configuration', {
      formId,
    })
    return {
      status: 'error',
      message: 'This form is not configured to accept submissions.',
      code: 'invalid_form',
    }
  }

  const submissionData = buildSubmissionPayload(form, { values })
  const metadataPayload = normaliseSubmissionMetadata(metadata)

  try {
    // send to Payload
    const created = await payload.create({
      collection: 'form-submissions',
      data: {
        form: formId,
        submissionData: [
          ...submissionData,
          ...Object.keys(metadataPayload).map((record) => {
            return {
              field: record,
              value: metadataPayload[record] ?? '',
            }
          }),
        ],
      },
    })

    // send to Hubspot
    if (form.hubspotPortalId && form.hubspotFormId) {
      const hubspotResult = await sendHubspotSubmission({
        portalId: form.hubspotPortalId,
        formId: form.hubspotFormId,
        values: submissionData,
        metadata: metadataPayload,
      })

      if (!hubspotResult.ok) {
        payload.logger?.warn?.('HubSpot submission failed; continuing with local success.', {
          formId,
          submissionId: created.id,
          status: hubspotResult.status,
          error: hubspotResult.error,
        })

        return {
          status: 'success',
          submissionId: created.id,
          hubspot: mapHubspotFailure({
            status: hubspotResult.status,
            error: hubspotResult.error,
          }),
        }
      }

      return {
        status: 'success',
        submissionId: created.id,
        hubspot: mapHubspotSuccess(hubspotResult.status),
      }
    }

    return {
      status: 'success',
      submissionId: created.id,
    }
  } catch (error) {
    payload.logger?.error?.('Failed to persist form submission', {
      formId,
      error,
    })

    return {
      status: 'error',
      message: 'Unable to record your submission. Please try again later.',
      code: 'create_failed',
    }
  }
}
