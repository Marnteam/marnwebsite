import type { CollectionConfig, Field } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { link } from '@/fields/link'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const Integrations: CollectionConfig<'integrations'> = {
  slug: 'integrations',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },

  defaultPopulate: {
    icon: true,
    tagline: true,
    link: true,
    name: true,
    title: true,
    summary: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['icon', 'name', 'tagline', 'updatedAt'],
    livePreview: {
      url: ({ data, req, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'integrations',
          req,
          locale,
        })

        return path
      },
    },
    preview: (data, { req, locale }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'integrations',
        req,
        locale,
      }),
    useAsTitle: 'name',
  },
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
          label: 'Info',
          fields: [
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Upload an icon for the solution. 500x500px recommended. Only media with category "app-icons" will be shown.',
              },
              filterOptions: {
                'category.slug': { equals: 'app-icons' },
              },
            },
            {
              name: 'name',
              label: 'Name',
              type: 'text',
              localized: true,
            },
            {
              name: 'tagline',
              label: 'Tagline',
              type: 'text',
              localized: true,
            },
            {
              name: 'summary',
              label: 'Summary',
              type: 'richText',
              localized: true,
            },
            {
              type: 'collapsible',
              label: 'Link',
              fields: [
                link({
                  variants: false,
                  colors: false,
                  description: false,
                  icon: false,
                }),
              ],
              admin: {
                description: 'Link to page on Marn.com or alternative site',
              },
            },
            ///
            {
              name: 'company',
              type: 'group',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    description: 'Name of the company providing the integration.',
                  },
                },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'email',
                      type: 'email',
                      required: true,
                      admin: {
                        description: 'Contact email for the integration.',
                        width: '50%',
                      },
                    },
                    {
                      name: 'phone',
                      type: 'text',
                      required: false,
                      admin: {
                        description: 'Contact phone number for the integration.',
                        width: '50%',
                        rtl: false,
                      },
                    },
                  ],
                },
              ],
            },
            {
              name: 'pricing',
              type: 'text',
              localized: true,
            },

            link({
              colors: false,
              icon: false,
              variants: false,
              overrides: {
                name: 'docsLink',
                label: 'Documentation Link',
                admin: {
                  description: 'URL to the documentation for the integration.',
                },
              },
            }),
          ],
        },
        {
          label: 'Content',
          fields: [
            // hero,
            {
              name: 'hero',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                  ]
                },
              }),
              label: 'Hero',
              localized: true,
            },

            linkGroup({
              overrides: {
                maxRows: 2,
                label: 'CTA',
              },
              caption: true,
            }),
            // {
            //   name: 'gallery',
            //   type: 'upload',
            //   relationTo: 'media',
            //   hasMany: true,
            // },
            // {
            //   name: 'content',
            //   type: 'richText',
            //   localized: true,
            //   editor: lexicalEditor({
            //     features: ({ rootFeatures }) => {
            //       return [
            //         ...rootFeatures,
            //         HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            //         FixedToolbarFeature(),
            //         InlineToolbarFeature(),
            //       ]
            //     },
            //   }),
            //   label: 'Content',
            // },
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

        {
          name: 'meta',
          label: 'SEO',
          localized: true,
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'appPreview',
      type: 'ui',
      admin: {
        components: {
          Field: {
            path: '@/components/AppPreview#AppPreview',
          },
        },
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'ecosystem',
      type: 'relationship',
      relationTo: 'categories',
      filterOptions: {
        'parent.slug': { equals: 'ecosystems' },
      },
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      filterOptions: {
        'parent.slug': { equals: 'marketplace' },
      },
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },

    ...slugField(),
  ],

  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 25,
  },
}
