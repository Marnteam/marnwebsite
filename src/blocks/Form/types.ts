import type { Form as PayloadForm } from '@/payload-types'

/**
 * Runtime form shape as delivered from Payload. We reuse the generated type so HubSpot metadata
 * (and any future overrides) stay in sync with the CMS schema.
 */
export type Form = PayloadForm

export type FormField = NonNullable<Form['fields']>[number]
export type NamedField = Extract<FormField, { name: string }>

/**
 * Lightweight map of field name to submitted value. We intentionally keep the value loose to
 * accommodate dynamic CMS-managed fields without forcing exhaustive unions.
 */
export type FormValues = Record<string, unknown>

export type SubmissionMetadata = {
  locale?: string | null
  pagePath?: string | null
}

export type SubmissionInput = {
  formId: string
  values: FormValues
  metadata?: SubmissionMetadata
}

export type SubmitFormSuccess = {
  status: 'success'
  submissionId: string
  hubspot?: {
    forwarded: boolean
    status?: number
    error?: string
  }
}

export type SubmitFormErrorCode =
  | 'missing_form_id'
  | 'form_not_found'
  | 'invalid_form'
  | 'create_failed'
  | 'hubspot_forward_failed'
  | 'unexpected'

export type SubmitFormError = {
  status: 'error'
  message: string
  code?: SubmitFormErrorCode
  submissionId?: string
}

export type SubmitFormResult = SubmitFormSuccess | SubmitFormError

export type PayloadSubmissionEntry = {
  field: string
  value: string
}

/**
 * Normalise metadata so downstream consumers can rely on explicit nulls instead of undefined.
 */
export const normaliseSubmissionMetadata = (
  metadata?: SubmissionMetadata,
): Required<SubmissionMetadata> => ({
  locale: metadata?.locale ?? null,
  pagePath: metadata?.pagePath ?? null,
})
