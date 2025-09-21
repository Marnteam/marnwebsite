import type { Form, FormValues, NamedField } from './types'

/**
 * Helper used by react-hook-form initialisation so every field stays aligned with the CMS defaults.
 */
export const getInitialValueForField = <Field extends NamedField>(field: Field): unknown => {
  switch (field.blockType) {
    case 'checkbox':
      return field.defaultValue ?? false
    case 'number':
      if ('defaultValue' in field) {
        const defaultValue = field.defaultValue
        if (typeof defaultValue === 'number') {
          return String(defaultValue)
        }
        if (typeof defaultValue === 'string') {
          return defaultValue
        }
      }
      return ''
    case 'select':
      if ('defaultValue' in field && typeof field.defaultValue === 'string') {
        return field.defaultValue
      }
      return ''
    case 'state':
    case 'country':
      return ''
    case 'text':
    case 'textarea':
    case 'email':
      if ('defaultValue' in field && typeof field.defaultValue === 'string') {
        return field.defaultValue
      }
      return ''
    default:
      return ''
  }
}

export const buildInitialFormState = (form: Form): FormValues => {
  const initial: FormValues = {}
  const fields = form.fields ?? []

  for (const field of fields) {
    if (field.blockType === 'message') continue
    initial[field.name] = getInitialValueForField(field)
  }

  return initial
}
