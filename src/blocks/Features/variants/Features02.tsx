'use client'
import { FeaturesBlock } from '@/payload-types'
import { CMSBadge as Badge } from '@/components/Badge'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

import { CMSLink } from '@/components/Link'

import * as motion from 'motion/react-client'
import { itemVariants } from '@/utilities/motion'
import RichText from '@/components/RichText'

const colSpanClass = {
  full: 'md:col-span-4 lg:col-span-12',
  half: 'md:col-span-2 lg:col-span-6',
  oneThird: 'md:col-span-2 lg:col-span-4',
  twoThirds: 'md:col-span-2 lg:col-span-8',
  sixtyPercent: 'md:col-span-2 lg:col-span-7',
  fortyPercent: 'md:col-span-2 lg:col-span-5',
}

type ColumnsType = NonNullable<FeaturesBlock['columns']>

type Features02Props = FeaturesBlock & {
  readMoreLabel?: string
}

export const Features02: React.FC<Features02Props> = ({ columns, readMoreLabel }) => {
  const safeColumns: ColumnsType = columns ?? []
  if (!safeColumns.length) return null

  return (
    <div className="container grid grid-cols-1 gap-space-xs py-space-xl md:grid-cols-4 lg:grid-cols-12">
      {safeColumns.map((column, index) => {
        const { content, image, size } = column
        const lgColSpanClass = colSpanClass[size || 'full']
        return (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            className={cn(
              'group relative col-span-4 flex flex-col rounded-3xl bg-background-neutral p-4',
              lgColSpanClass,
              {
                'lg:flex-row': size === 'full',
                'hover:shadow-border': column.enableCta && column.link?.label,
              },
            )}
          >
            <FeatureCardContent column={column} readMoreLabel={readMoreLabel} />
          </motion.div>
        )
      })}
    </div>
  )
}

function FeatureCardContent({
  column,
  readMoreLabel,
}: {
  column: ColumnsType[number]
  readMoreLabel?: string
}) {
  const { content, image, size } = column
  return (
    <>
      <div
        className={cn('flex w-full flex-col gap-space-xs p-space-xs pe-space-md', {
          'lg:basis-1/2 lg:pe-space-lg': size === 'full',
        })}
      >
        {column.enableBadge && column.badge && <Badge size="md" {...column.badge} />}
        {content && (
          <div className="flex flex-col gap-space-xs pe-4">
            {content.title && (
              <h3
                className={cn('text-h3 font-medium text-base-primary', {
                  'text-h4': size === 'oneThird' || size === 'fortyPercent',
                })}
              >
                {content.title}
              </h3>
            )}
            {content.subtitle && <RichText data={content.subtitle} />}
          </div>
        )}
        {column.enableCta && column.link?.label && (
          <CMSLink variant="link" className="mt-auto flex w-fit flex-row items-center gap-1">
            {readMoreLabel}
            <span className="absolute inset-0 z-0"></span>
          </CMSLink>
        )}
      </div>
      {image && (
        <Media
          resource={image}
          className={cn('group w-full flex-1 overflow-hidden rounded-lg bg-background', {
            'flex-auto lg:basis-1/2': size === 'full',
          })}
          imgClassName="h-full w-full object-cover transition-all duration-300 group-hover:scale-102"
        />
      )}
    </>
  )
}
