import type { Page, DividerBlock, Media } from '@/payload-types'
import { generateLexicalContent, type TextElement } from '@/utilities/generateLexicalContent'

export const seedDividerBlockDemo = (media: {
  image169: Media | null
  image43: Media | null
  imageSquare: Media | null
}) => {
  const dividerBlocks = [
    // Rich Text for introduction
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'فواصل بحجم صغير (Small)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'هذا القسم يوضح كيفية استخدام الفواصل الصغيرة لإنشاء مساحات خفيفة بين المحتوى.',
          direction: 'rtl',
        },
      ]),
    },

    // Small divider with line
    {
      blockType: 'dividerBlock',
      size: 'small',
      enableDivider: true,
    },

    // Content after small divider
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'p',
          text: 'محتوى بعد الفاصل الصغير مع الخط. يمكنك ملاحظة المسافة الصغيرة والخط الفاصل.',
          direction: 'rtl',
        },
      ]),
    },

    // Small divider without line
    {
      blockType: 'dividerBlock',
      size: 'small',
      enableDivider: false,
    },

    // Content after small divider without line
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'فواصل بحجم متوسط (Medium)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'الفواصل المتوسطة توفر مساحة أكبر وتناسب الفصل بين أقسام المحتوى المهمة.',
          direction: 'rtl',
        },
      ]),
    },

    // Medium divider with line
    {
      blockType: 'dividerBlock',
      size: 'medium',
      enableDivider: true,
    },

    // Content after medium divider
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'p',
          text: 'محتوى بعد الفاصل المتوسط مع الخط. المسافة هنا أكبر من الصغير وتعطي راحة بصرية أكثر.',
          direction: 'rtl',
        },
      ]),
    },

    // Medium divider without line
    {
      blockType: 'dividerBlock',
      size: 'medium',
      enableDivider: false,
    },

    // Content after medium divider without line
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'فواصل بحجم كبير (Large)',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'الفواصل الكبيرة مثالية للفصل بين أقسام رئيسية مختلفة من المحتوى أو الصفحة.',
          direction: 'rtl',
        },
      ]),
    },

    // Large divider with line
    {
      blockType: 'dividerBlock',
      size: 'large',
      enableDivider: true,
    },

    // Content after large divider
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'p',
          text: 'محتوى بعد الفاصل الكبير مع الخط. يوفر هذا الفاصل أكبر مساحة وأوضح فصل بصري.',
          direction: 'rtl',
        },
      ]),
    },

    // Large divider without line
    {
      blockType: 'dividerBlock',
      size: 'large',
      enableDivider: false,
    },

    // Final content
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'الخلاصة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'استخدم الفواصل لتنظيم المحتوى وتحسين تجربة القراءة. اختر الحجم المناسب حسب أهمية الفصل وكمية المحتوى.',
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
        text: 'عرض توضيحي لبلوك الفواصل',
        direction: 'rtl',
      },
      {
        type: 'p',
        text: 'استكشف كيفية استخدام الفواصل لتنظيم وتقسيم المحتوى بطريقة جميلة ومرتبة.',
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
    title: 'Divider Block Demo',
    slug: 'blocks-demo/divider-block',
    hero: heroData,
    layout: dividerBlocks as any,
    meta: {
      title: 'Divider Block Demo | Marn',
      description: 'استكشف كيفية استخدام بلوك الفواصل لتنظيم وتقسيم المحتوى بطريقة جميلة ومرتبة.',
    },
    _status: 'published',
  }

  return pageData as Page
}
