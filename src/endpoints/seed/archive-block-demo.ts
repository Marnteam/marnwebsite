import type { Page, Media } from '@/payload-types'

// Helper to generate basic Lexical content
interface TextElement {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'p'
  text: string
  direction?: 'ltr' | 'rtl' | null | undefined
}

const generateLexicalContent = (elements: TextElement[]) => {
  return {
    root: {
      type: 'root',
      children: elements.map((element) => {
        if (element.type === 'p') {
          return {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: element.text,
                version: 1,
              },
            ],
            direction: element.direction || 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          }
        } else {
          return {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: element.text,
                version: 1,
              },
            ],
            direction: element.direction || 'ltr',
            format: '',
            indent: 0,
            tag: element.type,
            version: 1,
          }
        }
      }),
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  } as any
}

export const seedArchiveBlockDemo = (
  media: {
    image169: Media | null
    image43: Media | null
    imageSquare: Media | null
  },
  categories?: {
    sellCategory?: any
    operateCategory?: any
    manageCategory?: any
  },
) => {
  const archiveBlocks = [
    // Archive Block - Collection Mode
    {
      blockType: 'archiveBlock',
      populateBy: 'collection',
      relationTo: 'blog-posts',
      limit: 6,
      categories: categories
        ? [categories.sellCategory?.id, categories.operateCategory?.id].filter(Boolean)
        : [],
      introContent: generateLexicalContent([
        {
          type: 'h2',
          text: 'أحدث المقالات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'تصفح مجموعة من المقالات المتنوعة حول تقنيات نقاط البيع والأعمال التجارية.',
          direction: 'rtl',
        },
      ]),
    },
    // Archive Block - Selection Mode (will be populated by seed script)
    {
      blockType: 'archiveBlock',
      populateBy: 'selection',
      selectedDocs: [], // This will be populated in the main seed script
      introContent: generateLexicalContent([
        {
          type: 'h2',
          text: 'مقالات مختارة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'مجموعة مختارة من أفضل المقالات في مجال الأعمال والتكنولوجيا.',
          direction: 'rtl',
        },
      ]),
    },
    // Archive Block - Limited Collection
    {
      blockType: 'archiveBlock',
      populateBy: 'collection',
      relationTo: 'blog-posts',
      limit: 3,
      categories: categories ? [categories.manageCategory?.id].filter(Boolean) : [],
      introContent: generateLexicalContent([
        {
          type: 'h2',
          text: 'آخر المنشورات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'آخر 3 مقالات تم نشرها في المدونة.',
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
        text: 'عرض توضيحي لبلوك الأرشيف',
        direction: 'rtl',
      },
      {
        type: 'p',
        text: 'استكشف كيفية عرض المقالات والمحتوى باستخدام بلوك الأرشيف بطرق مختلفة - من العرض التلقائي للمجموعات إلى الاختيار اليدوي للمحتوى.',
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
    title: 'Archive Block Demo',
    slug: 'blocks-demo/archive-block',
    hero: heroData,
    layout: archiveBlocks as any,
    meta: {
      title: 'Archive Block Demo | Marn',
      description:
        'استكشف كيفية استخدام بلوك الأرشيف لعرض المقالات والمحتوى بطرق مختلفة في نظام إدارة المحتوى.',
    },
    _status: 'published',
  }

  return pageData as Page
}
