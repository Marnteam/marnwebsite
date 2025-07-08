import type { Page, TestimonialsBlock, Media, Customer } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedTestimonialsBlockDemo = (
  media: {
    image169: Media | null
  },
  customers: Customer[],
) => {
  if (customers.length < 4) {
    throw new Error('Not enough customers to seed testimonials block demo.')
  }

  const testimonialsBlocks: TestimonialsBlock[] = [
    // Variant 02 - Featured Testimonial
    {
      blockType: 'testimonialsBlock',
      type: '02',
      blockHeader: {
        type: 'center',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'شركاء النجاح يروون قصتهم', direction: 'rtl' },
          {
            type: 'p',
            text: 'نحن لا نبني منصة فحسب، بل نبني شراكات. استمع لما يقوله عملاؤنا عن تجربتهم مع مارن.',
            direction: 'rtl',
          },
        ]),
      },
      selectedTestimonials: [customers[0].id],
    },
    // Variant 03 - Carousel
    {
      blockType: 'testimonialsBlock',
      type: '03',
      blockHeader: {
        type: 'start',
        headerText: generateLexicalContent([
          { type: 'h2', text: 'آراء من مجتمعنا', direction: 'rtl' },
        ]),
      },
      selectedTestimonials: customers.slice(1, 4).map((c) => c.id),
    },
  ]

  const heroData: Page['hero'] = {
    type: 'hero03',
    richText: generateLexicalContent([
      { type: 'h1', text: 'عرض توضيحي لبلوك آراء العملاء', direction: 'rtl' },
      {
        type: 'p',
        text: 'استكشف الطرق المختلفة لعرض شهادات العملاء وآرائهم.',
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
    title: 'Testimonials Block Demo',
    slug: 'blocks-demo/testimonials-block',
    hero: heroData,
    layout: testimonialsBlocks as any,
    meta: {
      title: 'Testimonials Block Demo | Marn',
      description: 'عرض توضيحي لخيارات بلوك آراء العملاء.',
    },
    _status: 'published',
  }

  return pageData as Page
}
