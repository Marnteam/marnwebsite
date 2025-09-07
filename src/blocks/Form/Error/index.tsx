import { useTranslations } from 'next-intl'
import * as React from 'react'

export const Error: React.FC = () => {
  const t = useTranslations('form')
  return (
    <div className="animate-shake-enter mt-2 text-sm text-red-600/80">
      {t('thisFieldIsRequired')}
    </div>
  )
}
