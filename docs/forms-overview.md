# Forms & Form Submissions

This document explains how Payload-managed forms are configured, rendered on the site, submitted, and enriched with metadata. It follows the execution path starting in `src/plugins/index.ts`, then covers the client components, submission flow, and HubSpot forwarding.

## 1. CMS Configuration (`src/plugins/index.ts`)

- Payload uses `@payloadcms/plugin-form-builder` to manage the `forms` collection. We disable unused stock fields (`payment`, `state`, `country`) and extend the `text` block to add an `autocomplete` token input so admins can hint browser autofill.
- The plugin override applies `lexicalEditor` to the `confirmationMessage` rich-text field so editors can author formatted confirmations.
- A custom `hubspotForms` plugin augments the Forms collection with read-only sidebar fields (`hubspotPortalId`, `hubspotFormId`) and injects admin buttons that fetch/synchronise field definitions from HubSpot.
- Additional platform plugins (SEO, redirects, search, translator, Payload Cloud) sit alongside the forms configuration but do not affect runtime submission behaviour.

## 2. HubSpot Synchronisation

- `src/plugins/hubspot-forms/src/server/listFormsEndpoint.ts` and `applyFormEndpoint.ts` expose admin endpoints that list HubSpot forms and map a selected form into Payload blocks.
- `mapHubSpotFieldsToPayloadBlocks` converts HubSpot field types into the corresponding Payload block schema (`text`, `email`, `select`, `checkbox`, etc.), generating block IDs with `bson-objectid`.
- When a HubSpot form is applied, the document's `fields` array is replaced with mapped blocks, and the HubSpot IDs are saved for later forwarding.

## 3. Form Block Rendering (`src/blocks/Form`)

- `FormBlock` is the canonical front-end entry point. Page builders usually embed it directly, and Theme blocks like `CallToAction06` and `CallToAction07` reuse the same flow: they initialise `react-hook-form`, call `useSubmissionMetadata`, and render the shared `<RenderFields />` dispatcher before submitting via `useFormSubmission`.
- Fields are rendered via a simple dispatcher (`src/blocks/Form/fields.tsx`) that maps `blockType` values to React components (text, email, select, checkbox, textarea, number, country, state, message).
- Individual field components rely on the generated types from `@payloadcms/plugin-form-builder` to match the CMS schema, and most use `react-hook-form` `Controller` wrappers to stay controlled. Examples:
  - `Text` adds support for the custom `autocomplete` token stored in the CMS.
  - `Select`, `Country`, and `State` respect the current locale when handling RTL layouts or pre-defined option lists.
  - Validation errors surface through a shared `<Error />` component when required fields fail.

## 4. Submission Hook (`src/utilities/forms/useFormSubmission.ts`)

- `FormBlock` calls `useFormSubmission`, passing the CMS form configuration and metadata collected by `useSubmissionMetadata`.
- The hook wraps a React Server Action (`src/app/(frontend)/actions/submitForm.ts`) and tracks UI state: `status`, optimistic `isLoading`, `error`, `result`, and optional HubSpot forwarding details.
- It serialises form values with `buildSubmissionPayload` before sending them, ensuring every field becomes a `{ field, value }` tuple and boolean/array values are stringified consistently with the Payload collection schema.
- Success handlers reset the form to its initial state and show either a message confirmation or trigger redirects, mirroring the CMS configuration (`confirmationType` and `redirect`).

## 5. Client Metadata (`src/utilities/forms/useSubmissionMetadata.ts` & `collectClientMetadata.ts`)

- `useSubmissionMetadata` lazily calls `collectClientMetadata` in `useEffect`, merging server-provided defaults with browser-derived values.
- `collectClientMetadata` gathers:
  - Attribution parameters (UTMs and click IDs) from `window.location.search` using `UTM_PARAM_MAP` and `CLICK_ID_PARAM_MAP`.
  - Referrer URL/host, device locale (`navigator.language`), user agent, and the current page path.
- Attribution values are persisted to `localStorage` for 90 days (`NEXT_PUBLIC_FORM_METADATA_STORAGE` can disable persistence) so that multi-step journeys retain campaign context.
- Metadata is normalised: empty strings become `undefined`, and when stored they're reduced to meaningful keys so storage remains compact.

## 6. Server Action (`src/app/(frontend)/actions/submitForm.ts`)

- The server action verifies the `formId`, fetches the form document from Payload, and rejects submissions if the form is missing or misconfigured.
- Submission data is rebuilt server-side via `buildSubmissionPayload` to protect against tampering, then stored in the `form-submissions` collection as an array of `{ field, value }` records.
- Metadata flows through `normaliseSubmissionMetadata`, ensuring every key defined in `SUBMISSION_METADATA_KEYS` resolves to a string or explicit `null` before being appended to the stored entries.
- If the form carries HubSpot IDs, the action forwards the serialised field data plus metadata to the HubSpot Forms API, returning a combined success payload that notes whether HubSpot accepted the submission.

## 7. HubSpot Forwarding (`src/utilities/forms/hubspot.ts`)

- Payload submissions remain the source of truth, but when HubSpot IDs are present `sendHubspotSubmission` pushes the form to `https://api.hsforms.com/submissions/v3/integration/submit`.
- The HubSpot payload contains:
  - `fields`: all form entries plus extra metadata mapped to HubSpot-compatible field names (UTMs and click IDs) when those fields are not already used by the form.
  - `context`: optional enrichment (`hutk`, `ipAddress`, `pageUri`, `pageName`, `pageId`, `sfdcCampaignId`, `goToWebinarWebinarKey`) derived from metadata.
- Failures are logged but do not block the local database write; the client still receives a success response with `hubspot.forwarded = false` so UI can indicate partial success.

## 8. Metadata Keys & Normalisation (`src/blocks/Form/types.ts`)

- `SUBMISSION_METADATA_KEYS` enumerates all recognised metadata slots (locale, page identifiers, UTMs, click IDs, HubSpot-specific values, etc.).
- `normaliseSubmissionMetadata` fills missing keys with `null` so downstream processors, exports, or analytics pipelines can rely on a consistent schema without testing for `undefined`.
- `SubmissionMetadata` and related helper types (`SubmissionInput`, `SubmitFormResult`, etc.) keep both client and server layers in sync via the generated Payload types.

## 9. Extending the Form System

- To add a new field type, update the CMS block schema (via Payload admin or a migration), export an appropriate React component in `src/blocks/Form/fields.tsx`, and teach `buildInitialFormState`/`buildSubmissionPayload` how to initialise and serialise values.
- Additional metadata can be introduced by extending `SUBMISSION_METADATA_KEYS`, updating `collectClientMetadata`, and ensuring HubSpot forwarding either maps the new key or ignores it gracefully.
- All form submissions pass through `submitFormAction`, making it the best place to add server-side validations, spam protection, or third-party integrations.

## 10. Operational Notes

- HubSpot submissions require `HUBSPOT_ACCESS_TOKEN`; when missing, forwarding is skipped with a logged warning.
- Ensure Hubspot forms contain hidden fields for UTMs and click IDs.
- Client-side metadata persistence can be disabled by setting `NEXT_PUBLIC_FORM_METADATA_STORAGE=false`.
- Because the submission action runs on the server, remember to whitelist any new metadata fields in Payload's collection access rules if custom logic is added.
