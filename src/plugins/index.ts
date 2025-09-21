import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { fields, formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { hubspotForms } from '@/plugins/hubspot-forms/src'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { aiSDKResolver, copyResolver, translator } from '@/plugins/translator/src'
import { Block, Field, Plugin, TextField } from 'payload'
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
const Metadata: Block = {
  slug: 'metadata',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name (lowercase, no special characters)',
          required: true,
          admin: {
            width: '50%',
            rtl: false,
          },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          localized: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'defaultValue',
      type: 'text',
      admin: {
        width: '50%',
      },
      label: 'Default Value',
      localized: true,
    },
  ],
  labels: {
    plural: 'Metadata Fields',
    singular: 'Metadata',
  },
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
      state: false,
      country: false,
      text: {
        ...fields.text,
        fields: [
          ...(fields.text && 'fields' in fields.text
            ? fields.text.fields.map((field) => {
                if (field.type === 'row' && field.fields) {
                  return {
                    type: 'row',
                    fields: field.fields.map((rowField) => {
                      if ('name' in rowField && rowField.name === 'name') {
                        return {
                          ...rowField,
                          admin: { rtl: false },
                        }
                      } else return { ...rowField }
                    }),
                  } as Field
                }
                return field
              })
            : []),
          {
            name: 'autocomplete',
            type: 'text',
            label: 'Token name',
            admin: {
              rtl: false,
              description:
                'Provides a hint to the user agent specifying how to, or indeed whether to, prefill a form control. The attribute value is either the keyword `off` or `on`, or an ordered list of space-separated tokens. See https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete for more info.',
            },
          },
        ],
      },
      metadata: Metadata,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return [
          ...defaultFields.map((field) => {
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
                blocks: [...field.blocks],
              }
            }
            // if ('name' in field && field.name === 'fields' && field.type === 'blocks') {
            //   return {
            //     ...field,
            //     blocks: field.blocks.map((block) => {
            //       if (block.slug !== 'text') return block
            //       return {
            //         ...block,
            //         fields: block.fields.toSpliced(block.fields.length + 1, 0, {
            //           name: 'hidden',
            //           type: 'checkbox',
            //           label: 'Hidden field',
            //         }),
            //       }
            //     }),
            //   }
            // }
            return field
          }),
        ]
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
