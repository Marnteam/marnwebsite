import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "carouselBlock_columns" DROP CONSTRAINT "carouselBlock_columns_image_id_media_id_fk";
  
  ALTER TABLE "featuredAppsBlock" DROP CONSTRAINT "featuredAppsBlock_media_id_media_id_fk";
  
  ALTER TABLE "featuresBlock_columns" DROP CONSTRAINT "featuresBlock_columns_image_id_media_id_fk";
  
  ALTER TABLE "featuresBlock" DROP CONSTRAINT "featuresBlock_block_image_id_media_id_fk";
  
  ALTER TABLE "_carouselBlock_v_columns" DROP CONSTRAINT "_carouselBlock_v_columns_image_id_media_id_fk";
  
  ALTER TABLE "_featuredAppsBlock_v" DROP CONSTRAINT "_featuredAppsBlock_v_media_id_media_id_fk";
  
  ALTER TABLE "_featuresBlock_v_columns" DROP CONSTRAINT "_featuresBlock_v_columns_image_id_media_id_fk";
  
  ALTER TABLE "_featuresBlock_v" DROP CONSTRAINT "_featuresBlock_v_block_image_id_media_id_fk";
  
  DROP INDEX "carouselBlock_columns_image_idx";
  DROP INDEX "featuredAppsBlock_media_idx";
  DROP INDEX "featuresBlock_columns_image_idx";
  DROP INDEX "featuresBlock_block_image_idx";
  DROP INDEX "_carouselBlock_v_columns_image_idx";
  DROP INDEX "_featuredAppsBlock_v_media_idx";
  DROP INDEX "_featuresBlock_v_columns_image_idx";
  DROP INDEX "_featuresBlock_v_block_image_idx";
  ALTER TABLE "carouselBlock_columns_locales" ADD COLUMN "image_id" uuid;
  ALTER TABLE "featuredAppsBlock_locales" ADD COLUMN "media_id" uuid;
  ALTER TABLE "featuresBlock_columns_locales" ADD COLUMN "image_id" uuid;
  ALTER TABLE "featuresBlock_locales" ADD COLUMN "block_image_id" uuid;
  ALTER TABLE "_carouselBlock_v_columns_locales" ADD COLUMN "image_id" uuid;
  ALTER TABLE "_featuredAppsBlock_v_locales" ADD COLUMN "media_id" uuid;
  ALTER TABLE "_featuresBlock_v_columns_locales" ADD COLUMN "image_id" uuid;
  ALTER TABLE "_featuresBlock_v_locales" ADD COLUMN "block_image_id" uuid;
  ALTER TABLE "carouselBlock_columns_locales" ADD CONSTRAINT "carouselBlock_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featuredAppsBlock_locales" ADD CONSTRAINT "featuredAppsBlock_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featuresBlock_columns_locales" ADD CONSTRAINT "featuresBlock_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featuresBlock_locales" ADD CONSTRAINT "featuresBlock_locales_block_image_id_media_id_fk" FOREIGN KEY ("block_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_carouselBlock_v_columns_locales" ADD CONSTRAINT "_carouselBlock_v_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_featuredAppsBlock_v_locales" ADD CONSTRAINT "_featuredAppsBlock_v_locales_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_featuresBlock_v_columns_locales" ADD CONSTRAINT "_featuresBlock_v_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_featuresBlock_v_locales" ADD CONSTRAINT "_featuresBlock_v_locales_block_image_id_media_id_fk" FOREIGN KEY ("block_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "carouselBlock_columns_image_idx" ON "carouselBlock_columns_locales" USING btree ("image_id","_locale");
  CREATE INDEX "featuredAppsBlock_media_idx" ON "featuredAppsBlock_locales" USING btree ("media_id","_locale");
  CREATE INDEX "featuresBlock_columns_image_idx" ON "featuresBlock_columns_locales" USING btree ("image_id","_locale");
  CREATE INDEX "featuresBlock_block_image_idx" ON "featuresBlock_locales" USING btree ("block_image_id","_locale");
  CREATE INDEX "_carouselBlock_v_columns_image_idx" ON "_carouselBlock_v_columns_locales" USING btree ("image_id","_locale");
  CREATE INDEX "_featuredAppsBlock_v_media_idx" ON "_featuredAppsBlock_v_locales" USING btree ("media_id","_locale");
  CREATE INDEX "_featuresBlock_v_columns_image_idx" ON "_featuresBlock_v_columns_locales" USING btree ("image_id","_locale");
  CREATE INDEX "_featuresBlock_v_block_image_idx" ON "_featuresBlock_v_locales" USING btree ("block_image_id","_locale");

  -- Copy media references from base tables into their locale tables
  UPDATE "featuresBlock_columns_locales" AS loc
  SET "image_id" = base."image_id"
  FROM "featuresBlock_columns" AS base
  WHERE loc."_parent_id" = base."id"
    AND base."image_id" IS NOT NULL;

  UPDATE "featuresBlock_locales" AS loc
  SET "block_image_id" = base."block_image_id"
  FROM "featuresBlock" AS base
  WHERE loc."_parent_id" = base."id"
    AND base."block_image_id" IS NOT NULL;

  UPDATE "carouselBlock_columns_locales" AS loc
  SET "image_id" = base."image_id"
  FROM "carouselBlock_columns" AS base
  WHERE loc."_parent_id" = base."id"
    AND base."image_id" IS NOT NULL;

  UPDATE "featuredAppsBlock_locales" AS loc
  SET "media_id" = base."media_id"
  FROM "featuredAppsBlock" AS base
  WHERE loc."_parent_id" = base."id"
    AND base."media_id" IS NOT NULL;


  -- Copy media references from version tables into their locale tables

  UPDATE "_featuresBlock_v_columns_locales" AS loc
  SET "image_id" = base."image_id"
  FROM "_featuresBlock_v_columns" AS base
  WHERE loc."_parent_id" = base."id"
    AND base."image_id" IS NOT NULL;

  UPDATE "_featuresBlock_v_locales" AS loc
  SET "block_image_id" = base."block_image_id"
  FROM "_featuresBlock_v" AS base
  WHERE loc."_parent_id" = base."id"
    AND base."block_image_id" IS NOT NULL;

  UPDATE "_carouselBlock_v_columns_locales" AS loc
  SET "image_id" = base."image_id"
  FROM "_carouselBlock_v_columns" AS base
  WHERE loc."_parent_id" = base."id"
    AND base."image_id" IS NOT NULL;

  UPDATE "_featuredAppsBlock_v_locales" AS loc
  SET "media_id" = base."media_id"
  FROM "_featuredAppsBlock_v" AS base
  WHERE loc."_parent_id" = base."id"
    AND base."media_id" IS NOT NULL;

  -- Drop main tables and version tables

  ALTER TABLE "carouselBlock_columns" DROP COLUMN "image_id";
  ALTER TABLE "featuredAppsBlock" DROP COLUMN "media_id";
  ALTER TABLE "featuresBlock_columns" DROP COLUMN "image_id";
  ALTER TABLE "featuresBlock" DROP COLUMN "block_image_id";
  ALTER TABLE "_carouselBlock_v_columns" DROP COLUMN "image_id";
  ALTER TABLE "_featuredAppsBlock_v" DROP COLUMN "media_id";
  ALTER TABLE "_featuresBlock_v_columns" DROP COLUMN "image_id";
  ALTER TABLE "_featuresBlock_v" DROP COLUMN "block_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "carouselBlock_columns_locales" DROP CONSTRAINT "carouselBlock_columns_locales_image_id_media_id_fk";
  
  ALTER TABLE "featuredAppsBlock_locales" DROP CONSTRAINT "featuredAppsBlock_locales_media_id_media_id_fk";
  
  ALTER TABLE "featuresBlock_columns_locales" DROP CONSTRAINT "featuresBlock_columns_locales_image_id_media_id_fk";
  
  ALTER TABLE "featuresBlock_locales" DROP CONSTRAINT "featuresBlock_locales_block_image_id_media_id_fk";
  
  ALTER TABLE "_carouselBlock_v_columns_locales" DROP CONSTRAINT "_carouselBlock_v_columns_locales_image_id_media_id_fk";
  
  ALTER TABLE "_featuredAppsBlock_v_locales" DROP CONSTRAINT "_featuredAppsBlock_v_locales_media_id_media_id_fk";
  
  ALTER TABLE "_featuresBlock_v_columns_locales" DROP CONSTRAINT "_featuresBlock_v_columns_locales_image_id_media_id_fk";
  
  ALTER TABLE "_featuresBlock_v_locales" DROP CONSTRAINT "_featuresBlock_v_locales_block_image_id_media_id_fk";
  
  DROP INDEX "carouselBlock_columns_image_idx";
  DROP INDEX "featuredAppsBlock_media_idx";
  DROP INDEX "featuresBlock_columns_image_idx";
  DROP INDEX "featuresBlock_block_image_idx";
  DROP INDEX "_carouselBlock_v_columns_image_idx";
  DROP INDEX "_featuredAppsBlock_v_media_idx";
  DROP INDEX "_featuresBlock_v_columns_image_idx";
  DROP INDEX "_featuresBlock_v_block_image_idx";
  ALTER TABLE "carouselBlock_columns" ADD COLUMN "image_id" uuid;
  ALTER TABLE "featuredAppsBlock" ADD COLUMN "media_id" uuid;
  ALTER TABLE "featuresBlock_columns" ADD COLUMN "image_id" uuid;
  ALTER TABLE "featuresBlock" ADD COLUMN "block_image_id" uuid;
  ALTER TABLE "_carouselBlock_v_columns" ADD COLUMN "image_id" uuid;
  ALTER TABLE "_featuredAppsBlock_v" ADD COLUMN "media_id" uuid;
  ALTER TABLE "_featuresBlock_v_columns" ADD COLUMN "image_id" uuid;
  ALTER TABLE "_featuresBlock_v" ADD COLUMN "block_image_id" uuid;
  ALTER TABLE "carouselBlock_columns" ADD CONSTRAINT "carouselBlock_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featuredAppsBlock" ADD CONSTRAINT "featuredAppsBlock_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featuresBlock_columns" ADD CONSTRAINT "featuresBlock_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featuresBlock" ADD CONSTRAINT "featuresBlock_block_image_id_media_id_fk" FOREIGN KEY ("block_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_carouselBlock_v_columns" ADD CONSTRAINT "_carouselBlock_v_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_featuredAppsBlock_v" ADD CONSTRAINT "_featuredAppsBlock_v_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_featuresBlock_v_columns" ADD CONSTRAINT "_featuresBlock_v_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_featuresBlock_v" ADD CONSTRAINT "_featuresBlock_v_block_image_id_media_id_fk" FOREIGN KEY ("block_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "carouselBlock_columns_image_idx" ON "carouselBlock_columns" USING btree ("image_id");
  CREATE INDEX "featuredAppsBlock_media_idx" ON "featuredAppsBlock" USING btree ("media_id");
  CREATE INDEX "featuresBlock_columns_image_idx" ON "featuresBlock_columns" USING btree ("image_id");
  CREATE INDEX "featuresBlock_block_image_idx" ON "featuresBlock" USING btree ("block_image_id");
  CREATE INDEX "_carouselBlock_v_columns_image_idx" ON "_carouselBlock_v_columns" USING btree ("image_id");
  CREATE INDEX "_featuredAppsBlock_v_media_idx" ON "_featuredAppsBlock_v" USING btree ("media_id");
  CREATE INDEX "_featuresBlock_v_columns_image_idx" ON "_featuresBlock_v_columns" USING btree ("image_id");
  CREATE INDEX "_featuresBlock_v_block_image_idx" ON "_featuresBlock_v" USING btree ("block_image_id");
  ALTER TABLE "carouselBlock_columns_locales" DROP COLUMN "image_id";
  ALTER TABLE "featuredAppsBlock_locales" DROP COLUMN "media_id";
  ALTER TABLE "featuresBlock_columns_locales" DROP COLUMN "image_id";
  ALTER TABLE "featuresBlock_locales" DROP COLUMN "block_image_id";
  ALTER TABLE "_carouselBlock_v_columns_locales" DROP COLUMN "image_id";
  ALTER TABLE "_featuredAppsBlock_v_locales" DROP COLUMN "media_id";
  ALTER TABLE "_featuresBlock_v_columns_locales" DROP COLUMN "image_id";
  ALTER TABLE "_featuresBlock_v_locales" DROP COLUMN "block_image_id";`)
}
