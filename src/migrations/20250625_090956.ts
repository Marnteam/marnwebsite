import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blogBlock_type" AS ENUM('featuredPost', '2-columns');
  CREATE TYPE "public"."enum__blogBlock_v_type" AS ENUM('featuredPost', '2-columns');
  CREATE TABLE IF NOT EXISTS "blogBlock" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_blogBlock_type" DEFAULT 'featuredPost',
  	"featured_post_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blogBlock_locales" (
  	"recent_posts_list_title" varchar,
  	"recent_posts_list_description" varchar,
  	"editors_picks_list_title" varchar,
  	"editors_picks_list_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_blogBlock_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"type" "enum__blogBlock_v_type" DEFAULT 'featuredPost',
  	"featured_post_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_blogBlock_v_locales" (
  	"recent_posts_list_title" varchar,
  	"recent_posts_list_description" varchar,
  	"editors_picks_list_title" varchar,
  	"editors_picks_list_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "blogBlock" ADD CONSTRAINT "blogBlock_featured_post_id_posts_id_fk" FOREIGN KEY ("featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogBlock" ADD CONSTRAINT "blogBlock_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogBlock_locales" ADD CONSTRAINT "blogBlock_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogBlock"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blogBlock_v" ADD CONSTRAINT "_blogBlock_v_featured_post_id_posts_id_fk" FOREIGN KEY ("featured_post_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blogBlock_v" ADD CONSTRAINT "_blogBlock_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_blogBlock_v_locales" ADD CONSTRAINT "_blogBlock_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blogBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "blogBlock_order_idx" ON "blogBlock" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blogBlock_parent_id_idx" ON "blogBlock" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blogBlock_path_idx" ON "blogBlock" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blogBlock_featured_post_idx" ON "blogBlock" USING btree ("featured_post_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "blogBlock_locales_locale_parent_id_unique" ON "blogBlock_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_blogBlock_v_order_idx" ON "_blogBlock_v" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_blogBlock_v_parent_id_idx" ON "_blogBlock_v" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_blogBlock_v_path_idx" ON "_blogBlock_v" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "_blogBlock_v_featured_post_idx" ON "_blogBlock_v" USING btree ("featured_post_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_blogBlock_v_locales_locale_parent_id_unique" ON "_blogBlock_v_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "blogBlock" CASCADE;
  DROP TABLE "blogBlock_locales" CASCADE;
  DROP TABLE "_blogBlock_v" CASCADE;
  DROP TABLE "_blogBlock_v_locales" CASCADE;
  DROP TYPE "public"."enum_blogBlock_type";
  DROP TYPE "public"."enum__blogBlock_v_type";`)
}
