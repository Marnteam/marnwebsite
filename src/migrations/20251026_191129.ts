import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_tabs_nav_items_featured_link_links" ADD COLUMN "link_variant" "link_variant" DEFAULT 'primary';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_tabs_nav_items_featured_link_links" DROP COLUMN "link_variant";`)
}
