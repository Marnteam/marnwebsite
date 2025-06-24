import React from 'react'
import { useLocale } from 'next-intl'

const defaultLabels = {
  ar: {
    plural: 'مستندات',
    singular: 'مستند',
  },
  en: {
    plural: 'Docs',
    singular: 'Doc',
  },
}

const defaultCollectionLabels = {
  posts: {
    ar: {
      plural: 'مقالة',
      singular: 'مقالة',
    },
    en: {
      plural: 'Posts',
      singular: 'Post',
    },
  },
}

export const PageRange: React.FC<{
  className?: string
  collection?: string
  collectionLabels?: {
    plural?: string
    singular?: string
  }
  currentPage?: number
  limit?: number
  totalDocs?: number
}> = (props) => {
  const {
    className,
    collection,
    collectionLabels: collectionLabelsFromProps,
    currentPage,
    limit,
    totalDocs,
  } = props

  const locale = useLocale()

  let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1
  if (totalDocs && indexStart > totalDocs) indexStart = 0

  let indexEnd = (currentPage || 1) * (limit || 1)
  if (totalDocs && indexEnd > totalDocs) indexEnd = totalDocs

  const { plural, singular } =
    collectionLabelsFromProps ||
    defaultCollectionLabels[collection || ''][locale] ||
    defaultLabels[locale]

  return (
    <div className={[className, 'font-medium'].filter(Boolean).join(' ')}>
      {(typeof totalDocs === 'undefined' || totalDocs === 0) && 'Search produced no results.'}
      {typeof totalDocs !== 'undefined' &&
        totalDocs > 0 &&
        `${locale === 'en' ? 'Showing' : 'عرض'} ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} ${
          locale === 'en' ? 'of' : 'من أصل'
        } ${totalDocs} ${totalDocs > 1 ? plural : singular}`}
    </div>
  )
}
