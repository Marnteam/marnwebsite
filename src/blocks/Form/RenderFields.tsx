'use client'
import { useFormContext } from 'react-hook-form'
import { fields } from './fields'
import type { Form as FormType } from './types'

export const RenderFields: React.FC<{ form: FormType; locale?: string }> = ({ form, locale }) => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext()
  const formFields = form?.fields || []

  const fieldComponents: React.ReactNode[] = []
  let i = 0
  while (i < formFields.length) {
    const field = formFields[i]
    const Field = fields?.[field.blockType]
    if (!Field) {
      i++
      continue
    }
    const fieldProps = {
      form,
      ...field,
      control,
      errors,
      register,
      locale,
    }
    const nextFieldCandidate = i + 1 < formFields.length ? formFields[i + 1] : null
    if (
      'width' in field &&
      field.width === 50 &&
      nextFieldCandidate &&
      'width' in nextFieldCandidate &&
      nextFieldCandidate.width === 50
    ) {
      const nextField = nextFieldCandidate
      const NextField = fields?.[nextField.blockType]
      if (NextField) {
        const nextFieldProps = {
          form,
          ...nextField,
          control,
          errors,
          register,
          locale,
        }
        fieldComponents.push(
          <div key={i} className="mb-4 flex flex-col gap-4 md:flex-row">
            <Field {...fieldProps} className="w-full" />
            <NextField {...nextFieldProps} className="w-full" />
          </div>,
        )
        i += 2
        continue
      }
    }
    fieldComponents.push(
      <div key={i} className="mb-space-sm">
        <Field {...fieldProps} />
      </div>,
    )
    i++
  }
  return <>{fieldComponents}</>
}
