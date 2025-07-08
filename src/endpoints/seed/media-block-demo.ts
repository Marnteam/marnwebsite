import type { Page, MediaBlock, RichTextBlock, DividerBlock, Media } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedMediaBlockDemo = (media: {
  image169: Media | null
  image43: Media | null
  imageSquare: Media | null
}) => {
  const layout: Page['layout'] = []

  // Introduction
  layout.push({
    blockType: 'richTextBlock',
    blockHeader: {
      type: 'split',
    },
    type: '01',
    maxWidth: 'default',
    columns: 1,
    content: generateLexicalContent([
      {
        type: 'h2',
        text: 'صور بأبعاد مختلفة',
        direction: 'rtl',
      },
      {
        type: 'p',
        text: 'تعرف على كيفية عرض الصور بأبعاد وأحجام مختلفة باستخدام بلوك الوسائط.',
        direction: 'rtl',
      },
    ]),
  })

  // Wide Image (16:9 ratio)
  if (media.image169) {
    layout.push({
      blockType: 'mediaBlock',
      media: media.image169.id,
      size: 'default',
      caption: null,
    })
    layout.push({
      blockType: 'richTextBlock',
      blockHeader: {
        type: 'split',
      },
      type: '01',
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'p',
          text: 'الصورة أعلاه بنسبة عرض إلى ارتفاع 16:9، مثالية للمحتوى الأفقي والعروض التقديمية.',
          direction: 'rtl',
        },
      ]),
    })
  }

  layout.push({
    blockType: 'dividerBlock',
    size: 'medium',
    enableDivider: true,
  })

  // Square Image section
  if (media.imageSquare) {
    layout.push({
      blockType: 'richTextBlock',
      blockHeader: {
        type: 'split',
      },
      type: '01',
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'الصور المربعة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'الصور المربعة مناسبة للمحتوى المتوازن وصور المنتجات.',
          direction: 'rtl',
        },
      ]),
    })
    layout.push({
      blockType: 'mediaBlock',
      media: media.imageSquare.id,
      size: 'default',
      caption: null,
    })
    layout.push({
      blockType: 'richTextBlock',
      blockHeader: {
        type: 'split',
      },
      type: '01',
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'p',
          text: 'الصور المربعة تعطي توازناً بصرياً جميلاً وتناسب مختلف أنواع المحتوى.',
          direction: 'rtl',
        },
      ]),
    })
  }

  layout.push({
    blockType: 'dividerBlock',
    size: 'medium',
    enableDivider: true,
  })

  // Portrait Image section
  if (media.image43) {
    layout.push({
      blockType: 'richTextBlock',
      blockHeader: {
        type: 'split',
      },
      type: '01',
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'الصور الطولية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'الصور بنسبة 4:3 مناسبة للمحتوى العمودي والصور الشخصية.',
          direction: 'rtl',
        },
      ]),
    })
    layout.push({
      blockType: 'mediaBlock',
      media: media.image43.id,
      size: 'default',
      caption: null,
    })
    layout.push({
      blockType: 'richTextBlock',
      blockHeader: {
        type: 'split',
      },
      type: '01',
      maxWidth: 'default',
      columns: 1,
      content: generateLexicalContent([
        {
          type: 'p',
          text: 'الصور بنسبة 4:3 تقليدية وتعطي شعوراً بالاستقرار والثبات.',
          direction: 'rtl',
        },
      ]),
    })
  }

  const heroData: Page['hero'] = {
    type: 'hero03',
    richText: generateLexicalContent([
      {
        type: 'h1',
        text: 'Media Block Demo',
      },
      {
        type: 'p',
        text: 'This page demonstrates the various ways you can use the Media Block.',
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
    links: [],
  }

  const pageData: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'sizes'> = {
    title: 'Media Block Demo',
    slug: 'blocks-demo/media-block',
    hero: heroData,
    layout: layout,
    meta: {
      title: 'Media Block Demo | Marn',
      description: 'A page to demonstrate the features of the Media Block.',
    },
    _status: 'published',
  }

  return pageData
}
