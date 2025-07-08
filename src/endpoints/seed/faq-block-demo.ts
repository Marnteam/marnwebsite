import type { Page, Media, Faq } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedFAQBlockDemo = (
  media: {
    image169: Media | null
    image43: Media | null
    imageSquare: Media | null
  },
  faqs?: Faq[],
) => {
  const faqBlocks = [
    // Introduction
    {
      blockType: 'richTextBlock',
      type: '01',
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'النمط الكامل العرض (Full Width)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'يعرض هذا النمط الأسئلة الشائعة في تخطيط يشغل كامل العرض المتاح، مما يوفر مساحة أكبر للمحتوى.',
          direction: 'rtl',
        },
      ]),
    },

    // FAQ Block 01 - Full Width
    {
      blockType: 'faqBlock',
      type: '01',
      faqs: faqs,
    },

    // Divider
    {
      blockType: 'dividerBlock',
      size: 'large',
      enableDivider: true,
    },

    // Split layout introduction
    {
      blockType: 'richTextBlock',
      type: '01',
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'النمط المنقسم (Split Layout)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'يقسم هذا النمط المساحة بين عنوان القسم على اليسار والأسئلة الشائعة على اليمين، مما يعطي تنظيماً أفضل للمحتوى.',
          direction: 'rtl',
        },
      ]),
    },

    // FAQ Block 02 - Split with Block Header
    {
      blockType: 'faqBlock',
      type: '02',
      blockHeader: {
        type: 'start',
        subhead: 'مركز المساعدة',
        heading: 'أسئلة شائعة إضافية',
        description: generateLexicalContent([
          {
            type: 'p',
            text: 'إليك المزيد من الأسئلة الشائعة التي قد تساعدك في فهم كيفية استخدام النظام بشكل أفضل.',
            direction: 'rtl',
          },
        ]),
      },
      faqs: faqs,
    },

    // Usage Guidelines
    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'إرشادات الاستخدام',
          direction: 'rtl',
        },
        {
          type: 'h3',
          text: 'متى تستخدم النمط الكامل العرض؟',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• عندما تريد التركيز على الأسئلة الشائعة فقط',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• في الصفحات المخصصة للأسئلة الشائعة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• عندما تكون الأسئلة طويلة وتحتاج مساحة أكبر',
          direction: 'rtl',
        },
        {
          type: 'h3',
          text: 'متى تستخدم النمط المنقسم؟',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• عندما تريد إضافة سياق أو مقدمة للأسئلة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• في أقسام الأسئلة الشائعة ضمن صفحات أخرى',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• عندما تريد تنظيم المحتوى بصرياً',
          direction: 'rtl',
        },
      ]),
    },

    // Best Practices
    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'small',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h3',
          text: '💡 نصائح مهمة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• اكتب أسئلة واضحة ومباشرة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• قدم إجابات مفصلة ومفيدة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• رتب الأسئلة حسب الأهمية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• حدث المحتوى بانتظام',
          direction: 'rtl',
        },
      ]),
    },
  ]

  const heroData: Page['hero'] = {
    type: 'hero03',
    richText: generateLexicalContent([
      {
        type: 'h1',
        text: 'عرض توضيحي لبلوك الأسئلة الشائعة',
        direction: 'rtl',
      },
      {
        type: 'p',
        text: 'استكشف الطرق المختلفة لعرض الأسئلة الشائعة باستخدام النمطين: العرض الكامل والتخطيط المنقسم.',
        direction: 'rtl',
      },
    ]),
    media: {
      desktop: {
        light: media.image169?.id,
        dark: media.image169?.id,
      },
      mobile: {
        light: null,
        dark: null,
      },
    },
    links: [
      {
        link: {
          type: 'custom',
          url: '/blocks-demo',
          label: 'العودة لعرض البلوكات',
          newTab: false,
        },
      },
    ],
  }

  const pageData: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'sizes'> = {
    title: 'FAQ Block Demo',
    slug: 'blocks-demo/faq-block',
    hero: heroData,
    layout: faqBlocks as any,
    meta: {
      title: 'FAQ Block Demo | Marn',
      description:
        'استكشف الطرق المختلفة لعرض الأسئلة الشائعة باستخدام النمطين: العرض الكامل والتخطيط المنقسم.',
    },
    _status: 'published',
  }

  return pageData as Page
}
