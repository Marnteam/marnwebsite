import 'dotenv/config'

import { google } from '@ai-sdk/google'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import fs from 'fs'
import path from 'path'
import { z } from 'zod'

const inputPath = path.join(process.cwd(), 'gemini-app-data.json')
const outputPath = path.join(process.cwd(), 'gemini-formatted-app-data.json')

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'))

const formattedData: any[] = []

for (const item of data) {
  console.log(`formatting ${item.app_slug}`)
  const response = await generateObject({
    model: openai.responses('gpt-4o-mini'),
    prompt: `The text is a description of an app and its features. Please extract the information into the specified schema format.
        ${item.data}
        `,
    schema: z.object({
      app_name: z.string(),
      app_description: z.string(),
      core_use_case: z.string(),
      monetization_model: z.string(),
      app_features: z.string(),
      company_name: z.string(),
      company_email: z.string(),
      company_phone: z.string(),
      company_website: z.string(),
    }),
  })
  formattedData.push({
    ...item,
    ...response.object,
  })
}

fs.writeFileSync(outputPath, JSON.stringify(formattedData, null, 2))
