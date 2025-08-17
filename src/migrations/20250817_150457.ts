import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "featuresBlock_columns_locales" ALTER COLUMN "content_subtitle" SET DATA TYPE jsonb;
  ALTER TABLE "_featuresBlock_v_columns_locales" ALTER COLUMN "content_subtitle" SET DATA TYPE jsonb;
  ALTER TABLE "featuresBlock_columns_locales" DROP COLUMN "rich_text_content";
  ALTER TABLE "_featuresBlock_v_columns_locales" DROP COLUMN "rich_text_content";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "featuresBlock_columns_locales" ALTER COLUMN "content_subtitle" SET DATA TYPE varchar;
  ALTER TABLE "_featuresBlock_v_columns_locales" ALTER COLUMN "content_subtitle" SET DATA TYPE varchar;
  ALTER TABLE "featuresBlock_columns_locales" ADD COLUMN "rich_text_content" jsonb;
  ALTER TABLE "_featuresBlock_v_columns_locales" ADD COLUMN "rich_text_content" jsonb;`)
}
