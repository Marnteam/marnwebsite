import type { Payload, PayloadRequest } from 'payload'
import type { Media, User, Category, BlogPost } from '@/payload-types'
import { formatSlug } from '@/hooks/formatSlug'

export type BlogPostsSeedArgs = {
  heroImages: Media[]
  blockImage: Media
  author: User | null
  blogCategory: Category
}

// Helper function to create properly typed Lexical content
const createLexicalContent = (
  title: string,
  subtitle: string,
  content: string,
  blockImageId: string,
) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: title,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '',
        indent: 0,
        tag: 'h2',
        version: 1,
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: content,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '',
        indent: 0,
        textFormat: 0,
        version: 1,
      },
      {
        type: 'heading',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: subtitle,
            version: 1,
          },
        ],
        direction: 'ltr' as const,
        format: '',
        indent: 0,
        tag: 'h3',
        version: 1,
      },
      {
        type: 'block',
        fields: {
          blockType: 'mediaBlock',
          media: blockImageId,
        },
        format: '',
        version: 2,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

export const seedBlogPosts = async (
  payload: Payload,
  req: PayloadRequest,
  args: BlogPostsSeedArgs,
): Promise<void> => {
  const { heroImages, blockImage, author: providedAuthor, blogCategory } = args

  // Create or use provided author
  let author = providedAuthor
  if (!author) {
    author = await payload.create({
      collection: 'users',
      data: {
        name: 'مؤلف المقالات',
        email: 'blog-author@marn.sa',
        password: 'temp-password-123',
      },
      req,
    })
  }

  // Fetch integration categories
  const integrationCategories = await payload.find({
    collection: 'categories',
    where: {
      slug: {
        in: [
          'payment-gateways',
          'delivery-platforms',
          'accounting-software',
          'inventory-management',
          'loyalty-programs',
          'ecommerce-platforms',
          'marketing-tools',
          'staff-management',
        ],
      },
    },
  })
  const integrationCategoriesMap = integrationCategories.docs.reduce(
    (acc, category) => {
      acc[category?.slug ?? ''] = category
      return acc
    },
    {} as Record<string, Category>,
  )

  const categories = integrationCategoriesMap
  const categoryKeys = Object.keys(categories)

  // Helper function to get random categories
  const getRandomCategories = () => {
    const numCategories = Math.random() < 0.6 ? 1 : 2 // 60% chance for 1 category, 40% for 2
    const shuffled = categoryKeys.sort(() => 0.5 - Math.random())
    return shuffled
      .slice(0, numCategories)
      .map((key) => categories[key]?.id)
      .filter(Boolean)
  }

  // Blog Post 1: About Restaurant Technology
  const post1Data = {
    title: {
      ar: 'كيف تطور التكنولوجيا من مطعمك وتزيد أرباحك',
      en: 'How Technology Can Transform Your Restaurant and Boost Profits',
    },
    slug: formatSlug('كيف تطور التكنولوجيا من مطعمك وتزيد أرباحك'),
    heroImage: heroImages[0]?.id,
    _status: 'published' as const,
    authors: [author.id],
    categories: getRandomCategories(),
    meta: {
      title: {
        ar: 'كيف تطور التكنولوجيا من مطعمك وتزيد أرباحك',
        en: 'How Technology Can Transform Your Restaurant and Boost Profits',
      },
      description: {
        ar: 'اكتشف كيف يمكن للتكنولوجيا الحديثة أن تساعد مطعمك على زيادة الكفاءة وتحسين تجربة العملاء ومضاعفة الأرباح.',
        en: 'Discover how modern technology can help your restaurant increase efficiency, improve customer experience, and multiply profits.',
      },
    },
    content: {
      ar: createLexicalContent(
        'ثورة التكنولوجيا في صناعة المطاعم تغير قواعد اللعبة',
        'أنظمة نقاط البيع الذكية: قلب مطعمك النابض',
        'في عالم يتطور بسرعة البرق، لم تعد المطاعم مجرد أماكن لتقديم الطعام، بل أصبحت مراكز تقنية متطورة تعتمد على التكنولوجيا لتحسين كل جانب من جوانب العمل. من أنظمة نقاط البيع الذكية إلى تطبيقات الطلب والدفع الرقمي، تساعد التكنولوجيا أصحاب المطاعم على تقديم تجربة استثنائية للعملاء وزيادة الأرباح بشكل كبير.',
        blockImage.id,
      ),
      en: createLexicalContent(
        'The Technology Revolution in the Restaurant Industry is Changing the Game',
        'Smart Point-of-Sale Systems: The Beating Heart of Your Restaurant',
        'In a rapidly evolving world, restaurants are no longer just places to serve food, but have become advanced technology centers that rely on technology to improve every aspect of the business. From smart point-of-sale systems to ordering and digital payment apps, technology helps restaurant owners provide exceptional customer experiences and significantly increase profits.',
        blockImage.id,
      ),
    },
    publishedAt: new Date().toISOString(),
  }

  // Blog Post 2: About Retail Technology
  const post2Data = {
    title: {
      ar: 'مستقبل البيع بالتجزئة: كيف تحول التكنولوجيا متجرك إلى قوة بيعية',
      en: 'The Future of Retail: How Technology Transforms Your Store into a Sales Powerhouse',
    },
    slug: formatSlug('مستقبل البيع بالتجزئة: كيف تحول التكنولوجيا متجرك إلى قوة بيعية'),
    heroImage: heroImages[1]?.id,
    _status: 'published' as const,
    authors: [author.id],
    categories: getRandomCategories(),
    meta: {
      title: {
        ar: 'مستقبل البيع بالتجزئة: كيف تحول التكنولوجيا متجرك إلى قوة بيعية',
        en: 'The Future of Retail: How Technology Transforms Your Store into a Sales Powerhouse',
      },
      description: {
        ar: 'تعرف على أحدث تقنيات البيع بالتجزئة وكيف يمكنها أن تحول متجرك التقليدي إلى تجربة تسوق متطورة وممتعة.',
        en: 'Learn about the latest retail technologies and how they can transform your traditional store into an advanced and enjoyable shopping experience.',
      },
    },
    content: {
      ar: createLexicalContent(
        'تجربة التسوق الرقمية: عندما يلتقي التقليدي بالحديث',
        'إدارة المخزون الذكية: لا مزيد من النقص أو الفائض',
        'البيع بالتجزئة يشهد تحولاً جذرياً في العقد الأخير. لم تعد المتاجر مجرد أماكن لعرض البضائع، بل أصبحت مساحات تفاعلية تدمج التكنولوجيا الرقمية مع التجربة الفيزيائية لتقديم تجربة تسوق فريدة ومخصصة لكل عميل.',
        blockImage.id,
      ),
      en: createLexicalContent(
        'The Digital Shopping Experience: When Traditional Meets Modern',
        'Smart Inventory Management: No More Shortages or Surplus',
        'Retail has undergone a radical transformation in the last decade. Stores are no longer just places to display goods, but have become interactive spaces that integrate digital technology with the physical experience to provide a unique and personalized shopping experience for each customer.',
        blockImage.id,
      ),
    },
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  }

  // Blog Post 3: About Business Growth
  const post3Data = {
    title: {
      ar: 'استراتيجيات نمو الأعمال في العصر الرقمي',
      en: 'Business Growth Strategies in the Digital Age',
    },
    slug: formatSlug('استراتيجيات نمو الأعمال في العصر الرقمي'),
    heroImage: heroImages[2]?.id || heroImages[0]?.id,
    _status: 'published' as const,
    authors: [author.id],
    categories: getRandomCategories(),
    meta: {
      title: {
        ar: 'استراتيجيات نمو الأعمال في العصر الرقمي',
        en: 'Business Growth Strategies in the Digital Age',
      },
      description: {
        ar: 'تعلم كيفية استخدام الأدوات الرقمية والبيانات لتطوير استراتيجيات نمو فعالة تضمن نجاح مشروعك.',
        en: 'Learn how to use digital tools and data to develop effective growth strategies that ensure your business success.',
      },
    },
    content: {
      ar: createLexicalContent(
        'البيانات: الثروة الجديدة للأعمال الحديثة',
        'التحول الرقمي: ليس مجرد موضة، بل ضرورة',
        'في عالم الأعمال اليوم، البيانات هي الذهب الجديد. الشركات التي تتقن فن جمع وتحليل البيانات تتمكن من اتخاذ قرارات مدروسة تقودها إلى النمو والنجاح. من فهم سلوك العملاء إلى تحسين العمليات التشغيلية، البيانات تفتح أبواباً لا محدودة من الفرص.',
        blockImage.id,
      ),
      en: createLexicalContent(
        'Data: The New Wealth of Modern Business',
        'Digital Transformation: Not Just a Trend, But a Necessity',
        "In today's business world, data is the new gold. Companies that master the art of collecting and analyzing data can make informed decisions that lead them to growth and success. From understanding customer behavior to improving operational processes, data opens unlimited doors of opportunity.",
        blockImage.id,
      ),
    },
    publishedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
  }

  const additionalPosts = [
    // Post 4
    {
      title: {
        ar: 'التسويق الرقمي لمطعمك: دليلك لجذب المزيد من الزبائن',
        en: 'Digital Marketing for Your Restaurant: Your Guide to Attracting More Customers',
      },
      content: {
        title: 'استراتيجيات التسويق الرقمي التي لا يمكنك تجاهلها',
        subtitle: 'وسائل التواصل الاجتماعي: كيف تحكي قصة مطعمك',
        body: 'في عالم اليوم، لم يعد يكفي أن يكون لديك طعام رائع. تحتاج إلى الوصول إلى عملائك حيثما كانوا، وهذا يعني عبر الإنترنت. تعلم كيفية استخدام وسائل التواصل الاجتماعي، والتسويق عبر البريد الإلكتروني، والإعلانات المستهدفة لبناء علامتك التجارية وزيادة المبيعات.',
      },
      daysAgo: 3,
    },
    // Post 5
    {
      title: {
        ar: 'أتمتة العمليات في متجرك: توفير الوقت والمال',
        en: 'Automating Your Retail Operations: Saving Time and Money',
      },
      content: {
        title: 'من المهام اليدوية إلى العمليات الآلية',
        subtitle: 'لماذا تعتبر الأتمتة استثمارًا ذكيًا؟',
        body: 'الأتمتة ليست فقط للشركات الكبيرة. يمكن للشركات الصغيرة والمتوسطة أيضًا الاستفادة بشكل كبير من أتمتة المهام المتكررة مثل إدارة المخزون، ومعالجة الطلبات، وخدمة العملاء. اكتشف الأدوات التي يمكن أن تساعدك على البدء.',
      },
      daysAgo: 4,
    },
    // Post 6
    {
      title: {
        ar: 'ولاء العملاء: كيف تحول العميل العابر إلى سفير لعلامتك التجارية',
        en: 'Customer Loyalty: Turning a Casual Customer into a Brand Ambassador',
      },
      content: {
        title: 'برامج الولاء التي تعمل حقًا',
        subtitle: 'التخصيص هو مفتاح كسب القلوب',
        body: 'الاحتفاظ بالعملاء الحاليين أقل تكلفة بكثير من اكتساب عملاء جدد. برامج الولاء الفعالة، والتواصل الشخصي، وتقديم قيمة مضافة هي استراتيجيات أساسية لبناء علاقة قوية ومستدامة مع عملائك.',
      },
      daysAgo: 5,
    },
    // Post 7
    {
      title: {
        ar: 'أهمية نقاط البيع المتنقلة (mPOS) في فعاليات الطعام الخارجية',
        en: 'The Importance of Mobile POS (mPOS) in Outdoor Food Events',
      },
      content: {
        title: 'المرونة والسرعة: مفتاح النجاح خارج أسوار المطعم',
        subtitle: 'لا تدع طوابير الانتظار تضيع عليك فرصة بيع',
        body: 'عندما تشارك في مهرجانات الطعام أو الأسواق المفتوحة، فإن السرعة والكفاءة أمران حاسمان. تمكنك أنظمة نقاط البيع المتنقلة من قبول المدفوعات بسرعة، وتتبع المبيعات بسهولة، وتقديم خدمة سلسة لعملائك أينما كنت.',
      },
      daysAgo: 6,
    },
    // Post 8
    {
      title: {
        ar: 'تحليل البيانات في قطاع التجزئة: قرارات أذكى لنمو أسرع',
        en: 'Data Analytics in Retail: Smarter Decisions for Faster Growth',
      },
      content: {
        title: 'اكتشف الأنماط الخفية في بيانات مبيعاتك',
        subtitle: 'من هو عميلك المثالي وماذا يريد؟',
        body: 'بيانات المبيعات وسلوك العملاء هي كنز من المعلومات. تعلم كيفية استخدام أدوات تحليل البيانات لفهم اتجاهات السوق، وتخصيص عروضك، وتحسين استراتيجيات التسعير، مما يؤدي إلى زيادة الإيرادات والربحية.',
      },
      daysAgo: 7,
    },
    // Post 9
    {
      title: {
        ar: 'قوائم الطعام الرقمية (QR Code): أكثر من مجرد بديل للقوائم الورقية',
        en: 'Digital QR Code Menus: More Than Just a Paper Menu Replacement',
      },
      content: {
        title: 'تجربة تفاعلية ومبيعات أعلى',
        subtitle: 'سهولة التحديث والعروض الموجهة',
        body: 'قوائم الطعام الرقمية عبر رمز الاستجابة السريعة (QR) لا تقلل فقط من التكاليف والاتصال الجسدي، بل تفتح أيضًا فرصًا جديدة. يمكنك تحديثها بسهولة، وعرض صور جذابة، وحتى دمجها مع أنظمة الطلب والدفع لزيادة متوسط قيمة الفاتورة.',
      },
      daysAgo: 8,
    },
    // Post 10
    {
      title: {
        ar: 'كيف تختار نظام نقاط البيع المناسب لعملك؟',
        en: 'How to Choose the Right Point of Sale System for Your Business',
      },
      content: {
        title: 'ليست كل الأنظمة متساوية',
        subtitle: 'الميزات الرئيسية التي يجب البحث عنها',
        body: 'اختيار نظام نقاط البيع هو قرار استراتيجي. يجب أن تفكر في حجم عملك، ونوع الصناعة، والميزات التي تحتاجها مثل إدارة المخزون، وتقارير المبيعات، والتكامل مع التطبيقات الأخرى. هذا الدليل يساعدك على اتخاذ القرار الصحيح.',
      },
      daysAgo: 9,
    },
    // Post 11
    {
      title: {
        ar: 'الأمن السيبراني للمطاعم والمتاجر الصغيرة',
        en: 'Cybersecurity for Small Restaurants and Retailers',
      },
      content: {
        title: 'حماية بيانات عملك وعملائك',
        subtitle: 'خطوات بسيطة لتجنب الكوارث',
        body: 'في العصر الرقمي، أصبحت الشركات الصغيرة أهدافًا متزايدة للهجمات الإلكترونية. تعرف على أفضل الممارسات لحماية شبكتك، وتأمين أنظمة الدفع، وتدريب موظفيك على اكتشاف التهديدات المحتملة.',
      },
      daysAgo: 10,
    },
    // Post 12
    {
      title: {
        ar: 'التجارة الإلكترونية المتكاملة مع متجرك الفعلي',
        en: 'E-commerce Integrated with Your Physical Store',
      },
      content: {
        title: 'تجربة تسوق موحدة (Omnichannel)',
        subtitle: 'البيع عبر الإنترنت والاستلام من المتجر',
        body: 'الجمع بين قناتي البيع عبر الإنترنت وفي المتجر يخلق تجربة سلسة للعملاء ويزيد من فرص المبيعات. اكتشف كيف يمكن لمزامنة المخزون بين القناتين وتوفير خيارات مثل "اشتر عبر الإنترنت واستلم من المتجر" أن تعزز من رضا العملاء.',
      },
      daysAgo: 11,
    },
    // Post 13
    {
      title: {
        ar: 'إدارة علاقات العملاء (CRM) للمطاعم',
        en: 'Customer Relationship Management (CRM) for Restaurants',
      },
      content: {
        title: 'بناء علاقات دائمة مع ضيوفك',
        subtitle: 'تذكر أعياد ميلادهم وأطباقهم المفضلة',
        body: 'نظام إدارة علاقات العملاء (CRM) ليس فقط لشركات التكنولوجيا. يمكن للمطاعم استخدامه لتتبع تفضيلات العملاء، وإرسال عروض مخصصة، وبناء مجتمع حول علامتك التجارية، مما يشجع على الزيارات المتكررة.',
      },
      daysAgo: 12,
    },
    // Post 14
    {
      title: {
        ar: 'مستقبل الدفع: من النقود إلى العملات الرقمية؟',
        en: 'The Future of Payment: From Cash to Digital Currencies?',
      },
      content: {
        title: 'ما وراء بطاقات الائتمان والمحافظ الإلكترونية',
        subtitle: 'هل يجب أن يقبل عملك بالعملات المشفرة؟',
        body: 'عالم المدفوعات يتغير بسرعة. بينما لا تزال المدفوعات غير النقدية تهيمن، تظهر تقنيات جديدة. استكشف الاتجاهات الحالية والمستقبلية في تكنولوجيا الدفع وما قد يعنيه ذلك لعملك.',
      },
      daysAgo: 13,
    },
    // Post 15
    {
      title: {
        ar: 'كيفية استخدام تقارير المبيعات لتحسين قائمة طعامك',
        en: 'How to Use Sales Reports to Improve Your Menu',
      },
      content: {
        title: 'هندسة القائمة (Menu Engineering)',
        subtitle: 'الأطباق النجمة والخيول العاملة والألغاز والكلاب',
        body: 'تقارير المبيعات ليست فقط للأمور المالية. يمكنها أن تكشف عن الأطباق الأكثر شعبية والأقل ربحية. تعلم كيفية تحليل هذه البيانات لتصميم قائمة طعام تزيد من المبيعات والربحية.',
      },
      daysAgo: 14,
    },
    // Post 16
    {
      title: {
        ar: 'زيادة الكفاءة التشغيلية في قطاع التجزئة',
        en: 'Increasing Operational Efficiency in the Retail Sector',
      },
      content: {
        title: 'العمل بذكاء أكبر، وليس بجهد أكبر',
        subtitle: 'تبسيط العمليات من الخلفية إلى الواجهة',
        body: 'الكفاءة التشغيلية هي مفتاح الربحية في قطاع التجزئة. من تحسين سلسلة التوريد إلى جدولة الموظفين بشكل فعال، اكتشف كيف يمكن للتكنولوجيا والعمليات الذكية أن تقلل التكاليف وتحسن تجربة العملاء.',
      },
      daysAgo: 15,
    },
    // Post 17
    {
      title: {
        ar: 'التسويق عبر المؤثرين للمطاعم والمقاهي',
        en: 'Influencer Marketing for Restaurants and Cafes',
      },
      content: {
        title: 'الاستفادة من قوة "كلمة الفم" الرقمية',
        subtitle: 'كيفية التعاون مع مؤثري الطعام المحليين',
        body: 'يمكن أن يكون التسويق عبر المؤثرين وسيلة فعالة من حيث التكلفة للوصول إلى جمهور جديد ومستهدف. تعلم كيفية العثور على المؤثرين المناسبين لعلامتك التجارية، وقياس عائد الاستثمار، وبناء شراكات ناجحة.',
      },
      daysAgo: 16,
    },
    // Post 18
    {
      title: {
        ar: 'تكنولوجيا الاستدامة في الأعمال التجارية',
        en: 'Sustainability Technology in Business',
      },
      content: {
        title: 'الكوكب والربح: كيف يمكن أن يسيرا معًا',
        subtitle: 'تقليل البصمة الكربونية وزيادة الأرباح',
        body: 'الاستدامة لم تعد مجرد كلمة طنانة؛ إنها ميزة تنافسية. اكتشف كيف يمكن للتكنولوجيا أن تساعدك على تقليل النفايات، وتوفير الطاقة، وجذب العملاء المهتمين بالبيئة، كل ذلك مع تحسين صافي أرباحك.',
      },
      daysAgo: 17,
    },
  ]

  const newPostsData = additionalPosts.map((post, index) => {
    const heroImage = heroImages[index % heroImages.length]
    return {
      data: {
        title: post.title,
        slug: formatSlug(post.title.ar),
        heroImage: heroImage?.id,
        _status: 'published' as const,
        authors: [author.id],
        categories: getRandomCategories(),
        meta: {
          title: post.title,
          description: {
            ar: post.content.body,
            en: post.content.body, // Assuming the body can be used as meta description
          },
        },
        content: {
          ar: createLexicalContent(
            post.content.title,
            post.content.subtitle,
            post.content.body,
            blockImage.id,
          ),
          en: createLexicalContent(
            post.content.title,
            post.content.subtitle,
            post.content.body,
            blockImage.id,
          ),
        },
        publishedAt: new Date(Date.now() - post.daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      },
      locale: 'ar' as 'ar' | 'en',
    }
  })

  const postsData = [
    { data: post1Data, locale: 'ar' },
    { data: post2Data, locale: 'ar' },
    { data: post3Data, locale: 'ar' },
    ...newPostsData,
  ]

  const posts = postsData.map((post) => ({
    title: post.data.title[post.locale],
    slug: post.data.slug,
    heroImage: post.data.heroImage,
    _status: post.data._status,
    authors: post.data.authors,
    categories: post.data.categories,
    meta: {
      title: post.data.meta.title[post.locale],
      description: post.data.meta.description[post.locale],
      image: post.data.heroImage,
    },
    content: post.data.content[post.locale],
    publishedAt: new Date().toISOString(),
  }))

  for (let i = 0; i < posts.length; i++) {
    await payload.create({
      collection: 'blog-posts',
      data: posts[i],
      req,
    })
  }
}
