import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

// Migrates featuresBlock types 08–12 into carouselBlock types 01–05
// then remaps remaining featuresBlock types 13–17 to 08–12.
// This runs before 20250817_153358 which narrows the enum to 01–12.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  -- Add carousel block types
   DO $$ BEGIN 
  CREATE TYPE "public"."enum_carouselBlock_columns_badge_type" AS ENUM('label', 'reference');
  EXCEPTION
  WHEN duplicate_object THEN NULL;
  END $$;
  
  DO $$ BEGIN 
  CREATE TYPE "public"."enum_carouselBlock_block_header_type" AS ENUM('center', 'split', 'start');
  EXCEPTION
  WHEN duplicate_object THEN NULL;
  END $$;
  
  DO $$ BEGIN 
  CREATE TYPE "public"."enum_carouselBlock_block_header_badge_type" AS ENUM('label', 'reference');
  EXCEPTION
  WHEN duplicate_object THEN NULL;
  END $$;
  
  DO $$ BEGIN 
  CREATE TYPE "public"."enum_carouselBlock_type" AS ENUM('01', '02', '03', '04', '05');
  EXCEPTION
  WHEN duplicate_object THEN NULL;
  END $$;
  
  DO $$ BEGIN 
  CREATE TYPE "public"."enum__carouselBlock_v_columns_badge_type" AS ENUM('label', 'reference');
  EXCEPTION
  WHEN duplicate_object THEN NULL;
  END $$;
  
  DO $$ BEGIN 
  CREATE TYPE "public"."enum__carouselBlock_v_block_header_type" AS ENUM('center', 'split', 'start');
  EXCEPTION
  WHEN duplicate_object THEN NULL;
  END $$;
  
  DO $$ BEGIN 
  CREATE TYPE "public"."enum__carouselBlock_v_block_header_badge_type" AS ENUM('label', 'reference');
  EXCEPTION
  WHEN duplicate_object THEN NULL;
  END $$;
  
  DO $$ BEGIN 
  CREATE TYPE "public"."enum__carouselBlock_v_type" AS ENUM('01', '02', '03', '04', '05');
  EXCEPTION
  WHEN duplicate_object THEN NULL;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "carouselBlock_block_header_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_color" "link_color" DEFAULT 'neutral',
  	"link_variant" "link_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE IF NOT EXISTS "carouselBlock_block_header_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "carouselBlock_columns" (
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
  
  CREATE TABLE IF NOT EXISTS "carouselBlock_columns_locales" (
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
  
  CREATE TABLE IF NOT EXISTS "carouselBlock" (
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
  
  CREATE TABLE IF NOT EXISTS "carouselBlock_locales" (
  	"block_header_badge_label" varchar,
  	"block_header_header_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_carouselBlock_v_block_header_links" (
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
  
  CREATE TABLE IF NOT EXISTS "_carouselBlock_v_block_header_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_carouselBlock_v_columns" (
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
  
  CREATE TABLE IF NOT EXISTS "_carouselBlock_v_columns_locales" (
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
  
  CREATE TABLE IF NOT EXISTS "_carouselBlock_v" (
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
  
  CREATE TABLE IF NOT EXISTS "_carouselBlock_v_locales" (
  	"block_header_badge_label" varchar,
  	"block_header_header_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "carouselBlock_block_header_links" ADD CONSTRAINT "carouselBlock_block_header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carouselBlock"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "carouselBlock_block_header_links_locales" ADD CONSTRAINT "carouselBlock_block_header_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carouselBlock_block_header_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "carouselBlock_columns" ADD CONSTRAINT "carouselBlock_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carouselBlock"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "carouselBlock_columns_locales" ADD CONSTRAINT "carouselBlock_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "carouselBlock_columns_locales" ADD CONSTRAINT "carouselBlock_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carouselBlock_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "carouselBlock" ADD CONSTRAINT "carouselBlock_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "carouselBlock_locales" ADD CONSTRAINT "carouselBlock_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carouselBlock"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_carouselBlock_v_block_header_links" ADD CONSTRAINT "_carouselBlock_v_block_header_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_carouselBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_carouselBlock_v_block_header_links_locales" ADD CONSTRAINT "_carouselBlock_v_block_header_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_carouselBlock_v_block_header_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_carouselBlock_v_columns" ADD CONSTRAINT "_carouselBlock_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_carouselBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_carouselBlock_v_columns_locales" ADD CONSTRAINT "_carouselBlock_v_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_carouselBlock_v_columns_locales" ADD CONSTRAINT "_carouselBlock_v_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_carouselBlock_v_columns"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_carouselBlock_v" ADD CONSTRAINT "_carouselBlock_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "_carouselBlock_v_locales" ADD CONSTRAINT "_carouselBlock_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_carouselBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN NULL;
  END $$;

  CREATE INDEX IF NOT EXISTS "carouselBlock_block_header_links_order_idx" ON "carouselBlock_block_header_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "carouselBlock_block_header_links_parent_id_idx" ON "carouselBlock_block_header_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "carouselBlock_block_header_links_locales_locale_parent_id_unique" ON "carouselBlock_block_header_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "carouselBlock_columns_order_idx" ON "carouselBlock_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "carouselBlock_columns_parent_id_idx" ON "carouselBlock_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "carouselBlock_columns_image_idx" ON "carouselBlock_columns_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "carouselBlock_columns_locales_locale_parent_id_unique" ON "carouselBlock_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "carouselBlock_order_idx" ON "carouselBlock" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "carouselBlock_parent_id_idx" ON "carouselBlock" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "carouselBlock_path_idx" ON "carouselBlock" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "carouselBlock_locales_locale_parent_id_unique" ON "carouselBlock_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_carouselBlock_v_block_header_links_order_idx" ON "_carouselBlock_v_block_header_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_carouselBlock_v_block_header_links_parent_id_idx" ON "_carouselBlock_v_block_header_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_carouselBlock_v_block_header_links_locales_locale_parent_id_unique" ON "_carouselBlock_v_block_header_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_carouselBlock_v_columns_order_idx" ON "_carouselBlock_v_columns" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_carouselBlock_v_columns_parent_id_idx" ON "_carouselBlock_v_columns" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_carouselBlock_v_columns_image_idx" ON "_carouselBlock_v_columns_locales" USING btree ("image_id","_locale");
  CREATE UNIQUE INDEX IF NOT EXISTS "_carouselBlock_v_columns_locales_locale_parent_id_unique" ON "_carouselBlock_v_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX IF NOT EXISTS "_carouselBlock_v_order_idx" ON "_carouselBlock_v" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_carouselBlock_v_parent_id_idx" ON "_carouselBlock_v" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_carouselBlock_v_path_idx" ON "_carouselBlock_v" USING btree ("_path");
  CREATE UNIQUE INDEX IF NOT EXISTS "_carouselBlock_v_locales_locale_parent_id_unique" ON "_carouselBlock_v_locales" USING btree ("_locale","_parent_id");


  -- Copy parents: features 08–12 -> carousel 01–05
  INSERT INTO "carouselBlock" ("_order","_parent_id","_path","id","block_header_type","block_header_badge_type","block_header_badge_color","block_header_badge_icon","block_header_badge_icon_position","type","block_name")
  SELECT fb."_order",
         fb."_parent_id",
         fb."_path",
         fb."id",
         (fb."block_header_type")::text::"public"."enum_carouselBlock_block_header_type",
         (fb."block_header_badge_type")::text::"public"."enum_carouselBlock_block_header_badge_type",
         fb."block_header_badge_color",
         fb."block_header_badge_icon",
         fb."block_header_badge_icon_position",
         (CASE fb."type"::text
            WHEN '08' THEN '01'
            WHEN '09' THEN '02'
            WHEN '10' THEN '03'
            WHEN '11' THEN '04'
            WHEN '12' THEN '05'
          END)::"public"."enum_carouselBlock_type",
         fb."block_name"
  FROM "featuresBlock" fb
  WHERE fb."type"::text IN ('08','09','10','11','12')
    AND NOT EXISTS (
      SELECT 1 FROM "carouselBlock" c WHERE c."id" = fb."id"
    );

  -- Copy locales
  INSERT INTO "carouselBlock_locales" ("block_header_badge_label","block_header_header_text","_locale","_parent_id")
  SELECT fbl."block_header_badge_label",
         fbl."block_header_header_text",
         fbl."_locale",
         fbl."_parent_id"
  FROM "featuresBlock_locales" fbl
  WHERE EXISTS (
    SELECT 1 FROM "featuresBlock" fb
    WHERE fb."id" = fbl."_parent_id" AND fb."type"::text IN ('08','09','10','11','12')
  )
  ON CONFLICT ("_locale","_parent_id") DO NOTHING;

  -- Copy header links
  INSERT INTO "carouselBlock_block_header_links" ("_order","_parent_id","id","link_type","link_new_tab","link_url","link_color","link_variant")
  SELECT l."_order",
         l."_parent_id",
         l."id",
         l."link_type",
         l."link_new_tab",
         l."link_url",
         l."link_color",
         l."link_variant"
  FROM "featuresBlock_block_header_links" l
  WHERE EXISTS (
    SELECT 1 FROM "featuresBlock" fb WHERE fb."id" = l."_parent_id" AND fb."type"::text IN ('08','09','10','11','12')
  )
  AND NOT EXISTS (
    SELECT 1 FROM "carouselBlock_block_header_links" cl WHERE cl."id" = l."id"
  );

  INSERT INTO "carouselBlock_block_header_links_locales" ("link_label","_locale","_parent_id")
  SELECT ll."link_label",
         ll."_locale",
         ll."_parent_id"
  FROM "featuresBlock_block_header_links_locales" ll
  WHERE EXISTS (
    SELECT 1 FROM "featuresBlock_block_header_links" l
    JOIN "featuresBlock" fb ON fb."id" = l."_parent_id"
    WHERE l."id" = ll."_parent_id" AND fb."type" IN ('08','09','10','11','12')
  )
  ON CONFLICT ("_locale","_parent_id") DO NOTHING;

  -- Copy columns
  INSERT INTO "carouselBlock_columns" ("_order","_parent_id","id","icon","enable_badge","enable_cta","badge_type","badge_color","badge_icon","badge_icon_position","link_type","link_new_tab","link_url")
  SELECT c."_order",
         c."_parent_id",
         c."id",
         c."icon",
         c."enable_badge",
         c."enable_cta",
         (c."badge_type")::text::"public"."enum_carouselBlock_columns_badge_type",
         c."badge_color",
         c."badge_icon",
         c."badge_icon_position",
         c."link_type",
         c."link_new_tab",
         c."link_url"
  FROM "featuresBlock_columns" c
  WHERE EXISTS (
    SELECT 1 FROM "featuresBlock" fb WHERE fb."id" = c."_parent_id" AND fb."type"::text IN ('08','09','10','11','12')
  )
  AND NOT EXISTS (
    SELECT 1 FROM "carouselBlock_columns" cc WHERE cc."id" = c."id"
  );

  INSERT INTO "carouselBlock_columns_locales" ("tab_label","image_id","content_title","content_subtitle","badge_label","link_label","_locale","_parent_id")
  SELECT cl."tab_label",
         cl."image_id",
         cl."content_title",
         -- Ensure JSONB type (features migration already converted to jsonb earlier)
         cl."content_subtitle",
         cl."badge_label",
         cl."link_label",
         cl."_locale",
         cl."_parent_id"
  FROM "featuresBlock_columns_locales" cl
  WHERE EXISTS (
    SELECT 1 FROM "featuresBlock_columns" c
    JOIN "featuresBlock" fb ON fb."id" = c."_parent_id"
    WHERE c."id" = cl."_parent_id" AND fb."type"::text IN ('08','09','10','11','12')
  )
  ON CONFLICT ("_locale","_parent_id") DO NOTHING;
  
  -- Remove original features blocks 08–12 to avoid duplicates in layout
  DELETE FROM "featuresBlock" WHERE "type"::text IN ('08','09','10','11','12');

  -- Remap remaining features 13–17 down to 08–12 (main table)
  UPDATE "featuresBlock" SET "type" = '08'::"public"."enum_featuresBlock_type" WHERE "type"::text = '13';
  UPDATE "featuresBlock" SET "type" = '09'::"public"."enum_featuresBlock_type" WHERE "type"::text = '14';
  UPDATE "featuresBlock" SET "type" = '10'::"public"."enum_featuresBlock_type" WHERE "type"::text = '15';
  UPDATE "featuresBlock" SET "type" = '11'::"public"."enum_featuresBlock_type" WHERE "type"::text = '16';
  UPDATE "featuresBlock" SET "type" = '12'::"public"."enum_featuresBlock_type" WHERE "type"::text = '17';
  
  -- Remap versions table as well
  UPDATE "_featuresBlock_v" SET "type" = '08'::"public"."enum__featuresBlock_v_type" WHERE "type"::text = '13';
  UPDATE "_featuresBlock_v" SET "type" = '09'::"public"."enum__featuresBlock_v_type" WHERE "type"::text = '14';
  UPDATE "_featuresBlock_v" SET "type" = '10'::"public"."enum__featuresBlock_v_type" WHERE "type"::text = '15';
  UPDATE "_featuresBlock_v" SET "type" = '11'::"public"."enum__featuresBlock_v_type" WHERE "type"::text = '16';
  UPDATE "_featuresBlock_v" SET "type" = '12'::"public"."enum__featuresBlock_v_type" WHERE "type"::text = '17';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Best-effort reverse: restore remapped features and move carousel 01–05 back to features 08–12
  await db.execute(sql`
  -- First, revert the remap: bump 08–12 back to 13–17 to free up 08–12
  UPDATE "featuresBlock" SET "type" = '13'::"public"."enum_featuresBlock_type" WHERE "type"::text = '08';
  UPDATE "featuresBlock" SET "type" = '14'::"public"."enum_featuresBlock_type" WHERE "type"::text = '09';
  UPDATE "featuresBlock" SET "type" = '15'::"public"."enum_featuresBlock_type" WHERE "type"::text = '10';
  UPDATE "featuresBlock" SET "type" = '16'::"public"."enum_featuresBlock_type" WHERE "type"::text = '11';
  UPDATE "featuresBlock" SET "type" = '17'::"public"."enum_featuresBlock_type" WHERE "type"::text = '12';
  
  UPDATE "_featuresBlock_v" SET "type" = '13'::"public"."enum__featuresBlock_v_type" WHERE "type"::text = '08';
  UPDATE "_featuresBlock_v" SET "type" = '14'::"public"."enum__featuresBlock_v_type" WHERE "type"::text = '09';
  UPDATE "_featuresBlock_v" SET "type" = '15'::"public"."enum__featuresBlock_v_type" WHERE "type"::text = '10';
  UPDATE "_featuresBlock_v" SET "type" = '16'::"public"."enum__featuresBlock_v_type" WHERE "type"::text = '11';
  UPDATE "_featuresBlock_v" SET "type" = '17'::"public"."enum__featuresBlock_v_type" WHERE "type"::text = '12';

  -- Recreate features parents if missing, mapping back 01–05 -> 08–12, only for ones that don't exist
  INSERT INTO "featuresBlock" ("_order","_parent_id","_path","id","block_header_type","block_header_badge_type","block_header_badge_color","block_header_badge_icon","block_header_badge_icon_position","type","block_name")
  SELECT cb."_order",
         cb."_parent_id",
         cb."_path",
         cb."id",
         (cb."block_header_type")::text::"public"."enum_featuresBlock_block_header_type",
         (cb."block_header_badge_type")::text::"public"."enum_featuresBlock_block_header_badge_type",
         cb."block_header_badge_color",
         cb."block_header_badge_icon",
         cb."block_header_badge_icon_position",
         (CASE cb."type"
            WHEN '01' THEN '08'
            WHEN '02' THEN '09'
            WHEN '03' THEN '10'
            WHEN '04' THEN '11'
            WHEN '05' THEN '12'
          END)::"public"."enum_featuresBlock_type",
         cb."block_name"
  FROM "carouselBlock" cb
  WHERE cb."type" IN ('01','02','03','04','05')
    AND NOT EXISTS (
      SELECT 1 FROM "featuresBlock" fb WHERE fb."id" = cb."id"
    );

  INSERT INTO "featuresBlock_locales" ("block_header_badge_label","block_header_header_text","_locale","_parent_id")
  SELECT cbl."block_header_badge_label",
         cbl."block_header_header_text",
         cbl."_locale",
         cbl."_parent_id"
  FROM "carouselBlock_locales" cbl
  ON CONFLICT DO NOTHING;

  INSERT INTO "featuresBlock_block_header_links" ("_order","_parent_id","id","link_type","link_new_tab","link_url","link_color","link_variant")
  SELECT l."_order", l."_parent_id", l."id", l."link_type", l."link_new_tab", l."link_url", l."link_color", l."link_variant"
  FROM "carouselBlock_block_header_links" l
  ON CONFLICT DO NOTHING;

  INSERT INTO "featuresBlock_block_header_links_locales" ("link_label","_locale","_parent_id")
  SELECT ll."link_label", ll."_locale", ll."_parent_id"
  FROM "carouselBlock_block_header_links_locales" ll
  ON CONFLICT DO NOTHING;

  INSERT INTO "featuresBlock_columns" ("_order","_parent_id","id","icon","enable_badge","enable_cta","badge_type","badge_color","badge_icon","badge_icon_position","link_type","link_new_tab","link_url")
  SELECT c."_order", c."_parent_id", c."id", c."icon", c."enable_badge", c."enable_cta",
         (c."badge_type")::text::"public"."enum_featuresBlock_columns_badge_type",
         c."badge_color", c."badge_icon", c."badge_icon_position", c."link_type", c."link_new_tab", c."link_url"
  FROM "carouselBlock_columns" c
  ON CONFLICT DO NOTHING;

  INSERT INTO "featuresBlock_columns_locales" ("image_id","tab_label","content_title","content_subtitle","badge_label","link_label","_locale","_parent_id")
  SELECT cl."image_id", cl."tab_label", cl."content_title", cl."content_subtitle"::text, cl."badge_label", cl."link_label", cl."_locale", cl."_parent_id"
  FROM "carouselBlock_columns_locales" cl
  ON CONFLICT DO NOTHING;

  -- Finally, remove the carousel blocks we restored
  DELETE FROM "carouselBlock" WHERE "type" IN ('01','02','03','04','05');
  `)
}
