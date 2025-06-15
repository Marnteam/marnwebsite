import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_metricsBlock_table_headers_width" AS ENUM('auto', 'w-1/5', 'w-1/3', 'w-1/2', 'w-2/3');
  CREATE TYPE "public"."enum_pricingBlock_table_headers_width" AS ENUM('auto', 'w-1/5', 'w-1/3', 'w-1/2', 'w-2/3');
  CREATE TYPE "public"."enum__metricsBlock_v_table_headers_width" AS ENUM('auto', 'w-1/5', 'w-1/3', 'w-1/2', 'w-2/3');
  CREATE TYPE "public"."enum__pricingBlock_v_table_headers_width" AS ENUM('auto', 'w-1/5', 'w-1/3', 'w-1/2', 'w-2/3');
  CREATE TABLE IF NOT EXISTS "metricsBlock_table_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header" varchar,
  	"width" "enum_metricsBlock_table_headers_width" DEFAULT 'auto'
  );
  
  CREATE TABLE IF NOT EXISTS "metricsBlock_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar,
  	"is_header" boolean DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS "metricsBlock_table_rows_children_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "metricsBlock_table_rows_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "metricsBlock_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_expandable" boolean DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS "pricingBlock_table_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"header" varchar,
  	"width" "enum_pricingBlock_table_headers_width" DEFAULT 'auto'
  );
  
  CREATE TABLE IF NOT EXISTS "pricingBlock_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar,
  	"is_header" boolean DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS "pricingBlock_table_rows_children_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pricingBlock_table_rows_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pricingBlock_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"is_expandable" boolean DEFAULT false
  );
  
  CREATE TABLE IF NOT EXISTS "_metricsBlock_v_table_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"header" varchar,
  	"width" "enum__metricsBlock_v_table_headers_width" DEFAULT 'auto',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_metricsBlock_v_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" varchar,
  	"is_header" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_metricsBlock_v_table_rows_children_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_metricsBlock_v_table_rows_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_metricsBlock_v_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"is_expandable" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pricingBlock_v_table_headers" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"header" varchar,
  	"width" "enum__pricingBlock_v_table_headers_width" DEFAULT 'auto',
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pricingBlock_v_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" varchar,
  	"is_header" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pricingBlock_v_table_rows_children_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"content" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pricingBlock_v_table_rows_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_pricingBlock_v_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"is_expandable" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  ALTER TABLE "metricsBlock" ADD COLUMN "table_styling_striped" boolean DEFAULT true;
  ALTER TABLE "metricsBlock" ADD COLUMN "table_styling_bordered" boolean DEFAULT true;
  ALTER TABLE "metricsBlock" ADD COLUMN "table_styling_compact" boolean DEFAULT false;
  ALTER TABLE "metricsBlock_locales" ADD COLUMN "table_title" varchar;
  ALTER TABLE "pricingBlock" ADD COLUMN "table_styling_striped" boolean DEFAULT true;
  ALTER TABLE "pricingBlock" ADD COLUMN "table_styling_bordered" boolean DEFAULT true;
  ALTER TABLE "pricingBlock" ADD COLUMN "table_styling_compact" boolean DEFAULT false;
  ALTER TABLE "pricingBlock_locales" ADD COLUMN "table_title" varchar;
  ALTER TABLE "_metricsBlock_v" ADD COLUMN "table_styling_striped" boolean DEFAULT true;
  ALTER TABLE "_metricsBlock_v" ADD COLUMN "table_styling_bordered" boolean DEFAULT true;
  ALTER TABLE "_metricsBlock_v" ADD COLUMN "table_styling_compact" boolean DEFAULT false;
  ALTER TABLE "_metricsBlock_v_locales" ADD COLUMN "table_title" varchar;
  ALTER TABLE "_pricingBlock_v" ADD COLUMN "table_styling_striped" boolean DEFAULT true;
  ALTER TABLE "_pricingBlock_v" ADD COLUMN "table_styling_bordered" boolean DEFAULT true;
  ALTER TABLE "_pricingBlock_v" ADD COLUMN "table_styling_compact" boolean DEFAULT false;
  ALTER TABLE "_pricingBlock_v_locales" ADD COLUMN "table_title" varchar;
  DO $$ BEGIN
   ALTER TABLE "metricsBlock_table_headers" ADD CONSTRAINT "metricsBlock_table_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."metricsBlock"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "metricsBlock_table_rows_cells" ADD CONSTRAINT "metricsBlock_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."metricsBlock_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "metricsBlock_table_rows_children_cells" ADD CONSTRAINT "metricsBlock_table_rows_children_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."metricsBlock_table_rows_children"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "metricsBlock_table_rows_children" ADD CONSTRAINT "metricsBlock_table_rows_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."metricsBlock_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "metricsBlock_table_rows" ADD CONSTRAINT "metricsBlock_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."metricsBlock"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pricingBlock_table_headers" ADD CONSTRAINT "pricingBlock_table_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricingBlock"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pricingBlock_table_rows_cells" ADD CONSTRAINT "pricingBlock_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricingBlock_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pricingBlock_table_rows_children_cells" ADD CONSTRAINT "pricingBlock_table_rows_children_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricingBlock_table_rows_children"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pricingBlock_table_rows_children" ADD CONSTRAINT "pricingBlock_table_rows_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricingBlock_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pricingBlock_table_rows" ADD CONSTRAINT "pricingBlock_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricingBlock"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_metricsBlock_v_table_headers" ADD CONSTRAINT "_metricsBlock_v_table_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_metricsBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_metricsBlock_v_table_rows_cells" ADD CONSTRAINT "_metricsBlock_v_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_metricsBlock_v_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_metricsBlock_v_table_rows_children_cells" ADD CONSTRAINT "_metricsBlock_v_table_rows_children_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_metricsBlock_v_table_rows_children"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_metricsBlock_v_table_rows_children" ADD CONSTRAINT "_metricsBlock_v_table_rows_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_metricsBlock_v_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_metricsBlock_v_table_rows" ADD CONSTRAINT "_metricsBlock_v_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_metricsBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pricingBlock_v_table_headers" ADD CONSTRAINT "_pricingBlock_v_table_headers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pricingBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pricingBlock_v_table_rows_cells" ADD CONSTRAINT "_pricingBlock_v_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pricingBlock_v_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pricingBlock_v_table_rows_children_cells" ADD CONSTRAINT "_pricingBlock_v_table_rows_children_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pricingBlock_v_table_rows_children"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pricingBlock_v_table_rows_children" ADD CONSTRAINT "_pricingBlock_v_table_rows_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pricingBlock_v_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pricingBlock_v_table_rows" ADD CONSTRAINT "_pricingBlock_v_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pricingBlock_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_headers_order_idx" ON "metricsBlock_table_headers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_headers_parent_id_idx" ON "metricsBlock_table_headers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_headers_locale_idx" ON "metricsBlock_table_headers" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_cells_order_idx" ON "metricsBlock_table_rows_cells" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_cells_parent_id_idx" ON "metricsBlock_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_cells_locale_idx" ON "metricsBlock_table_rows_cells" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_children_cells_order_idx" ON "metricsBlock_table_rows_children_cells" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_children_cells_parent_id_idx" ON "metricsBlock_table_rows_children_cells" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_children_cells_locale_idx" ON "metricsBlock_table_rows_children_cells" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_children_order_idx" ON "metricsBlock_table_rows_children" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_children_parent_id_idx" ON "metricsBlock_table_rows_children" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_children_locale_idx" ON "metricsBlock_table_rows_children" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_order_idx" ON "metricsBlock_table_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_parent_id_idx" ON "metricsBlock_table_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "metricsBlock_table_rows_locale_idx" ON "metricsBlock_table_rows" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_headers_order_idx" ON "pricingBlock_table_headers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_headers_parent_id_idx" ON "pricingBlock_table_headers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_headers_locale_idx" ON "pricingBlock_table_headers" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_cells_order_idx" ON "pricingBlock_table_rows_cells" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_cells_parent_id_idx" ON "pricingBlock_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_cells_locale_idx" ON "pricingBlock_table_rows_cells" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_children_cells_order_idx" ON "pricingBlock_table_rows_children_cells" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_children_cells_parent_id_idx" ON "pricingBlock_table_rows_children_cells" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_children_cells_locale_idx" ON "pricingBlock_table_rows_children_cells" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_children_order_idx" ON "pricingBlock_table_rows_children" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_children_parent_id_idx" ON "pricingBlock_table_rows_children" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_children_locale_idx" ON "pricingBlock_table_rows_children" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_order_idx" ON "pricingBlock_table_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_parent_id_idx" ON "pricingBlock_table_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pricingBlock_table_rows_locale_idx" ON "pricingBlock_table_rows" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_headers_order_idx" ON "_metricsBlock_v_table_headers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_headers_parent_id_idx" ON "_metricsBlock_v_table_headers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_headers_locale_idx" ON "_metricsBlock_v_table_headers" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_cells_order_idx" ON "_metricsBlock_v_table_rows_cells" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_cells_parent_id_idx" ON "_metricsBlock_v_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_cells_locale_idx" ON "_metricsBlock_v_table_rows_cells" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_children_cells_order_idx" ON "_metricsBlock_v_table_rows_children_cells" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_children_cells_parent_id_idx" ON "_metricsBlock_v_table_rows_children_cells" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_children_cells_locale_idx" ON "_metricsBlock_v_table_rows_children_cells" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_children_order_idx" ON "_metricsBlock_v_table_rows_children" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_children_parent_id_idx" ON "_metricsBlock_v_table_rows_children" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_children_locale_idx" ON "_metricsBlock_v_table_rows_children" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_order_idx" ON "_metricsBlock_v_table_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_parent_id_idx" ON "_metricsBlock_v_table_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_metricsBlock_v_table_rows_locale_idx" ON "_metricsBlock_v_table_rows" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_headers_order_idx" ON "_pricingBlock_v_table_headers" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_headers_parent_id_idx" ON "_pricingBlock_v_table_headers" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_headers_locale_idx" ON "_pricingBlock_v_table_headers" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_cells_order_idx" ON "_pricingBlock_v_table_rows_cells" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_cells_parent_id_idx" ON "_pricingBlock_v_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_cells_locale_idx" ON "_pricingBlock_v_table_rows_cells" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_children_cells_order_idx" ON "_pricingBlock_v_table_rows_children_cells" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_children_cells_parent_id_idx" ON "_pricingBlock_v_table_rows_children_cells" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_children_cells_locale_idx" ON "_pricingBlock_v_table_rows_children_cells" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_children_order_idx" ON "_pricingBlock_v_table_rows_children" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_children_parent_id_idx" ON "_pricingBlock_v_table_rows_children" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_children_locale_idx" ON "_pricingBlock_v_table_rows_children" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_order_idx" ON "_pricingBlock_v_table_rows" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_parent_id_idx" ON "_pricingBlock_v_table_rows" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_pricingBlock_v_table_rows_locale_idx" ON "_pricingBlock_v_table_rows" USING btree ("_locale");
  ALTER TABLE "metricsBlock_locales" DROP COLUMN IF EXISTS "table";
  ALTER TABLE "pricingBlock_locales" DROP COLUMN IF EXISTS "table";
  ALTER TABLE "_metricsBlock_v_locales" DROP COLUMN IF EXISTS "table";
  ALTER TABLE "_pricingBlock_v_locales" DROP COLUMN IF EXISTS "table";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "metricsBlock_table_headers" CASCADE;
  DROP TABLE "metricsBlock_table_rows_cells" CASCADE;
  DROP TABLE "metricsBlock_table_rows_children_cells" CASCADE;
  DROP TABLE "metricsBlock_table_rows_children" CASCADE;
  DROP TABLE "metricsBlock_table_rows" CASCADE;
  DROP TABLE "pricingBlock_table_headers" CASCADE;
  DROP TABLE "pricingBlock_table_rows_cells" CASCADE;
  DROP TABLE "pricingBlock_table_rows_children_cells" CASCADE;
  DROP TABLE "pricingBlock_table_rows_children" CASCADE;
  DROP TABLE "pricingBlock_table_rows" CASCADE;
  DROP TABLE "_metricsBlock_v_table_headers" CASCADE;
  DROP TABLE "_metricsBlock_v_table_rows_cells" CASCADE;
  DROP TABLE "_metricsBlock_v_table_rows_children_cells" CASCADE;
  DROP TABLE "_metricsBlock_v_table_rows_children" CASCADE;
  DROP TABLE "_metricsBlock_v_table_rows" CASCADE;
  DROP TABLE "_pricingBlock_v_table_headers" CASCADE;
  DROP TABLE "_pricingBlock_v_table_rows_cells" CASCADE;
  DROP TABLE "_pricingBlock_v_table_rows_children_cells" CASCADE;
  DROP TABLE "_pricingBlock_v_table_rows_children" CASCADE;
  DROP TABLE "_pricingBlock_v_table_rows" CASCADE;
  ALTER TABLE "metricsBlock_locales" ADD COLUMN "table" jsonb;
  ALTER TABLE "pricingBlock_locales" ADD COLUMN "table" jsonb;
  ALTER TABLE "_metricsBlock_v_locales" ADD COLUMN "table" jsonb;
  ALTER TABLE "_pricingBlock_v_locales" ADD COLUMN "table" jsonb;
  ALTER TABLE "metricsBlock" DROP COLUMN IF EXISTS "table_styling_striped";
  ALTER TABLE "metricsBlock" DROP COLUMN IF EXISTS "table_styling_bordered";
  ALTER TABLE "metricsBlock" DROP COLUMN IF EXISTS "table_styling_compact";
  ALTER TABLE "metricsBlock_locales" DROP COLUMN IF EXISTS "table_title";
  ALTER TABLE "pricingBlock" DROP COLUMN IF EXISTS "table_styling_striped";
  ALTER TABLE "pricingBlock" DROP COLUMN IF EXISTS "table_styling_bordered";
  ALTER TABLE "pricingBlock" DROP COLUMN IF EXISTS "table_styling_compact";
  ALTER TABLE "pricingBlock_locales" DROP COLUMN IF EXISTS "table_title";
  ALTER TABLE "_metricsBlock_v" DROP COLUMN IF EXISTS "table_styling_striped";
  ALTER TABLE "_metricsBlock_v" DROP COLUMN IF EXISTS "table_styling_bordered";
  ALTER TABLE "_metricsBlock_v" DROP COLUMN IF EXISTS "table_styling_compact";
  ALTER TABLE "_metricsBlock_v_locales" DROP COLUMN IF EXISTS "table_title";
  ALTER TABLE "_pricingBlock_v" DROP COLUMN IF EXISTS "table_styling_striped";
  ALTER TABLE "_pricingBlock_v" DROP COLUMN IF EXISTS "table_styling_bordered";
  ALTER TABLE "_pricingBlock_v" DROP COLUMN IF EXISTS "table_styling_compact";
  ALTER TABLE "_pricingBlock_v_locales" DROP COLUMN IF EXISTS "table_title";
  DROP TYPE "public"."enum_metricsBlock_table_headers_width";
  DROP TYPE "public"."enum_pricingBlock_table_headers_width";
  DROP TYPE "public"."enum__metricsBlock_v_table_headers_width";
  DROP TYPE "public"."enum__pricingBlock_v_table_headers_width";`)
}
