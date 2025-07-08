import type { Page, MetricsBlock, Media } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedMetricsBlockDemo = (media: {
  image169: Media | null
  image43: Media | null
  imageSquare: Media | null
  logos: Media[]
}) => {
  const metricsBlocks: MetricsBlock[] = [
    // Variant 01 - Grid
    {
      blockType: 'metricsBlock',
      type: '01',
      blockHeader: {
        type: 'center',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'النتائج تتحدث عن نفسها', direction: 'rtl' },
          {
            type: 'p',
            text: 'أرقام حقيقية من عملائنا توضح تأثير مارن على نمو أعمالهم.',
            direction: 'rtl',
          },
        ]),
      },
      stats: [
        { label: 'زيادة في المبيعات', value: '35%', indicator: 'increase' },
        { label: 'رضا العملاء', value: '98%', indicator: 'increase' },
        { label: 'وقت إنجاز الطلب', value: '2 دقيقة', indicator: 'decrease' },
        { label: 'تقارير يومية', value: '50+', indicator: 'noChange' },
      ],
      enableLogos: true,
      logos: {
        headline: 'بعض من عملائنا',
        logos: media.logos.slice(0, 10).map((logo) => logo.id),
      },
    },
    // Variant 02 - Grid with Image
    {
      blockType: 'metricsBlock',
      type: '02',
      blockHeader: {
        type: 'start',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'تحكم كامل في عملياتك', direction: 'rtl' },
        ]),
      },
      blockImage: {
        media: media.image43?.id,
      },
      stats: [
        { label: 'تكلفة المخزون', value: '20%', indicator: 'decrease' },
        { label: 'مبيعات أونلاين', value: '60%', indicator: 'increase' },
      ],
    },
    // Variant 03 - Table
    {
      blockType: 'metricsBlock',
      type: '03',
      blockHeader: {
        type: 'center',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'مقارنة تفصيلية للميزات', direction: 'rtl' },
        ]),
      },
      table: {
        title: 'مقارنة بين باقات مارن',
        headers: [
          { header: 'الميزة', width: 'w-1/2' },
          { header: 'الباقة الأساسية', width: 'auto' },
          { header: 'الباقة المتقدمة', width: 'auto' },
        ],
        rows: [
          {
            cells: [{ content: 'إدارة المنتجات', isHeader: true }],
            isExpandable: true,
            children: [
              {
                cells: [
                  { content: 'عدد غير محدود من المنتجات' },
                  { content: 'close' },
                  { content: 'check' },
                ],
              },
              {
                cells: [
                  { content: 'خيارات متقدمة للمنتجات' },
                  { content: 'close' },
                  { content: 'check' },
                ],
              },
            ],
          },
          {
            cells: [
              { content: 'التقارير' },
              { content: 'تقارير أساسية' },
              { content: 'تقارير متقدمة' },
            ],
          },
        ],
        styling: { striped: true, bordered: false, compact: true },
      },
    },
  ]

  const heroData: Page['hero'] = {
    type: 'hero03',
    richText: generateLexicalContent([
      { type: 'h1', text: 'عرض توضيحي لبلوك المقاييس', direction: 'rtl' },
      {
        type: 'p',
        text: 'استكشف الطرق المختلفة لعرض البيانات والإحصائيات الهامة.',
        direction: 'rtl',
      },
    ]),
    media: {
      desktop: { light: media.image169?.id, dark: media.image169?.id },
      mobile: { light: null, dark: null },
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
    title: 'Metrics Block Demo',
    slug: 'blocks-demo/metrics-block',
    hero: heroData,
    layout: metricsBlocks as any,
    meta: {
      title: 'Metrics Block Demo | Marn',
      description: 'عرض توضيحي لخيارات بلوك المقاييس.',
    },
    _status: 'published',
  }

  return pageData as Page
}
