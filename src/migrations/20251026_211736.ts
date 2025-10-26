import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_tabs_nav_items_locales" ADD COLUMN "default_link_description" varchar;
  ALTER TABLE "header_tabs_nav_items_locales" ADD COLUMN "featured_link_tag" varchar;
  ALTER TABLE "header_tabs_nav_items_locales" ADD COLUMN "featured_link_label" jsonb;
  ALTER TABLE "header_tabs_nav_items_locales" ADD COLUMN "list_links_tag" varchar;
  ALTER TABLE "header_tabs_nav_items" DROP COLUMN "default_link_description";
  ALTER TABLE "header_tabs_nav_items" DROP COLUMN "featured_link_tag";
  ALTER TABLE "header_tabs_nav_items" DROP COLUMN "featured_link_label";
  ALTER TABLE "header_tabs_nav_items" DROP COLUMN "list_links_tag";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_tabs_nav_items" ADD COLUMN "default_link_description" varchar;
  ALTER TABLE "header_tabs_nav_items" ADD COLUMN "featured_link_tag" varchar;
  ALTER TABLE "header_tabs_nav_items" ADD COLUMN "featured_link_label" jsonb;
  ALTER TABLE "header_tabs_nav_items" ADD COLUMN "list_links_tag" varchar;
  ALTER TABLE "header_tabs_nav_items_locales" DROP COLUMN "default_link_description";
  ALTER TABLE "header_tabs_nav_items_locales" DROP COLUMN "featured_link_tag";
  ALTER TABLE "header_tabs_nav_items_locales" DROP COLUMN "featured_link_label";
  ALTER TABLE "header_tabs_nav_items_locales" DROP COLUMN "list_links_tag";`)
}
