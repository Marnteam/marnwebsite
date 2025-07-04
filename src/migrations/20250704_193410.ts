import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "integrations_locales" ADD COLUMN "pricing" varchar;
  ALTER TABLE "_integrations_v_locales" ADD COLUMN "version_pricing" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "integrations_locales" DROP COLUMN IF EXISTS "pricing";
  ALTER TABLE "_integrations_v_locales" DROP COLUMN IF EXISTS "version_pricing";`)
}
