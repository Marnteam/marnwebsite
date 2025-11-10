'use client'

import * as React from 'react'

import { cn } from '@/utilities/ui'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Card } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'

import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Icon } from '@iconify-icon/react'
import MarnIcon from '@/components/ui/marn-icon'
import type { Header as HeaderType } from '@/payload-types'

import { NavigationImagePreloader } from '../NavigationIconPreloader'
import { getMediaUrl } from '@/utilities/getMediaURL'

interface DesktopNavProps extends Omit<HeaderType, 'id' | 'updatedAt' | 'createdAt'> {
  className?: string
}

// Define the type for a single nav item directly based on HeaderType structure
type Tab = NonNullable<HeaderType['tabs']>[number]
type NavItem = NonNullable<Tab['navItems']>[number]

// Explicitly define props for ListItem based on the NavItem structure
interface ListItemProps {
  className?: string
  style?: 'default' | 'featured' | 'list' | null
  defaultLink?: NavItem['defaultLink']
  featuredLink?: NavItem['featuredLink']
  listLinks?: NavItem['listLinks']
  id?: string | null
  [key: string]: any // Allow other props temporarily
}

interface DropdownTabProps {
  label: NonNullable<Tab['label']>
  enableDirectLink: NonNullable<Tab['enableDirectLink']>
  link: NonNullable<Tab['link']>
  description: NonNullable<Tab['description']>
  descriptionLinks: NonNullable<Tab['descriptionLinks']>
  navItems: ListItemProps[]
}

export function DesktopNav({ tabs, cta, className }: DesktopNavProps) {
  const validTabs = tabs || []
  return (
    <div id="parent" className={cn('', className)}>
      {/* Preload all navigation images */}
      <NavigationImagePreloader tabs={tabs} />

      <NavigationMenu>
        <NavigationMenuList className="space-x-0">
          {validTabs.map((tab, i) => {
            if (tab.enableDropdown) {
              return <DropdownTab key={i + ' - dropdown'} {...(tab as any)} />
            }
            if (tab.enableDirectLink && tab.link) {
              return (
                <NavigationMenuItem key={i + ' - directLink'}>
                  <NavigationMenuLink asChild>
                    <CMSLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        'rounded-full hover:no-underline',
                      )}
                      label={tab.label}
                      {...tab.link}
                      variant="inline"
                    />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            }
            return null
          })}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="pointer-events-none flex w-full max-w-54 flex-row items-center justify-end gap-2">
        {cta &&
          cta.map((ctaItem, id) => (
            <CMSLink
              key={id}
              {...ctaItem.link}
              size="sm"
              color={ctaItem.link.color ?? undefined}
              className="pointer-events-auto text-sm"
            />
          ))}
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<HTMLAnchorElement | HTMLDivElement, ListItemProps>(
  ({ className, style, defaultLink, featuredLink, listLinks, ...props }, ref) => {
    let itemContent: React.ReactNode | null = null

    switch (style) {
      case 'featured':
        itemContent = (
          <div
            ref={ref as React.Ref<HTMLDivElement>}
            className={cn('p-3 pe-8', className)}
            {...props}
          >
            {featuredLink?.tag && (
              <div className="mb-2 text-xs font-medium text-base-tertiary">{featuredLink.tag}</div>
            )}
            <RichText
              data={featuredLink?.label}
              className="[&_p]:font-medium [&_p]:text-base-secondary"
            />
            <div className="mt-4 flex flex-row gap-2">
              {featuredLink?.links?.map((subLink, i) => (
                <CMSLink
                  key={i}
                  {...subLink.link}
                  variant="link"
                  className="text-sm text-base-tertiary hover:text-base-secondary"
                />
              ))}
            </div>
          </div>
        )
        break
      case 'list':
        itemContent = (
          <div ref={ref as React.Ref<HTMLDivElement>} className={cn('pt-3', className)} {...props}>
            {listLinks?.tag && (
              <div className="mb-2 px-3 text-xs font-medium text-base-tertiary">
                {listLinks.tag}
              </div>
            )}
            <div className="mt-1 flex flex-col">
              {listLinks?.links?.map((subLink, i) => {
                return (
                  <CMSLink
                    key={i}
                    {...subLink.link}
                    icon={null}
                    label={null}
                    variant="ghost"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'relative h-fit w-full items-center justify-start gap-2 rounded-2xl px-2 text-base [&_svg]:size-5',
                      subLink.link.type === 'reference' &&
                        subLink.link.reference?.value?.icon &&
                        'items-start',
                    )}
                  >
                    {subLink.link.icon && (
                      <div className="flex size-8 flex-none items-center justify-center rounded-full bg-background text-base-tertiary group-hover:bg-background-neutral group-hover:text-base-secondary">
                        {subLink.link.icon === 'marn-icon' ? (
                          <MarnIcon className="" />
                        ) : (
                          <Icon
                            icon={`material-symbols:${subLink.link.icon}`}
                            className="size-5"
                            height="none"
                          />
                        )}
                      </div>
                    )}
                    {subLink.link.type === 'reference' && subLink.link.reference?.value?.icon && (
                      <Image
                        src={getMediaUrl(subLink.link.reference.value.icon.url)}
                        alt={subLink.link.reference.value.icon.alt}
                        width={40}
                        height={40}
                        className="aspect-square size-10 flex-none rounded-md"
                        priority
                        sizes="40px"
                      />
                    )}
                    <div className="flex flex-1 flex-col gap-0.5 text-sm text-base-primary">
                      {subLink.link.label}
                      {(subLink.link.description || subLink.link.reference?.value?.tagline) && (
                        <p className="text-sm leading-snug font-normal whitespace-normal text-base-tertiary group-hover:text-base-secondary">
                          {subLink.link.description || subLink.link.reference?.value?.tagline}
                        </p>
                      )}
                    </div>
                    <Icon
                      icon="tabler:caret-left-filled"
                      height="none"
                      className="size-4 shrink-0 translate-x-0 text-base-tertiary opacity-0 transition-[translate,_opacity] group-hover:text-base-tertiary group-hover:opacity-100 ltr:rotate-180 ltr:group-hover:translate-x-1 rtl:rotate-0 rtl:group-hover:-translate-x-1"
                    />
                  </CMSLink>
                )
              })}
            </div>
          </div>
        )
        break
      case 'default':
      default:
        if (!defaultLink?.link) return null
        return (
          <NavigationMenuLink asChild>
            {/*<LinkBlock
              link={defaultLink}
              className="h-full w-full"
              label={defaultLink.description}
              position="corner"
            />*/}
            <div
              className={cn(
                buttonVariants({ color: 'neutral', variant: 'ghost' }),
                'relative flex h-full w-full flex-col items-start justify-start gap-2 rounded-2xl p-4 pe-8',
                className,
              )}
            >
              <CMSLink
                ref={ref as React.Ref<HTMLAnchorElement>}
                className="h-fit"
                {...defaultLink.link}
                {...props}
                label={null}
              >
                {defaultLink.link.label}
                <span className="absolute inset-0" />
              </CMSLink>
              {defaultLink.description && (
                <p className="line-clamp-4 w-full text-sm whitespace-normal text-base-tertiary">
                  {defaultLink.description}
                </p>
              )}
            </div>
          </NavigationMenuLink>
        )
    }

    return itemContent
  },
)
ListItem.displayName = 'ListItem'

const DropdownTab = React.forwardRef<HTMLAnchorElement | HTMLDivElement, DropdownTabProps>(
  ({ label, enableDirectLink, link, description, descriptionLinks, navItems, ...props }, ref) => {
    let itemContent: React.ReactNode | null = null

    let columnsCount = navItems?.length || 1
    if (description) columnsCount++

    itemContent = (
      <NavigationMenuItem>
        <NavigationMenuTrigger asChild>
          {enableDirectLink && link && (link.url || link.reference?.value) ? (
            <CMSLink
              {...link}
              variant="inline"
              className={(navigationMenuTriggerStyle(), 'hover:no-underline')}
            >
              {label}
            </CMSLink>
          ) : (
            <span>{label}</span>
          )}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul
            className="flex flex-row gap-1 p-2"
            style={
              {
                '--lgColumns': `repeat(auto-fit, minmax(224px, 1fr))`,
                '--content-width': `${columnsCount * 224 + (columnsCount - 1) * 16 + 32}px`,
                '--column-width': '224px',
              } as React.CSSProperties
            }
          >
            {description && (
              <li
                className={cn('col-span-1 w-[calc(var(--column-width)*1.5)]', {
                  // 'col-span-4': navItems.length === 2 && description,
                })}
              >
                <Card className="_bg-background-inverted _text-inverted-secondary flex h-full flex-col justify-between gap-6 rounded-lg p-4">
                  <span className="text-base leading-relaxed font-medium text-base-primary">
                    {description}
                  </span>
                  {descriptionLinks.length > 0 &&
                    descriptionLinks.map((descriptionLink, idx) => (
                      <CMSLink
                        key={idx}
                        {...descriptionLink.link}
                        color="brand"
                        variant="link"
                        className="pointer-events-auto h-fit w-fit px-0 text-base"
                      />
                    ))}
                </Card>
              </li>
            )}
            {navItems?.map((navItem, idx) => (
              <li
                key={idx}
                className={cn('col-span-1 w-(--column-width)', {
                  'col-span-2 w-[calc(var(--column-width)*2)]': navItem.style === 'featured',
                })}
              >
                <ListItem {...navItem} />
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
    return itemContent
  },
)
DropdownTab.displayName = 'DropdownTab'
