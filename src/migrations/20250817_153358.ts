import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_carouselBlock_columns_badge_type" AS ENUM('label', 'reference');
  CREATE TYPE "public"."enum_carouselBlock_block_header_type" AS ENUM('center', 'split', 'start');
  CREATE TYPE "public"."enum_carouselBlock_block_header_badge_type" AS ENUM('label', 'reference');
  CREATE TYPE "public"."enum_carouselBlock_type" AS ENUM('01', '02', '03', '04', '05');
  CREATE TYPE "public"."enum__carouselBlock_v_columns_badge_type" AS ENUM('label', 'reference');
  CREATE TYPE "public"."enum__carouselBlock_v_block_header_type" AS ENUM('center', 'split', 'start');
  CREATE TYPE "public"."enum__carouselBlock_v_block_header_badge_type" AS ENUM('label', 'reference');
  CREATE TYPE "public"."enum__carouselBlock_v_type" AS ENUM('01', '02', '03', '04', '05');
  CREATE TABLE "carouselBlock_block_header_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_color" "link_color" DEFAULT 'neutral',
  	"link_variant" "link_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "carouselBlock_block_header_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "carouselBlock_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"enable_badge" boolean,
  	"enable_cta" boolean,
  	"badge_type" "enum_carouselBlock_columns_badge_type",
  	"badge_color" "badge_color" DEFAULT 'blue',
  	"badge_icon" varchar,
  	"badge_icon_position" "badge_icon_position" DEFAULT 'flex-row',
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "carouselBlock_columns_locales" (
  	"tab_label" varchar,
  	"image_id" uuid,
  	"content_title" varchar,
  	"content_subtitle" jsonb,
  	"badge_label" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "carouselBlock" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_header_type" "enum_carouselBlock_block_header_type" DEFAULT 'center',
  	"block_header_badge_type" "enum_carouselBlock_block_header_badge_type",
  	"block_header_badge_color" "badge_color" DEFAULT 'blue',
  	"block_header_badge_icon" varchar,
  	"block_header_badge_icon_position" "badge_icon_position" DEFAULT 'flex-row',
  	"type" "enum_carouselBlock_type" DEFAULT '01',
  	"block_name" varchar
  );
  
  CREATE TABLE "carouselBlock_locales" (
  	"block_header_badge_label" varchar,
  	"block_header_header_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_carouselBlock_v_block_header_links" (
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
  
  CREATE TABLE "_carouselBlock_v_block_header_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_carouselBlock_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"icon" varchar,
  	"enable_badge" boolean,
  	"enable_cta" boolean,
  	"badge_type" "enum__carouselBlock_v_columns_badge_type",
  	"badge_color" "badge_color" DEFAULT 'blue',
  	"badge_icon" varchar,
  	"badge_icon_position" "badge_icon_position" DEFAULT 'flex-row',
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_carouselBlock_v_columns_locales" (
  	"tab_label" varchar,
  	"image_id" uuid,
  	"content_title" varchar,
  	"content_subtitle" jsonb,
  	"badge_label" varchar,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "_carouselBlock_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"block_header_type" "enum__carouselBlock_v_block_header_type" DEFAULT 'center',
  	"block_header_badge_type" "enum__carouselBlock_v_block_header_badge_type",
  	"block_header_badge_color" "badge_color" DEFAULT 'blue',
  	"block_header_badge_icon" varchar,
  	"block_header_badge_icon_position" "badge_icon_position" DEFAULT 'flex-row',
  	"type" "enum__carouselBlock_v_type" DEFAULT '01',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_carouselBlock_v_locales" (
  	"block_header_badge_label" varchar,
  	"block_header_header_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "featuresBlock" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "featuresBlock" ALTER COLUMN "type" SET DEFAULT '01'::text;
  DROP TYPE "public"."enum_featuresBlock_type";
  CREATE TYPE "public"."enum_featuresBlock_type" AS ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
  ALTER TABLE "featuresBlock" ALTER COLUMN "type" SET DEFAULT '01'::"public"."enum_featuresBlock_type";
  ALTER TABLE "featuresBlock" ALTER COLUMN "type" SET DATA TYPE "public"."enum_featuresBlock_type" USING "type"::"public"."enum_featuresBlock_type";
  ALTER TABLE "_featuresBlock_v" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "_featuresBlock_v" ALTER COLUMN "type" SET DEFAULT '01'::text;
  DROP TYPE "public"."enum__featuresBlock_v_type";
  CREATE TYPE "public"."enum__featuresBlock_v_type" AS ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
  ALTER TABLE "_featuresBlock_v" ALTER COLUMN "type" SET DEFAULT '01'::"public"."enum__featuresBlock_v_type";
  ALTER TABLE "_featuresBlock_v" ALTER COLUMN "type" SET DATA TYPE "public"."enum__featuresBlock_v_type" USING "type"::"public"."enum__featuresBlock_v_type";
  ALTER TABLE "carouselBlock_block_header_links" ADD CONSTRAINT "carouselBlock_block_header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carouselBlock"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carouselBlock_block_header_links_locales" ADD CONSTRAINT "carouselBlock_block_header_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carouselBlock_block_header_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carouselBlock_columns" ADD CONSTRAINT "carouselBlock_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carouselBlock"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carouselBlock_columns_locales" ADD CONSTRAINT "carouselBlock_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "carouselBlock_columns_locales" ADD CONSTRAINT "carouselBlock_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carouselBlock_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carouselBlock" ADD CONSTRAINT "carouselBlock_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carouselBlock_locales" ADD CONSTRAINT "carouselBlock_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carouselBlock"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_carouselBlock_v_block_header_links" ADD CONSTRAINT "_carouselBlock_v_block_header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_carouselBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_carouselBlock_v_block_header_links_locales" ADD CONSTRAINT "_carouselBlock_v_block_header_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_carouselBlock_v_block_header_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_carouselBlock_v_columns" ADD CONSTRAINT "_carouselBlock_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_carouselBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_carouselBlock_v_columns_locales" ADD CONSTRAINT "_carouselBlock_v_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_carouselBlock_v_columns_locales" ADD CONSTRAINT "_carouselBlock_v_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_carouselBlock_v_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_carouselBlock_v" ADD CONSTRAINT "_carouselBlock_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_carouselBlock_v_locales" ADD CONSTRAINT "_carouselBlock_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_carouselBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "carouselBlock_block_header_links_order_idx" ON "carouselBlock_block_header_links" USING btree ("_order");
  CREATE INDEX "carouselBlock_block_header_links_parent_id_idx" ON "carouselBlock_block_header_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "carouselBlock_block_header_links_locales_locale_parent_id_unique" ON "carouselBlock_block_header_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "carouselBlock_columns_order_idx" ON "carouselBlock_columns" USING btree ("_order");
  CREATE INDEX "carouselBlock_columns_parent_id_idx" ON "carouselBlock_columns" USING btree ("_parent_id");
  CREATE INDEX "carouselBlock_columns_image_idx" ON "carouselBlock_columns_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "carouselBlock_columns_locales_locale_parent_id_unique" ON "carouselBlock_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "carouselBlock_order_idx" ON "carouselBlock" USING btree ("_order");
  CREATE INDEX "carouselBlock_parent_id_idx" ON "carouselBlock" USING btree ("_parent_id");
  CREATE INDEX "carouselBlock_path_idx" ON "carouselBlock" USING btree ("_path");
  CREATE UNIQUE INDEX "carouselBlock_locales_locale_parent_id_unique" ON "carouselBlock_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_carouselBlock_v_block_header_links_order_idx" ON "_carouselBlock_v_block_header_links" USING btree ("_order");
  CREATE INDEX "_carouselBlock_v_block_header_links_parent_id_idx" ON "_carouselBlock_v_block_header_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_carouselBlock_v_block_header_links_locales_locale_parent_id_unique" ON "_carouselBlock_v_block_header_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_carouselBlock_v_columns_order_idx" ON "_carouselBlock_v_columns" USING btree ("_order");
  CREATE INDEX "_carouselBlock_v_columns_parent_id_idx" ON "_carouselBlock_v_columns" USING btree ("_parent_id");
  CREATE INDEX "_carouselBlock_v_columns_image_idx" ON "_carouselBlock_v_columns_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX "_carouselBlock_v_columns_locales_locale_parent_id_unique" ON "_carouselBlock_v_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_carouselBlock_v_order_idx" ON "_carouselBlock_v" USING btree ("_order");
  CREATE INDEX "_carouselBlock_v_parent_id_idx" ON "_carouselBlock_v" USING btree ("_parent_id");
  CREATE INDEX "_carouselBlock_v_path_idx" ON "_carouselBlock_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_carouselBlock_v_locales_locale_parent_id_unique" ON "_carouselBlock_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_featuresBlock_type" ADD VALUE '13';
  ALTER TYPE "public"."enum_featuresBlock_type" ADD VALUE '14';
  ALTER TYPE "public"."enum_featuresBlock_type" ADD VALUE '15';
  ALTER TYPE "public"."enum_featuresBlock_type" ADD VALUE '16';
  ALTER TYPE "public"."enum_featuresBlock_type" ADD VALUE '17';
  ALTER TYPE "public"."enum__featuresBlock_v_type" ADD VALUE '13';
  ALTER TYPE "public"."enum__featuresBlock_v_type" ADD VALUE '14';
  ALTER TYPE "public"."enum__featuresBlock_v_type" ADD VALUE '15';
  ALTER TYPE "public"."enum__featuresBlock_v_type" ADD VALUE '16';
  ALTER TYPE "public"."enum__featuresBlock_v_type" ADD VALUE '17';
  DROP TABLE "carouselBlock_block_header_links" CASCADE;
  DROP TABLE "carouselBlock_block_header_links_locales" CASCADE;
  DROP TABLE "carouselBlock_columns" CASCADE;
  DROP TABLE "carouselBlock_columns_locales" CASCADE;
  DROP TABLE "carouselBlock" CASCADE;
  DROP TABLE "carouselBlock_locales" CASCADE;
  DROP TABLE "_carouselBlock_v_block_header_links" CASCADE;
  DROP TABLE "_carouselBlock_v_block_header_links_locales" CASCADE;
  DROP TABLE "_carouselBlock_v_columns" CASCADE;
  DROP TABLE "_carouselBlock_v_columns_locales" CASCADE;
  DROP TABLE "_carouselBlock_v" CASCADE;
  DROP TABLE "_carouselBlock_v_locales" CASCADE;
  DROP TYPE "public"."enum_carouselBlock_columns_badge_type";
  DROP TYPE "public"."enum_carouselBlock_block_header_type";
  DROP TYPE "public"."enum_carouselBlock_block_header_badge_type";
  DROP TYPE "public"."enum_carouselBlock_type";
  DROP TYPE "public"."enum__carouselBlock_v_columns_badge_type";
  DROP TYPE "public"."enum__carouselBlock_v_block_header_type";
  DROP TYPE "public"."enum__carouselBlock_v_block_header_badge_type";
  DROP TYPE "public"."enum__carouselBlock_v_type";`)
}
