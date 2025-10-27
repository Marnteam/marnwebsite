import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

import { hero } from '@/heros/config'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: {
      en: 'Page',
      ar: 'الصفحة',
    },
    plural: {
      en: 'Pages',
      ar: 'الصفحات',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          locale: locale.code,
          collection: 'pages',
          req,
        })
        return path
      },
    },
    preview: (data, { req, locale }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        locale,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
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
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [],
              blockReferences: [
                'archiveBlock',
                'blogBlock',
                'callToActionBlock',
                'carouselBlock',
                'customHtmlBlock',
                'dividerBlock',
                'faqBlock',
                'featuredAppsBlock',
                'featuresBlock',
                'formBlock',
                'galleryBlock',
                'logosBlock',
                'marketplaceBlock',
                'metricsBlock',
                'pricingBlock',
                'richTextBlock',
                'testimonialsBlock',
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
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
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
    {
      name: 'disablePage',
      label: 'Disable Page',
      type: 'checkbox',
      defaultValue: false,
      localized: true,
      admin: {
        description: 'If checked, this page will be hidden from the website.',
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    beforeDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      // autosave: {
      //   interval: 100, // We set this interval for optimal live preview
      // },
      autosave: false,
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
