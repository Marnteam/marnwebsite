import type { Payload, PayloadRequest } from 'payload'
import type { Media, User, Category, Post } from '@/payload-types'

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

  // Blog Post 1: About Restaurant Technology
  const post1Data = {
    title: {
      ar: 'كيف تطور التكنولوجيا من مطعمك وتزيد أرباحك',
      en: 'How Technology Can Transform Your Restaurant and Boost Profits',
    },
    slug: 'تطوير-المطاعم-بالتكنولوجيا',
    heroImage: heroImages[0]?.id,
    _status: 'published' as const,
    authors: [author.id],
    categories: blogCategory?.id ? [blogCategory.id] : [],
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
    slug: 'مستقبل-البيع-بالتجزئة-التكنولوجيا',
    heroImage: heroImages[1]?.id,
    _status: 'published' as const,
    authors: [author.id],
    categories: blogCategory?.id ? [blogCategory.id] : [],
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
    slug: 'استراتيجيات-نمو-الاعمال-الرقمية',
    heroImage: heroImages[2]?.id || heroImages[0]?.id,
    _status: 'published' as const,
    authors: [author.id],
    categories: blogCategory?.id ? [blogCategory.id] : [],
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

  const postsData = [
    { data: post1Data, locale: 'ar' },
    { data: post2Data, locale: 'ar' },
    { data: post3Data, locale: 'ar' },
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
    },
    content: post.data.content[post.locale],
    publishedAt: new Date().toISOString(),
  }))

  for (let i = 0; i < posts.length; i++) {
    await payload.create({
      collection: 'posts',
      data: posts[i],
      req,
    })
  }
}
