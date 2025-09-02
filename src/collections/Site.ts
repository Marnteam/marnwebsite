import { GlobalConfig } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { link } from '@/fields/link'

const SiteConfig: GlobalConfig = {
  slug: 'settings',
  label: 'Site Configuration',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO & Metadata',
          fields: [
            {
              name: 'meta',
              label: 'SEO',
              type: 'group',
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
          label: 'Sitewide UI',
          fields: [
            {
              name: 'announcementBar',
              label: 'Announcement Bar',
              type: 'group',
              fields: [
                {
                  name: 'text',
                  label: 'Text',
                  type: 'text',
                  localized: true,
                },
                link({
                  colors: false,
                  variants: false,
                  icon: false,
                  description: false,
                }),
              ],
            },

            {
              name: 'customHeadHtml',
              label: 'Custom HTML (Head)',
              type: 'code',
              admin: {
                language: 'html',
              },
            },
            {
              name: 'customBodyHtml',
              label: 'Custom HTML (Body)',
              type: 'code',
              admin: {
                language: 'html',
              },
            },
          ],
        },
        {
          label: 'Analytics & Scripts',
          fields: [
            {
              name: 'tagManagerId',
              label: 'Google Tag Manager ID',
              type: 'text',
              admin: {
                placeholder: 'GTM-XXXXXXX',
                rtl: false,
              },
            },
            {
              name: 'hubspotAccessToken',
              label: 'HubSpot Access Token',
              type: 'text',
              admin: {
                rtl: false,
              },
            },
            {
              label: 'AI Translator',
              type: 'collapsible',
              fields: [
                {
                  name: 'aiTranslatorConfig',
                  label: false,
                  type: 'group',
                  fields: [
                    {
                      name: 'apiKey',
                      label: 'Gemini API Key',
                      type: 'text',
                    },
                    {
                      name: 'systemPrompt',
                      label: 'System Prompt',
                      type: 'textarea',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default SiteConfig
