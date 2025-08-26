# HubSpot Forms Sync plugin (for Payload Form Builder)

This plugin adds a button next to the Save/Publish buttons on the Forms collection that lets an editor fetch HubSpot forms, select one, and automatically populate the Payload Form Builder fields based on the HubSpot form definition. It also stores the HubSpot `portalId` and `formId` on the form document.

Environment variables expected:

- `HUBSPOT_ACCESS_TOKEN`: HubSpot Private App access token (Bearer token)

Usage (in Payload config):

```ts
import { hubspotForms } from '@/plugins/hubspot-forms/src'

export default buildConfig({
  plugins: [
    hubspotForms({
      collection: 'forms',
    }),
  ],
})
```

