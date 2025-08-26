import type { CollectionSlug, Config, Plugin } from 'payload'
import { deepMerge } from 'payload/shared'

import { listFormsEndpoint } from './server/listFormsEndpoint'
import { applyFormEndpoint } from './server/applyFormEndpoint'
import type { HubSpotFormsPluginConfig } from './types'

export const hubspotForms: (cfg?: HubSpotFormsPluginConfig) => Plugin = (cfg) => {
  const collectionSlug = (cfg?.collection ?? 'forms') as CollectionSlug

  return (config) => {
    const updated: Config = {
      ...config,
      admin: {
        ...(config.admin ?? {}),
        custom: {
          ...(config.admin?.custom ?? {}),
          hubspotForms: {
            collection: collectionSlug,
          },
        },
      },
      // Add hidden fields to the Forms collection to store HubSpot IDs
      collections:
        config.collections?.map((collection) => {
          if (collection.slug !== collectionSlug) return collection

          return {
            ...collection,
            fields: [
              ...(collection.fields ?? []),
              {
                type: 'text',
                name: 'hubspotPortalId',
                label: 'HubSpot Portal ID',
                admin: { position: 'sidebar' },
                required: false,
                localized: false,
              },
              {
                type: 'text',
                name: 'hubspotFormId',
                label: 'HubSpot Form ID',
                admin: { position: 'sidebar' },
                required: false,
                localized: false,
              },
            ],
            admin: {
              ...(collection.admin ?? {}),
              components: {
                ...(collection.admin?.components ?? {}),
                edit: {
                  ...(collection.admin?.components?.edit ?? {}),

                  // inject buttons next to Save/Publish
                  PublishButton: {
                    clientProps: { type: 'publish' },
                    path: 'src/plugins/hubspot-forms/src/client/components/CustomButton/CustomButtonWithHubspot#CustomButtonWithHubspot',
                  },
                  SaveButton: {
                    clientProps: { type: 'save' },
                    path: 'src/plugins/hubspot-forms/src/client/components/CustomButton/CustomButtonWithHubspot#CustomButtonWithHubspot',
                  },
                },
              },
            },
          }
        }) ?? [],
      custom: {
        ...(config.custom ?? {}),
        hubspotForms: {
          collection: collectionSlug,
        },
      },
      endpoints: [
        ...(config.endpoints ?? []),
        { method: 'get', path: '/hubspot/forms', handler: listFormsEndpoint },
        { method: 'post', path: '/hubspot/forms/apply', handler: applyFormEndpoint },
      ],

      i18n: {
        ...config.i18n,
        translations: {
          ...deepMerge(config.i18n?.translations ?? {}, {
            en: {
              'plugin-hubspot-forms': {
                buttonLabel: 'Sync from HubSpot',
                modalTitle: 'Choose a HubSpot form',
                confirmButton: 'Use this form',
                cancelButton: 'Cancel',
                successMessage: 'Form fields populated from HubSpot. Save to apply.',
                errorMessage: 'Could not fetch or apply HubSpot form.',
                searchPlaceholder: 'Search forms…',
              },
            },
            ar: {
              'plugin-hubspot-forms': {
                buttonLabel: 'مزامنة من هبوت',
                modalTitle: 'اختر إشعار من هبوت',
                confirmButton: 'استخدم هذا الإشعار',
                cancelButton: 'إلغاء',
                successMessage: 'تم إنشاء إشعار من هبوت. يرجى حفظه للتطبيق.',
                errorMessage: 'لم يتم إنشاء إشعار من هبوت.',
                searchPlaceholder: 'ابحث عن إشعارات من هبوت…',
              },
            },
          }),
        },
      },
    }

    return updated
  }
}

export * from './types'
