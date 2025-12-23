# Deploy to Cloudflare with OpenNext (from GitHub)

This guide is tailored to this repo's Cloudflare + OpenNext setup. It covers the required Cloudflare resources, bindings, environment variables, and a GitHub Actions deployment flow.

## Architecture snapshot

- Next.js 15 + Payload CMS run inside a single Cloudflare Worker via OpenNext.
- Postgres is accessed through Cloudflare Hyperdrive.
- Media storage uses R2 in production (S3 is only enabled on Vercel).
- Next.js cache uses R2 for incremental cache and D1 for tag cache.

## Required Cloudflare resources

### 1) Postgres + Hyperdrive

1. Create a Postgres database (Neon, Supabase, RDS, etc).
2. Create a Hyperdrive config in Cloudflare that points to the Postgres connection string.
3. Put the Hyperdrive ID into `wrangler.jsonc` under the `hyperdrive` binding `HYPERDRIVE`.

### 2) R2 buckets

Create two buckets and map them to bindings:

- `NEXT_INC_CACHE_R2_BUCKET` -> bucket `marn-web-inc-cache` (Next.js incremental cache)
- `MARN_WEB_MEDIA` -> bucket `marn-web` (Payload media)

If you use different bucket names, update `wrangler.jsonc`.

### 3) D1 database

Create a D1 database and map it to:

- `NEXT_TAG_CACHE_D1` -> database `marn-tag-cache`

Update the `database_id` in `wrangler.jsonc`.

### 4) Service binding

- `WORKER_SELF_REFERENCE` should point to the deployed worker name (default: `marn-web`).

### 5) Assets binding

- `ASSETS` is produced by the OpenNext build (`.open-next/assets`). No manual setup required.

## Repo configuration

### `wrangler.jsonc`

Ensure these entries are correct:

- `name` (worker name)
- Hyperdrive `id`
- R2 bucket names
- D1 `database_id`

### `open-next.config.ts`

Uses R2 + D1 cache overrides. Keep as-is unless you intend to change cache strategy.

## Environment variables

Set these in Cloudflare Worker settings (production environment). Values are read by Next/Payload.

### Build-time vs runtime variables

OpenNext builds a worker bundle first, then runs it on Cloudflare. Keep these separate:

- **Build-time**: variables used during `opennextjs-cloudflare build` (CI or local build env).
- **Runtime**: variables defined in Cloudflare Worker settings (what the worker sees at request time).

If a value is needed at runtime (for example, Payload secrets or storage URLs), define it in Cloudflare Worker settings. If a value is only used during build, set it in your CI environment.

### Required

- `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE` - Postgres connection string used by cloudflare outside of worker environment
- `PAYLOAD_SECRET` - Payload auth/session secret.
- `PREVIEW_SECRET` - used by `/next/preview` route.
- `CRON_SECRET` - protects Payload job endpoint.
- `NEXT_PUBLIC_SERVER_URL` - public site URL.
- `NEXT_PUBLIC_MEDIA_URL` - public base URL for media assets.
- `RESEND_API_KEY` - Payload email adapter.
- `RESEND_EMAIL` - default From address.

### Optional (feature-dependent)

- `HUBSPOT_ACCESS_TOKEN` - HubSpot forms integration.
- `GEMINI_API_KEY` - AI translator plugin.
- `NEXT_PUBLIC_SENTRY_DSN` - if you wire up Sentry.
- `WP_USER`, `WP_PASS` - only used by migration scripts.

### Special build-time variables

- `CLOUDFLARE_ACCOUNT_ID` - Cloudflar account ID
- `CF_ACCOUNT_ID` - Cloudflar account ID
- `CLOUDFLARE_API_TOKEN` - Token with bucket read/write permissions
- `R2_ACCESS_KEY_ID` - Cloudflare API key for bulk static assets upload
- `R2_SECRET_ACCESS_KEY` - Cloudflare API key for bulk static assets upload
- `R2_ENDPOINT` - Cloudflare ccount endpoint

### Notes

- `DATABASE_URI` is not used by Cloudflare runtime; it is used by local tooling/drizzle.

## Storage setup details (R2)

`MARN_WEB_MEDIA` is used by Payload's R2 storage adapter. `NEXT_PUBLIC_MEDIA_URL` should be a public URL that serves the R2 bucket content. Options:

- Enable R2 public access and use the public bucket URL.
- Or serve the bucket via a custom domain/worker and use that URL.

Payload generates URLs like:

```
${NEXT_PUBLIC_MEDIA_URL}/media/<filename>
```

## Build and deploy

### Local deploy

```bash
pnpm install
pnpm deploy:database
pnpm deploy:app
```

`pnpm deploy:database` runs Payload migrations. `push` is disabled, so migrations are required.

You must create a Cloudflare API token with Workers/R2/D1/Hyperdrive permissions and either:

- run `wrangler login` (local), or
- set `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` in your environment (local/CI).

### GitHub Actions deploy

Add repo secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Example workflow:

```yaml
name: Deploy to Cloudflare
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install
      - run: pnpm deploy:database
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
      - run: pnpm deploy:app
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

If you use Wrangler environments, set `CLOUDFLARE_ENV` before migrations so the correct bindings are used.

## Post-deploy checks

- Visit `/admin` to verify Payload admin loads.
- Upload a media item and verify it is stored in R2 and publicly accessible.
- Test a preview URL using `PREVIEW_SECRET`.
- Submit a form if HubSpot integration is enabled.

## References in this repo

- `open-next.config.ts`
- `wrangler.jsonc`
- `src/payload.config.ts`
- `worker.tsx`
- `package.json`
