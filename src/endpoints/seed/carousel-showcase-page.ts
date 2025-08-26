import type {
  Page,
  CarouselBlock,
  Media,
  User,
} from '@/payload-types'
import { generateLexicalContent } from '@/utilities/generateLexicalContent'

// Helper to pick an icon
let iconIndex = 0
const sampleIcons = [
  'activity',
  'atom',
  'audio-lines',
  'archive',
  'airplay',
  'banknote',
  'book-check',
]
const getNextIcon = (): string => {
  const icon = sampleIcons[iconIndex % sampleIcons.length]
  iconIndex++
  return icon
}

export const seedCarouselShowcasePage = (media: {
  image169: Media | null
  image43: Media | null
  imageSquare: Media | null
}) => {
  const types: CarouselBlock['type'][] = ['01', '02', '03', '04', '05']

  const carouselBlocks: CarouselBlock[] = []

  const arabicFeatureTitles = [
    'إدارة المخزون بكفاءة',
    'تقارير مبيعات مفصلة',
    'واجهة سهلة الاستخدام',
    'دعم فني سريع ومتجاوب',
    'التكامل مع الأنظمة الأخرى',
    'أمان عالي للبيانات',
    'برامج ولاء العملاء',
    'الوصول السحابي للنظام',
  ]

  const arabicFeatureSubtitles = [
    'تابع مخزونك بدقة وتجنب النقص أو الفائض.',
    'احصل على رؤى قيمة حول أداء مبيعاتك لاتخاذ قرارات أفضل.',
    'تمتع بتجربة استخدام سلسة لا تتطلب تدريبًا معقدًا.',
    'فريق دعمنا جاهز لمساعدتك في أي وقت.',
    'اربط نظام نقاط البيع مع برامج المحاسبة والتوصيل بسهولة.',
    'نضمن حماية بيانات عملك وعملائك بأحدث تقنيات الأمان.',
    'عزز ولاء عملائك وقدم لهم مكافآت وعروض خاصة.',
    'أدر أعمالك من أي مكان وفي أي وقت عبر نظامنا السحابي.',
  ]

  for (const type of types) {
    const headerTitleText = `عرض شرائح (${type}) - ${arabicFeatureTitles[carouselBlocks.length % arabicFeatureTitles.length]}`
    const headerDescriptionText =
      arabicFeatureSubtitles[carouselBlocks.length % arabicFeatureSubtitles.length]

    const blockHeaderData: CarouselBlock['blockHeader'] = {
      type: 'center',
      badge: { type: 'label', label: `Carousel ${type}` },
      headerText: generateLexicalContent([
        { type: 'h2', text: headerTitleText, direction: 'rtl' },
        { type: 'p', text: headerDescriptionText, direction: 'rtl' },
      ]),
      links: [],
    }

    const block: Partial<CarouselBlock> = {
      blockType: 'carouselBlock',
      type: type,
      blockHeader: blockHeaderData,
      columns: [],
    }

    const numCols = 3 // Default number of columns for carousel items

    const currentBlockColumns: NonNullable<CarouselBlock['columns']> = []

    for (let i = 0; i < numCols; i++) {
      const colTitle =
        arabicFeatureTitles[(carouselBlocks.length * numCols + i) % arabicFeatureTitles.length]
      const colSubtitle =
        arabicFeatureSubtitles[
          (carouselBlocks.length * numCols + i) % arabicFeatureSubtitles.length
        ]

      // Initialize columnData with mandatory 'id'
      const columnData: Partial<NonNullable<CarouselBlock['columns']>[0]> = {
        id: `carousel-col-${type}-${i}`,
      }

      // Conditionally add 'tabLabel' for type 01 (Tabs)
      if (type === '01') {
        columnData.tabLabel = `تبويب ${i + 1}`
      }

      // Conditionally add 'image'
      columnData.image = media.image43?.id

      // Conditionally add 'icon'
      if (['01', '02', '04', '05'].includes(type)) {
        columnData.icon = getNextIcon()
      }

      // All variants use the 'content' group with title (text) and subtitle (richText)
      columnData.content = {
        title: colTitle,
        subtitle: generateLexicalContent([{ type: 'p', text: colSubtitle, direction: 'rtl' }]),
      }

      // Conditionally add 'enableBadge' and 'badge' for type 01 (Tabs)
      if (type === '01') {
        columnData.enableBadge = true
        columnData.badge = {
          label: `ميزة ${i + 1}`,
          type: 'label',
        }
      }

      // Conditionally add 'enableCta' and 'link'
      if (['01', '02', '03', '04'].includes(type)) {
        columnData.enableCta = true
        columnData.link = {
          type: 'custom',
          url: `/carousel-cta/${type}-${i}`,
          label: `إجراء ${i + 1}`,
          newTab: false,
        }
      }

      currentBlockColumns.push(columnData as NonNullable<CarouselBlock['columns']>[0])
    }
    block.columns = currentBlockColumns
    carouselBlocks.push(block as CarouselBlock)
  }

  const pageTitle = 'carousel-showcase' // Arabic Page Title
  const pageSlug = 'carousel-showcase' // Can keep slug in English or change

  const heroData: Page['hero'] = {
    type: 'hero01',
    richText: generateLexicalContent([
      { type: 'h2', text: 'عرض شرائح تفاعلي ومتطور', direction: 'rtl' },
      {
        type: 'p',
        text: 'اكتشف مجموعة متنوعة من تصميمات عرض الشرائح وكيف يمكنها عرض المحتوى بطريقة جذابة وتفاعلية. نقدم لك حلولاً متكاملة تناسب جميع احتياجاتك.',
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
          url: '/', // Link to Arabic homepage
          label: 'العودة إلى الرئيسية',
          newTab: false,
        },
      },
    ],
  }

  const showcasePageData: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'sizes'> & {
    author?: User | string
  } = {
    title: pageTitle,
    slug: pageSlug,

    hero: heroData,
    layout: carouselBlocks,

    meta: {
      title: `ميتا: ${pageTitle}`,
      description:
        'استكشف مجموعة متنوعة من تصميمات عرض الشرائح وكيف يمكنها عرض المحتوى بطريقة جذابة وتفاعلية باللغة العربية.',
    },
    _status: 'published',
  }

  return showcasePageData as Page
}
