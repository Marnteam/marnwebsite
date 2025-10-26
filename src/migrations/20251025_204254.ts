import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_call_to_action_type" AS ENUM('01', '02', '03', '04', '05', '06', '07');
  CREATE TYPE "public"."enum_call_to_action_badge_type" AS ENUM('label', 'reference');
  CREATE TABLE "call_to_action_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_color" "link_color" DEFAULT 'neutral',
  	"link_variant" "link_variant" DEFAULT 'primary'
  );

  CREATE TABLE "call_to_action_links_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );

  CREATE TABLE "call_to_action_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"title" varchar,
  	"subtitle" varchar
  );

  CREATE TABLE "call_to_action" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"type" "enum_call_to_action_type" DEFAULT '01' NOT NULL,
  	"badge_type" "enum_call_to_action_badge_type",
  	"badge_color" "badge_color" DEFAULT 'gray',
  	"badge_icon" varchar,
  	"badge_icon_position" "badge_icon_position" DEFAULT 'flex-row',
  	"media_group_video_controls_autoplay" boolean DEFAULT true,
  	"media_group_video_controls_loop" boolean DEFAULT true,
  	"media_group_video_controls_muted" boolean DEFAULT false,
  	"media_group_video_controls_controls" boolean DEFAULT false,
  	"media_group_video_controls_object_fit" "of" DEFAULT 'cover',
  	"caption" varchar,
  	"form_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "call_to_action_locales" (
  	"badge_label" varchar,
  	"rich_text" jsonb DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb,
  	"media_group_media_id" uuid,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );

  CREATE TABLE "call_to_action_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"solutions_id" uuid,
  	"integrations_id" uuid,
  	"pages_id" uuid,
  	"blog_posts_id" uuid
  );

  ALTER TABLE "callToActionBlock" ADD COLUMN "call_to_action_ref_id" uuid;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "call_to_action_ref_id" uuid;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "call_to_action_id" uuid;
  ALTER TABLE "call_to_action_links" ADD CONSTRAINT "call_to_action_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "call_to_action_links_locales" ADD CONSTRAINT "call_to_action_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."call_to_action_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "call_to_action_list" ADD CONSTRAINT "call_to_action_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "call_to_action" ADD CONSTRAINT "call_to_action_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "call_to_action_locales" ADD CONSTRAINT "call_to_action_locales_media_group_media_id_media_id_fk" FOREIGN KEY ("media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "call_to_action_locales" ADD CONSTRAINT "call_to_action_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "call_to_action_rels" ADD CONSTRAINT "call_to_action_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "call_to_action_rels" ADD CONSTRAINT "call_to_action_rels_solutions_fk" FOREIGN KEY ("solutions_id") REFERENCES "public"."solutions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "call_to_action_rels" ADD CONSTRAINT "call_to_action_rels_integrations_fk" FOREIGN KEY ("integrations_id") REFERENCES "public"."integrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "call_to_action_rels" ADD CONSTRAINT "call_to_action_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "call_to_action_rels" ADD CONSTRAINT "call_to_action_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "call_to_action_links_order_idx" ON "call_to_action_links" USING btree ("_order");
  CREATE INDEX "call_to_action_links_parent_id_idx" ON "call_to_action_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "call_to_action_links_locales_locale_parent_id_unique" ON "call_to_action_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "call_to_action_list_order_idx" ON "call_to_action_list" USING btree ("_order");
  CREATE INDEX "call_to_action_list_parent_id_idx" ON "call_to_action_list" USING btree ("_parent_id");
  CREATE INDEX "call_to_action_list_locale_idx" ON "call_to_action_list" USING btree ("_locale");
  CREATE INDEX "call_to_action_form_idx" ON "call_to_action" USING btree ("form_id");
  CREATE INDEX "call_to_action_updated_at_idx" ON "call_to_action" USING btree ("updated_at");
  CREATE INDEX "call_to_action_created_at_idx" ON "call_to_action" USING btree ("created_at");
  CREATE INDEX "call_to_action_media_group_media_group_media_idx" ON "call_to_action_locales" USING btree ("media_group_media_id","_locale");
  CREATE UNIQUE INDEX "call_to_action_locales_locale_parent_id_unique" ON "call_to_action_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "call_to_action_rels_order_idx" ON "call_to_action_rels" USING btree ("order");
  CREATE INDEX "call_to_action_rels_parent_idx" ON "call_to_action_rels" USING btree ("parent_id");
  CREATE INDEX "call_to_action_rels_path_idx" ON "call_to_action_rels" USING btree ("path");
  CREATE INDEX "call_to_action_rels_solutions_id_idx" ON "call_to_action_rels" USING btree ("solutions_id");
  CREATE INDEX "call_to_action_rels_integrations_id_idx" ON "call_to_action_rels" USING btree ("integrations_id");
  CREATE INDEX "call_to_action_rels_pages_id_idx" ON "call_to_action_rels" USING btree ("pages_id");
  CREATE INDEX "call_to_action_rels_blog_posts_id_idx" ON "call_to_action_rels" USING btree ("blog_posts_id");
  ALTER TABLE "callToActionBlock" ADD CONSTRAINT "callToActionBlock_call_to_action_ref_id_call_to_action_id_fk" FOREIGN KEY ("call_to_action_ref_id") REFERENCES "public"."call_to_action"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_callToActionBlock_v" ADD CONSTRAINT "_callToActionBlock_v_call_to_action_ref_id_call_to_action_id_fk" FOREIGN KEY ("call_to_action_ref_id") REFERENCES "public"."call_to_action"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_call_to_action_fk" FOREIGN KEY ("call_to_action_id") REFERENCES "public"."call_to_action"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "callToActionBlock_call_to_action_ref_idx" ON "callToActionBlock" USING btree ("call_to_action_ref_id");
  CREATE INDEX "_callToActionBlock_v_call_to_action_ref_idx" ON "_callToActionBlock_v" USING btree ("call_to_action_ref_id");
  CREATE INDEX "payload_locked_documents_rels_call_to_action_id_idx" ON "payload_locked_documents_rels" USING btree ("call_to_action_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "call_to_action_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "call_to_action_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "call_to_action_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "call_to_action" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "call_to_action_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "call_to_action_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "call_to_action_links" CASCADE;
  DROP TABLE "call_to_action_links_locales" CASCADE;
  DROP TABLE "call_to_action_list" CASCADE;
  DROP TABLE "call_to_action" CASCADE;
  DROP TABLE "call_to_action_locales" CASCADE;
  DROP TABLE "call_to_action_rels" CASCADE;
  ALTER TABLE "callToActionBlock" DROP CONSTRAINT IF EXISTS "callToActionBlock_call_to_action_ref_id_call_to_action_id_fk";

  ALTER TABLE "_callToActionBlock_v" DROP CONSTRAINT IF EXISTS "_callToActionBlock_v_call_to_action_ref_id_call_to_action_id_fk";

  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_call_to_action_fk";

  DROP INDEX "callToActionBlock_call_to_action_ref_idx";
  DROP INDEX "_callToActionBlock_v_call_to_action_ref_idx";
  DROP INDEX "payload_locked_documents_rels_call_to_action_id_idx";
  ALTER TABLE "callToActionBlock" DROP COLUMN "call_to_action_ref_id";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "call_to_action_ref_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "call_to_action_id";
  DROP TYPE "public"."enum_call_to_action_type";
  DROP TYPE "public"."enum_call_to_action_badge_type";`)
}
