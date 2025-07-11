import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_archiveBlock_block_header_type" AS ENUM('center', 'split', 'start');
  CREATE TYPE "public"."enum_archiveBlock_block_header_badge_type" AS ENUM('label', 'reference');
  CREATE TYPE "public"."enum__archiveBlock_v_block_header_type" AS ENUM('center', 'split', 'start');
  CREATE TYPE "public"."enum__archiveBlock_v_block_header_badge_type" AS ENUM('label', 'reference');
  CREATE TABLE "archiveBlock_block_header_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_color" "link_color" DEFAULT 'neutral',
  	"link_variant" "link_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "archiveBlock_block_header_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_archiveBlock_v_block_header_links" (
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
  
  CREATE TABLE "_archiveBlock_v_block_header_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  ALTER TABLE "archiveBlock_locales" RENAME COLUMN "intro_content" TO "block_header_header_text";
  ALTER TABLE "_archiveBlock_v_locales" RENAME COLUMN "intro_content" TO "block_header_header_text";
  ALTER TABLE "archiveBlock" ALTER COLUMN "relation_to" SET DATA TYPE text;
  ALTER TABLE "archiveBlock" ALTER COLUMN "relation_to" SET DEFAULT 'blog-posts'::text;
  DROP TYPE "public"."enum_archiveBlock_relation_to";
  CREATE TYPE "public"."enum_archiveBlock_relation_to" AS ENUM('blog-posts');
  ALTER TABLE "archiveBlock" ALTER COLUMN "relation_to" SET DEFAULT 'blog-posts'::"public"."enum_archiveBlock_relation_to";
  ALTER TABLE "archiveBlock" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum_archiveBlock_relation_to" USING "relation_to"::"public"."enum_archiveBlock_relation_to";
  ALTER TABLE "_archiveBlock_v" ALTER COLUMN "relation_to" SET DATA TYPE text;
  ALTER TABLE "_archiveBlock_v" ALTER COLUMN "relation_to" SET DEFAULT 'blog-posts'::text;
  DROP TYPE "public"."enum__archiveBlock_v_relation_to";
  CREATE TYPE "public"."enum__archiveBlock_v_relation_to" AS ENUM('blog-posts');
  ALTER TABLE "_archiveBlock_v" ALTER COLUMN "relation_to" SET DEFAULT 'blog-posts'::"public"."enum__archiveBlock_v_relation_to";
  ALTER TABLE "_archiveBlock_v" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum__archiveBlock_v_relation_to" USING "relation_to"::"public"."enum__archiveBlock_v_relation_to";
  ALTER TABLE "archiveBlock" ADD COLUMN "block_header_type" "enum_archiveBlock_block_header_type" DEFAULT 'center';
  ALTER TABLE "archiveBlock" ADD COLUMN "block_header_badge_type" "enum_archiveBlock_block_header_badge_type";
  ALTER TABLE "archiveBlock" ADD COLUMN "block_header_badge_color" "badge_color" DEFAULT 'blue';
  ALTER TABLE "archiveBlock" ADD COLUMN "block_header_badge_icon" varchar;
  ALTER TABLE "archiveBlock" ADD COLUMN "block_header_badge_icon_position" "badge_icon_position" DEFAULT 'flex-row';
  ALTER TABLE "archiveBlock_locales" ADD COLUMN "block_header_badge_label" varchar;
  ALTER TABLE "_archiveBlock_v" ADD COLUMN "block_header_type" "enum__archiveBlock_v_block_header_type" DEFAULT 'center';
  ALTER TABLE "_archiveBlock_v" ADD COLUMN "block_header_badge_type" "enum__archiveBlock_v_block_header_badge_type";
  ALTER TABLE "_archiveBlock_v" ADD COLUMN "block_header_badge_color" "badge_color" DEFAULT 'blue';
  ALTER TABLE "_archiveBlock_v" ADD COLUMN "block_header_badge_icon" varchar;
  ALTER TABLE "_archiveBlock_v" ADD COLUMN "block_header_badge_icon_position" "badge_icon_position" DEFAULT 'flex-row';
  ALTER TABLE "_archiveBlock_v_locales" ADD COLUMN "block_header_badge_label" varchar;
  ALTER TABLE "archiveBlock_block_header_links" ADD CONSTRAINT "archiveBlock_block_header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archiveBlock"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archiveBlock_block_header_links_locales" ADD CONSTRAINT "archiveBlock_block_header_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archiveBlock_block_header_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archiveBlock_v_block_header_links" ADD CONSTRAINT "_archiveBlock_v_block_header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archiveBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archiveBlock_v_block_header_links_locales" ADD CONSTRAINT "_archiveBlock_v_block_header_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archiveBlock_v_block_header_links"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "archiveBlock_block_header_links_order_idx" ON "archiveBlock_block_header_links" USING btree ("_order");
  CREATE INDEX "archiveBlock_block_header_links_parent_id_idx" ON "archiveBlock_block_header_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "archiveBlock_block_header_links_locales_locale_parent_id_unique" ON "archiveBlock_block_header_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_archiveBlock_v_block_header_links_order_idx" ON "_archiveBlock_v_block_header_links" USING btree ("_order");
  CREATE INDEX "_archiveBlock_v_block_header_links_parent_id_idx" ON "_archiveBlock_v_block_header_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_archiveBlock_v_block_header_links_locales_locale_parent_id_unique" ON "_archiveBlock_v_block_header_links_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "archiveBlock_block_header_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archiveBlock_block_header_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archiveBlock_v_block_header_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archiveBlock_v_block_header_links_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "archiveBlock_block_header_links" CASCADE;
  DROP TABLE "archiveBlock_block_header_links_locales" CASCADE;
  DROP TABLE "_archiveBlock_v_block_header_links" CASCADE;
  DROP TABLE "_archiveBlock_v_block_header_links_locales" CASCADE;
  ALTER TABLE "archiveBlock_locales" RENAME COLUMN "block_header_header_text" TO "intro_content";
  ALTER TABLE "_archiveBlock_v_locales" RENAME COLUMN "block_header_header_text" TO "intro_content";
  ALTER TABLE "archiveBlock" ALTER COLUMN "relation_to" SET DATA TYPE text;
  ALTER TABLE "archiveBlock" ALTER COLUMN "relation_to" SET DEFAULT 'posts'::text;
  DROP TYPE "public"."enum_archiveBlock_relation_to";
  CREATE TYPE "public"."enum_archiveBlock_relation_to" AS ENUM('posts');
  ALTER TABLE "archiveBlock" ALTER COLUMN "relation_to" SET DEFAULT 'posts'::"public"."enum_archiveBlock_relation_to";
  ALTER TABLE "archiveBlock" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum_archiveBlock_relation_to" USING "relation_to"::"public"."enum_archiveBlock_relation_to";
  ALTER TABLE "_archiveBlock_v" ALTER COLUMN "relation_to" SET DATA TYPE text;
  ALTER TABLE "_archiveBlock_v" ALTER COLUMN "relation_to" SET DEFAULT 'posts'::text;
  DROP TYPE "public"."enum__archiveBlock_v_relation_to";
  CREATE TYPE "public"."enum__archiveBlock_v_relation_to" AS ENUM('posts');
  ALTER TABLE "_archiveBlock_v" ALTER COLUMN "relation_to" SET DEFAULT 'posts'::"public"."enum__archiveBlock_v_relation_to";
  ALTER TABLE "_archiveBlock_v" ALTER COLUMN "relation_to" SET DATA TYPE "public"."enum__archiveBlock_v_relation_to" USING "relation_to"::"public"."enum__archiveBlock_v_relation_to";
  ALTER TABLE "archiveBlock" DROP COLUMN "block_header_type";
  ALTER TABLE "archiveBlock" DROP COLUMN "block_header_badge_type";
  ALTER TABLE "archiveBlock" DROP COLUMN "block_header_badge_color";
  ALTER TABLE "archiveBlock" DROP COLUMN "block_header_badge_icon";
  ALTER TABLE "archiveBlock" DROP COLUMN "block_header_badge_icon_position";
  ALTER TABLE "archiveBlock_locales" DROP COLUMN "block_header_badge_label";
  ALTER TABLE "_archiveBlock_v" DROP COLUMN "block_header_type";
  ALTER TABLE "_archiveBlock_v" DROP COLUMN "block_header_badge_type";
  ALTER TABLE "_archiveBlock_v" DROP COLUMN "block_header_badge_color";
  ALTER TABLE "_archiveBlock_v" DROP COLUMN "block_header_badge_icon";
  ALTER TABLE "_archiveBlock_v" DROP COLUMN "block_header_badge_icon_position";
  ALTER TABLE "_archiveBlock_v_locales" DROP COLUMN "block_header_badge_label";
  DROP TYPE "public"."enum_archiveBlock_block_header_type";
  DROP TYPE "public"."enum_archiveBlock_block_header_badge_type";
  DROP TYPE "public"."enum__archiveBlock_v_block_header_type";
  DROP TYPE "public"."enum__archiveBlock_v_block_header_badge_type";`)
}
