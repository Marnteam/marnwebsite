import type { Payload } from 'payload'
import type {
  Page,
  FeaturesBlock,
  Media,
  User,
  // RichText, // Removed as it's not a direct export
  Solution,
  Integration,
  BlogPost,
} from '@/payload-types'

// Helper to generate basic Lexical content that matches RichText field type
// Now accepts an array of text elements with types (h2, p)
interface TextElement {
  type: 'h2' | 'h3' | 'h4' | 'p' // Add other heading levels or types if needed
  text: string
  direction?: 'ltr' | 'rtl' | null | undefined
}

const generateLexicalContent = (elements: TextElement[]): any => {
  const children = elements.map((element) => {
    const textNode = {
      detail: 0,
      format: 0,
      mode: 'normal',
      style: '',
      text: element.text,
      type: 'text',
      version: 1,
    }

    let nodeType = 'paragraph'
    let headingTag: string | undefined

    switch (element.type) {
      case 'h2':
        nodeType = 'heading'
        headingTag = 'h2'
        break
      case 'h3':
        nodeType = 'heading'
        headingTag = 'h3'
        break
      case 'h4':
        nodeType = 'heading'
        headingTag = 'h4'
        break
      case 'p':
      default:
        nodeType = 'paragraph'
        break
    }

    const paragraphNode: any = {
      children: [textNode],
      direction: element.direction || 'rtl', // Default to RTL, can be overridden
      format: '',
      indent: 0,
      type: nodeType,
      version: 1,
    }
    if (headingTag) {
      paragraphNode.tag = headingTag
    }
    return paragraphNode
  })

  return {
    root: {
      type: 'root',
      children,
      direction: elements[0]?.direction || 'rtl', // Default root direction to RTL or first element's direction
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

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

// More precise link type based on typical Payload structure
// This will likely need to be identical to the Link type used in payload-types.ts
// For now, using a structure that is common. If errors persist, this needs to match payload-types.ts Link exactly.
type CommonPayloadLink = {
  type?: ('reference' | 'custom') | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'blog-posts' | 'solutions' | 'integrations' // Add all valid relationTo targets
    value: string | string | Page | BlogPost | Solution | Integration // Or the actual related document type
  } | null
  url?: string | null
  label: string // Label is often required
  icon?: string | null
  appearance?: string | null // if your link field has appearance
  variant?: string | null // if your link field has variants
  color?: string | null // if your link field has colors
}

export const seedFeaturesShowcasePage = (media: {
  image169: Media | null
  image43: Media | null
  imageSquare: Media | null
}) => {
  // If any essential media is missing, consider returning null or a page without those media elements.
  // For this example, we'll proceed and rely on optional chaining for IDs.

  const types: FeaturesBlock['type'][] = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
  ]

  const featuresBlocks: FeaturesBlock[] = []

  const arabicFeatureTitles = [
    'إدارة المخزون بكفاءة',
    'تقارير مبيعات مفصلة',
    'واجهة سهلة الاستخدام',
    'دعم فني سريع ومتجاوب',
    'التكامل مع الأنظمة الأخرى',
    'أمان عالي للبيانات',
    'برامج ولاء العملاء',
    'الوصول السحابي للنظام',
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
    'تابع مخزونك بدقة وتجنب النقص أو الفائض.',
    'احصل على رؤى قيمة حول أداء مبيعاتك لاتخاذ قرارات أفضل.',
    'تمتع بتجربة استخدام سلسة لا تتطلب تدريبًا معقدًا.',
  ]

  const arabicFeatureLongSubtitlesFortype04 = [
    'تابع مخزونك بدقة وتجنب النقص أو الفائض. يوفر نظامنا تحديثات آنية لمستويات المخزون عبر جميع الفروع، مع تنبيهات ذكية للمنتجات منخفضة المخزون وإمكانية إجراء جرد شامل بسهولة فائقة، مما يمكنك من اتخاذ قرارات شراء مستنيرة وتحسين دورة رأس المال بشكل فعال.',
    'احصل على رؤى قيمة حول أداء مبيعاتك لاتخاذ قرارات أفضل. يقدم النظام لوحات معلومات تفاعلية وتقارير قابلة للتخصيص بالكامل، تغطي كل جانب من جوانب عمليات البيع، بما في ذلك أداء المنتجات، سلوك العملاء، وكفاءة الموظفين، مما يساعدك على تحديد الاتجاهات واستغلال الفرص الجديدة.',
    'تمتع بتجربة استخدام سلسة لا تتطلب تدريبًا معقدًا. تم تصميم واجهة المستخدم بعناية لتكون بديهية وسريعة الاستجابة، مما يقلل من وقت تدريب الموظفين الجدد ويزيد من كفاءتهم التشغيلية. يدعم النظام تخصيص الواجهة لتناسب احتياجات عملك الفريدة.',
    'فريق دعمنا الفني المتخصص جاهز لمساعدتك في أي وقت، على مدار الساعة. سواء كنت بحاجة إلى مساعدة في الإعداد الأولي، أو لديك استفسارات تشغيلية، أو واجهت تحديًا تقنيًا، يمكنك الاعتماد على خبرائنا لتقديم حلول سريعة وفعالة لضمان استمرارية أعمالك دون انقطاع.',
  ]

  const sizesFortype02: Array<NonNullable<FeaturesBlock['columns']>[0]['size']> = [
    'full',
    'half',
    'half',
    'oneThird',
    'twoThirds',
    'oneThird',
    'oneThird',
    'oneThird',
  ]

  for (const type of types) {
    const headerTitleText = `ميزات النظام (${type}) - ${arabicFeatureTitles[featuresBlocks.length % arabicFeatureTitles.length]}`
    const headerDescriptionText =
      arabicFeatureSubtitles[featuresBlocks.length % arabicFeatureSubtitles.length]

    const blockHeaderData: FeaturesBlock['blockHeader'] = {
      type: 'center',
      badge: { type: 'label', label: `Features ${type}` } as any,
      headerText: generateLexicalContent([
        { type: 'h2', text: headerTitleText, direction: 'rtl' },
        { type: 'p', text: headerDescriptionText, direction: 'rtl' },
      ]),
      links: [],
    }

    const block: Partial<FeaturesBlock> = {
      blockType: 'featuresBlock',
      type: type,
      blockHeader: blockHeaderData,
      blockImage: ['04', '06', '07'].includes(type) ? media.image169?.id : undefined,
      columns: [],
    }

    if (['14', '15', '16', '17'].includes(type)) {
      block.CTALabel = `اكتشف المزيد عن الميزة ${type}`
      block.link = {
        type: 'custom',
        url: `/learn-more/${type}`,
        label: `تفاصيل الميزة ${type}`,
        newTab: false,
      } as any
    }

    let numCols = 1
    if (type === '02') {
      numCols = sizesFortype02.length
    } else if (['01', '08', '09', '10', '11', '12', '13'].includes(type)) {
      numCols = 3
    } else if (type === '03') {
      numCols = 3
    } else if (type === '04') {
      numCols = 4
    } else if (type === '05') {
      numCols = 2
    } else if (['06', '07'].includes(type)) {
      numCols = 4
    } else if (['14', '15'].includes(type)) {
      numCols = 3
    } else if (['16', '17'].includes(type)) {
      numCols = 4
    }

    const currentBlockColumns: NonNullable<FeaturesBlock['columns']> = []

    for (let i = 0; i < numCols; i++) {
      const colTitle =
        arabicFeatureTitles[(featuresBlocks.length * numCols + i) % arabicFeatureTitles.length]
      const colSubtitle =
        type === '04'
          ? arabicFeatureLongSubtitlesFortype04[i % arabicFeatureLongSubtitlesFortype04.length]
          : arabicFeatureSubtitles[
              (featuresBlocks.length * numCols + i) % arabicFeatureSubtitles.length
            ]

      let columnSize: NonNullable<FeaturesBlock['columns']>[0]['size'] = undefined
      if (type === '02') {
        columnSize = sizesFortype02[i]
      } else if (type === '03') {
        if (i === 0) {
          columnSize = 'full'
        } else {
          columnSize = 'half'
        }
      } else if (type === '04') {
        columnSize = 'half'
      } else if (['01', '05'].includes(type)) {
        columnSize = 'half'
      }

      // Initialize columnData with mandatory 'id'
      const columnData: Partial<NonNullable<FeaturesBlock['columns']>[0]> = {
        id: `col-${type}-${i}`,
      }

      // Conditionally add 'size'
      if (columnSize !== undefined) {
        columnData.size = columnSize
      }

      // Conditionally add 'appReference' - Placeholder: No actual data to link yet from seed.
      // If appReference were to be seeded for type '01', it would be added here:
      // if (type === '01') {
      //   columnData.appReference = { relationTo: 'solutions', value: 'some-solution-id' };
      // }

      // Conditionally add 'image'
      if (
        ['01', '02', '03', '04', '05', '08', '09', '10', '11', '14', '15', '16', '17'].includes(
          type,
        )
      ) {
        columnData.image = media.image43?.id
      }

      // Conditionally add 'tabLabel'
      if (type === '08') {
        columnData.tabLabel = `تبويب ${i + 1}`
      }

      // Conditionally add 'icon'
      if (['06', '07', '09', '11', '12', '13'].includes(type)) {
        columnData.icon = getNextIcon()
      }

      // Conditionally add 'content' group (with title and subtitle)
      // This aligns with FeaturesBlock/config.ts: content group is active when NOT types 01, 03, 04, 05,
      if (!['01', '03', '04', '05'].includes(type)) {
        columnData.content = {
          title: colTitle,
          subtitle: colSubtitle,
        }
      }

      // Conditionally add 'richTextContent'
      // This aligns with FeaturesBlock/config.ts: richTextContent is active for types 01, 03, 04, 05, 11
      if (['01', '03', '04', '05', '11'].includes(type)) {
        columnData.richTextContent = generateLexicalContent([
          { type: 'h3', text: colTitle, direction: 'rtl' },
          { type: 'p', text: colSubtitle, direction: 'rtl' },
        ])
      }

      // Conditionally add 'enableBadge' and 'badge'
      const shouldEnableBadge = ['02', '03', '04', '05', '08'].includes(type)
      if (shouldEnableBadge) {
        columnData.enableBadge = true
        // Ensure the badge structure matches what your 'badge' field expects
        columnData.badge = {
          label: type === '02' ? `ميزات${type}` : `ميزة ${i + 1}`,
          type: 'label', // Assuming 'type' is part of your badge field structure
        } as any // Cast as 'any' or use the specific BadgeField type if available
      }

      // Conditionally add 'enableCta' and 'link'
      const shouldEnableCta = ['02', '03', '04', '05', '08'].includes(type)
      if (shouldEnableCta) {
        columnData.enableCta = true
        // Ensure the link structure matches your 'link' field expects
        columnData.link = {
          type: 'custom', // Assuming 'type' distinguishes between reference and custom URLs
          url: `/column-cta/${type}-${i}`,
          label: `إجراء ${i + 1}`,
          newTab: false,
        } as any // Cast as 'any' or use the specific LinkField type if available
      }

      // Conditionally add 'reverseOrder'
      if (type === '04' && i % 2 !== 0) {
        columnData.reverseOrder = true
      }

      currentBlockColumns.push(columnData as NonNullable<FeaturesBlock['columns']>[0])
    }
    block.columns = currentBlockColumns
    featuresBlocks.push(block as FeaturesBlock)
  }

  const pageTitle = 'features' // Arabic Page Title
  const pageSlug = 'features' // Can keep slug in English or change

  const heroData: Page['hero'] = {
    type: 'hero01',
    // title: 'نظام نقاط بيع حديث ومرن لمشروعك', // Arabic Hero Title
    richText: generateLexicalContent([
      { type: 'h2', text: 'نظام نقاط بيع حديث ومرن لمشروعك', direction: 'rtl' },
      {
        type: 'p',
        text: 'اكتشف كيف يمكن لنظام نقاط البيع المتطور لدينا أن يساعدك في إدارة أعمالك بكفاءة وزيادة أرباحك. نقدم لك حلولاً متكاملة تناسب جميع احتياجاتك.',
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
        } as any,
        id: 'hero-link-1-ar',
      },
    ],
  }

  const showcasePageData: Omit<Page, 'id' | 'updatedAt' | 'createdAt' | 'sizes'> & {
    author?: User | string
  } = {
    title: pageTitle,
    slug: pageSlug,

    hero: heroData,
    layout: featuresBlocks,

    // breadcrumbs: [{ label: pageTitle, url: `/${pageSlug}`, id: `bc-ar-${pageSlug}` }], // Arabic breadcrumb
    meta: {
      title: `ميتا: ${pageTitle}`,
      description:
        'استكشف مجموعة متنوعة من تصميمات بلوكات الميزات وكيف يمكنها عرض خصائص نظام نقاط البيع بفعالية باللغة العربية.',
    },
    _status: 'published',
  }

  return showcasePageData as Page
}
