'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import type { Media as MediaType, Integration, Solution, BlogPost, Page } from '@/payload-types'
import { Media } from '@/components/MediaResponsive'
import { CMSBadge as Badge } from '@/components/Badge'
import { ChevronDown, CircleCheck, X } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { SaudiRiyal } from '@/icons/saudi-riyal'
import { usePricing } from '@/providers/Pricing'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/motion-ui/tooltip'
import { useTheme } from '@/providers/Theme'
import { AnimatePresence, motion } from 'motion/react'

interface PricingCardProps {
  type?: ('basic' | 'featured') | null
  badge?: {
    type?: ('label' | 'reference') | null
    label?: string | null
    color?: ('blue' | 'red' | 'green' | 'yellow' | 'violet' | 'gray' | 'inverted') | null
    reference?:
      | ({
          relationTo: 'solutions'
          value: string | Solution
        } | null)
      | ({
          relationTo: 'integrations'
          value: string | Integration
        } | null)
    /**
     * Select an icon from the Lucide icon set. You can preview all available icons at https://lucide.dev/icons/
     */
    icon?: string | null
    icon_position?: ('flex-row' | 'flex-row-reverse') | null
  }
  title?: string | null
  subtitle?: string | null
  media?: (string | null) | MediaType
  price?: {
    annually?: string | null
    monthly?: string | null
  }
  enableCta?: boolean | null
  link?: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?:
      | ({
          relationTo: 'pages'
          value: string | Page
        } | null)
      | ({
          relationTo: 'blog-posts'
          value: string | BlogPost
        } | null)
      | ({
          relationTo: 'solutions'
          value: string | Solution
        } | null)
    url?: string | null
    label: string
    /**
     * Choose the button style.
     */
    color?: ('brand' | 'neutral') | null
    /**
     * Choose how the link should be rendered.
     */
    variant?: ('primary' | 'secondary' | 'tertiary' | 'ghost' | 'link') | null
  }
  features?:
    | {
        enabled?: boolean | null
        feature?: string | null
        id?: string | null
      }[]
    | null
  featuredSolutions?: (string | Solution)[] | null
  featuredIntegrations?: (string | Integration)[] | null
  id?: string | null
  translations: {
    monthly: string
    annually: string
    includedSolutions: string
    integrations: string
    features: string
  }
}

export const PricingCard: React.FC<PricingCardProps> = (props) => {
  const {
    type,
    badge,
    title,
    subtitle,
    media,
    price,
    enableCta,
    link,
    features,
    featuredSolutions,
    featuredIntegrations,
    translations,
  } = props
  const { isMonthly } = usePricing()
  const { theme } = useTheme()

  const [isExpanded, setIsExpanded] = useState(false)
  const iconMedia = media as MediaType | undefined

  return (
    <motion.div
      layout
      data-theme={
        type === 'featured'
          ? theme === 'dark'
            ? 'light'
            : 'dark'
          : theme === 'dark'
            ? 'dark'
            : 'light'
      }
      style={{ borderRadius: 24 }}
      className={cn(
        'relative bg-background-neutral',
        type === 'featured' && 'bg-background-neutral p-4',
        type === 'basic' && 'bg-background-neutral-subtle p-4',
        type === null && 'p-space-md',
      )}
    >
      <motion.div layout className="flex flex-col gap-4 p-4">
        <div className="relative flex flex-row items-center gap-4">
          {badge?.label && (
            <div className="absolute end-0 top-0">
              <Badge {...badge} color="gray" />
            </div>
          )}

          {iconMedia && (
            <Media
              resource={iconMedia}
              className="shrink-0"
              imgClassName="size-space-3xl object-contain"
            />
          )}

          <div className="space-y-1 text-start">
            {title && (
              <h3
                className={cn(
                  'text-(length:--text-h3) font-medium text-base-primary',
                  type === null && 'text-(length:--text-body-lg)',
                )}
              >
                {title}
              </h3>
            )}
            {subtitle && <p className="text-body-sm text-base-tertiary">{subtitle}</p>}
          </div>
        </div>

        {price && (
          <p
            className={cn(
              'inline-block space-x-[0.15em] text-start text-(length:--text-h2)/none font-medium text-base-primary',
              type === null && 'text-(length:--text-h4)/none',
            )}
          >
            <span className="inline-block align-baseline">
              {isMonthly ? price.monthly : price.annually}
            </span>
            <SaudiRiyal
              className={cn(
                'inline-block size-[0.7em] align-baseline',
                // type === null && '-size-(length:--text-h6)',
              )}
            />
            <span className="inline-block align-baseline text-body-sm/none font-normal text-base-tertiary">
              /{isMonthly ? translations.monthly : translations.annually}
            </span>
          </p>
        )}
        {enableCta && link && (
          <CMSLink
            {...link}
            className="w-full"
            size="lg"
            variant={type === 'featured' ? 'primary' : 'secondary'}
          />
        )}
        <hr className="border-input" />
      </motion.div>

      {/* Featured Solutions */}
      {featuredSolutions && featuredSolutions.length > 0 && (
        <motion.div
          layout
          style={{ borderRadius: 12 }}
          onClick={() => setIsExpanded(!isExpanded)}
          data-state={isExpanded ? 'expanded' : 'collapsed'}
          className="w-full space-y-4 rounded-xl px-4 py-3 pt-2 transition-colors duration-200 hover:bg-neutral/5 data-[state=expanded]:bg-neutral/5 data-[state=expanded]:hover:bg-neutral/10 max-md:px-0 data-[state=expanded]:max-md:px-4"
        >
          <motion.div layout className="-me-2 flex w-full flex-row items-center justify-between">
            <p className="text-sm font-normal text-base-tertiary">
              {translations.includedSolutions}
            </p>
            <ChevronDown
              data-state={isExpanded ? 'expanded' : 'collapsed'}
              className="size-5 text-base-tertiary transition-transform duration-200 data-[state=expanded]:rotate-180"
            />
          </motion.div>
          <motion.ul
            className={cn(
              'flex w-full items-start justify-start gap-1',
              isExpanded ? 'flex-col flex-nowrap gap-2' : 'flex-row flex-wrap gap-1',
            )}
            layout
          >
            {featuredSolutions.map((solution, idx) => {
              const { name, icon, tagline } = (solution as Solution) ?? {}
              const mediaElement = (
                <Media
                  resource={icon as MediaType}
                  imgClassName={cn('size-12 rounded-md object-contain', isExpanded && 'size-12')}
                />
              )
              const solutionItem = (
                <motion.li
                  data-state={isExpanded ? 'expanded' : 'collapsed'}
                  key={idx}
                  className="flex flex-row items-center gap-4 data-[state=collapsed]:size-12"
                >
                  <Tooltip delayDuration={0}>
                    <motion.div
                      layout="position"
                      layoutId={`solution-icon-${type}-${name}`}
                      className={cn('flex-shrink-0', isExpanded ? '' : 'h-fit')}
                    >
                      {isExpanded ? (
                        mediaElement
                      ) : (
                        <>
                          <TooltipTrigger>{mediaElement}</TooltipTrigger>
                          <TooltipContent
                            transition={{
                              ease: [0.68, -0.23, 0.35, 0.95],
                            }}
                          >
                            <div className="text-center">
                              <p className="text-sm font-medium text-inverted-secondary">{name}</p>
                              <p className="text-sm text-inverted-tertiary">{tagline}</p>
                            </div>
                          </TooltipContent>
                        </>
                      )}
                    </motion.div>

                    <AnimatePresence mode="popLayout">
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, x: 16 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                              ease: [0, 0, 0.2, 1],
                              delay: idx * 0.1,
                            },
                          }}
                          exit={{
                            opacity: 0,
                            x: 16,
                            transition: {
                              ease: [0, 0, 0.2, 1],
                              delay: (featuredSolutions.length - 1 - idx) * 0.02,
                            },
                          }}
                          className="flex flex-col items-start justify-start text-start"
                          layout
                        >
                          <p className="text-base font-medium text-base-secondary">{name}</p>
                          <p className="text-sm text-base-tertiary">{tagline}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Tooltip>
                </motion.li>
              )
              return solutionItem
            })}
          </motion.ul>
        </motion.div>
      )}

      {/* Featured Integrations */}
      {featuredIntegrations && featuredIntegrations.length > 0 && (
        <div className="px-4 max-md:px-0">
          <p className="mb-4 text-body-sm font-normal text-base-tertiary">
            {translations.integrations}
          </p>
          <div className="flex flex-wrap gap-1">
            {featuredIntegrations.map((integration, idx) => {
              const integrationTitle =
                typeof integration === 'object' && integration.title ? integration.title : ''
              const integrationIcon =
                typeof integration === 'object' && integration.icon ? integration.icon : ''

              return (
                <Media key={idx} resource={integrationIcon} imgClassName="size-12 object-contain" />
              )
            })}
          </div>
        </div>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <div className="space-y-space-xs p-4">
          {/* <p className="text-body-sm mb-space-xs text-base-tertiary font-normal">
            {translations.features}
          </p> */}
          <ul className="space-y-2.5">
            {features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center justify-start gap-2">
                {feature.enabled ? (
                  <CircleCheck className="size-5 flex-shrink-0 text-base-secondary" />
                ) : (
                  <X className="size-5 flex-shrink-0 text-base-tertiary" />
                )}
                <span
                  className={cn(
                    'text-caption',
                    feature.enabled ? 'text-base-secondary' : 'text-base-tertiary',
                  )}
                >
                  {feature.feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  )
}
