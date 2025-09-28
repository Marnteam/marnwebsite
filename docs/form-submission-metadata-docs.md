# Form Submission Metadata Enhancement Plan

## Objectives
- capture richer attribution and technical metadata (UTMs, click IDs, user agent, IP, referer, etc.) alongside form submissions.
- persist the new metadata in Payload and expose it to downstream systems (HubSpot, analytics exports) without breaking existing flows.
- keep the client-facing API (`useFormSubmission`) ergonomic so forms automatically benefit from metadata capture.

## Current Behaviour Overview
- `SubmissionMetadata` (`src/blocks/Form/types.ts`) only supports `locale` and `pagePath`.
- `useFormSubmission` (`src/lib/forms/useFormSubmission.ts`) accepts optional metadata but relies on callers to provide it.
- `submitFormAction` (`src/app/(frontend)/actions/submitForm.ts`) normalises metadata, stores `locale/pagePath`, and forwards the same object to HubSpot.
- HubSpot payload builder (`src/lib/forms/hubspot.ts`) uses metadata solely for `pageUri/pageName` context.
- Payload form submissions collection fields are defined by the Payload forms plugin in `src/plugins/index.ts` via `formSubmissionOverrides`.

## Implementation Phases

### 1. Data Model & Types
- `SubmissionMetadata` covers (UTM params, click IDs, referer, user agent, IP address, device locale, etc.).
- `normaliseSubmissionMetadata` defaults all new keys to `null` so downstream consumers can rely on explicit values.
- Persist metadata by appending `{ field, value }` entries to `submissionData`, mirroring the existing submission payload shape that downstream tools already consume.

### 2. Client Metadata Collection
- Utility (e.g., `src/lib/forms/collectClientMetadata.ts`):
  - Parses `window.location.search` for common UTM params (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`).
  - Automatically captures click IDs (`gclid`, `fbclid`, `ttclid`, etc.) and the referer URL.
- Reads cached attribution data from storage (cookie/localStorage) so subsequent pages share the same metadata.
- Persist UTMs and click IDs in local storage for 90 days, expiring the cache after the attribution window.
  - Extracts browser data that can only be trusted client-side (user agent string, language, screen size if desired).
- React hook `useSubmissionMetadata` wraps the utility, delays execution until client-side, and returns a shape compatible with `useFormSubmission`.
- Form-rendering entry points pass the hook’s metadata into `useFormSubmission`, ensuring existing callers keep working if they already supply custom metadata (merge them).
- Gate the storage layer behind a feature flag/env `NEXT_PUBLIC_FORM_METADATA_STORAGE` to simplify rollout if needed (enabled by default).

### 3. Server Enrichment & Persistence (Optional in the future)
- In `submitFormAction`, enrich the metadata with server-derived values:
  - Extract IP from the request (prefer `x-forwarded-for`, fall back to `headers().get('x-real-ip')` or similar).
  - Re-derive `user-agent` on the server for trustworthiness (ignore client-provided override if different).
  - Capture the request referrer if available.
- Create a helper (`mergeSubmissionMetadata`) that combines client and server data with precedence rules (server wins for sensitive fields).
- Persist the merged metadata values by converting each key/value into a `submissionData` record before calling `payload.create`, keeping the stored structure consistent with form field submissions.
- Update logging to include the extra metadata in error contexts with privacy (avoid leaking entire IP in logs if not necessary).

### 4. HubSpot Forwarding Enhancements
- `buildContext` in `src/lib/forms/hubspot.ts` populates only the keys HubSpot Forms v3 accepts on `context` (`hutk`, `ipAddress`, `pageName`, `pageUri`, `pageId`, `sfdcCampaignId`, `goToWebinarWebinarKey`). The remaining metadata (UTMs, click IDs, user agent, etc.) is mapped through standard form fields instead. **Hutk is not being collected yet.**
- Check that each forwarded metadata field is configured in the target HubSpot form before adding it; otherwise skip it or rely on the limited context properties to avoid API errors.




