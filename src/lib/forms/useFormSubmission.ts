'use client'

import { useCallback, useEffect, useRef, useState, useTransition } from 'react'

import { submitFormAction } from '@/app/(frontend)/actions/submitForm'
import {
  type Form,
  type FormValues,
  type SubmissionMetadata,
  type PayloadSubmissionEntry,
  type SubmitFormError,
  type SubmitFormResult,
  type SubmitFormSuccess,
} from '@/blocks/Form/types'
import { buildSubmissionPayload } from '@/blocks/Form/buildPayloadSubmission'

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

type UseFormSubmissionOptions = {
  form: Form
  metadata?: SubmissionMetadata
  delayMs?: number
  onSuccess?: (result: SubmitFormSuccess, payload: PayloadSubmissionEntry[]) => void
  onError?: (result: SubmitFormError, payload: PayloadSubmissionEntry[]) => void
}

type UseFormSubmissionReturn = {
  submit: (values: FormValues) => void
  status: SubmissionStatus
  isLoading: boolean
  isPending: boolean
  error: SubmitFormError | null
  result: SubmitFormSuccess | null
  confirmation: Form['confirmationMessage'] | null
  hubspot: SubmitFormSuccess['hubspot'] | undefined
  reset: () => void
}

const DEFAULT_LOADING_DELAY = 1000

export const useFormSubmission = ({
  form,
  metadata,
  delayMs = DEFAULT_LOADING_DELAY,
  onSuccess,
  onError,
}: UseFormSubmissionOptions): UseFormSubmissionReturn => {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<SubmitFormError | null>(null)
  const [result, setResult] = useState<SubmitFormSuccess | null>(null)
  const [confirmation, setConfirmation] = useState<Form['confirmationMessage'] | null>(null)
  const [isPending, startTransition] = useTransition()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearLoadingTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    return () => {
      clearLoadingTimer()
    }
  }, [clearLoadingTimer])

  const beginLoadingTimer = useCallback(() => {
    clearLoadingTimer()
    timeoutRef.current = setTimeout(() => {
      setIsLoading(true)
    }, delayMs)
  }, [clearLoadingTimer, delayMs])

  const notifySuccess = useCallback(
    (payloadEntries: PayloadSubmissionEntry[], submissionResult: SubmitFormSuccess) => {
      setStatus('success')
      setResult(submissionResult)
      setError(null)

      if (form.confirmationType === 'message') {
        setConfirmation(form.confirmationMessage ?? null)
      } else {
        setConfirmation(null)
      }

      onSuccess?.(submissionResult, payloadEntries)
    },
    [form.confirmationType, form.confirmationMessage, onSuccess],
  )

  const notifyError = useCallback(
    (payloadEntries: PayloadSubmissionEntry[], submissionError: SubmitFormError) => {
      setStatus('error')
      setError(submissionError)
      setResult(null)
      setConfirmation(null)

      onError?.(submissionError, payloadEntries)
    },
    [onError],
  )

  const submit = useCallback(
    (values: FormValues) => {
      if (!form?.id) {
        const missingIdError: SubmitFormError = {
          status: 'error',
          message: 'Form ID is required.',
          code: 'missing_form_id',
        }
        notifyError([], missingIdError)
        return
      }

      const payloadEntries = buildSubmissionPayload(form, values)

      setStatus('submitting')
      setResult(null)
      setError(null)
      setConfirmation(null)
      beginLoadingTimer()

      startTransition(() => {
        void (async () => {
          const submissionResult: SubmitFormResult = await submitFormAction({
            formId: form.id,
            values,
            metadata,
          })

          clearLoadingTimer()

          if (submissionResult.status === 'success') {
            notifySuccess(payloadEntries, submissionResult)
          } else {
            notifyError(payloadEntries, submissionResult)
          }
        })()
      })
    },
    [
      form,
      metadata,
      beginLoadingTimer,
      notifyError,
      notifySuccess,
      clearLoadingTimer,
      startTransition,
    ],
  )

  const reset = useCallback(() => {
    clearLoadingTimer()
    setStatus('idle')
    setError(null)
    setResult(null)
    setConfirmation(null)
  }, [clearLoadingTimer])

  return {
    submit,
    status,
    isLoading,
    isPending,
    error,
    result,
    confirmation,
    hubspot: result?.hubspot,
    reset,
  }
}
