import type { Page, PricingBlock, Media, Solution, Integration } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedPricingBlockDemo = (
  media: {
    image169: Media | null
    image43: Media | null
    imageSquare: Media | null
  },
  solutions: Solution[],
  integrations: Integration[],
) => {
  const pricingBlocks: PricingBlock[] = [
    // Variant 01 - Hero Style Pricing Cards
    {
      blockType: 'pricingBlock',
      type: '01',
      blockHeader: {
        type: 'center',
        badge: { type: 'label', label: 'الخطط الأساسية' },
        headerText: generateLexicalContent([
          { type: 'h2', text: 'خطط أسعار مرنة', direction: 'rtl' },
          {
            type: 'p',
            text: 'اختر الخطة التي تناسب حجم أعمالك واحتياجاتك. جميع الخطط تأتي مع دعم فني متميز.',
            direction: 'rtl',
          },
        ]),
      },
      pricingCards: [
        {
          type: 'basic',
          title: 'الباقة الأساسية',
          subtitle: 'مثالية للشركات الناشئة والصغيرة',
          price: { annually: '999', monthly: '99' },
          enableCta: true,
          link: {
            type: 'custom',
            url: '/contact',
            label: 'ابدأ الآن',
            variant: 'secondary',
          },
          features: [
            { feature: 'نقطة بيع واحدة', enabled: true },
            { feature: 'إدارة 100 منتج', enabled: true },
            { feature: 'تقارير مبيعات أساسية', enabled: true },
            { feature: 'دعم عبر البريد الإلكتروني', enabled: true },
            { feature: 'تكامل محدود', enabled: false },
          ],
        },
        {
          type: 'featured',
          badge: { type: 'label', label: 'الأكثر شيوعًا' },
          title: 'الباقة المتقدمة',
          subtitle: 'للشركات المتوسطة والمتنامية',
          price: { annually: '1999', monthly: '199' },
          enableCta: true,
          link: {
            type: 'custom',
            url: '/contact',
            label: 'اختر الخطة المتقدمة',
            variant: 'primary',
          },
          features: [
            { feature: '3 نقاط بيع', enabled: true },
            { feature: 'إدارة 1000 منتج', enabled: true },
            { feature: 'تقارير مبيعات متقدمة', enabled: true },
            { feature: 'دعم هاتفي وبريد إلكتروني', enabled: true },
            { feature: 'تكامل مع أنظمة المحاسبة', enabled: true },
          ],
          featuredSolutions: solutions.slice(0, 2).map((s) => s.id),
        },
      ],
    },
    // Variant 03 - Carousel Style
    {
      blockType: 'pricingBlock',
      type: '03',
      blockHeader: {
        type: 'center',
        headerText: generateLexicalContent([{ type: 'h2', text: 'حلول إضافية', direction: 'rtl' }]),
      },
      pricingCards: solutions.map((solution) => ({
        title: solution.title,
        subtitle: solution.tagline,
        media: (solution.icon as Media)?.id,
        price: { monthly: '49', annually: '499' },
        enableCta: true,
        link: {
          type: 'reference',
          reference: {
            relationTo: 'solutions',
            value: solution.id,
          },
          label: 'اعرف المزيد',
        },
      })),
    },
    // Variant 04 - Table Style
    {
      blockType: 'pricingBlock',
      type: '04',
      blockHeader: {
        type: 'center',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'مقارنة شاملة بين الخطط', direction: 'rtl' },
        ]),
      },
      table: {
        title: 'مقارنة شاملة بين الخطط',
        headers: [
          { header: 'الميزات', width: 'w-1/3' },
          { header: 'الأساسية', width: 'auto' },
          { header: 'المتقدمة', width: 'auto' },
          { header: 'المؤسسات', width: 'auto' },
        ],
        rows: [
          {
            cells: [{ content: 'نقاط البيع', isHeader: true }],
            isExpandable: false,
          },
          {
            cells: [
              { content: 'عدد نقاط البيع' },
              { content: '1' },
              { content: '3' },
              { content: 'غير محدود' },
            ],
          },
          {
            cells: [{ content: 'المنتجات والمخزون', isHeader: true }],
            isExpandable: false,
          },
          {
            cells: [
              { content: 'عدد المنتجات' },
              { content: '100' },
              { content: '1000' },
              { content: 'غير محدود' },
            ],
          },
          {
            cells: [
              { content: 'إدارة المخزون' },
              { content: 'check' },
              { content: 'check' },
              { content: 'check' },
            ],
          },
          {
            cells: [{ content: 'التقارير والتحليلات', isHeader: true }],
            isExpandable: true,
            children: [
              {
                cells: [
                  { content: 'تقارير المبيعات اليومية' },
                  { content: 'check' },
                  { content: 'check' },
                  { content: 'check' },
                ],
              },
              {
                cells: [
                  { content: 'تحليل أداء المنتجات' },
                  { content: 'close' },
                  { content: 'check' },
                  { content: 'check' },
                ],
              },
            ],
          },
        ],
        styling: { striped: true, bordered: true, compact: false },
      },
    },
  ]

  const heroData: Page['hero'] = {
    type: 'hero03',
    richText: generateLexicalContent([
      { type: 'h1', text: 'عرض توضيحي لبلوك التسعير', direction: 'rtl' },
      {
        type: 'p',
        text: 'استكشف الطرق المختلفة لعرض خطط الأسعار والمقارنات بينها باستخدام بلوك التسعير.',
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
    title: 'Pricing Block Demo',
    slug: 'blocks-demo/pricing-block',
    hero: heroData,
    layout: pricingBlocks as any,
    meta: {
      title: 'Pricing Block Demo | Marn',
      description: 'عرض توضيحي لخيارات بلوك التسعير المختلفة.',
    },
    _status: 'published',
  }

  return pageData as Page
}
