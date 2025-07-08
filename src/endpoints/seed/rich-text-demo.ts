import type { Page, RichTextBlock, Media } from '@/payload-types'
import { generateLexicalContent, type TextElement } from '@/utilities/generateLexicalContent'

export const seedRichTextDemo = (media: {
  image169: Media | null
  image43: Media | null
  imageSquare: Media | null
}) => {
  const richTextBlocks = [
    // Introduction
    {
      blockType: 'richTextBlock',
      type: '01', // Standard variant
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'النمط الأساسي (Standard)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'هذا النمط الأساسي للنص المنسق يوفر عرضاً نظيفاً وبسيطاً للمحتوى النصي. يمكن استخدامه للمقالات، الوصف، وأي محتوى نصي عام.',
          direction: 'rtl',
        },
      ]),
    },

    // Standard with Small Width
    {
      blockType: 'richTextBlock',
      type: '01',
      maxWidth: 'small',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'عرض صغير (Small Width)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'هذا المحتوى معروض بعرض صغير، مناسب للاقتباسات والنصوص المهمة التي تحتاج تركيز أكبر.',
          direction: 'rtl',
        },
      ]),
    },

    // Standard with Large Width
    {
      blockType: 'richTextBlock',
      type: '01',
      maxWidth: 'large',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'عرض كبير (Large Width)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'العرض الكبير مناسب للمحتوى الذي يحتاج مساحة أكبر للعرض، مثل المقالات الطويلة والمحتوى التفصيلي. يعطي شعوراً بالاتساع والراحة في القراءة.',
          direction: 'rtl',
        },
      ]),
    },

    // Divider
    {
      blockType: 'dividerBlock',
      size: 'medium',
      enableDivider: true,
    },

    // Two Columns Example
    {
      blockType: 'richTextBlock',
      type: '01',
      maxWidth: 'default',
      columns: 2,
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'تقسيم النص لعمودين',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'يمكن تقسيم النص الطويل إلى عمودين لتحسين القراءة والاستفادة من المساحة المتاحة. هذا النمط مفيد للمقالات الطويلة والمحتوى التعليمي الذي يحتاج تنظيماً أفضل.',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'التقسيم لعمودين يعطي تجربة قراءة شبيهة بالمجلات والصحف، مما يجعل المحتوى أسهل للقراءة وأكثر جاذبية بصرياً. كما يساعد في استغلال المساحة الأفقية بشكل أمثل.',
          direction: 'rtl',
        },
      ]),
    },

    // Divider
    {
      blockType: 'dividerBlock',
      size: 'large',
      enableDivider: true,
    },

    // Card Variant Introduction
    {
      blockType: 'richTextBlock',
      type: '02', // Card variant
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'نمط البطاقة (Card)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'نمط البطاقة يعطي المحتوى خلفية مميزة وحدود مدورة، مما يجعله يبرز عن باقي المحتوى ويعطي شعوراً بالأهمية والتميز.',
          direction: 'rtl',
        },
      ]),
    },

    // Card with Small Width
    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'small',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h4',
          text: '💡 نصيحة مهمة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'استخدم نمط البطاقة للمحتوى المهم الذي تريد لفت الانتباه إليه، مثل النصائح والتحذيرات والاقتباسات المميزة.',
          direction: 'rtl',
        },
      ]),
    },

    // Card with Two Columns
    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'default',
      columns: 2,
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'بطاقة بعمودين',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'يمكن دمج نمط البطاقة مع التقسيم لعدة أعمدة للحصول على تصميم جذاب ومنظم. هذا النمط مناسب للمقارنات والقوائم والمحتوى التفاعلي.',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'الجمع بين البطاقة والأعمدة يعطي تجربة بصرية غنية ومنظمة، مما يساعد في تقديم المعلومات بطريقة واضحة وجذابة للقارئ.',
          direction: 'rtl',
        },
      ]),
    },

    // Card with Three Columns
    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'large',
      columns: 3,
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'ثلاثة أعمدة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'يمكن تقسيم المحتوى إلى ثلاثة أعمدة للاستفادة القصوى من المساحة المتاحة. هذا النمط مفيد للقوائم الطويلة والمحتوى الذي يحتاج تنظيماً مكثفاً.',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'التقسيم لثلاثة أعمدة يناسب الشاشات الكبيرة ويعطي كثافة معلومات عالية مع الحفاظ على وضوح القراءة وسهولة التنقل بين الأقسام.',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'استخدم هذا النمط بحذر وتأكد من أن المحتوى مناسب للتقسيم وأن النتيجة النهائية سهلة القراءة على جميع الأجهزة.',
          direction: 'rtl',
        },
      ]),
    },

    // Full Width Example
    {
      blockType: 'richTextBlock',
      type: '01',
      maxWidth: 'full',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'العرض الكامل (Full Width)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'العرض الكامل يستفيد من كامل عرض الشاشة، مما يجعله مناسباً للمحتوى الذي يحتاج مساحة كبيرة أو للتأثيرات البصرية الخاصة. استخدمه بحذر لضمان سهولة القراءة.',
          direction: 'rtl',
        },
      ]),
    },

    // Best Practices
    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'أفضل الممارسات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• استخدم النمط الأساسي للمحتوى العادي والمقالات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• استخدم نمط البطاقة للمحتوى المهم والمميز',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• اختر عدد الأعمدة حسب طول المحتوى وحجم الشاشة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• جرب العروض المختلفة لتجد المناسب لمحتواك',
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
        text: 'عرض توضيحي لبلوك النص المنسق',
        direction: 'rtl',
      },
      {
        type: 'p',
        text: 'استكشف إمكانيات تنسيق النصوص مع الأنماط المختلفة، العروض المتنوعة، وتقسيم الأعمدة.',
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
    title: 'Rich Text Block Demo',
    slug: 'blocks-demo/rich-text-block',
    hero: heroData,
    layout: richTextBlocks as any,
    meta: {
      title: 'Rich Text Block Demo | Marn',
      description:
        'استكشف إمكانيات تنسيق النصوص مع الأنماط المختلفة، العروض المتنوعة، وتقسيم الأعمدة.',
    },
    _status: 'published',
  }

  return pageData as Page
}
