import type { Media } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

type CommonPayloadLink = {
  type: 'custom'
  url: string
  label: string
  newTab?: boolean
  // if your link field has colors
}

export const seedCarouselShowcasePage = (media: {
  image169: Media | null
  image43: Media | null
  imageSquare: Media | null
}) => {
  // If any essential media is missing, consider returning null or a page without those media elements.
  // For this example, we'll proceed and rely on optional chaining for IDs.

  const types: ('01' | '02' | '03' | '04' | '05')[] = ['01', '02', '03', '04', '05']

  const carouselBlocks: any[] = []

  const arabicFeatureTitles = [
    'إدارة المخزون بكفاءة',
    'تقارير مبيعات مفصلة',
    'واجهة سهلة الاستخدام',
    'دعم فني سريع ومتجاوب',
    'التكامل مع الأنظمة الأخرى',
  ]

  const arabicFeatureSubtitles = [
    'تابع مخزونك بدقة وتجنب النقص أو الفائض.',
    'احصل على رؤى قيمة حول أداء مبيعاتك لاتخاذ قرارات أفضل.',
    'تمتع بتجربة استخدام سلسة لا تتطلب تدريبًا معقدًا.',
    'فريق دعمنا جاهز لمساعدتك في أي وقت.',
    'اربط نظام نقاط البيع مع برامج المحاسبة والتوصيل بسهولة.',
  ]

  const arabicTabLabels = ['المخزون', 'التقارير', 'الواجهة', 'الدعم', 'التكامل']

  for (const type of types) {
    const headerTitleText = `عرض الكاروسيل (${type}) - ${arabicFeatureTitles[carouselBlocks.length % arabicFeatureTitles.length]}`
    const headerDescriptionText =
      arabicFeatureSubtitles[carouselBlocks.length % arabicFeatureSubtitles.length]

    const blockHeaderData = {
      type: 'center' as const,
      badge: { type: 'label' as const, label: `Carousel ${type}` },
      headerText: generateLexicalContent([
        { type: 'h2', text: headerTitleText, direction: 'rtl' },
        { type: 'p', text: headerDescriptionText, direction: 'rtl' },
      ]),
      links: [],
    }

    const block: any = {
      blockType: 'carouselBlock',
      type: type,
      blockHeader: blockHeaderData,
      columns: [],
    }

    // Generate columns based on type
    const numColumns = type === '01' ? 3 : 4 // Tabs variant needs fewer items
    for (let i = 0; i < numColumns; i++) {
      const column: any = {
        image: media.image169?.id,
        icon: 'shopping-cart-line',
        content: {
          title: arabicFeatureTitles[i % arabicFeatureTitles.length],
          subtitle: arabicFeatureSubtitles[i % arabicFeatureSubtitles.length],
        },
        enableBadge: type === '01',
        enableCta: ['01', '02', '03', '04'].includes(type),
        badge:
          type === '01'
            ? {
                type: 'label',
                label: `ميزة ${i + 1}`,
                color: 'blue',
              }
            : undefined,
        link: ['01', '02', '03', '04'].includes(type)
          ? {
              type: 'custom',
              url: '/features',
              label: 'اكتشف المزيد',
              newTab: false,
            }
          : undefined,
      }

      // Add tab label for type 01 (Tabs variant)
      if (type === '01') {
        column.tabLabel = arabicTabLabels[i % arabicTabLabels.length]
      }

      // Add rich text content for types 04 and 05
      if (['04', '05'].includes(type)) {
        column.richTextContent = generateLexicalContent([
          { type: 'p', text: arabicFeatureSubtitles[i % arabicFeatureSubtitles.length] },
          { type: 'p', text: 'هذا محتوى إضافي لتوضيح الميزة بشكل أكثر تفصيلاً.' },
        ])
      }

      block.columns.push(column)
    }

    carouselBlocks.push(block)
  }

  return {
    title: 'Carousel Showcase',
    slug: 'carousel-showcase',
    _status: 'published',
    layout: carouselBlocks,
    meta: {
      title: 'Carousel Showcase - Ballurh',
      description: 'عرض جميع أنواع الكاروسيل المتاحة في نظام Ballurh',
      image: media.image169?.id,
    },
  }
}
