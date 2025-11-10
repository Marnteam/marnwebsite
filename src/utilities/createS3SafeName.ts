// import crypto from 'crypto' // not compatible with workers runtime
import { CollectionBeforeChangeHook } from 'payload'
import { Media } from '@/payload-types'

async function shortSha1Hex(input) {
  const enc = new TextEncoder()
  const data = enc.encode(input) // or your "normalized" value
  const buf = await crypto.subtle.digest('SHA-1', data) // ArrayBuffer (20 bytes)
  const hex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
  return hex.slice(0, 8) // first 8 hex chars (32 bits)
}

export const createS3SafeFilename: CollectionBeforeChangeHook<Media> = async ({
  req,
  operation,
  data,
}) => {
  const filename = data.filename

  if (!filename) return data

  const normalized = filename.normalize('NFC')

  const lastDot = normalized.lastIndexOf('.')
  const extension = lastDot > -1 ? normalized.slice(lastDot + 1).toLowerCase() : ''
  const baseName = lastDot > -1 ? normalized.slice(0, lastDot) : normalized

  const asciiBase = baseName
    .normalize('NFD')
    .replace(/\p{Diacritic}+/gu, '')
    .replace(/[^A-Za-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')

  const hashSuffix = await shortSha1Hex(normalized)
  const shouldAppendHash = asciiBase !== baseName || asciiBase.length === 0
  const safeBase = asciiBase.length > 0 ? asciiBase : `file-${hashSuffix}`
  const finalBase =
    shouldAppendHash && asciiBase.length > 0 ? `${safeBase}-${hashSuffix}` : safeBase
  const safeFilename = extension ? `${finalBase}.${extension}` : finalBase

  if (safeFilename !== normalized) {
    console.warn(`Renamed filename for S3 compatibility`, {
      original: normalized,
      safeFilename,
    })
  }

  data.filename = safeFilename

  return data
}
