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
import { useFormSubmission } from '@/utilities/forms/useFormSubmission'
import { useSubmissionMetadata } from '@/utilities/forms/useSubmissionMetadata'
import { RenderFields } from './RenderFields'

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

  const submissionMetadata = useSubmissionMetadata({
    locale,
    pagePath: pathname || undefined,
  })

  const { submit, status, isLoading, error, confirmation, result } = useFormSubmission({
    form: formFromProps,
    metadata: submissionMetadata,
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
          {status === 'success' &&
            confirmationType === 'message' &&
            (confirmation || confirmationMessage) && (
              <RichText data={(confirmation ?? confirmationMessage) as SerializedEditorState} />
            )}
          {isLoading && status === 'submitting' && <p>Loading, please wait...</p>}
          {error && <div>{`${error.code || 'error'}: ${error.message}`}</div>}
          {status !== 'success' && (
            <form id={formID} onSubmit={handleSubmit(submit)}>
              <div className="mb-4">
                <RenderFields form={formFromProps} locale={locale} />
              </div>
              <Button
                form={formID}
                type="submit"
                variant="primary"
                color="neutral"
                className="w-full"
              >
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
