import { Button, CopyIcon, SwapIcon, useTranslation } from '@payloadcms/ui'

import type { TranslateResolver } from '../../../resolvers/types'
import { useTranslator } from '../../providers/Translator/context'

export const ResolverButton = ({
  resolver: { key: resolverKey },
}: {
  resolver: TranslateResolver
}) => {
  const { openTranslator } = useTranslator()

  const { t } = useTranslation()

  const handleClick = () => openTranslator({ resolverKey })

  return (
    <button
      onClick={handleClick}
      aria-label={`${resolverKey} button`}
      // use preview button class temporarily
      className="resolver-btn preview-btn"
      id={`translator__resolver-button-${resolverKey}`}
      title={`${resolverKey} button`}
      type="button"
    >
      {/* {t(`plugin-translator:resolver_${resolverKey}_buttonLabel` as Parameters<typeof t>[0])} */}

      {resolverKey === 'copy' && <CopyIcon />}
      {resolverKey === 'aiSDK' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          width="1.5384615385rem"
          height="1.5384615385rem"
          className="icon"
        >
          <rect width="256" height="256" fill="none" />
          <circle
            cx="128"
            cy="128"
            r="96"
            fill="none"
            stroke="currentColor"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth="12"
          />
          <path
            d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth="12"
          />
          <line
            x1="37.46"
            y1="96"
            x2="218.54"
            y2="96"
            fill="none"
            stroke="currentColor"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth="12"
          />
          <line
            x1="37.46"
            y1="160"
            x2="218.54"
            y2="160"
            fill="none"
            stroke="currentColor"
            strokeLinecap="square"
            strokeLinejoin="miter"
            strokeWidth="12"
          />
        </svg>
      )}
    </button>
  )
}
