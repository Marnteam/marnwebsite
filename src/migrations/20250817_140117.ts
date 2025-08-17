import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "blog_posts_slug_idx";
  DROP INDEX "_blog_posts_v_version_version_slug_idx";
  ALTER TABLE "blog_posts_locales" ADD COLUMN "slug" varchar;
  ALTER TABLE "blog_posts_locales" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "_blog_posts_v_locales" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_blog_posts_v_locales" ADD COLUMN "version_slug_lock" boolean DEFAULT true;
  CREATE INDEX "blog_posts_slug_idx" ON "blog_posts_locales" USING btree ("slug","_locale");
  CREATE INDEX "_blog_posts_v_version_version_slug_idx" ON "_blog_posts_v_locales" USING btree ("version_slug","_locale");
  ALTER TABLE "blog_posts" DROP COLUMN "slug";
  ALTER TABLE "blog_posts" DROP COLUMN "slug_lock";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_slug";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "version_slug_lock";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "blog_posts_slug_idx";
  DROP INDEX "_blog_posts_v_version_version_slug_idx";
  ALTER TABLE "blog_posts" ADD COLUMN "slug" varchar;
  ALTER TABLE "blog_posts" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_slug" varchar;
  ALTER TABLE "_blog_posts_v" ADD COLUMN "version_slug_lock" boolean DEFAULT true;
  CREATE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
  CREATE INDEX "_blog_posts_v_version_version_slug_idx" ON "_blog_posts_v" USING btree ("version_slug");
  ALTER TABLE "blog_posts_locales" DROP COLUMN "slug";
  ALTER TABLE "blog_posts_locales" DROP COLUMN "slug_lock";
  ALTER TABLE "_blog_posts_v_locales" DROP COLUMN "version_slug";
  ALTER TABLE "_blog_posts_v_locales" DROP COLUMN "version_slug_lock";`)
}
