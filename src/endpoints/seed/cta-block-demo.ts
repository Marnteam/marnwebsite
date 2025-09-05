import type { Page, Media } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedCTABlockDemo = (
  media: {
    image169: Media | null
    image43: Media | null
    imageSquare: Media | null
  },
  contactForm: any,
) => {
  const ctaBlocks = [
    // CTA 01 - Card (Split)
    {
      blockType: 'callToActionBlock',
      type: '01',
      badge: {
        type: 'label',
        label: 'جديد',
        color: 'blue',
      } as any,
      richText: generateLexicalContent([
        {
          type: 'h2',
          text: 'ابدأ رحلتك مع مرن اليوم',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'انضم إلى آلاف التجار الذين يستخدمون نظام مرن لإدارة أعمالهم بكفاءة أكبر وزيادة أرباحهم.',
          direction: 'rtl',
        },
      ]),
      links: [
        {
          link: {
            type: 'custom',
            url: '/contact-us',
            label: 'ابدأ الآن',
            newTab: false,
          } as any,
        },
        {
          link: {
            type: 'custom',
            url: '/pricing',
            label: 'عرض الأسعار',
            newTab: false,
          } as any,
        },
      ],
      media: {
        desktop: {
          light: media.image43?.id,
          dark: media.image43?.id,
        },
      },
    },
    // CTA 02 - Card (Centered)
    {
      blockType: 'callToActionBlock',
      type: '02',
      badge: {
        type: 'label',
        label: 'مميز',
        color: 'green',
      } as any,
      richText: generateLexicalContent([
        {
          type: 'h2',
          text: 'جرب مرن مجاناً لمدة 30 يوم',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'لا توجد رسوم إخفاء أو التزامات. جرب جميع ميزات النظام مجاناً.',
          direction: 'rtl',
        },
      ]),
      list: [
        {
          icon: 'material-symbols:check-circle-outline-rounded',
          title: 'مجاني تماماً',
          subtitle: 'لا توجد رسوم مخفية أو التزامات طويلة الأمد',
        },
        {
          icon: 'material-symbols:support-agent-rounded',
          title: 'دعم فني 24/7',
          subtitle: 'فريق الدعم متاح لمساعدتك في أي وقت',
        },
        {
          icon: 'material-symbols:rocket-launch-rounded',
          title: 'إعداد سريع',
          subtitle: 'ابدأ استخدام النظام في أقل من 10 دقائق',
        },
      ],
      links: [
        {
          link: {
            type: 'custom',
            url: '/free-trial',
            label: 'التجربة المجانية',
            newTab: false,
          } as any,
        },
      ],
      caption: 'بدون بطاقة ائتمانية',
    },
    // CTA 03 - Brief (Centered)
    {
      blockType: 'callToActionBlock',
      type: '03',
      richText: generateLexicalContent([
        {
          type: 'h3',
          text: 'هل تحتاج مساعدة؟',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'تواصل مع فريق الدعم الفني المتخصص لدينا.',
          direction: 'rtl',
        },
      ]),
      media: {
        desktop: {
          light: media.imageSquare?.id,
          dark: media.imageSquare?.id,
        },
      },
      links: [
        {
          link: {
            type: 'custom',
            url: '/support',
            label: 'تواصل معنا',
            newTab: false,
          } as any,
        },
      ],
      caption: 'متاح على مدار الساعة',
    },
    // CTA 04 - Banner
    {
      blockType: 'callToActionBlock',
      type: '04',
      badge: {
        type: 'label',
        label: 'عرض محدود',
        color: 'red',
      } as any,
      richText: generateLexicalContent([
        {
          type: 'h2',
          text: 'خصم 50% على جميع الباقات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'احصل على خصم 50% على جميع باقات مرن لفترة محدودة. سارع بالاشتراك الآن!',
          direction: 'rtl',
        },
      ]),
      links: [
        {
          link: {
            type: 'custom',
            url: '/pricing',
            label: 'احصل على الخصم',
            newTab: false,
          } as any,
        },
      ],
      media: {
        desktop: {
          light: media.image169?.id,
          dark: media.image169?.id,
        },
      },
    },
    // CTA 05 - Brief (Inverted Colors)
    {
      blockType: 'callToActionBlock',
      type: '05',
      richText: generateLexicalContent([
        {
          type: 'h3',
          text: 'انضم إلى نشرتنا الإخبارية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'احصل على آخر الأخبار والنصائح التجارية مباشرة في بريدك الإلكتروني.',
          direction: 'rtl',
        },
      ]),
      media: {
        desktop: {
          light: media.image43?.id,
          dark: media.image43?.id,
        },
      },
      links: [
        {
          link: {
            type: 'custom',
            url: '/newsletter',
            label: 'اشترك الآن',
            newTab: false,
          } as any,
        },
      ],
      caption: 'يمكنك إلغاء الاشتراك في أي وقت',
    },
    // CTA 06 - Form (Centered)
    {
      blockType: 'callToActionBlock',
      type: '06',
      richText: generateLexicalContent([
        {
          type: 'h2',
          text: 'احصل على استشارة مجانية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'تواصل معنا للحصول على استشارة مجانية حول كيفية تحسين أعمالك.',
          direction: 'rtl',
        },
      ]),
      form: contactForm,
      links: [],
    },
    // CTA 07 - Form (Card - Split)
    {
      blockType: 'callToActionBlock',
      type: '07',
      badge: {
        type: 'label',
        label: 'تواصل معنا',
        color: 'blue',
      } as any,
      richText: generateLexicalContent([
        {
          type: 'h2',
          text: 'تواصل معنا اليوم',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'فريقنا جاهز لمساعدتك في جميع استفساراتك.',
          direction: 'rtl',
        },
      ]),
      form: contactForm,
      media: {
        desktop: {
          light: media.image43?.id,
          dark: media.image43?.id,
        },
      },
      links: [],
    },
  ]

  const heroData: Page['hero'] = {
    type: 'hero03',
    richText: generateLexicalContent([
      {
        type: 'h1',
        text: 'عرض توضيحي لبلوك الدعوة للعمل',
        direction: 'rtl',
      },
      {
        type: 'p',
        text: 'استكشف جميع أنواع بلوكات الدعوة للعمل المختلفة - من البطاقات والبانرات إلى النماذج والتصاميم المتنوعة.',
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
    title: 'Call to Action Block Demo',
    slug: 'blocks-demo/cta-block',
    hero: heroData,
    layout: ctaBlocks as any,
    meta: {
      title: 'Call to Action Block Demo | Marn',
      description:
        'استكشف جميع أنواع بلوكات الدعوة للعمل - من البطاقات والبانرات إلى النماذج والتصاميم المتنوعة.',
    },
    _status: 'published',
  }

  return pageData as Page
}
