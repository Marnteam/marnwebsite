'use client'
import { FeaturesBlock } from '@/payload-types'
import { CMSBadge as Badge } from '@/components/Badge'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

import { CMSLink } from '@/components/Link'

import { Icon } from '@iconify-icon/react'
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
    <div className="container grid grid-cols-1 gap-xs py-xl md:grid-cols-4 lg:grid-cols-12">
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
              'group col-span-4 flex flex-col gap-xs rounded-3xl bg-background-neutral p-4',
              lgColSpanClass,
              {
                'lg:flex-row': size === 'full',
                'hover:shadow-border': column.enableCta && column.link?.label,
                // 'lg:col-span-3': size === 'oneThird',
              },
            )}
          >
            {column.enableCta && column.link?.label ? (
              <CMSLink
                {...column.link}
                label={null}
                variant="inline"
                className="contents hover:no-underline"
              >
                <FeatureCardContent column={column} readMoreLabel={readMoreLabel} />
              </CMSLink>
            ) : (
              <FeatureCardContent column={column} readMoreLabel={readMoreLabel} />
            )}
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
        className={cn('flex w-full flex-col gap-xs p-xs', {
          'lg:basis-1/2 lg:pe-md': size === 'full',
        })}
      >
        {column.enableBadge && column.badge && <Badge {...column.badge} />}
        {content && (
          <div className="flex flex-col gap-xs">
            {content.title && (
              <h3 className="text-h3 font-medium text-base-primary">{content.title}</h3>
            )}
            {content.subtitle && <RichText data={content.subtitle} />}
          </div>
        )}
        {column.enableCta && column.link?.label && (
          <span className="mt-auto flex w-fit flex-row items-center gap-1">
            {readMoreLabel}
            <Icon
              icon="tabler:caret-left-filled"
              height="none"
              className="size-3 translate-x-1 transition-all duration-300 group-hover:translate-x-0 ltr:-translate-x-1 ltr:rotate-180"
            />
          </span>
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
