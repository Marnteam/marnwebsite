import { Link } from '@/i18n/routing'
import { Integration } from '@/payload-types'
import { Media } from '@/components/MediaResponsive'
import RichText from '@/components/RichText'
import { CMSBadge as Badge } from '@/components/Badge'
import { TypedLocale } from 'payload'
import { getEcosystemBadgeColorFromObject } from '@/utilities/getEcosystemBadgeColor'
import { getHref } from '@/utilities/getHref'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

export type IntegrationsCardData = Pick<
  Integration,
  'slug' | 'icon' | 'tagline' | 'link' | 'name' | 'summary' | 'categories' | 'ecosystem'
>

export const IntegrationCard: React.FC<{
  integration: IntegrationsCardData
  locale?: TypedLocale
}> = ({ integration, locale }) => {
  const { icon, tagline, link, name, summary, categories, ecosystem } = integration

  const href = getHref(link)

  return (
    // Use background variable and explicit rounding from Figma
    <Link
      href={href}
      className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-background-neutral hover:shadow-border lg:flex-row"
    >
      {/* Content Section */}
      <div className="flex w-full flex-col justify-between p-md text-start">
        <div className="flex flex-col items-start justify-start gap-sm">
          {/* Integration Badge (Icon + Name) */}
          <div className="flex items-start justify-end gap-4">
            {icon && (
              <Media
                resource={icon}
                className="shrink-0"
                imgClassName="size-space-3xl overflow-hidden rounded-xl"
              />
            )}
            <div className="flex flex-col gap-2">
              {name && <span className="text-body-lg font-medium text-base-secondary">{name}</span>}
              {categories && (
                <span className="flex flex-wrap gap-2">
                  {ecosystem &&
                    ecosystem.map(
                      (ecosystem) =>
                        ecosystem &&
                        typeof ecosystem === 'object' && (
                          <Badge
                            key={ecosystem.id}
                            type="label"
                            size="md"
                            label={ecosystem.title}
                            color={getEcosystemBadgeColorFromObject(ecosystem)}
                          />
                        ),
                    )}
                  {categories.map(
                    (category) =>
                      category &&
                      typeof category === 'object' && (
                        <Badge
                          key={category.id}
                          type="label"
                          size="md"
                          label={category.title}
                          color="gray"
                        />
                      ),
                  )}
                </span>
              )}
            </div>
          </div>
          {/* Title and Description */}
          <div className="flex flex-col gap-xs">
            {/* {tagline && <h3 className="text-h3 text-base-primary font-medium">{tagline}</h3>} */}
            {/* Render summary using RichText component with `data` prop */}
            {summary && (
              <RichText
                data={summary}
                enableGutter={false}
                className="text-body-sm font-normal text-base-secondary"
              />
            )}
          </div>
        </div>
        {/* Link Button */}
        {link && (
          <div className="mt-xs flex w-fit flex-row items-center gap-2 px-0 py-0 text-body-sm text-base-tertiary hover:bg-transparent hover:text-base-primary">
            <span>{locale === 'ar' ? 'المزيد' : 'Learn More'}</span>
            <Icon
              icon="tabler:caret-left-filled"
              height="none"
              className="size-3 shrink-0 translate-x-1 transition-all duration-150 group-hover:translate-x-0 ltr:-translate-x-1 ltr:rotate-180"
            />
          </div>
        )}
      </div>
    </Link>
  )
}
