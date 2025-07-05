import 'dotenv/config'

import { getPayload } from 'payload'
import configPromise from '../payload.config'

import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { z } from 'zod'

import { Category } from '@/payload-types'
import { promises as fs } from 'fs'
import path from 'path'

const payload = await getPayload({ config: configPromise })

const outputPath = path.join(process.cwd(), 'gemini-2-app-data.json')

// get integrations
const apps = await payload.find({
  collection: 'integrations',
  limit: 100,
})

const results: {
  app_slug: string
  app_id: string
  app_name?: string
  app_description?: string
  value_proposition?: string
  app_features?: string
  company_name?: string
  company_email?: string
  company_phone?: string
  company_website?: string
  monetization_model?: string
  data?: string | null
}[] = []

for (const app of apps.docs) {
  console.log('fetching data for: ', app.name)
  const system = `
  {
  "name": "application_info",
  "strict": true,
  "schema": {
    "type": "object",
    "properties": {
      "app_name": {
        "type": "string",
        "description": "The name of the application."
      },
      "app_description": {
        "type": "string",
        "description": "A thorough description of what the application does and its benefits."
      },
      "app_features": {
        "type": "string",
        "description": "A list of key features of the application."
      },
      "company_name": {
        "type": "string",
        "description": "The name of the company that developed the application."
      },
      "company_email": {
        "type": "string",
        "description": "Contact email address for the company."
      },
      "company_phone": {
        "type": "string",
        "description": "Contact phone number for the company."
      },
      "company_website": {
        "type": "string",
        "description": "Website URL for the company."
      },
      "monetization_model": {
        "type": "string",
        "description": "The monetization model of the application."
      }
    },
    "required": [
      "app_name",
      "app_description",
      "app_features",
      "company_name",
      "company_email",
      "company_phone",
      "company_website",
      "monetization_model"
    ],
    "additionalProperties": false
  }
}
  `
  const prompt = `اجمع معلومات حول التطبيق/الشركة "${app.name} (عربي) أو ${app.title} (انجليزي)".
"${app.name}" هي شركة تقنية (من المحتمل أن يكون مقرها في المملكة العربية السعودية) تقدم خدمات ${app.categories?.map((category: Category) => category.title).join('، ')}.

قم بتضمين معلومات محددة عن الشركة: الاسم الرسمي، البريد الإلكتروني للتواصل، رقم الهاتف للتواصل، والموقع الإلكتروني.
قم بتضمين معلومات محددة عن التطبيق: الاسم، وظيفته، نقاط البيع، الموقع الإلكتروني إذا كان متاحًا، الأسعار، الميزات، إلخ.
أعط الأولوية للمصادر الموثوقة والحديثة قدر الإمكان: الموقع الرسمي، متجر التطبيقات (App Store) أو متجر (Play Store)، منشورات لينكد إن، منشورات انستغرام، منشورات إكس (X)، إلخ.

كن تحليليًا، وتجنب العموميات، وتأكد من أن كل قسم يدعم الاستدلال القائم على البيانات. قد يقودك اسم التطبيق إلى أعمال أخرى ذات اسم مشابه، لذا تأكد من أن بحثك يرتكز على وظيفة التطبيق وكيفية تكامله مع نظام نقاط البيع الذكي.`
  const response = await generateObject({
    model: google('gemini-2.5-pro', {
      useSearchGrounding: true,
      dynamicRetrievalConfig: {
        mode: 'MODE_UNSPECIFIED',
      },
    }),
    prompt,
    system,
    schema: z.object({
      app_name: z.string().describe('The name of the application.'),
      app_description: z
        .string()
        .describe('A thorough description of what the application does and its benefits.'),
      app_features: z.string().describe('A list of key features of the application.'),
      company_name: z.string().describe('The name of the company that developed the application.'),
      company_email: z.string().describe('Contact email address for the company.'),
      company_phone: z.string().describe('Contact phone number for the company.'),
      company_website: z.string().describe('Website URL for the company.'),
      monetization_model: z.string().describe('The monetization model of the application.'),
    }),
    // tools: {
    //   web_search_preview: openai.tools.webSearchPreview(),
    // },
    // toolChoice: { type: 'tool', toolName: 'web_search_preview' },
    maxTokens: 100000,
    temperature: 1,
  })

  results.push({
    app_slug: app.slug || '',
    app_id: app.id || '',
    ...response.object,
  })
}

await fs.writeFile(outputPath, JSON.stringify(results, null, 2))

console.log(`Data successfully written to ${outputPath}`)
console.log(`Processed ${results.length} apps`)

process.exit(0)
