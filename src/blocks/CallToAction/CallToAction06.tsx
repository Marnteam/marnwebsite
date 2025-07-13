'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'

import { buildInitialFormState } from '../Form/buildInitialFormState'
import { fields } from '../Form/fields'
import { getClientSideURL } from '@/utilities/getURL'

import type { CallToActionBlock } from '@/payload-types'
import type { CMSLinkType } from '@/components/Link'

import { CMSLink } from '@/components/Link'
import { Data } from '../Form/Component'
import { RenderFields } from '../Form/RenderFields'

type CTABlockType = CallToActionBlock & {
  form: FormType
  locale?: string
}

export const CallToAction06: React.FC<CTABlockType> = (props) => {
  const {
    badge,
    richText,
    links,
    caption,
    list,
    media,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    locale,
  } = props

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )
  return (
    <div className="py-xl container">
      <div className="gap-sm px-md rounded-space-sm py-lg flex flex-col items-center">
        <div className="gap-lg flex flex-col items-center">
          {richText && (
            <RichText className="mb-0 text-center" data={richText} enableGutter={false} />
          )}
          <div className="flex flex-col gap-8">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...(link as CMSLinkType)} />
            })}
          </div>
        </div>
        {formID && (
          <div className="w-full max-w-[48rem]">
            <FormProvider {...formMethods}>
              {/* {!isLoading && hasSubmitted && confirmationType === 'message' && (
                <RichText data={confirmationMessage as SerializedEditorState} />
              )} */}
              {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
              {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
              {!hasSubmitted && (
                <form id={formID} onSubmit={handleSubmit(onSubmit)}>
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
