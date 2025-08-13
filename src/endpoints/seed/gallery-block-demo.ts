import type { Page, Media } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedGalleryBlockDemo = (media: {
  image169: Media | null
  image43: Media | null
  imageSquare: Media | null
}) => {
  const galleryBlocks = [
    // Introduction
    {
      blockType: 'richTextBlock',
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'عرض توضيحي لبلوك المعرض',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'استكشف الطرق المختلفة لعرض الصور والمحتوى المرئي باستخدام بلوك المعرض. يوفر النظام 4 أنواع مختلفة من المعارض لتناسب احتياجاتك المتنوعة.',
          direction: 'rtl',
        },
      ]),
    },

    // Gallery 01 - Card/Carousel Style
    {
      blockType: 'galleryBlock',
      type: '01',
      images: [media.image169?.id, media.image43?.id, media.imageSquare?.id].filter(Boolean),
      blockHeader: {
        type: 'center',
        badge: { type: 'label', label: 'Gallery 01' },
        headerText: generateLexicalContent([
          {
            type: 'h3',
            text: 'المعرض النوع الأول - بطاقات تفاعلية',
            direction: 'rtl',
          },
        ]),
        descriptionText: generateLexicalContent([
          {
            type: 'p',
            text: 'معرض بتصميم البطاقات مع أزرار التنقل والمؤشرات. مثالي لعرض مجموعة محدودة من الصور بشكل أنيق ومنظم. تصفح الصور باستخدام الأزرار أو المؤشرات السفلية.',
            direction: 'rtl',
          },
        ]),
      },
    },

    // Gallery 02 - Full-width Style
    {
      blockType: 'galleryBlock',
      type: '02',
      images: [media.imageSquare?.id, media.image169?.id, media.image43?.id].filter(Boolean),
      blockHeader: {
        type: 'center',
        badge: { type: 'label', label: 'Gallery 02' },
        headerText: generateLexicalContent([
          {
            type: 'h3',
            text: 'المعرض النوع الثاني - العرض الكامل',
            direction: 'rtl',
          },
        ]),
        descriptionText: generateLexicalContent([
          {
            type: 'p',
            text: 'معرض بعرض كامل للشاشة لإبراز الصور بشكل مؤثر. مناسب للصور عالية الجودة والمحتوى المرئي المهم. عرض الصور بحجم كامل للحصول على تأثير بصري قوي.',
            direction: 'rtl',
          },
        ]),
      },
    },

    // Gallery 03 - Infinite Slider
    {
      blockType: 'galleryBlock',
      type: '03',
      images: [
        media.image169?.id,
        media.image43?.id,
        media.imageSquare?.id,
        media.image169?.id,
        media.image43?.id,
      ].filter(Boolean),
      blockHeader: {
        type: 'center',
        badge: { type: 'label', label: 'Gallery 03' },
        headerText: generateLexicalContent([
          {
            type: 'h3',
            text: 'المعرض النوع الثالث - التمرير اللانهائي',
            direction: 'rtl',
          },
        ]),
        descriptionText: generateLexicalContent([
          {
            type: 'p',
            text: 'معرض بتمرير تلقائي مستمر يعرض الصور بشكل انسيابي. مثالي لجذب الانتباه وعرض مجموعة كبيرة من الصور. تمرير تلقائي مستمر لعرض الصور بشكل جذاب.',
            direction: 'rtl',
          },
        ]),
      },
    },

    // Gallery 04 - Interactive with Panels
    {
      blockType: 'galleryBlock',
      type: '04',
      interactiveGallery: [
        {
          image: media.image169?.id,
          panel: {
            title: 'حلول نقاط البيع المتقدمة',
            description:
              'اكتشف كيف تساعد أنظمة نقاط البيع الحديثة في تطوير الأعمال التجارية وتحسين تجربة العملاء من خلال واجهات سهلة الاستخدام وتقارير مفصلة.',
          },
        },
        {
          image: media.image43?.id,
          panel: {
            title: 'إدارة المخزون الذكية',
            description:
              'نظام إدارة المخزون المتكامل يوفر تتبعاً دقيقاً للمنتجات وتنبيهات ذكية للمخزون المنخفض، مما يساعد في تجنب النقص وتحسين كفاءة التشغيل.',
          },
        },
        {
          image: media.imageSquare?.id,
          panel: {
            title: 'تقارير الأعمال التفصيلية',
            description:
              'احصل على رؤى عميقة حول أداء متجرك من خلال تقارير شاملة تغطي المبيعات والأرباح وسلوك العملاء، مما يساعدك في اتخاذ قرارات مبنية على البيانات.',
          },
        },
      ].filter((item) => item.image),
      blockHeader: {
        type: 'center',
        badge: { type: 'label', label: 'Gallery 04' },
        headerText: generateLexicalContent([
          {
            type: 'h3',
            text: 'المعرض النوع الرابع - التفاعلي مع اللوحات',
            direction: 'rtl',
          },
        ]),
        descriptionText: generateLexicalContent([
          {
            type: 'p',
            text: 'معرض تفاعلي متقدم يعرض الصور مع لوحات معلومات منفصلة. كل صورة لها عنوان ووصف خاص بها. عرض الصور مع لوحات معلومات تفاعلية لكل صورة.',
            direction: 'rtl',
          },
        ]),
      },
    },

    // Usage Guidelines
    {
      blockType: 'richTextBlock',
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'إرشادات الاستخدام',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• النوع الأول: مناسب للمعارض الصغيرة (3-8 صور) مع التركيز على التفاصيل',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• النوع الثاني: مثالي للصور عالية الجودة التي تحتاج عرض كامل',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• النوع الثالث: أفضل للمعارض الكبيرة (8+ صور) لجذب الانتباه',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• النوع الرابع: مناسب عند الحاجة لشرح أو وصف كل صورة بالتفصيل',
          direction: 'rtl',
        },
      ]),
    },

    // Best Practices
    {
      blockType: 'richTextBlock',
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'أفضل الممارسات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'استخدم صوراً بجودة عالية ونسب أبعاد متسقة للحصول على أفضل النتائج. تأكد من أن الصور محسّنة للويب لضمان سرعة التحميل. في المعرض التفاعلي، اكتب عناوين ووصوف واضحة ومفيدة.',
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
        text: 'عرض توضيحي لبلوك المعرض',
        direction: 'rtl',
      },
      {
        type: 'p',
        text: 'اكتشف الطرق المختلفة والمتنوعة لعرض الصور والمحتوى المرئي باستخدام أنواع المعارض الأربعة المختلفة. من البطاقات التفاعلية إلى التمرير اللانهائي والمعارض التفاعلية المتقدمة.',
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
        } as any,
      },
    ],
  }

  const pageData: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'sizes'> = {
    title: 'Gallery Block Demo',
    slug: 'blocks-demo/gallery-block',
    hero: heroData,
    layout: galleryBlocks as any,
    meta: {
      title: 'Gallery Block Demo | Marn',
      description:
        'استكشف الطرق المختلفة لعرض الصور والمحتوى المرئي باستخدام أنواع المعارض الأربعة المختلفة في نظام إدارة المحتوى.',
    },
    _status: 'published',
  }

  return pageData as Page
}
