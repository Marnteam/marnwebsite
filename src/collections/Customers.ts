import type { CollectionConfig } from 'payload'

import { slugField } from '@/fields/slug'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Customers: CollectionConfig = {
  slug: 'customers',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    readVersions: authenticated,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'updatedAt'],
    livePreview: {
      url: ({ data, req, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          locale: locale.code,
          collection: 'customers' as any,
          req,
        })
        return path
      },
    },
    preview: (data, { req, locale }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        locale,
        collection: 'customers' as any,
        req,
      }),
  },
  // defaultPopulate: {
  //   slug: true,
  //   featuredImage: true,
  //   title: true,
  //   type: true,
  //},
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description:
          'Internal page title used to identify this entry in the CMS and generate the URL slug. English only.',
        rtl: false,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Testimonial',
          name: 'testimonial',
          fields: [
            {
              name: 'quote',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    // HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  ]
                },
              }),
              localized: true,
              required: true,
              admin: {
                description: '',
              },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'featuredSolutions',
              type: 'relationship',
              relationTo: 'solutions',
              hasMany: true,
            },
            {
              name: 'featuredIntegrations',
              type: 'relationship',
              relationTo: 'integrations',
              hasMany: true,
            },
            {
              name: 'stats',
              type: 'array',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'label',
                      type: 'text',
                      // required: true,
                      admin: {
                        width: '50%',
                        description: 'Label for the stat',
                      },
                      localized: true,
                    },
                    {
                      name: 'value',
                      type: 'text',
                      // required: true,
                      admin: {
                        width: '50%',
                        description: 'Value for the stat. Example: 85% or 250 SAR',
                      },
                    },
                  ],
                },
                {
                  type: 'select',
                  label: 'Indicator',
                  name: 'indicator',
                  options: [
                    { label: 'Increase', value: 'increase' },
                    { label: 'Decrease', value: 'decrease' },
                    { label: 'None', value: 'noChange' },
                  ],
                  defaultValue: 'noChange',
                  admin: {
                    description: 'Whether the value is an increase or decrease',
                  },
                },
              ],
            },
            {
              name: 'company',
              type: 'group',
              fields: [
                {
                  name: 'companyName',
                  type: 'text',
                  localized: true,
                  required: true,
                  admin: {
                    description: 'Auto-generated from title',
                  },
                  hooks: {
                    beforeValidate: [
                      async ({ value, data }) => {
                        if (!value) {
                          return data?.title
                        }
                        return value
                      },
                    ],
                  },
                },
                {
                  name: 'companyLogo',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  type: 'collapsible',
                  label: 'Link',
                  fields: [
                    link({
                      overrides: {
                        label: false,
                        admin: {},
                      },
                      variants: false,
                      colors: false,
                      icon: false,
                      // description: false,
                    }),
                  ],
                  admin: {
                    description: 'Link to company website or social media profile',
                  },
                },
                {
                  name: 'industry',
                  type: 'select',
                  options: [
                    {
                      label: { en: 'Restaurants', ar: 'مطاعم' },
                      value: 'restaurants',
                    },
                    {
                      label: { en: 'Retail', ar: 'التجزئة' },
                      value: 'retail',
                    },
                    {
                      label: { en: 'Services', ar: 'الخدمات' },
                      value: 'services',
                    },
                  ],
                },
                {
                  name: 'foundingYear',
                  type: 'number',
                },
                {
                  name: 'location',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'branches',
                  type: 'text',
                  admin: {
                    description: 'Number of branches or locations. Example: 5+',
                  },
                },
              ],
            },

            {
              type: 'group',
              label: 'Author Info',
              name: 'authorInfo',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'name',
                      label: 'Author Name',

                      type: 'text',
                      required: true,
                      localized: true,
                      admin: {
                        width: '50%',
                      },
                    },
                    {
                      name: 'title',
                      label: 'Author Title',
                      type: 'text',
                      localized: true,
                      admin: {
                        width: '50%',
                      },
                    },
                  ],
                },

                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                  admin: {
                    description:
                      'Avatar image for the testimonial author. Minimum 300x300px recommended.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Case study',
          name: 'caseStudy',
          admin: {
            condition: (data) => data?.enableCaseStudy,
          },
          fields: [
            {
              name: 'caseStudytitle',
              type: 'text',
              localized: true,
              required: true,
            },
            {
              name: 'summary',
              label: 'Short summary',
              type: 'textarea',
              localized: true,
              required: true,
            },
            {
              name: 'content',
              label: 'Content',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [],
              blockReferences: [
                'archiveBlock',
                'callToActionBlock',
                'customHtmlBlock',
                'dividerBlock',
                'faqBlock',
                'featuredAppsBlock',
                'featuresBlock',
                'formBlock',
                'galleryBlock',
                'logosBlock',
                'richTextBlock',
                'testimonialsBlock',
              ],
              admin: {
                initCollapsed: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'enableCaseStudy',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        description: 'Categories to help organize testimonials',
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
  ],
  hooks: {
    // afterChange: [
    //   ({ doc }) => {
    //     revalidatePath(`/customers/${doc.slug}`)
    //     revalidatePath(`/customers`, 'page')
    //     console.log(`Revalidated: /customers/${doc.slug}`)
    //   },
    // ],
  },

  versions: {
    drafts: {
      autosave: true,
    },
  },
}
