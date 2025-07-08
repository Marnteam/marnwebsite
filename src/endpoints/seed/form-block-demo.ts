import type { Page, FormBlock, Media, Form } from '@/payload-types'
import { generateLexicalContent, type TextElement } from '@/utilities/generateLexicalContent'

export const seedFormBlockDemo = (
  media: {
    image169: Media | null
    image43: Media | null
    imageSquare: Media | null
  },
  contactForm: Form,
) => {
  const formBlocks = [
    // Introduction
    {
      blockType: 'richTextBlock',
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'عرض توضيحي لبلوك النماذج',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'استكشف إمكانيات بناء النماذج التفاعلية والمتقدمة. يوفر نظام النماذج مجموعة شاملة من أنواع الحقول والخيارات لتلبية احتياجاتك المختلفة.',
          direction: 'rtl',
        },
      ]),
    },

    // Contact Form with Intro
    {
      blockType: 'richTextBlock',
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'نموذج التواصل - مثال عملي',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'نموذج تواصل شامل يتضمن أهم الحقول المطلوبة للتواصل مع العملاء. يمكنك تخصيص الحقول وإضافة المزيد حسب احتياجاتك.',
          direction: 'rtl',
        },
      ]),
    },
    {
      blockType: 'formBlock',
      form: contactForm.id,
      enableIntro: true,
      introContent: generateLexicalContent([
        {
          type: 'h3',
          text: 'تواصل معنا',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'نحن هنا لمساعدتك! املأ النموذج أدناه وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن. جميع الحقول المطلوبة محددة بعلامة نجمة.',
          direction: 'rtl',
        },
      ]),
    },

    // Available Field Types
    {
      blockType: 'richTextBlock',
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'أنواع الحقول المتاحة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'يدعم نظام النماذج مجموعة واسعة من أنواع الحقول لتلبية احتياجاتك المختلفة:',
          direction: 'rtl',
        },
      ]),
    },

    // Field Types Grid
    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'default',
      columns: 2,
      content: generateLexicalContent([
        {
          type: 'h4',
          text: 'حقول النص والبيانات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• حقل النص - لإدخال النصوص القصيرة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• حقل البريد الإلكتروني - مع التحقق التلقائي',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• حقل الرقم/الهاتف - لأرقام الهواتف مع كود الدولة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• منطقة النص - للنصوص الطويلة والرسائل',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• حقل الرسالة - لعرض نصوص تفسيرية',
          direction: 'rtl',
        },
      ]),
    },

    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'default',
      columns: 2,
      content: generateLexicalContent([
        {
          type: 'h4',
          text: 'حقول الخيارات والتحديد',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• حقل التحديد - قائمة منسدلة بخيارات مخصصة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• حقل الدولة - قائمة شاملة بجميع الدول',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• حقل الولاية - للولايات الأمريكية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• مربع الاختيار - للموافقة والخيارات الثنائية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• عرض العرض - للتحكم في عرض الحقول',
          direction: 'rtl',
        },
      ]),
    },

    // Form Features
    {
      blockType: 'richTextBlock',
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'ميزات النماذج المتقدمة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'يوفر نظام النماذج ميزات متقدمة لتجربة مستخدم مثلى:',
          direction: 'rtl',
        },
      ]),
    },

    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'default',
      columns: 3,
      content: generateLexicalContent([
        {
          type: 'h4',
          text: '✅ التحقق والتصديق',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• تحقق تلقائي من صحة البيانات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• رسائل أخطاء واضحة ومفيدة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• حقول مطلوبة واختيارية',
          direction: 'rtl',
        },
      ]),
    },

    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'default',
      columns: 3,
      content: generateLexicalContent([
        {
          type: 'h4',
          text: '📧 إدارة الإشعارات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• إرسال إشعارات بريد إلكتروني تلقائية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• قوالب رسائل قابلة للتخصيص',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• إشعارات للمشرفين والمستخدمين',
          direction: 'rtl',
        },
      ]),
    },

    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'default',
      columns: 3,
      content: generateLexicalContent([
        {
          type: 'h4',
          text: '⚙️ إعدادات متقدمة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• صفحات شكر أو إعادة توجيه',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• حفظ البيانات في قاعدة البيانات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• إعدادات مرونة في التصميم',
          direction: 'rtl',
        },
      ]),
    },

    // Usage Examples
    {
      blockType: 'richTextBlock',
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'أمثلة الاستخدام',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'يمكن استخدام النماذج في مختلف السيناريوهات:',
          direction: 'rtl',
        },
      ]),
    },

    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'default',
      columns: 2,
      content: generateLexicalContent([
        {
          type: 'h4',
          text: 'نماذج التواصل والدعم',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• نماذج التواصل العام',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• طلبات الدعم الفني',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• استفسارات المبيعات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• تقييمات العملاء',
          direction: 'rtl',
        },
      ]),
    },

    {
      blockType: 'richTextBlock',
      type: '02',
      maxWidth: 'default',
      columns: 2,
      content: generateLexicalContent([
        {
          type: 'h4',
          text: 'نماذج التسجيل والحجز',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• تسجيل العضويات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• حجز المواعيد والاستشارات',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• طلبات عروض الأسعار',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• التسجيل في الفعاليات',
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
          text: '• اجعل النماذج بسيطة ومباشرة - اطلب فقط المعلومات الضرورية',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• استخدم تسميات واضحة وشرح مفصل للحقول المعقدة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• وضع الحقول المطلوبة في المقدمة وتجميع الحقول ذات الصلة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• اختبر النماذج على أجهزة مختلفة للتأكد من سهولة الاستخدام',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: '• قدم رسائل شكر واضحة وحدد الخطوات التالية للمستخدم',
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
        text: 'عرض توضيحي لبلوك النماذج',
        direction: 'rtl',
      },
      {
        type: 'p',
        text: 'اكتشف قوة نظام النماذج المدمج وكيفية بناء نماذج تفاعلية ومتقدمة لجمع البيانات والتواصل مع العملاء. من النماذج البسيطة إلى الأنظمة المعقدة مع التحقق والإشعارات التلقائية.',
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
      {
        link: {
          type: 'custom',
          url: '/contact',
          label: 'عرض صفحة التواصل',
          newTab: false,
        } as any,
      },
    ],
  }

  const pageData: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'sizes'> = {
    title: 'Form Block Demo',
    slug: 'blocks-demo/form-block',
    hero: heroData,
    layout: formBlocks as any,
    meta: {
      title: 'Form Block Demo | Marn',
      description:
        'اكتشف قوة نظام النماذج المدمج وكيفية بناء نماذج تفاعلية ومتقدمة لجمع البيانات والتواصل مع العملاء.',
    },
    _status: 'published',
  }

  return pageData as Page
}
