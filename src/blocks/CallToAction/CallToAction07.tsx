'use client'

import type { Form as FormType, FormValues } from '@/blocks/Form/types'

import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

import { buildInitialFormState } from '../Form/buildInitialFormState'

import type { CallToActionBlock } from '@/payload-types'
import type { CMSLinkType } from '@/components/Link'

import { CMSLink } from '@/components/Link'
import { RenderFields } from '../Form/RenderFields'
import { useFormSubmission } from '@/utilities/forms/useFormSubmission'
import { useSubmissionMetadata } from '@/utilities/forms/useSubmissionMetadata'

type CTABlockType = CallToActionBlock & {
  form: FormType
  locale?: string
}

export const CallToAction07: React.FC<CTABlockType> = (props) => {
  const {
    badge,
    richText,
    links,
    caption,
    list,
    mediaGroup,
    form: formFromProps,
    form: { id: formID, confirmationType, redirect, submitButtonLabel } = {},
    locale,
  } = props

  const pathname = usePathname()
  const formMethods = useForm<FormValues>({
    defaultValues: formFromProps ? buildInitialFormState(formFromProps) : {},
  })
  const { handleSubmit, reset } = formMethods

  const router = useRouter()

  const submissionMetadata = useSubmissionMetadata({
    locale,
    pagePath: pathname || undefined,
  })

  const { submit, status, isLoading, error, result, confirmation } = useFormSubmission({
    form: formFromProps,
    metadata: submissionMetadata,
    onSuccess: () => {
      reset(formFromProps ? buildInitialFormState(formFromProps) : {})
    },
  })

  useEffect(() => {
    if (result && confirmationType === 'redirect' && redirect?.url) {
      router.push(redirect.url)
    }
  }, [result, confirmationType, redirect, router])

  return (
    <div className="container py-xl">
      <div className="flex flex-col items-start gap-4 rounded-3xl bg-background-neutral px-md py-lg lg:flex-row lg:items-start lg:justify-between *:lg:basis-1/2">
        <div className="flex flex-col items-start gap-sm">
          {richText && (
            <RichText className="mx-0 mb-0 text-start" data={richText} enableGutter={false} />
          )}
          <div className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...(link as CMSLinkType)} />
            })}
          </div>
        </div>
        {formID && formFromProps && (
          <div className="w-full max-lg:mt-md lg:max-w-[48rem] lg:p-md">
            <FormProvider {...formMethods}>
              {status === 'success' && confirmationType === 'message' && confirmation && (
                <RichText data={confirmation} />
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
        )}
      </div>
    </div>
  )
}
