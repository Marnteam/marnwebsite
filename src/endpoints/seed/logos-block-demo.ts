import type { Page, LogoBlock, Media } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedLogosBlockDemo = (media: { image169: Media | null; logos: Media[] }) => {
  if (media.logos.length < 24) {
    // To make the demo look good, we'll just repeat the logos we have
    while (media.logos.length < 24) {
      media.logos.push(...media.logos)
    }
    media.logos = media.logos.slice(0, 24)
  }

  const logosBlocks: LogoBlock[] = [
    // Variant 01 - Infinite Slider
    {
      blockType: 'logosBlock',
      type: '01',
      blockHeader: {
        type: 'center',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'يثق بنا أفضل الشركاء', direction: 'rtl' },
        ]),
      },
      logos: media.logos.slice(0, 12).map((logo) => logo.id),
    },
    // Variant 02 - Grid (12 Logos)
    {
      blockType: 'logosBlock',
      type: '02',
      blockHeader: {
        type: 'center',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'مجموعة منتقاة من شركاء النجاح', direction: 'rtl' },
        ]),
      },
      logos: media.logos.slice(12, 24).map((logo) => logo.id),
    },
    // Variant 03 - Grid (24 Logos)
    {
      blockType: 'logosBlock',
      type: '03',
      blockHeader: {
        type: 'center',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'شبكة واسعة من الداعمين', direction: 'rtl' },
        ]),
      },
      logos: media.logos.slice(0, 24).map((logo) => logo.id),
    },
  ]

  const heroData: Page['hero'] = {
    type: 'hero03',
    richText: generateLexicalContent([
      { type: 'h1', text: 'عرض توضيحي لبلوك الشعارات', direction: 'rtl' },
      {
        type: 'p',
        text: 'استكشف الطرق المختلفة لعرض شعارات الشركاء والعملاء.',
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
          url: '/blocks-demo',
          label: 'العودة لعرض البلوكات',
          newTab: false,
        } as any,
      },
    ],
  }

  const pageData: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'sizes'> = {
    title: 'Logos Block Demo',
    slug: 'blocks-demo/logos-block',
    hero: heroData,
    layout: logosBlocks as any,
    meta: {
      title: 'Logos Block Demo | Marn',
      description: 'عرض توضيحي لخيارات بلوك الشعارات.',
    },
    _status: 'published',
  }

  return pageData as Page
}
