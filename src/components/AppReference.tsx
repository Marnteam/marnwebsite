import React from 'react'
import { Media } from '@/components/MediaResponsive'
import { CMSLink } from '@/components/Link'
import { Solution, Integration, Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

interface AppReferenceProps {
  appReference:
    | ({
        relationTo: 'solutions'
        value: string | Solution
      } | null)
    | ({
        relationTo: 'integrations'
        value: string | Integration
      } | null)
  className?: string
}

export const AppReference: React.FC<AppReferenceProps> = ({
  appReference,
  className,
}) => {
  if (!appReference) return null
  // Check if appReference.value is an object
  if (typeof appReference.value !== 'object') return null

  return (
    <div
      className={cn(
        'group flex flex-row items-center justify-between gap-4 lg:gap-0',
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {appReference.value.icon && (
          <Media
            resource={appReference.value.icon as MediaType}
            className="size-[clamp(2.5rem,1.7rem+2vw,3.5rem)] shrink-0"
            imgClassName="w-full h-full rounded-md aspect-square"
          />
        )}
        <div>
          {appReference.value.name && (
            <p className="text-body-md text-base-primary mb-1 font-medium">
              {appReference.value.name}
            </p>
          )}
          {appReference.value.tagline && (
            <p className="text-base-tertiary text-body-sm">
              {appReference.value.tagline}
            </p>
          )}
        </div>
      </div>

      {appReference.value.link && (
        <CMSLink
          label="المزيد"
          url={appReference.value.link.url}
          size="sm"
          variant="tertiary"
          color="neutral"
        />
      )}
    </div>
  )
}
