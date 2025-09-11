'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CaretLeft } from '@/icons/caret-left-filled'

export const LanguageSwitcher: React.FC<{ locale: string }> = ({ locale }) => {
  const router = useRouter()

  const languages = [
    { code: 'ar', label: 'العربية', display: 'ع' },
    { code: 'en', label: 'English', display: 'EN' },
  ]

  const onLanguageChange = (newLocale: string) => {
    const currentPath = window.location.pathname
    // Ensure the path starts with a '/'
    const formattedCurrentPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`

    // Split the path and filter out empty segments and the old locale
    const pathSegments = formattedCurrentPath
      .split('/')
      .filter((segment) => segment && segment !== locale)

    const newPath = `/${newLocale}${pathSegments.length > 0 ? `/${pathSegments.join('/')}` : ''}`
    router.push(newPath)
  }

  const code = locale === 'en' ? 'ar' : 'en'
  const language = languages.find((lang) => lang.code !== locale) || languages[0]

  return (
    <div className="flex flex-row items-center gap-2">
      {/* <p className="text-base-tertiary text-sm font-medium">
        {locale === 'ar' ? 'اللغة' : 'Language'}
      </p> */}
      <Button
        type="button"
        color="neutral"
        variant="tertiary"
        size="md"
        key={code}
        className="group relative rounded-full text-sm" // Added px-2 for better text spacing
        onClick={() => onLanguageChange(code)}
        aria-label={language.label}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="currentColor"
        >
          <path d="M480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-75q17-17 34-63.5T540-336H420q9 55 26 101.5t34 63.5Zm-91-10q-14-30-24.5-69T347-336H204q29 57 77 97.5T389-181Zm182 0q60-17 108-57.5t77-97.5H613q-7 47-17.5 86T571-181ZM177-408h161q-2-19-2.5-37.5T335-482q0-18 .5-35.5T338-552H177q-5 19-7 36.5t-2 35.5q0 18 2 35.5t7 36.5Zm234 0h138q2-20 2.5-37.5t.5-34.5q0-17-.5-35t-2.5-37H411q-2 19-2.5 37t-.5 35q0 17 .5 35t2.5 37Zm211 0h161q5-19 7-36.5t2-35.5q0-18-2-36t-7-36H622q2 19 2.5 37.5t.5 36.5q0 18-.5 35.5T622-408Zm-9-216h143q-29-57-77-97.5T571-779q14 30 24.5 69t17.5 86Zm-193 0h120q-9-55-26-101.5T480-789q-17 17-34 63.5T420-624Zm-216 0h143q7-47 17.5-86t24.5-69q-60 17-108 57.5T204-624Z" />
        </svg>
        {language.label}
        <CaretLeft className="size-4 translate-x-0 ltr:rotate-180 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
      </Button>
    </div>
  )
}
