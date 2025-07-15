'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import type { Media as MediaType, Integration, Solution, BlogPost, Page } from '@/payload-types'
import { Media } from '@/components/MediaResponsive'
import { Badge } from '@/components/ui/badge'
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
    color?: ('blue' | 'red' | 'green' | 'yellow' | 'gray' | 'inverted') | null
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
      className={cn(
        'bg-background-neutral rounded-space-sm relative space-y-4',
        type === 'featured' && 'bg-background-neutral p-card-xl',
        type === 'basic' && 'bg-background-neutral-subtle p-card-xl',
        type === null && 'p-space-md',
      )}
    >
      <motion.div layout className="flex flex-col gap-4">
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
                  'text-base-primary text-(length:--text-h3) font-medium',
                  type === null && 'text-(length:--text-body-lg)',
                )}
              >
                {title}
              </h3>
            )}
            {subtitle && <p className="text-base-tertiary text-body-sm">{subtitle}</p>}
          </div>
        </div>

        {price && (
          <p
            className={cn(
              'text-base-primary inline-block space-x-[0.15em] text-start text-(length:--text-h2)/none font-medium',
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
            <span className="text-base-tertiary text-body-sm/none inline-block align-baseline font-normal">
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
          className="hover:bg-neutral/5 data-[state=expanded]:hover:bg-neutral/10 data-[state=expanded]:bg-neutral/5 w-full space-y-4 rounded-xl px-4 py-3 pt-2 transition-colors duration-200 max-md:px-0 data-[state=expanded]:max-md:px-4"
        >
          <motion.div layout className="-me-2 flex w-full flex-row items-center justify-between">
            <p className="text-body-sm text-base-tertiary font-normal">
              {translations.includedSolutions}
            </p>
            <ChevronDown
              data-state={isExpanded ? 'expanded' : 'collapsed'}
              className="text-base-tertiary size-5 transition-transform duration-200 data-[state=expanded]:rotate-180"
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
                              <p className="text-base-secondary text-sm font-medium">{name}</p>
                              <p className="text-base-tertiary text-sm">{tagline}</p>
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
                        >
                          <p className="text-base-secondary text-base font-medium">{name}</p>
                          <p className="text-base-tertiary text-sm">{tagline}</p>
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
          <p className="text-body-sm text-base-tertiary mb-4 font-normal">
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
        <div className="space-y-space-xs">
          {/* <p className="text-body-sm mb-space-xs text-base-tertiary font-normal">
            {translations.features}
          </p> */}
          <ul className="space-y-2.5">
            {features.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center justify-start gap-2">
                {feature.enabled ? (
                  <CircleCheck className="text-base-secondary size-5 flex-shrink-0" />
                ) : (
                  <X className="text-base-tertiary size-5 flex-shrink-0" />
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
