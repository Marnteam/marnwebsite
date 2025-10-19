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
import Image from 'next/image'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'
import RichText from '@/components/RichText'
import { Icon } from '@iconify-icon/react'
import MarnIcon from '@/components/ui/marn-icon'

import { NavigationImagePreloader } from '../NavigationIconPreloader'

interface DesktopNavProps extends Omit<HeaderType, 'id' | 'updatedAt' | 'createdAt'> {
  className?: string
}

// Define the type for a single nav item directly based on HeaderType structure
type NavItem = NonNullable<NonNullable<HeaderType['tabs']>[number]['navItems']>[number]

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

export function DesktopNav({ tabs, cta, className }: DesktopNavProps) {
  const validTabs = tabs || []
  return (
    <div id="parent" className={cn('', className)}>
      {/* Preload all navigation images */}
      <NavigationImagePreloader tabs={tabs} />

      <NavigationMenu className="">
        <NavigationMenuList className="space-x-0">
          {validTabs.map((tab, i) => {
            if (tab.enableDropdown) {
              return (
                <NavigationMenuItem key={i + 'dropdown'}>
                  {tab.enableDirectLink && tab.link ? (
                    <NavigationMenuTrigger className="rounded-full">
                      <CMSLink
                        {...tab.link}
                        variant="inline"
                        className="group hover:text-base-primary hover:no-underline"
                      >
                        {tab.label}
                      </CMSLink>
                    </NavigationMenuTrigger>
                  ) : (
                    <NavigationMenuTrigger className="rounded-full">
                      {tab.label}
                    </NavigationMenuTrigger>
                  )}
                  <NavigationMenuContent>
                    <ul
                      className="olg:grid-cols-[repeat(var(--lgColumns),minmax(332px,1fr))] grid w-[400px] gap-4 p-4 md:w-full md:grid-cols-2 lg:w-(--content-width) lg:grid-cols-[var(--lgColumns)]"
                      style={
                        {
                          '--lgColumns': `repeat(${tab.navItems?.length || 1}, minmax(0, 1fr))`,
                          '--content-width': `${(tab.navItems?.length || 1) * 332 + ((tab.navItems?.length || 1) - 1) * 16 + 32}px`,
                        } as React.CSSProperties
                      }
                    >
                      {
                        (tab.description || tab.descriptionLinks) && null
                        // <li className="row-span-3 md:col-span-1">
                        //   {' '}
                        //   {/* Adjust span based on grid */}
                        //   <NavigationMenuLink asChild>
                        //     <a
                        //       className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                        //       href={tab.descriptionLinks?.[0]?.link?.url || '#'}
                        //     >
                        //       <div className="mt-4 mb-2 text-lg font-medium">{tab.label}</div>
                        //       <p className="text-base-tertiary text-sm leading-tight">
                        //         {tab.description}
                        //       </p>
                        //     </a>
                        //   </NavigationMenuLink>
                        // </li>
                      }
                      {tab.navItems?.map((navItem) => (
                        <li key={navItem.id}>
                          {/* Use navItem.id as key */}
                          <ListItem {...navItem} />
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            }
            if (tab.enableDirectLink && tab.link) {
              return (
                <NavigationMenuItem key={i + 'directLink'}>
                  <NavigationMenuLink asChild>
                    <CMSLink
                      className={cn(navigationMenuTriggerStyle(), 'rounded-full')}
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
          <div ref={ref as React.Ref<HTMLDivElement>} className={cn('p-3', className)} {...props}>
            {featuredLink?.tag && (
              <div className="mb-1 text-xs font-semibold text-base-tertiary">
                {featuredLink.tag}
              </div>
            )}

            <RichText data={featuredLink?.label} />
            <div className="mt-2 flex flex-col space-y-1">
              {featuredLink?.links?.map((subLink, i) => (
                <CMSLink
                  key={i}
                  {...subLink.link}
                  className="text-sm text-base-tertiary hover:text-base-secondary"
                />
              ))}
            </div>
          </div>
        )
        break
      case 'list':
        itemContent = (
          <div ref={ref as React.Ref<HTMLDivElement>} className={cn('', className)} {...props}>
            {listLinks?.tag && (
              <div className="mb-1 px-4 text-xs font-normal text-base-tertiary">
                {listLinks.tag}
              </div>
            )}
            <div className="mt-1 flex flex-col gap-0">
              {listLinks?.links?.map((subLink, i) => {
                return (
                  <CMSLink
                    key={i}
                    {...subLink.link}
                    icon={null}
                    label={null}
                    variant="inline"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      'relative h-fit w-full gap-4 rounded-2xl px-3 text-base transition-all duration-300 ease-in-out-quad hover:px-4 [&_svg]:size-5',
                      subLink.link.type === 'reference' &&
                        subLink.link.reference?.value?.icon &&
                        'items-start',
                    )}
                  >
                    {subLink.link.icon && (
                      <div className="flex size-10 flex-none items-center justify-center rounded-md bg-background text-base-tertiary group-hover:bg-background-neutral group-hover:text-base-secondary">
                        {subLink.link.icon === 'marn-icon' ? (
                          <MarnIcon className="" />
                        ) : (
                          <Icon
                            icon={`material-symbols:${subLink.link.icon}`}
                            className="size-6"
                            height="none"
                          />
                        )}
                      </div>
                    )}
                    {subLink.link.type === 'reference' && subLink.link.reference?.value?.icon && (
                      <Image
                        src={
                          subLink.link.reference.value.icon.url ||
                          subLink.link.reference.value.icon.sizes?.thumbnail?.url ||
                          ''
                        }
                        alt={subLink.link.reference.value.icon.alt}
                        width={40}
                        height={40}
                        className="aspect-square size-10 flex-none rounded-md"
                        priority
                        sizes="40px"
                      />
                    )}
                    <div className="flex flex-1 flex-col justify-start gap-1">
                      {subLink.link.label}
                      {(subLink.link.description || subLink.link.reference?.value?.tagline) && (
                        <p className="line-clamp-2 text-sm leading-snug font-normal whitespace-normal text-base-tertiary">
                          {subLink.link.description || subLink.link.reference?.value?.tagline}
                        </p>
                      )}
                    </div>
                    <Icon
                      icon="tabler:caret-left-filled"
                      height="none"
                      className="size-4 shrink-0 translate-x-[4px] text-base-tertiary opacity-0 transition-all group-hover:translate-x-0 group-hover:text-base-tertiary group-hover:opacity-100"
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
            <CMSLink
              ref={ref as React.Ref<HTMLAnchorElement>}
              className={cn(
                'block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                className,
              )}
              {...defaultLink.link}
              {...props}
            >
              <div className="text-sm leading-none font-medium">{defaultLink.link.label}</div>
              {defaultLink.description && (
                <p className="line-clamp-2 text-sm leading-snug text-base-tertiary">
                  {defaultLink.description}
                </p>
              )}
            </CMSLink>
          </NavigationMenuLink>
        )
    }

    return itemContent
  },
)
ListItem.displayName = 'ListItem'
