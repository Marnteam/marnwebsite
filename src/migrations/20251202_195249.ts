import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_scrollEffectBlock_columns_badge_type" AS ENUM('label', 'reference');
  CREATE TYPE "public"."enum_scrollEffectBlock_block_header_type" AS ENUM('center', 'split', 'start');
  CREATE TYPE "public"."enum_scrollEffectBlock_block_header_badge_type" AS ENUM('label', 'reference');
  CREATE TYPE "public"."enum_scrollEffectBlock_type" AS ENUM('01', '02', '03');
  CREATE TYPE "public"."enum__scrollEffectBlock_v_columns_badge_type" AS ENUM('label', 'reference');
  CREATE TYPE "public"."enum__scrollEffectBlock_v_block_header_type" AS ENUM('center', 'split', 'start');
  CREATE TYPE "public"."enum__scrollEffectBlock_v_block_header_badge_type" AS ENUM('label', 'reference');
  CREATE TYPE "public"."enum__scrollEffectBlock_v_type" AS ENUM('01', '02', '03');
  CREATE TABLE "scrollEffectBlock_block_header_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_color" "link_color" DEFAULT 'neutral',
  	"link_variant" "link_variant" DEFAULT 'primary'
  );

  CREATE TABLE "scrollEffectBlock_block_header_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "scrollEffectBlock_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"enable_badge" boolean,
  	"enable_cta" boolean,
  	"badge_type" "enum_scrollEffectBlock_columns_badge_type",
  	"badge_color" "badge_color" DEFAULT 'gray',
  	"badge_icon" varchar,
  	"badge_icon_position" "badge_icon_position" DEFAULT 'flex-row',
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );

  CREATE TABLE "scrollEffectBlock_columns_locales" (
  	"tab_label" varchar,
  	"image_id" uuid,
  	"content_title" varchar,
  	"content_subtitle" jsonb DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb,
  	"badge_label" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "scrollEffectBlock" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_header_type" "enum_scrollEffectBlock_block_header_type" DEFAULT 'center',
  	"block_header_badge_type" "enum_scrollEffectBlock_block_header_badge_type",
  	"block_header_badge_color" "badge_color" DEFAULT 'gray',
  	"block_header_badge_icon" varchar,
  	"block_header_badge_icon_position" "badge_icon_position" DEFAULT 'flex-row',
  	"type" "enum_scrollEffectBlock_type" DEFAULT '01',
  	"block_name" varchar
  );

  CREATE TABLE "scrollEffectBlock_locales" (
  	"block_header_badge_label" varchar,
  	"block_header_header_text" jsonb DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "_scrollEffectBlock_v_block_header_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_color" "link_color" DEFAULT 'neutral',
  	"link_variant" "link_variant" DEFAULT 'primary',
  	"_uuid" varchar
  );

  CREATE TABLE "_scrollEffectBlock_v_block_header_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

  CREATE TABLE "_scrollEffectBlock_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"icon" varchar,
  	"enable_badge" boolean,
  	"enable_cta" boolean,
  	"badge_type" "enum__scrollEffectBlock_v_columns_badge_type",
  	"badge_color" "badge_color" DEFAULT 'gray',
  	"badge_icon" varchar,
  	"badge_icon_position" "badge_icon_position" DEFAULT 'flex-row',
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );

  CREATE TABLE "_scrollEffectBlock_v_columns_locales" (
  	"tab_label" varchar,
  	"image_id" uuid,
  	"content_title" varchar,
  	"content_subtitle" jsonb DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb,
  	"badge_label" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

  CREATE TABLE "_scrollEffectBlock_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"block_header_type" "enum__scrollEffectBlock_v_block_header_type" DEFAULT 'center',
  	"block_header_badge_type" "enum__scrollEffectBlock_v_block_header_badge_type",
  	"block_header_badge_color" "badge_color" DEFAULT 'gray',
  	"block_header_badge_icon" varchar,
  	"block_header_badge_icon_position" "badge_icon_position" DEFAULT 'flex-row',
  	"type" "enum__scrollEffectBlock_v_type" DEFAULT '01',
  	"_uuid" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "_scrollEffectBlock_v_locales" (
  	"block_header_badge_label" varchar,
  	"block_header_header_text" jsonb DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

  ALTER TABLE "scrollEffectBlock_block_header_links" ADD CONSTRAINT "scrollEffectBlock_block_header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scrollEffectBlock"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scrollEffectBlock_block_header_links_locales" ADD CONSTRAINT "scrollEffectBlock_block_header_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scrollEffectBlock_block_header_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scrollEffectBlock_columns" ADD CONSTRAINT "scrollEffectBlock_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scrollEffectBlock"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scrollEffectBlock_columns_locales" ADD CONSTRAINT "scrollEffectBlock_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "scrollEffectBlock_columns_locales" ADD CONSTRAINT "scrollEffectBlock_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scrollEffectBlock_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scrollEffectBlock" ADD CONSTRAINT "scrollEffectBlock_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scrollEffectBlock_locales" ADD CONSTRAINT "scrollEffectBlock_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scrollEffectBlock"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scrollEffectBlock_v_block_header_links" ADD CONSTRAINT "_scrollEffectBlock_v_block_header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scrollEffectBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scrollEffectBlock_v_block_header_links_locales" ADD CONSTRAINT "_scrollEffectBlock_v_block_header_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scrollEffectBlock_v_block_header_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scrollEffectBlock_v_columns" ADD CONSTRAINT "_scrollEffectBlock_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scrollEffectBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scrollEffectBlock_v_columns_locales" ADD CONSTRAINT "_scrollEffectBlock_v_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_scrollEffectBlock_v_columns_locales" ADD CONSTRAINT "_scrollEffectBlock_v_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scrollEffectBlock_v_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scrollEffectBlock_v" ADD CONSTRAINT "_scrollEffectBlock_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scrollEffectBlock_v_locales" ADD CONSTRAINT "_scrollEffectBlock_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scrollEffectBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "scrollEffectBlock_block_header_links_order_idx" ON "scrollEffectBlock_block_header_links" USING btree ("_order");
  CREATE INDEX "scrollEffectBlock_block_header_links_parent_id_idx" ON "scrollEffectBlock_block_header_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "scrollEffectBlock_block_header_links_locales_locale_parent_i" ON "scrollEffectBlock_block_header_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "scrollEffectBlock_columns_order_idx" ON "scrollEffectBlock_columns" USING btree ("_order");
  CREATE INDEX "scrollEffectBlock_columns_parent_id_idx" ON "scrollEffectBlock_columns" USING btree ("_parent_id");
  CREATE INDEX "scrollEffectBlock_columns_image_idx" ON "scrollEffectBlock_columns_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "scrollEffectBlock_columns_locales_locale_parent_id_unique" ON "scrollEffectBlock_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "scrollEffectBlock_order_idx" ON "scrollEffectBlock" USING btree ("_order");
  CREATE INDEX "scrollEffectBlock_parent_id_idx" ON "scrollEffectBlock" USING btree ("_parent_id");
  CREATE INDEX "scrollEffectBlock_path_idx" ON "scrollEffectBlock" USING btree ("_path");
  CREATE UNIQUE INDEX "scrollEffectBlock_locales_locale_parent_id_unique" ON "scrollEffectBlock_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_scrollEffectBlock_v_block_header_links_order_idx" ON "_scrollEffectBlock_v_block_header_links" USING btree ("_order");
  CREATE INDEX "_scrollEffectBlock_v_block_header_links_parent_id_idx" ON "_scrollEffectBlock_v_block_header_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_scrollEffectBlock_v_block_header_links_locales_locale_paren" ON "_scrollEffectBlock_v_block_header_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_scrollEffectBlock_v_columns_order_idx" ON "_scrollEffectBlock_v_columns" USING btree ("_order");
  CREATE INDEX "_scrollEffectBlock_v_columns_parent_id_idx" ON "_scrollEffectBlock_v_columns" USING btree ("_parent_id");
  CREATE INDEX "_scrollEffectBlock_v_columns_image_idx" ON "_scrollEffectBlock_v_columns_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_scrollEffectBlock_v_columns_locales_locale_parent_id_unique" ON "_scrollEffectBlock_v_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_scrollEffectBlock_v_order_idx" ON "_scrollEffectBlock_v" USING btree ("_order");
  CREATE INDEX "_scrollEffectBlock_v_parent_id_idx" ON "_scrollEffectBlock_v" USING btree ("_parent_id");
  CREATE INDEX "_scrollEffectBlock_v_path_idx" ON "_scrollEffectBlock_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_scrollEffectBlock_v_locales_locale_parent_id_unique" ON "_scrollEffectBlock_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "scrollEffectBlock_block_header_links" CASCADE;
  DROP TABLE "scrollEffectBlock_block_header_links_locales" CASCADE;
  DROP TABLE "scrollEffectBlock_columns" CASCADE;
  DROP TABLE "scrollEffectBlock_columns_locales" CASCADE;
  DROP TABLE "scrollEffectBlock" CASCADE;
  DROP TABLE "scrollEffectBlock_locales" CASCADE;
  DROP TABLE "_scrollEffectBlock_v_block_header_links" CASCADE;
  DROP TABLE "_scrollEffectBlock_v_block_header_links_locales" CASCADE;
  DROP TABLE "_scrollEffectBlock_v_columns" CASCADE;
  DROP TABLE "_scrollEffectBlock_v_columns_locales" CASCADE;
  DROP TABLE "_scrollEffectBlock_v" CASCADE;
  DROP TABLE "_scrollEffectBlock_v_locales" CASCADE;
  DROP TYPE "public"."enum_scrollEffectBlock_columns_badge_type";
  DROP TYPE "public"."enum_scrollEffectBlock_block_header_type";
  DROP TYPE "public"."enum_scrollEffectBlock_block_header_badge_type";
  DROP TYPE "public"."enum_scrollEffectBlock_type";
  DROP TYPE "public"."enum__scrollEffectBlock_v_columns_badge_type";
  DROP TYPE "public"."enum__scrollEffectBlock_v_block_header_type";
  DROP TYPE "public"."enum__scrollEffectBlock_v_block_header_badge_type";
  DROP TYPE "public"."enum__scrollEffectBlock_v_type";`)
}
