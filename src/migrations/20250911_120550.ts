import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "carouselBlock_columns_locales" DROP CONSTRAINT "carouselBlock_columns_locales_image_id_media_id_fk";
  
  ALTER TABLE "featuresBlock_columns_locales" DROP CONSTRAINT "featuresBlock_columns_locales_image_id_media_id_fk";
  
  ALTER TABLE "_carouselBlock_v_columns_locales" DROP CONSTRAINT "_carouselBlock_v_columns_locales_image_id_media_id_fk";
  
  ALTER TABLE "_featuresBlock_v_columns_locales" DROP CONSTRAINT "_featuresBlock_v_columns_locales_image_id_media_id_fk";
  
  DROP INDEX "carouselBlock_columns_image_idx";
  DROP INDEX "featuresBlock_columns_image_idx";
  DROP INDEX "_carouselBlock_v_columns_image_idx";
  DROP INDEX "_featuresBlock_v_columns_image_idx";
  ALTER TABLE "carouselBlock_columns" ADD COLUMN "image_id" uuid;
  ALTER TABLE "featuresBlock_columns" ADD COLUMN "image_id" uuid;
  ALTER TABLE "_carouselBlock_v_columns" ADD COLUMN "image_id" uuid;
  ALTER TABLE "_featuresBlock_v_columns" ADD COLUMN "image_id" uuid;
  ALTER TABLE "carouselBlock_columns" ADD CONSTRAINT "carouselBlock_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featuresBlock_columns" ADD CONSTRAINT "featuresBlock_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_carouselBlock_v_columns" ADD CONSTRAINT "_carouselBlock_v_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_featuresBlock_v_columns" ADD CONSTRAINT "_featuresBlock_v_columns_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "carouselBlock_columns_image_idx" ON "carouselBlock_columns" USING btree ("image_id");
  CREATE INDEX "featuresBlock_columns_image_idx" ON "featuresBlock_columns" USING btree ("image_id");
  CREATE INDEX "_carouselBlock_v_columns_image_idx" ON "_carouselBlock_v_columns" USING btree ("image_id");
  CREATE INDEX "_featuresBlock_v_columns_image_idx" ON "_featuresBlock_v_columns" USING btree ("image_id");
  ALTER TABLE "carouselBlock_columns_locales" DROP COLUMN "image_id";
  ALTER TABLE "featuresBlock_columns_locales" DROP COLUMN "image_id";
  ALTER TABLE "_carouselBlock_v_columns_locales" DROP COLUMN "image_id";
  ALTER TABLE "_featuresBlock_v_columns_locales" DROP COLUMN "image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "carouselBlock_columns" DROP CONSTRAINT "carouselBlock_columns_image_id_media_id_fk";
  
  ALTER TABLE "featuresBlock_columns" DROP CONSTRAINT "featuresBlock_columns_image_id_media_id_fk";
  
  ALTER TABLE "_carouselBlock_v_columns" DROP CONSTRAINT "_carouselBlock_v_columns_image_id_media_id_fk";
  
  ALTER TABLE "_featuresBlock_v_columns" DROP CONSTRAINT "_featuresBlock_v_columns_image_id_media_id_fk";
  
  DROP INDEX "carouselBlock_columns_image_idx";
  DROP INDEX "featuresBlock_columns_image_idx";
  DROP INDEX "_carouselBlock_v_columns_image_idx";
  DROP INDEX "_featuresBlock_v_columns_image_idx";
  ALTER TABLE "carouselBlock_columns_locales" ADD COLUMN "image_id" uuid;
  ALTER TABLE "featuresBlock_columns_locales" ADD COLUMN "image_id" uuid;
  ALTER TABLE "_carouselBlock_v_columns_locales" ADD COLUMN "image_id" uuid;
  ALTER TABLE "_featuresBlock_v_columns_locales" ADD COLUMN "image_id" uuid;
  ALTER TABLE "carouselBlock_columns_locales" ADD CONSTRAINT "carouselBlock_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featuresBlock_columns_locales" ADD CONSTRAINT "featuresBlock_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_carouselBlock_v_columns_locales" ADD CONSTRAINT "_carouselBlock_v_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_featuresBlock_v_columns_locales" ADD CONSTRAINT "_featuresBlock_v_columns_locales_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "carouselBlock_columns_image_idx" ON "carouselBlock_columns_locales" USING btree ("image_id","_locale");
  CREATE INDEX "featuresBlock_columns_image_idx" ON "featuresBlock_columns_locales" USING btree ("image_id","_locale");
  CREATE INDEX "_carouselBlock_v_columns_image_idx" ON "_carouselBlock_v_columns_locales" USING btree ("image_id","_locale");
  CREATE INDEX "_featuresBlock_v_columns_image_idx" ON "_featuresBlock_v_columns_locales" USING btree ("image_id","_locale");
  ALTER TABLE "carouselBlock_columns" DROP COLUMN "image_id";
  ALTER TABLE "featuresBlock_columns" DROP COLUMN "image_id";
  ALTER TABLE "_carouselBlock_v_columns" DROP COLUMN "image_id";
  ALTER TABLE "_featuresBlock_v_columns" DROP COLUMN "image_id";`)
}
