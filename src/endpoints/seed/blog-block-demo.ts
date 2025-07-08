import type { Page, Media } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedBlogBlockDemo = (
  media: {
    image169: Media | null
    image43: Media | null
    imageSquare: Media | null
  },
  blogPosts?: any[],
) => {
  const blogBlocks = [
    // Blog Block - Featured Post
    {
      blockType: 'blogBlock',
      type: 'featuredPost',
      featuredPost: blogPosts?.[0]?.id || null, // Will use latest post if no specific one provided
    },
    // Blog Block - 2 Columns
    {
      blockType: 'blogBlock',
      type: '2-columns',
      recentPostsList: {
        title: 'أحدث المقالات',
        description: 'اطلع على آخر المقالات والأخبار في عالم التجارة ونقاط البيع.',
        recentPosts: blogPosts?.slice(0, 4).map((post) => post.id) || [], // First 4 posts or empty array
      },
      editorsPicksList: {
        title: 'اختيارات المحررين',
        description: 'مقالات منتقاة بعناية من فريق التحرير لتقدم لك أفضل المحتوى.',
        editorsPicks: blogPosts?.slice(4, 8).map((post) => post.id) || [], // Next 4 posts or empty array
      },
    },
  ]

  const heroData: Page['hero'] = {
    type: 'hero03',
    richText: generateLexicalContent([
      {
        type: 'h1',
        text: 'عرض توضيحي لبلوك المدونة',
        direction: 'rtl',
      },
      {
        type: 'p',
        text: 'استكشف كيفية عرض المقالات والمحتوى التعليمي باستخدام بلوك المدونة - من المقالات المميزة إلى قوائم المحتوى المنظمة.',
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
    title: 'Blog Block Demo',
    slug: 'blocks-demo/blog-block',
    hero: heroData,
    layout: blogBlocks as any,
    meta: {
      title: 'Blog Block Demo | Marn',
      description:
        'استكشف كيفية استخدام بلوك المدونة لعرض المقالات والمحتوى التعليمي بطرق مختلفة ومنظمة.',
    },
    _status: 'published',
  }

  return pageData as Page
}
