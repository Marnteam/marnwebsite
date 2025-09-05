import type { Page, FeaturedAppsBlock, Media, Solution, Integration } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedFeaturedAppsBlockDemo = (
  media: {
    image169: Media | null
    image43: Media | null
    imageSquare: Media | null
  },
  solutions: Solution[],
  integrations: Integration[],
) => {
  const featuredAppsBlocks: FeaturedAppsBlock[] = [
    // Variant 01 - Apps Grid Hero
    {
      blockType: 'featuredAppsBlock',
      type: '01',
      blockHeader: {
        type: 'center',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'تطبيقاتك المفضلة، متصلة بسلاسة', direction: 'rtl' },
          {
            type: 'p',
            text: 'استكشف شبكة متنامية من التكاملات التي تجعل مارن المنصة المركزية لعملك.',
            direction: 'rtl',
          },
        ]),
        links: [
          {
            link: { type: 'custom', url: '/integrations', label: 'استكشف كل التكاملات' } as any,
          },
        ],
      },
      apps: integrations.slice(0, 12).map((app) => ({ relationTo: 'integrations', value: app.id })),
    },
    // Variant 03 - Carousel (full width card)
    {
      blockType: 'featuredAppsBlock',
      type: '03',
      blockHeader: {
        type: 'start',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'تكاملات مميزة', direction: 'rtl' },
        ]),
      },
      apps: integrations.slice(0, 3).map((app) => ({ relationTo: 'integrations', value: app.id })),
    },
    // Variant 04 - Carousel (3 slides per view)
    {
      blockType: 'featuredAppsBlock',
      type: '04',
      blockHeader: {
        type: 'split',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'وسع إمكانياتك', direction: 'rtl' },
        ]),
        links: [
          {
            link: { type: 'custom', url: '/integrations', label: 'عرض الكل' } as any,
          },
        ],
      },
      apps: integrations.slice(3, 9).map((app) => ({ relationTo: 'integrations', value: app.id })),
    },
    // Variant 05 - List with image
    {
      blockType: 'featuredAppsBlock',
      type: '05',
      blockHeader: {
        type: 'center',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'منصة متكاملة وقابلة للتخصيص', direction: 'rtl' },
        ]),
      },
      media: media.image43?.id,
    },
    // Variant 06 - Grouped Cards
    {
      blockType: 'featuredAppsBlock',
      type: '06',
      blockHeader: {
        type: 'center',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'حلول مخصصة لكل قطاع', direction: 'rtl' },
          {
            type: 'p',
            text: 'مجموعات منتقاة من التطبيقات والحلول لتلبية احتياجات أعمالك المحددة.',
            direction: 'rtl',
          },
        ]),
      },
      cards: [
        {
          title: 'لمتاجر التجزئة',
          subtitle: 'أدوات أساسية لإدارة متجرك بكفاءة',
          appReference: [
            { relationTo: 'integrations', value: integrations[0]?.id },
            { relationTo: 'integrations', value: integrations[1]?.id },
            { relationTo: 'solutions', value: solutions[0]?.id },
          ],
        },
        {
          title: 'للمطاعم والمقاهي',
          subtitle: 'حلول متكاملة لخدمة ضيوفك بشكل أفضل',
          appReference: [
            { relationTo: 'integrations', value: integrations[2]?.id },
            { relationTo: 'integrations', value: integrations[3]?.id },
            { relationTo: 'solutions', value: solutions[1]?.id },
          ],
        },
        {
          title: 'للتجارة الإلكترونية',
          subtitle: 'ربط متجوك الإلكتروني بأنظمة الدفع والشحن',
          appReference: [
            { relationTo: 'integrations', value: integrations[4]?.id },
            { relationTo: 'integrations', value: integrations[5]?.id },
            { relationTo: 'solutions', value: solutions[2]?.id },
          ],
        },
      ],
    },
  ]

  const heroData: Page['hero'] = {
    type: 'hero03',
    richText: generateLexicalContent([
      { type: 'h1', text: 'عرض توضيحي لبلوك التطبيقات المميزة', direction: 'rtl' },
      {
        type: 'p',
        text: 'استكشف الطرق المختلفة لعرض تكاملات التطبيقات والحلول.',
        direction: 'rtl',
      },
    ]),
    mediaGroup: {
      media: media.image169?.id,
      videoControls: {},
    },
    links: [
      {
        link: {
          type: 'custom',
          url: '/blocks-demo',
          label: 'العودة لعرض البلوكات',
          newTab: false,
        } as any,
      },
    ],
  }

  const pageData: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'sizes'> = {
    title: 'Featured Apps Block Demo',
    slug: 'blocks-demo/featured-apps-block',
    hero: heroData,
    layout: featuredAppsBlocks as any,
    meta: {
      title: 'Featured Apps Block Demo | Marn',
      description: 'عرض توضيحي لخيارات بلوك التطبيقات المميزة.',
    },
    _status: 'published',
  }

  return pageData as Page
}
