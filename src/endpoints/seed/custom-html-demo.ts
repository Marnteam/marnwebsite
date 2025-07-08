import type { Page, Media } from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

export const seedCustomHtmlDemo = (media: {
  image169: Media | null
  image43: Media | null
  imageSquare: Media | null
}) => {
  const customHtmlBlocks = [
    // Introduction
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'إعلان ترحيبي مخصص',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'هذا المثال يوضح كيفية إنشاء إعلان ترحيبي جميل باستخدام HTML مخصص.',
          direction: 'rtl',
        },
      ]),
    },

    // Custom Welcome Banner
    {
      blockType: 'customHtmlBlock',
      blockHeader: {
        type: 'center',
      },
      htmlContent: `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 2rem; border-radius: 1rem; text-align: center; margin: 2rem 0; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <h2 style="font-size: 2.5rem; margin-bottom: 1rem; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            🎉 مرحباً بك في مرن
          </h2>
          <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9;">
            نظام نقاط البيع الأذكى والأبسط لمشروعك
          </p>
          <button style="background: white; color: #667eea; border: none; padding: 1rem 2rem; border-radius: 0.5rem; font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: transform 0.2s;">
            ابدأ تجربتك المجانية
          </button>
        </div>
      `,
    },

    // Description
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'جدول مقارنة الأسعار',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'يمكن استخدام HTML المخصص لإنشاء جداول مقارنة الأسعار والميزات بطريقة جذابة.',
          direction: 'rtl',
        },
      ]),
    },

    // Pricing Comparison Table
    {
      blockType: 'customHtmlBlock',
      blockHeader: {
        type: 'center',
      },
      htmlContent: `
        <div style="margin: 2rem 0;">
          <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 1rem; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
            <thead>
              <tr style="background: #f8fafc;">
                <th style="padding: 1.5rem; text-align: right; border-bottom: 2px solid #e2e8f0; font-weight: bold;">الباقة</th>
                <th style="padding: 1.5rem; text-align: center; border-bottom: 2px solid #e2e8f0; font-weight: bold;">السعر الشهري</th>
                <th style="padding: 1.5rem; text-align: center; border-bottom: 2px solid #e2e8f0; font-weight: bold;">عدد المستخدمين</th>
                <th style="padding: 1.5rem; text-align: center; border-bottom: 2px solid #e2e8f0; font-weight: bold;">الدعم</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 1.25rem; font-weight: bold;">📦 الأساسية</td>
                <td style="padding: 1.25rem; text-align: center;">299 ريال</td>
                <td style="padding: 1.25rem; text-align: center;">حتى 3</td>
                <td style="padding: 1.25rem; text-align: center;">إيميل</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                <td style="padding: 1.25rem; font-weight: bold;">🚀 المتقدمة</td>
                <td style="padding: 1.25rem; text-align: center;">599 ريال</td>
                <td style="padding: 1.25rem; text-align: center;">حتى 10</td>
                <td style="padding: 1.25rem; text-align: center;">هاتف + إيميل</td>
              </tr>
              <tr>
                <td style="padding: 1.25rem; font-weight: bold;">👑 الاحترافية</td>
                <td style="padding: 1.25rem; text-align: center;">999 ريال</td>
                <td style="padding: 1.25rem; text-align: center;">غير محدود</td>
                <td style="padding: 1.25rem; text-align: center;">دعم مخصص 24/7</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
    },

    // Description for Interactive Demo
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'عداد تفاعلي',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'يمكن أيضاً إضافة عناصر تفاعلية باستخدام JavaScript مع HTML المخصص.',
          direction: 'rtl',
        },
      ]),
    },

    // Interactive Counter
    {
      blockType: 'customHtmlBlock',
      blockHeader: {
        type: 'center',
      },
      htmlContent: `
        <div style="background: #f8fafc; padding: 3rem; border-radius: 1rem; text-align: center; margin: 2rem 0; border: 2px solid #e2e8f0;">
          <h3 style="color: #2d3748; margin-bottom: 1.5rem;">💰 حاسبة توفير التكاليف</h3>
          <div style="display: flex; gap: 1rem; justify-content: center; align-items: center; margin-bottom: 2rem; flex-wrap: wrap;">
            <button onclick="updateCounter(-1)" style="background: #e53e3e; color: white; border: none; padding: 1rem; border-radius: 0.5rem; font-size: 1.5rem; cursor: pointer; width: 50px; height: 50px;">-</button>
            <div style="background: white; padding: 1rem 2rem; border-radius: 0.5rem; border: 2px solid #e2e8f0; min-width: 120px;">
              <span id="counter" style="font-size: 2rem; font-weight: bold; color: #2d3748;">5</span>
              <div style="font-size: 0.9rem; color: #718096;">طرفية</div>
            </div>
            <button onclick="updateCounter(1)" style="background: #38a169; color: white; border: none; padding: 1rem; border-radius: 0.5rem; font-size: 1.5rem; cursor: pointer; width: 50px; height: 50px;">+</button>
          </div>
          <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; border: 2px solid #e2e8f0;">
            <div style="color: #718096; margin-bottom: 0.5rem;">توفيرك الشهري المتوقع:</div>
            <div id="savings" style="font-size: 2rem; font-weight: bold; color: #38a169;">1,500 ريال</div>
          </div>
          
          <script>
            let currentCount = 5;
            function updateCounter(change) {
              currentCount = Math.max(1, currentCount + change);
              document.getElementById('counter').textContent = currentCount;
              const savings = currentCount * 300;
              document.getElementById('savings').textContent = savings.toLocaleString('ar-SA') + ' ريال';
            }
          </script>
        </div>
      `,
    },

    // Description for Embedded Content
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'h2',
          text: 'محتوى مدمج',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'يمكن استخدام HTML المخصص لتضمين محتوى خارجي مثل الخرائط والفيديوهات.',
          direction: 'rtl',
        },
      ]),
    },

    // Embedded Map Placeholder
    {
      blockType: 'customHtmlBlock',
      blockHeader: {
        type: 'center',
      },
      htmlContent: `
        <div style="margin: 2rem 0;">
          <div style="background: #f7fafc; border: 2px dashed #cbd5e0; border-radius: 1rem; padding: 3rem; text-align: center; color: #4a5568;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🗺️</div>
            <h3 style="margin-bottom: 1rem; color: #2d3748;">موقع مكاتبنا</h3>
            <p style="margin-bottom: 2rem; color: #718096;">الرياض، المملكة العربية السعودية</p>
            <div style="background: white; border-radius: 0.5rem; padding: 1rem; border: 1px solid #e2e8f0; max-width: 400px; margin: 0 auto;">
              <strong>📍 العنوان:</strong><br>
              طريق الملك فهد، حي العليا<br>
              الرياض 12345، المملكة العربية السعودية
            </div>
          </div>
        </div>
      `,
    },

    // Final Note
    {
      blockType: 'richTextBlock',
      variant: 'standard',
      content: generateLexicalContent([
        {
          type: 'h3',
          text: 'ملاحظة مهمة',
          direction: 'rtl',
        },
        {
          type: 'p',
          text: 'استخدم HTML المخصص بحذر وتأكد من أمان الكود. يُنصح بمراجعة المحتوى قبل النشر.',
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
        text: 'عرض توضيحي لبلوك HTML المخصص',
        direction: 'rtl',
      },
      {
        type: 'p',
        text: 'استكشف إمكانيات HTML المخصص لإنشاء محتوى تفاعلي وجذاب يتجاوز قيود المحتوى التقليدي.',
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
    title: 'Custom HTML Block Demo',
    slug: 'blocks-demo/custom-html-block',
    hero: heroData,
    layout: customHtmlBlocks as any,
    meta: {
      title: 'Custom HTML Block Demo | Marn',
      description:
        'استكشف إمكانيات HTML المخصص لإنشاء محتوى تفاعلي وجذاب يتجاوز قيود المحتوى التقليدي.',
    },
    _status: 'published',
  }

  return pageData as Page
}
