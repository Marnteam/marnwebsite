'use client'

import { useEffect, useState } from 'react'

import type { SubmissionMetadata } from '@/blocks/Form/types'

import { collectClientMetadata } from './collectClientMetadata'

const merge = (base: SubmissionMetadata, incoming?: SubmissionMetadata) => {
  if (!incoming) return base

  let changed = false
  const next = { ...base }

  for (const [key, value] of Object.entries(incoming)) {
    if (value === undefined) continue
    const typedValue = value === null ? null : value
    if (next[key] !== typedValue) {
      next[key] = typedValue
      changed = true
    }
  }

  return changed ? next : base
}

export const useSubmissionMetadata = (
  initialMetadata?: SubmissionMetadata,
): SubmissionMetadata | undefined => {
  const [metadata, setMetadata] = useState<SubmissionMetadata | undefined>(() => {
    if (!initialMetadata) return undefined
    return { ...initialMetadata }
  })

  useEffect(() => {
    const clientMetadata = collectClientMetadata()
    setMetadata((previous = {}) => merge(previous, clientMetadata))
  }, [])

  useEffect(() => {
    if (!initialMetadata) return
    setMetadata((previous = {}) => merge(previous, initialMetadata))
  }, [initialMetadata])

  return metadata
}
