import { Form, PayloadSubmissionEntry, FormValues, NamedField } from './types'

const serialiseFieldValue = (field: NamedField, value: unknown): string => {
  if (field.blockType === 'checkbox') {
    return value === true ? 'true' : 'false'
  }

  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return value ? 'true' : 'false'

  if (Array.isArray(value)) {
    return value.map((item) => (typeof item === 'string' ? item : String(item))).join(', ')
  }

  if (value == null) return ''

  return typeof value === 'object' ? JSON.stringify(value) : String(value)
}

/**
 * Transform loose form values into the serialised "{ field, value }[]" structure expected by
 * the existing Payload collection. Serialisation keeps the raw values intact for the caller so
 * HubSpot forwarding can work with the unsanitised data if needed.
 */
export const buildSubmissionPayload = (
  form: Form,
  values: FormValues,
): PayloadSubmissionEntry[] => {
  const entries: PayloadSubmissionEntry[] = []
  const fields = form.fields ?? []

  for (const field of fields) {
    if (field.blockType === 'message') continue

    const value = values[field.name]
    const serialised = serialiseFieldValue(field, value)

    entries.push({
      field: field.name,
      value: serialised,
    })
  }

  return entries
}
