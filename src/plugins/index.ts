import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { hubspotForms } from '@/plugins/hubspot-forms/src'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { aiSDKResolver, copyResolver, translator } from '@/plugins/translator/src'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, BlogPost } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<BlogPost | Page> = ({ doc, locale }) => {
  return doc?.title ? `${doc.title} | ${locale === 'ar' ? 'منظومة مرن' : 'Marn POS'}` : 'Marn POS'
}

const generateURL: GenerateURL<BlogPost | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'blog-posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          if ('name' in field && field.name === 'fields' && field.type === 'blocks') {
            return {
              ...field,
              blocks: field.blocks.map((block) => {
                if (block.slug !== 'text') return block
                return {
                  ...block,
                  fields: block.fields.toSpliced(block.fields.length + 1, 0, {
                    name: 'hidden',
                    type: 'checkbox',
                    label: 'Hidden field?',
                  }),
                }
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      fields: ({ defaultFields }) => {
        return [
          ...defaultFields,
          {
            name: 'locale',
            type: 'text',
            admin: {
              readOnly: true,
            },
          },
          {
            name: 'pagePath',
            type: 'text',
            admin: {
              readOnly: true,
            },
          },
        ]
      },
    },
  }),
  hubspotForms({
    collection: 'forms',
  }),
  searchPlugin({
    collections: ['blog-posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  translator({
    // collections with the enabled translator in the admin UI
    collections: [
      'pages',
      'blog-posts',
      'solutions',
      'integrations',
      'categories',
      'faq',
      'customers',
      'media',
    ],
    // globals with the enabled translator in the admin UI
    globals: ['header', 'footer'],
    // add resolvers that you want to include, examples on how to write your own in ./plugin/src/resolvers
    resolvers: [
      copyResolver(),
      aiSDKResolver({
        apiKey: process.env.GEMINI_API_KEY!,
        provider: 'google',
      }),
    ],
  }),
  payloadCloudPlugin(),
]
