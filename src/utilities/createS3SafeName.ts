import crypto from 'crypto'
import { CollectionBeforeChangeHook } from 'payload'
import { Media } from '@/payload-types'

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

  const hashSuffix = crypto.createHash('sha1').update(normalized).digest('hex').slice(0, 8)
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
