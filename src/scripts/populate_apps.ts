import 'dotenv/config'

import { getPayload } from 'payload'
import configPromise from '../payload.config'

import { openai } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { GoogleGenerativeAIProviderMetadata } from '@ai-sdk/google'
import { generateObject, generateText } from 'ai'
import { z } from 'zod'

import { Category, Integration } from '@/payload-types'
import fs from 'fs'
import path from 'path'

const payload = await getPayload({ config: configPromise })

interface TextElement {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'p' // Add other heading levels or types if needed
  text: string
  direction?: 'ltr' | 'rtl' | null | undefined
}

type results = {
  app_slug: string
  app_id: string
  app_name?: string
  app_description?: string
  value_proposition?: string
  app_features?: string
  company_name?: { en: string; ar: string }
  company_email?: string
  company_phone?: string
  company_website?: string
  monetization_model?: string
  data?: string | null
  categories?: Category[]
  ecosystem?: Category[]
  tagline?: { en: string; ar: string }
  summary?: { en: string; ar: string }
  hero?: {
    h1_ar: string
    p_ar: string
    h1_en: string
    p_en: string
  }
}[]

const inputPath = path.join(process.cwd(), './src/scripts/gemini-formatted-app-data.json')
const data: results = JSON.parse(fs.readFileSync(inputPath, 'utf8'))

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
      case 'h1':
        nodeType = 'heading'
        headingTag = 'h1'
        break
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

const generateContent = async (prompt: string, baseInfo: string, app: Integration) => {
  const systemPrompt = (
    app: Integration,
  ) => `You are an expert content writer for company that offers a smart POS system called Marn POS or مرن.. You are given a prompt and some base information about the app ${app.name} (Arabic) or ${app.title} (English). You need to write tailored content for the integrations page of the Marn POS website. 
    - Your output should not be too formal, just business casual that appeals to Saudi audience. 
    - Your output should be in Arabic except for links.
    - Follow the specific format instructions in the prompt.
    ---
    Base information:
    ${baseInfo}
    ---
    `
  //   console.log(baseInfo)

  const result = await generateText({
    model: google('gemini-2.5-pro', {
      useSearchGrounding: true,
      dynamicRetrievalConfig: {
        mode: 'MODE_UNSPECIFIED',
      },
    }),
    system: systemPrompt(app),
    prompt: prompt,
  })
  return result.text
}

const generateTagline = async (app: results[0]) => {
  const result = await generateObject({
    model: openai.responses('gpt-4.1'),
    schema: z.object({
      tagline: z.object({
        en: z.string(),
        ar: z.string(),
      }),
    }),
    system: `You are a seasoned SaaS copywriter. Write ONE enticing, benefit-driven tagline (max 9 words), in Modern Standard Arabic and English, that:
  • Starts with a powerful verb
  • Makes the reader picture success
  • Avoids jargon and clichés
  • Can stand alone on a hero banner
  
  Output should be in the following format:
  {
    "tagline": {
      "en": "Tagline in English",
      "ar": "Tagline in Arabic"
    }
  }`,
    prompt: `Name: ${app.app_name}
      Description: ${app.app_description}
      Features: ${app.app_features}`,
  })
  return result.object.tagline
}

const generateHero = async (app: results[0]) => {
  const result = await generateObject({
    model: openai.responses('gpt-4.1'),
    system: `You are a senior SaaS copywriter fluent in Modern Standard Arabic and English.

    TASK
    • For every product in the incoming JSON, create HERO copy:
    └ h1_ar  – punchy headline (≤ 12 Arabic words, starts with a verb)
    └ p_ar   – supporting paragraph (≤ 30 Arabic words, conversational yet professional)
    └ h1_en  – faithful English mirror of h1_ar (≤ 12 words)
    └ p_en   – faithful English mirror of p_ar  (≤ 30 words)
    • Headlines must spotlight the **main benefit**, not the feature list.
    • Paragraphs should expand the promise with 1-2 specific outcomes or proof points.
    • Maintain equivalent meaning across languages (no free-style rewriting).

    OUTPUT
    Respond with valid JSON only, matching this schema:

    [
    {
        "product": "<productName>",
        "h1_ar": "<Arabic headline>",
        "p_ar":  "<Arabic paragraph>",
        "h1_en": "<English headline>",
        "p_en":  "<English paragraph>"
    },
    ...
    ]

    Do not wrap the JSON in code fences, markdown, or additional commentary.
    `,
    schema: z.object({
      product: z.string(),
      h1_ar: z.string(),
      p_ar: z.string(),
      h1_en: z.string(),
      p_en: z.string(),
    }),
    prompt: `{
        "product": "${app.app_name}",
        "description": "${app.app_description}",
        "features": "${app.app_features}",
        "audience": "Saudi restaurant and retail business owners who already have a POS system, but are looking for apps like ${app.app_name} to power it up",
        "tone": "professional, yet conversational"
    },`,
  })
  return result.object
}

const generateMarketplaceCategories = async (
  marketplaceCategories: Category[],
  baseInfo: string,
  app: Integration,
) => {
  const prompt = `
  What categories best describe the following app: ${baseInfo}. 
  
  Your output must be structured as follows: 
  - A comma separated list of 1 to 3 category slug/s from the options provided ONLY. 
  - Output should be in English and lowercase.
  - If the app is not related to any of the categories, return an empty array.
  - Try to pick the most relevant categories only. Prefer more specific categories over more general ones.
  
  ---
  Categories options: ${marketplaceCategories.map((category: Category) => category.slug).join(', ')}
  ---
  `

  const result = await generateObject({
    model: openai.responses('gpt-4.1-nano'),
    schema: z.object({
      categories: z.array(z.string()),
    }),
    prompt,
  })

  // Ensure output is a clean, comma-separated list of slugs
  const selectedSlugs = result.object.categories

  const categories = marketplaceCategories.filter((category: Category) =>
    selectedSlugs.includes(category.slug as string),
  )

  return categories
}

const generateEcosystemCategories = async (
  ecosystemCategories: Category[],
  baseInfo: string,
  app: Integration,
) => {
  const prompt = `
      What category best describe the following app: ${baseInfo}. 
      
      Your output must be structured as follows: 
      - A comma separated list of 1 or 2 category slug/s from the options provided ONLY. 
      - Output should be in English and lowercase.
      - If the app is not related to any of the categories, return an empty array.
      - Try to pick the most relevant categories only. Prefer more specific categories over more general ones.
      
      ---
      Categories options: ${ecosystemCategories.map((category: Category) => category.slug).join(', ')}
      ---
      `

  const result = await generateObject({
    model: openai.responses('gpt-4.1-nano'),
    schema: z.object({
      categories: z.array(z.string()),
    }),
    prompt,
  })

  // Ensure output is a clean, comma-separated list of slugs
  const selectedSlugs = result.object.categories

  const categories = ecosystemCategories.filter(
    (category: Category) => category.slug === selectedSlugs[0],
  )

  return categories
}

const { docs: appsCollection } = await payload.find({
  collection: 'integrations',
  limit: 100,
})

const { docs: marketplaceCategories } = await payload.find({
  collection: 'categories',
  limit: 100,
  pagination: false,
  where: {
    'parent.slug': {
      equals: 'marketplace',
    },
  },
  select: {
    id: true,
    title: true,
    slug: true,
  },
})

const { docs: ecosystemCategories } = await payload.find({
  collection: 'categories',
  limit: 100,
  pagination: false,
  where: {
    'parent.slug': {
      equals: 'ecosystems',
    },
  },
  select: {
    id: true,
    title: true,
    slug: true,
  },
})

for (const app of data) {
  console.log('enriching data for: ', app.app_name)
  const selectedApp = appsCollection.find((x) => x.id === app.app_id)

  if (!selectedApp) {
    console.log('app not found: ', app.app_name)
    continue
  }

  let categories, ecosystem
  if (!app.categories || !app.ecosystem) {
    ;[categories, ecosystem] = await Promise.all([
      generateMarketplaceCategories(marketplaceCategories, app.app_description || '', selectedApp),
      generateEcosystemCategories(ecosystemCategories, app.app_description || '', selectedApp),
    ])
  }

  let summary
  if (!app.summary) {
    const generatedSummary = await generateObject({
      model: google('gemini-2.5-pro', {
        useSearchGrounding: true,
        dynamicRetrievalConfig: {
          mode: 'MODE_UNSPECIFIED',
        },
      }),
      schema: z.object({
        summary: z.object({
          ar: z.string(),
          en: z.string(),
        }),
      }),
      system: `
      You are a research copywriter with web-search access.

GOAL  
For every incoming app object, return TWO clear ~30-word sentences that describe the same facts:
• summary.ar – Modern Standard Arabic (٢٨-٣٢ كلمة تقريباً)  
• summary.en – English (≈28-32 words)  

Each sentence must:  
• Say what the app does + its key benefit  
• Mention its link to POS workflows and its Saudi footprint (if verified)  
• Be easy for non-technical readers of an integrations page  

METHOD  
1. Run at least two targeted searches for each app, e.g.:  
"<app name> Restaurants Saudi Arabia"  
"<app name> منصة نقاط البيع"  
2. Use only authoritative sources (official site, LinkedIn, App Store, press releases).  
3. If you cannot confidently identify the app, output "INSUFFICIENT_DATA" in **both** languages.  

OUTPUT (JSON only, no markdown):

{
"app": "<App Name>",
"summary": {
  "ar": "<~30 Arabic words OR INSUFFICIENT_DATA>",
  "en": "<~30 English words OR INSUFFICIENT_DATA>"
}
}
`,
      prompt: `App: ${selectedApp.name} (Arabic) or ${selectedApp.title} (English)
      Description: ${app.app_description}
      Features: ${app.app_features}`,
    })
    summary = generatedSummary.object.summary
  }

  let tagline, hero
  if (!app.tagline || !app.hero) {
    ;[tagline, hero] = await Promise.all([generateTagline(app), generateHero(app)])
  }

  let companyName
  if (!app.company_name?.ar) {
    const company = await generateObject({
      model: google('gemini-2.5-pro', {
        useSearchGrounding: true,
        dynamicRetrievalConfig: {
          mode: 'MODE_UNSPECIFIED',
        },
      }),
      schema: z.object({
        name: z.object({
          en: z.string(),
          ar: z.string(),
        }),
      }),
      system: `
      You are a bilingual business researcher with web-search access.

GOAL  
For every incoming app object, return the legal or commonly used **company name** in both languages:

• company_name_ar – Modern Standard Arabic (official spelling if available)  
• company_name_en – English (official spelling; camel-case or title-case as registered)  

METHOD  
1. Perform at least two focused searches, e.g.  
     "<app name> company السعودية"  
     "<app name> شركة نقاط بيع"  
     "<app name> parent company"  

2. Accept ONLY authoritative sources:  
   – Official website “About”, "Terms and Conditions", "Privacy Policy", or footer  
   – Saudi Ministry of Commerce registry snippet  
   – Verified LinkedIn company page  
   – App Store or Play Store page  
   – Reputable press releases or filings  

3. If an Arabic name is **not** published, transliterate the English name (e.g., “PaySync” → "باي سنك").  
4. If you cannot confidently match the app to a company, output **"INSUFFICIENT_DATA"** for **both** fields.  

OUTPUT (plain JSON, no markdown):

{
  "name": {
    "ar": "<Arabic name or INSUFFICIENT_DATA>",
    "en": "<English name or INSUFFICIENT_DATA>"
  }
}

    `,
      prompt: `App: ${selectedApp.name} (Arabic) 
      hint: ${app.app_description}
      `,
    })
    companyName = company.object.name

    app.company_name = companyName
  }

  // update app data in arabic
  await payload.update({
    collection: 'integrations',
    id: app.app_id,
    data: {
      tagline: app.tagline?.ar || tagline.ar,
      hero: generateLexicalContent([
        {
          type: 'h1',
          text: app.hero?.h1_ar || hero.h1_ar,
          direction: 'rtl',
        },
        {
          type: 'p',
          text: app.hero?.p_ar || hero.p_ar,
          direction: 'rtl',
        },
      ]),
      summary: generateLexicalContent([
        {
          type: 'p',
          text: app.summary?.ar || summary.ar,
          direction: 'rtl',
        },
      ]),
      link: {
        type: 'custom',
        newTab: true,
        url: `/marketplace/${selectedApp.slug}`,
        label: selectedApp.name || '',
      },
      docsLink: {
        type: 'custom',
        newTab: true,
        url: app.company_website || '',
        label: 'مستندات التطوير',
      },
      company: {
        name: app.company_name?.ar || companyName.ar,
        email: app.company_email,
        phone: app.company_phone,
      },
      categories: app.categories || categories,
      ecosystem: app.ecosystem || ecosystem,
      meta: {
        title: `${selectedApp.name as string} | متجر تطبيقات مرن`,
        description: app.hero?.p_ar || hero.p_ar,
      },
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    locale: 'ar',
  })

  // update app data in english
  await payload.update({
    collection: 'integrations',
    id: app.app_id,
    data: {
      name: selectedApp.title,
      tagline: app.tagline?.en || tagline.en,
      hero: generateLexicalContent([
        {
          type: 'h1',
          text: app.hero?.h1_en || hero.h1_en,
          direction: 'ltr',
        },
        {
          type: 'p',
          text: app.hero?.p_en || hero.p_en,
          direction: 'ltr',
        },
      ]),
      link: {
        label: selectedApp.title || '',
      },
      docsLink: {
        label: 'Docs',
      },
      summary: generateLexicalContent([
        {
          type: 'p',
          text: app.summary?.en || summary.en,
          direction: 'ltr',
        },
      ]),
      company: {
        name: app.company_name?.en || companyName.en,
      },
      meta: {
        title: `${selectedApp.title as string} | Marn Marketplace`,
        description: app.hero?.p_en || hero.p_en,
      },
      publishedAt: new Date().toISOString(),
      _status: 'published',
    },
    locale: 'en',
  })

  app.categories = app.categories || categories
  app.ecosystem = app.ecosystem || ecosystem
  app.summary = app.summary || summary
  app.hero = app.hero || hero
  app.tagline = app.tagline || tagline
  app.company_name = app.company_name || companyName

  payload.logger.info(`Saved ${selectedApp.title} to CMS`)
}
fs.writeFileSync(inputPath, JSON.stringify(data, null, 2))

console.log(`Successfully enriched ${data.length} apps`)

process.exit(0)
