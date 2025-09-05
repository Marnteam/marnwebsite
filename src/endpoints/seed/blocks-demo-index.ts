import type { Page, Media } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedBlocksDemoIndex = (media: {
  image169: Media | null
  image43: Media | null
  imageSquare: Media | null
}) => {
  const blocks = [
    // Introduction
    {
      blockType: 'richTextBlock',
      blockHeader: {
        type: 'center',
      },
      type: '01',
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'مكتبة البلوكات المتاحة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'استكشف جميع أنواع البلوكات المتاحة في نظام إدارة المحتوى. كل بلوك يقدم إمكانيات متنوعة لبناء صفحات ويب جذابة وفعالة.',
          direction: 'rtl',
        },
      ]),
    },
    // Content Building Blocks
    {
      blockType: 'richTextBlock',
      blockHeader: {
        type: 'center',
      },
      type: '02',
      maxWidth: 'default',
      columns: 2,
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'بلوكات المحتوى',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك النص المنسق - لعرض المحتوى النصي بتنسيقات مختلفة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الوسائط - لعرض الصور والفيديوهات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الأرشيف - لعرض قوائم المقالات والمحتوى',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك المدونة - لعرض المقالات المميزة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك المعرض - لعرض الصور بتصميمات متنوعة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الكود - لعرض أكواد البرمجة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك HTML المخصص - لإدراج كود HTML مخصص',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الفاصل - لإضافة فواصل بين المحتوى',
          direction: 'rtl',
        },
      ]),
    },
    // Interactive Blocks
    {
      blockType: 'richTextBlock',
      blockHeader: {
        type: 'center',
      },
      type: '02',
      maxWidth: 'default',
      columns: 2,
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'بلوكات تفاعلية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الدعوة للعمل - أزرار وروابط تفاعلية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك النماذج - نماذج التواصل والتسجيل ✅',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الميزات - عرض ميزات المنتج بتصميمات متنوعة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك عرض الشرائح - عرض المحتوى بطريقة تفاعلية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك التطبيقات المميزة - عرض التطبيقات والتكاملات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك السوق - عرض المنتجات والخدمات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الأسئلة الشائعة - عرض الأسئلة والأجوبة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك التسعير - عرض الباقات والأسعار ✅',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك التطبيقات المميزة - عرض تكاملات التطبيقات ✅',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك آراء العملاء - عرض شهادات العملاء ✅',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الشعارات - عرض شعارات الشركاء ✅',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك المقاييس - عرض الإحصائيات والجداول ✅',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك المتجر - عرض شبكة تطبيقات قابلة للبحث ✅',
          direction: 'rtl',
        },
      ]),
    },
    // Display Blocks
    {
      blockType: 'richTextBlock',
      blockHeader: {
        type: 'center',
      },
      type: '02',
      maxWidth: 'default',
      columns: 2,
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'بلوكات العرض',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الشعارات - عرض شعارات الشركاء والعملاء',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الشهادات - عرض آراء وتقييمات العملاء',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الإحصائيات - عرض الأرقام والمقاييس',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك القوائم المنسقة - عرض القوائم بتصميمات جذابة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك الإعلانات - عرض الإعلانات والتنبيهات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• بلوك المعرض - عرض الصور بأنماط متنوعة',
          direction: 'rtl',
        },
      ]),
    },
    // Quick Links
    {
      blockType: 'richTextBlock',
      blockHeader: {
        type: 'center',
      },
      type: '01',
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'روابط سريعة للعروض التوضيحية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'انقر على الروابط أدناه لاستكشاف البلوكات المختلفة:',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '🎯 بلوك الأرشيف - /blocks-demo/archive-block',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '🚀 بلوك الدعوة للعمل - /blocks-demo/cta-block',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '🖼️ بلوك المعرض - /blocks-demo/gallery-block',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '📝 بلوك النماذج - /blocks-demo/form-block',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '💰 بلوك التسعير - /blocks-demo/pricing-block',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '📱 بلوك التطبيقات المميزة - /blocks-demo/featured-apps-block',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '💬 بلوك آراء العملاء - /blocks-demo/testimonials-block',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '🏢 بلوك الشعارات - /blocks-demo/logos-block',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '📊 بلوك المقاييس - /blocks-demo/metrics-block',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '🛒 بلوك المتجر - /blocks-demo/marketplace-block',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '✨ بلوك الميزات - /features (متاح بالفعل)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '🎠 بلوك عرض الشرائح - /carousel-showcase (متاح بالفعل)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'المزيد من البلوكات قريباً...',
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
        text: 'عرض توضيحي لجميع البلوكات',
        direction: 'rtl',
      },
      {
        type: 'p',
        text: 'استكشف مكتبة شاملة من البلوكات المتاحة في نظام إدارة المحتوى. تعرف على إمكانيات كل بلوك وكيفية استخدامه لبناء صفحات ويب متميزة.',
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
          url: '/features',
          label: 'عرض بلوك الميزات',
          newTab: false,
        } as any,
      },
      {
        link: {
          type: 'custom',
          url: '/carousel-showcase',
          label: 'عرض بلوك الشرائح',
          newTab: false,
        } as any,
      },
      {
        link: {
          type: 'custom',
          url: '/blocks-demo/archive-block',
          label: 'عرض بلوك الأرشيف',
          newTab: false,
        } as any,
      },
      {
        link: {
          type: 'custom',
          url: '/blocks-demo/gallery-block',
          label: 'عرض بلوك المعرض',
          newTab: false,
        } as any,
      },
      {
        link: {
          type: 'custom',
          url: '/blocks-demo/form-block',
          label: 'عرض بلوك النماذج',
          newTab: false,
        } as any,
      },
      {
        link: {
          type: 'custom',
          url: '/blocks-demo/pricing-block',
          label: 'عرض بلوك التسعير',
          newTab: false,
        } as any,
      },
      {
        link: {
          type: 'custom',
          url: '/blocks-demo/featured-apps-block',
          label: 'عرض بلوك التطبيقات المميزة',
          newTab: false,
        } as any,
      },
      {
        link: {
          type: 'custom',
          url: '/blocks-demo/testimonials-block',
          label: 'عرض بلوك آراء العملاء',
          newTab: false,
        } as any,
      },
      {
        link: {
          type: 'custom',
          url: '/blocks-demo/logos-block',
          label: 'عرض بلوك الشعارات',
          newTab: false,
        } as any,
      },
      {
        link: {
          type: 'custom',
          url: '/blocks-demo/metrics-block',
          label: 'عرض بلوك المقاييس',
          newTab: false,
        } as any,
      },
      {
        link: {
          type: 'custom',
          url: '/blocks-demo/marketplace-block',
          label: 'عرض بلوك المتجر',
          newTab: false,
        } as any,
      },
    ],
  }

  const pageData: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'sizes'> = {
    title: 'Blocks Demo',
    slug: 'blocks-demo',
    hero: heroData,
    layout: blocks as any,
    meta: {
      title: 'Blocks Demo | Marn',
      description:
        'استكشف مكتبة شاملة من البلوكات المتاحة في نظام إدارة المحتوى لبناء صفحات ويب متميزة.',
    },
    _status: 'published',
  }

  return pageData as Page
}
