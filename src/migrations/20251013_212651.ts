import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "_categories_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"doc_id" uuid,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE "_categories_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_parent_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "_categories_v_locales" (
  	"version_title" varchar NOT NULL,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

  DROP INDEX "categories_slug_idx";
  ALTER TABLE "categories_locales" ADD COLUMN "slug" varchar;
  ALTER TABLE "categories_locales" ADD COLUMN "slug_lock" boolean DEFAULT true;
  ALTER TABLE "users" ADD COLUMN "author_login" varchar;
  ALTER TABLE "_categories_v_version_breadcrumbs" ADD CONSTRAINT "_categories_v_version_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_version_breadcrumbs" ADD CONSTRAINT "_categories_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_version_parent_id_categories_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_locales" ADD CONSTRAINT "_categories_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_categories_v_version_breadcrumbs_order_idx" ON "_categories_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_categories_v_version_breadcrumbs_parent_id_idx" ON "_categories_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_version_breadcrumbs_locale_idx" ON "_categories_v_version_breadcrumbs" USING btree ("_locale");
  CREATE INDEX "_categories_v_version_breadcrumbs_doc_idx" ON "_categories_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_categories_v_parent_idx" ON "_categories_v" USING btree ("parent_id");
  CREATE INDEX "_categories_v_version_version_parent_idx" ON "_categories_v" USING btree ("version_parent_id");
  CREATE INDEX "_categories_v_version_version_updated_at_idx" ON "_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_categories_v_version_version_created_at_idx" ON "_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_categories_v_created_at_idx" ON "_categories_v" USING btree ("created_at");
  CREATE INDEX "_categories_v_updated_at_idx" ON "_categories_v" USING btree ("updated_at");
  CREATE INDEX "_categories_v_version_version_slug_idx" ON "_categories_v_locales" USING btree ("version_slug","_locale");
  CREATE UNIQUE INDEX "_categories_v_locales_locale_parent_id_unique" ON "_categories_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categories_slug_idx" ON "categories_locales" USING btree ("slug","_locale");

  -- Copy slug from base tables into their locale tables
  UPDATE "categories_locales" AS loc
  SET "slug" = base."slug"
  FROM "categories" AS base
  WHERE loc."_parent_id" = base."id"
  AND base."slug" IS NOT NULL;


  ALTER TABLE "categories" DROP COLUMN "slug";
  ALTER TABLE "categories" DROP COLUMN "slug_lock";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_categories_v_version_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categories_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_categories_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_categories_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_categories_v" CASCADE;
  DROP TABLE "_categories_v_locales" CASCADE;
  DROP INDEX "categories_slug_idx";
  ALTER TABLE "categories" ADD COLUMN "slug" varchar;
  ALTER TABLE "categories" ADD COLUMN "slug_lock" boolean DEFAULT true;
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  ALTER TABLE "categories_locales" DROP COLUMN "slug";
  ALTER TABLE "categories_locales" DROP COLUMN "slug_lock";
  ALTER TABLE "users" DROP COLUMN "author_login";`)
}
