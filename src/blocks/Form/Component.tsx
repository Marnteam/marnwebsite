'use client'

import type { Form as FormType, FormValues } from './types'

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { useFormSubmission } from '@/lib/forms/useFormSubmission'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
  locale?: string
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationType, redirect, submitButtonLabel, confirmationMessage } = {},
    introContent,
    locale,
  } = props

  const pathname = usePathname()
  const formMethods = useForm<FormValues>({
    defaultValues: buildInitialFormState(formFromProps),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = formMethods

  const router = useRouter()

  const { submit, status, isLoading, error, confirmation, result } = useFormSubmission({
    form: formFromProps,
    metadata: {
      locale,
      pagePath: pathname || undefined,
    },
    onSuccess: () => {
      reset(buildInitialFormState(formFromProps))
    },
  })

  useEffect(() => {
    if (result && confirmationType === 'redirect' && redirect?.url) {
      router.push(redirect.url)
    }
  }, [result, confirmationType, redirect, router])

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && status !== 'success' && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6">
        <FormProvider {...formMethods}>
          {status === 'success' && confirmationType === 'message' && (confirmation || confirmationMessage) && (
            <RichText data={(confirmation ?? confirmationMessage) as SerializedEditorState} />
          )}
          {isLoading && status === 'submitting' && <p>Loading, please wait...</p>}
          {error && <div>{`${error.code || 'error'}: ${error.message}`}</div>}
          {status !== 'success' && (
            <form id={formID} onSubmit={handleSubmit(submit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps?.fields?.map((field, index) => {
                  const Field = fields?.[field.blockType]
                  if (!Field) return null
                  return (
                    <div className="mb-6 last:mb-0" key={index}>
                      <Field
                        form={formFromProps}
                        {...field}
                        control={control}
                        errors={errors}
                        register={register}
                        locale={locale}
                      />
                    </div>
                  )
                })}
              </div>

              <Button form={formID} type="submit" variant="primary" color="brand" className="h-12">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
