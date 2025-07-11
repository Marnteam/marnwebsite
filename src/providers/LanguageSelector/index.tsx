'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GlobeIcon } from 'lucide-react'

export const LanguageSwitcher: React.FC<{ locale: string }> = ({ locale }) => {
  const router = useRouter()
  const [value, setValue] = useState(locale) // Set initial value to the current locale
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ]

  const onLanguageChange = (newLocale: string) => {
    const currentPath = window.location.pathname
    const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
    setValue(newLocale)
  }

  useEffect(() => {
    setValue(locale) // Ensure the selected value stays updated when the locale changes
  }, [locale])

  return (
    <Select onValueChange={onLanguageChange} value={value}>
      <SelectTrigger
        aria-label="Select a language"
        className="border-input data-[state=open]:bg-background-neutral text-body-sm w-auto gap-2 rounded-full border bg-transparent ps-0 md:ps-3"
      >
        <GlobeIcon className="text-base-tertiary size-5" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent position="popper" align="end">
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
