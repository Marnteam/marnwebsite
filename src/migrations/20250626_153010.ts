import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_posts_status" RENAME TO "enum_blog_posts_status";
  ALTER TYPE "public"."enum__posts_v_version_status" RENAME TO "enum__blog_posts_v_version_status";
  ALTER TYPE "public"."enum__posts_v_published_locale" RENAME TO "enum__blog_posts_v_published_locale";
  ALTER TABLE "posts_populated_authors" RENAME TO "blog_posts_populated_authors";
  ALTER TABLE "posts" RENAME TO "blog_posts";
  ALTER TABLE "posts_locales" RENAME TO "blog_posts_locales";
  ALTER TABLE "posts_rels" RENAME TO "blog_posts_rels";
  ALTER TABLE "_posts_v_version_populated_authors" RENAME TO "_blog_posts_v_version_populated_authors";
  ALTER TABLE "_posts_v" RENAME TO "_blog_posts_v";
  ALTER TABLE "_posts_v_locales" RENAME TO "_blog_posts_v_locales";
  ALTER TABLE "_posts_v_rels" RENAME TO "_blog_posts_v_rels";
  ALTER TABLE "pages_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "_pages_v_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "blog_posts_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "_blog_posts_v_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "solutions_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "_solutions_v_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "integrations_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "_integrations_v_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "customers_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "_customers_v_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "redirects_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "search_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "settings_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "header_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "footer_rels" RENAME COLUMN "posts_id" TO "blog_posts_id";
  ALTER TABLE "blogBlock" DROP CONSTRAINT "blogBlock_featured_post_id_posts_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_posts_fk";
  
  ALTER TABLE "_blogBlock_v" DROP CONSTRAINT "_blogBlock_v_featured_post_id_posts_id_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_posts_fk";
  
  ALTER TABLE "blog_posts_populated_authors" DROP CONSTRAINT "posts_populated_authors_parent_id_fk";
  
  ALTER TABLE "blog_posts_locales" DROP CONSTRAINT "posts_locales_hero_image_id_media_id_fk";
  
  ALTER TABLE "blog_posts_locales" DROP CONSTRAINT "posts_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "blog_posts_locales" DROP CONSTRAINT "posts_locales_parent_id_fk";
  
  ALTER TABLE "blog_posts_rels" DROP CONSTRAINT "posts_rels_parent_fk";
  
  ALTER TABLE "blog_posts_rels" DROP CONSTRAINT "posts_rels_posts_fk";
  
  ALTER TABLE "blog_posts_rels" DROP CONSTRAINT "posts_rels_categories_fk";
  
  ALTER TABLE "blog_posts_rels" DROP CONSTRAINT "posts_rels_users_fk";
  
  ALTER TABLE "_blog_posts_v_version_populated_authors" DROP CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk";
  
  ALTER TABLE "_blog_posts_v" DROP CONSTRAINT "_posts_v_parent_id_posts_id_fk";
  
  ALTER TABLE "_blog_posts_v_locales" DROP CONSTRAINT "_posts_v_locales_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "_blog_posts_v_locales" DROP CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "_blog_posts_v_locales" DROP CONSTRAINT "_posts_v_locales_parent_id_fk";
  
  ALTER TABLE "_blog_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_parent_fk";
  
  ALTER TABLE "_blog_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_posts_fk";
  
  ALTER TABLE "_blog_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_categories_fk";
  
  ALTER TABLE "_blog_posts_v_rels" DROP CONSTRAINT "_posts_v_rels_users_fk";
  
  ALTER TABLE "solutions_rels" DROP CONSTRAINT "solutions_rels_posts_fk";
  
  ALTER TABLE "_solutions_v_rels" DROP CONSTRAINT "_solutions_v_rels_posts_fk";
  
  ALTER TABLE "integrations_rels" DROP CONSTRAINT "integrations_rels_posts_fk";
  
  ALTER TABLE "_integrations_v_rels" DROP CONSTRAINT "_integrations_v_rels_posts_fk";
  
  ALTER TABLE "customers_rels" DROP CONSTRAINT "customers_rels_posts_fk";
  
  ALTER TABLE "_customers_v_rels" DROP CONSTRAINT "_customers_v_rels_posts_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_posts_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "settings_rels" DROP CONSTRAINT "settings_rels_posts_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_posts_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_posts_fk";
  
  DROP INDEX IF EXISTS "pages_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_posts_id_idx";
  DROP INDEX IF EXISTS "posts_populated_authors_order_idx";
  DROP INDEX IF EXISTS "posts_populated_authors_parent_id_idx";
  DROP INDEX IF EXISTS "posts_slug_idx";
  DROP INDEX IF EXISTS "posts_updated_at_idx";
  DROP INDEX IF EXISTS "posts_created_at_idx";
  DROP INDEX IF EXISTS "posts__status_idx";
  DROP INDEX IF EXISTS "posts_hero_image_idx";
  DROP INDEX IF EXISTS "posts_meta_meta_image_idx";
  DROP INDEX IF EXISTS "posts_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "posts_rels_order_idx";
  DROP INDEX IF EXISTS "posts_rels_parent_idx";
  DROP INDEX IF EXISTS "posts_rels_path_idx";
  DROP INDEX IF EXISTS "posts_rels_locale_idx";
  DROP INDEX IF EXISTS "posts_rels_posts_id_idx";
  DROP INDEX IF EXISTS "posts_rels_categories_id_idx";
  DROP INDEX IF EXISTS "posts_rels_users_id_idx";
  DROP INDEX IF EXISTS "_posts_v_version_populated_authors_order_idx";
  DROP INDEX IF EXISTS "_posts_v_version_populated_authors_parent_id_idx";
  DROP INDEX IF EXISTS "_posts_v_parent_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_slug_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_updated_at_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_created_at_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version__status_idx";
  DROP INDEX IF EXISTS "_posts_v_created_at_idx";
  DROP INDEX IF EXISTS "_posts_v_updated_at_idx";
  DROP INDEX IF EXISTS "_posts_v_snapshot_idx";
  DROP INDEX IF EXISTS "_posts_v_published_locale_idx";
  DROP INDEX IF EXISTS "_posts_v_latest_idx";
  DROP INDEX IF EXISTS "_posts_v_version_version_hero_image_idx";
  DROP INDEX IF EXISTS "_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX IF EXISTS "_posts_v_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_posts_v_rels_order_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_parent_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_path_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_locale_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_categories_id_idx";
  DROP INDEX IF EXISTS "_posts_v_rels_users_id_idx";
  DROP INDEX IF EXISTS "solutions_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_solutions_v_rels_posts_id_idx";
  DROP INDEX IF EXISTS "integrations_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_integrations_v_rels_posts_id_idx";
  DROP INDEX IF EXISTS "customers_rels_posts_id_idx";
  DROP INDEX IF EXISTS "_customers_v_rels_posts_id_idx";
  DROP INDEX IF EXISTS "redirects_rels_posts_id_idx";
  DROP INDEX IF EXISTS "search_rels_posts_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_posts_id_idx";
  DROP INDEX IF EXISTS "settings_rels_posts_id_idx";
  DROP INDEX IF EXISTS "header_rels_posts_id_idx";
  DROP INDEX IF EXISTS "footer_rels_posts_id_idx";
  DO $$ BEGIN
   ALTER TABLE "blogBlock" ADD CONSTRAINT "blogBlock_featured_post_id_blog_posts_id_fk" FOREIGN KEY ("featured_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blogBlock_v" ADD CONSTRAINT "_blogBlock_v_featured_post_id_blog_posts_id_fk" FOREIGN KEY ("featured_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_populated_authors" ADD CONSTRAINT "blog_posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_locales" ADD CONSTRAINT "blog_posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_posts_rels" ADD CONSTRAINT "blog_posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_version_populated_authors" ADD CONSTRAINT "_blog_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_locales" ADD CONSTRAINT "_blog_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blog_posts_v_rels" ADD CONSTRAINT "_blog_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "solutions_rels" ADD CONSTRAINT "solutions_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_solutions_v_rels" ADD CONSTRAINT "_solutions_v_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "integrations_rels" ADD CONSTRAINT "integrations_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_integrations_v_rels" ADD CONSTRAINT "_integrations_v_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "customers_rels" ADD CONSTRAINT "customers_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_customers_v_rels" ADD CONSTRAINT "_customers_v_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "settings_rels" ADD CONSTRAINT "settings_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_blog_posts_id_idx" ON "pages_rels" USING btree ("blog_posts_id","locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_blog_posts_id_idx" ON "_pages_v_rels" USING btree ("blog_posts_id","locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_populated_authors_order_idx" ON "blog_posts_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_posts_populated_authors_parent_id_idx" ON "blog_posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blog_posts__status_idx" ON "blog_posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "blog_posts_hero_image_idx" ON "blog_posts_locales" USING btree ("hero_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_meta_meta_image_idx" ON "blog_posts_locales" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "blog_posts_locales_locale_parent_id_unique" ON "blog_posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_order_idx" ON "blog_posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_parent_idx" ON "blog_posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_path_idx" ON "blog_posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_locale_idx" ON "blog_posts_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_blog_posts_id_idx" ON "blog_posts_rels" USING btree ("blog_posts_id","locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_categories_id_idx" ON "blog_posts_rels" USING btree ("categories_id","locale");
  CREATE INDEX IF NOT EXISTS "blog_posts_rels_users_id_idx" ON "blog_posts_rels" USING btree ("users_id","locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_populated_authors_order_idx" ON "_blog_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_populated_authors_parent_id_idx" ON "_blog_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_parent_idx" ON "_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_slug_idx" ON "_blog_posts_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_updated_at_idx" ON "_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_created_at_idx" ON "_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version__status_idx" ON "_blog_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_created_at_idx" ON "_blog_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_updated_at_idx" ON "_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_snapshot_idx" ON "_blog_posts_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_published_locale_idx" ON "_blog_posts_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_latest_idx" ON "_blog_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_version_hero_image_idx" ON "_blog_posts_v_locales" USING btree ("version_hero_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_version_meta_version_meta_image_idx" ON "_blog_posts_v_locales" USING btree ("version_meta_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_blog_posts_v_locales_locale_parent_id_unique" ON "_blog_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_order_idx" ON "_blog_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_parent_idx" ON "_blog_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_path_idx" ON "_blog_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_locale_idx" ON "_blog_posts_v_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_blog_posts_id_idx" ON "_blog_posts_v_rels" USING btree ("blog_posts_id","locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_categories_id_idx" ON "_blog_posts_v_rels" USING btree ("categories_id","locale");
  CREATE INDEX IF NOT EXISTS "_blog_posts_v_rels_users_id_idx" ON "_blog_posts_v_rels" USING btree ("users_id","locale");
  CREATE INDEX IF NOT EXISTS "solutions_rels_blog_posts_id_idx" ON "solutions_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "_solutions_v_rels_blog_posts_id_idx" ON "_solutions_v_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "integrations_rels_blog_posts_id_idx" ON "integrations_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "_integrations_v_rels_blog_posts_id_idx" ON "_integrations_v_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "customers_rels_blog_posts_id_idx" ON "customers_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "_customers_v_rels_blog_posts_id_idx" ON "_customers_v_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_blog_posts_id_idx" ON "redirects_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "search_rels_blog_posts_id_idx" ON "search_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "settings_rels_blog_posts_id_idx" ON "settings_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "header_rels_blog_posts_id_idx" ON "header_rels" USING btree ("blog_posts_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_blog_posts_id_idx" ON "footer_rels" USING btree ("blog_posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_blog_posts_status" RENAME TO "enum_posts_status";
  ALTER TYPE "public"."enum__blog_posts_v_version_status" RENAME TO "enum__posts_v_version_status";
  ALTER TYPE "public"."enum__blog_posts_v_published_locale" RENAME TO "enum__posts_v_published_locale";
  ALTER TABLE "blog_posts_populated_authors" RENAME TO "posts_populated_authors";
  ALTER TABLE "blog_posts" RENAME TO "posts";
  ALTER TABLE "blog_posts_locales" RENAME TO "posts_locales";
  ALTER TABLE "blog_posts_rels" RENAME TO "posts_rels";
  ALTER TABLE "_blog_posts_v_version_populated_authors" RENAME TO "_posts_v_version_populated_authors";
  ALTER TABLE "_blog_posts_v" RENAME TO "_posts_v";
  ALTER TABLE "_blog_posts_v_locales" RENAME TO "_posts_v_locales";
  ALTER TABLE "_blog_posts_v_rels" RENAME TO "_posts_v_rels";
  ALTER TABLE "pages_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "_pages_v_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "posts_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "_posts_v_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "solutions_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "_solutions_v_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "integrations_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "_integrations_v_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "customers_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "_customers_v_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "redirects_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "search_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "settings_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "header_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "footer_rels" RENAME COLUMN "blog_posts_id" TO "posts_id";
  ALTER TABLE "blogBlock" DROP CONSTRAINT "blogBlock_featured_post_id_blog_posts_id_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_blog_posts_fk";
  
  ALTER TABLE "_blogBlock_v" DROP CONSTRAINT "_blogBlock_v_featured_post_id_blog_posts_id_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_blog_posts_fk";
  
  ALTER TABLE "posts_populated_authors" DROP CONSTRAINT "blog_posts_populated_authors_parent_id_fk";
  
  ALTER TABLE "posts_locales" DROP CONSTRAINT "blog_posts_locales_hero_image_id_media_id_fk";
  
  ALTER TABLE "posts_locales" DROP CONSTRAINT "blog_posts_locales_meta_image_id_media_id_fk";
  
  ALTER TABLE "posts_locales" DROP CONSTRAINT "blog_posts_locales_parent_id_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "blog_posts_rels_parent_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "blog_posts_rels_blog_posts_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "blog_posts_rels_categories_fk";
  
  ALTER TABLE "posts_rels" DROP CONSTRAINT "blog_posts_rels_users_fk";
  
  ALTER TABLE "_posts_v_version_populated_authors" DROP CONSTRAINT "_blog_posts_v_version_populated_authors_parent_id_fk";
  
  ALTER TABLE "_posts_v" DROP CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk";
  
  ALTER TABLE "_posts_v_locales" DROP CONSTRAINT "_blog_posts_v_locales_version_hero_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v_locales" DROP CONSTRAINT "_blog_posts_v_locales_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "_posts_v_locales" DROP CONSTRAINT "_blog_posts_v_locales_parent_id_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_blog_posts_v_rels_parent_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_blog_posts_v_rels_blog_posts_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_blog_posts_v_rels_categories_fk";
  
  ALTER TABLE "_posts_v_rels" DROP CONSTRAINT "_blog_posts_v_rels_users_fk";
  
  ALTER TABLE "solutions_rels" DROP CONSTRAINT "solutions_rels_blog_posts_fk";
  
  ALTER TABLE "_solutions_v_rels" DROP CONSTRAINT "_solutions_v_rels_blog_posts_fk";
  
  ALTER TABLE "integrations_rels" DROP CONSTRAINT "integrations_rels_blog_posts_fk";
  
  ALTER TABLE "_integrations_v_rels" DROP CONSTRAINT "_integrations_v_rels_blog_posts_fk";
  
  ALTER TABLE "customers_rels" DROP CONSTRAINT "customers_rels_blog_posts_fk";
  
  ALTER TABLE "_customers_v_rels" DROP CONSTRAINT "_customers_v_rels_blog_posts_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_blog_posts_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_blog_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_posts_fk";
  
  ALTER TABLE "settings_rels" DROP CONSTRAINT "settings_rels_blog_posts_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_blog_posts_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_blog_posts_fk";
  
  DROP INDEX IF EXISTS "pages_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "_pages_v_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "blog_posts_populated_authors_order_idx";
  DROP INDEX IF EXISTS "blog_posts_populated_authors_parent_id_idx";
  DROP INDEX IF EXISTS "blog_posts_slug_idx";
  DROP INDEX IF EXISTS "blog_posts_updated_at_idx";
  DROP INDEX IF EXISTS "blog_posts_created_at_idx";
  DROP INDEX IF EXISTS "blog_posts__status_idx";
  DROP INDEX IF EXISTS "blog_posts_hero_image_idx";
  DROP INDEX IF EXISTS "blog_posts_meta_meta_image_idx";
  DROP INDEX IF EXISTS "blog_posts_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "blog_posts_rels_order_idx";
  DROP INDEX IF EXISTS "blog_posts_rels_parent_idx";
  DROP INDEX IF EXISTS "blog_posts_rels_path_idx";
  DROP INDEX IF EXISTS "blog_posts_rels_locale_idx";
  DROP INDEX IF EXISTS "blog_posts_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "blog_posts_rels_categories_id_idx";
  DROP INDEX IF EXISTS "blog_posts_rels_users_id_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_version_populated_authors_order_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_version_populated_authors_parent_id_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_parent_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_version_version_slug_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_version_version_updated_at_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_version_version_created_at_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_version_version__status_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_created_at_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_updated_at_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_snapshot_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_published_locale_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_latest_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_version_version_hero_image_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_version_meta_version_meta_image_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_locales_locale_parent_id_unique";
  DROP INDEX IF EXISTS "_blog_posts_v_rels_order_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_rels_parent_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_rels_path_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_rels_locale_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_rels_categories_id_idx";
  DROP INDEX IF EXISTS "_blog_posts_v_rels_users_id_idx";
  DROP INDEX IF EXISTS "solutions_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "_solutions_v_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "integrations_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "_integrations_v_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "customers_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "_customers_v_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "redirects_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "search_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "settings_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "header_rels_blog_posts_id_idx";
  DROP INDEX IF EXISTS "footer_rels_blog_posts_id_idx";
  DO $$ BEGIN
   ALTER TABLE "blogBlock" ADD CONSTRAINT "blogBlock_featured_post_id_posts_id_fk" FOREIGN KEY ("featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blogBlock_v" ADD CONSTRAINT "_blogBlock_v_featured_post_id_posts_id_fk" FOREIGN KEY ("featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "solutions_rels" ADD CONSTRAINT "solutions_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_solutions_v_rels" ADD CONSTRAINT "_solutions_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "integrations_rels" ADD CONSTRAINT "integrations_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_integrations_v_rels" ADD CONSTRAINT "_integrations_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "customers_rels" ADD CONSTRAINT "customers_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_customers_v_rels" ADD CONSTRAINT "_customers_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "settings_rels" ADD CONSTRAINT "settings_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id","locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "posts_hero_image_idx" ON "posts_locales" USING btree ("hero_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "posts_rels_locale_idx" ON "posts_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id","locale");
  CREATE INDEX IF NOT EXISTS "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id","locale");
  CREATE INDEX IF NOT EXISTS "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id","locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX IF NOT EXISTS "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_version_hero_image_idx" ON "_posts_v_locales" USING btree ("version_hero_image_id","_locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_locale_idx" ON "_posts_v_rels" USING btree ("locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id","locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id","locale");
  CREATE INDEX IF NOT EXISTS "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id","locale");
  CREATE INDEX IF NOT EXISTS "solutions_rels_posts_id_idx" ON "solutions_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_solutions_v_rels_posts_id_idx" ON "_solutions_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "integrations_rels_posts_id_idx" ON "integrations_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_integrations_v_rels_posts_id_idx" ON "_integrations_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "customers_rels_posts_id_idx" ON "customers_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "_customers_v_rels_posts_id_idx" ON "_customers_v_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "settings_rels_posts_id_idx" ON "settings_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX IF NOT EXISTS "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");`)
}
