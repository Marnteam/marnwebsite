import { Category, Integration } from '@/payload-types'
import { Media } from '@/components/MediaResponsive'
import { CMSBadge as Badge } from '@/components/Badge'
import { TypedLocale } from 'payload'
import { getEcosystemBadgeColorFromObject } from '@/utilities/getEcosystemBadgeColor'
import { useTranslations } from 'next-intl'
import { Icon } from '@iconify-icon/react/dist/iconify.mjs'

const InfoCard: React.FC<{
  id: string
  label: string
  icon?: string
  children: React.ReactNode
}> = ({ id, label, icon, children }) => (
  <div
    id={id}
    className="flex flex-col items-center justify-center gap-2 rounded-3xl bg-background-neutral p-4"
  >
    <div className="flex h-full flex-wrap items-center justify-center gap-2">{children}</div>
    <span className="flex flex-row items-center gap-2 text-body-sm text-base-secondary">
      {icon && <Icon icon={icon} className="size-5" height="none" />}
      {label}
    </span>
  </div>
)

const renderBadges = (
  items: Category[],
  color: 'blue' | 'red' | 'green' | 'yellow' | 'gray' | 'violet' | 'inverted' | undefined,
) => {
  return items
    ?.filter((item) => item && typeof item === 'object')
    .map((item) => (
      <Badge
        key={item.id}
        type="label"
        size="lg"
        label={item.title}
        className="text-body-sm"
        color={color}
      />
    ))
}

export const IntegrationPane: React.FC<{
  integration: Pick<Integration, 'icon' | 'company' | 'ecosystem' | 'categories' | 'pricing'>
  locale?: TypedLocale
}> = ({ integration, locale }) => {
  const t = useTranslations('IntegrationPane')
  const { icon, company, ecosystem, categories, pricing } = integration

  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-space-xs lg:grid-cols-4">
        <InfoCard
          id="company"
          label={t('company')}
          icon="material-symbols:business-center-outline-rounded"
        >
          {icon && (
            <Media
              resource={icon}
              className="shrink-0"
              imgClassName="size-10 overflow-hidden rounded-xl"
            />
          )}
          <p className="ms-2 text-body-sm font-medium">{company?.name}</p>
        </InfoCard>

        <InfoCard
          id="ecosystem"
          label={t('ecosystem')}
          icon="material-symbols:settings-outline-rounded"
        >
          {renderBadges(
            ecosystem as Category[],
            getEcosystemBadgeColorFromObject(ecosystem?.[0] as Category),
          )}
        </InfoCard>

        <InfoCard
          id="categories"
          label={t('categories')}
          icon="material-symbols:category-outline-rounded"
        >
          {renderBadges(categories as Category[], 'gray')}
        </InfoCard>

        <InfoCard
          id="pricing"
          label={t('pricing')}
          icon="material-symbols:payments-outline-rounded"
        >
          <span className="text-body-sm font-medium text-base-secondary">{pricing}</span>
        </InfoCard>
      </div>
    </div>
  )
}
