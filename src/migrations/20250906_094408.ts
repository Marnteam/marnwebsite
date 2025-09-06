import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "callToActionBlock" DROP CONSTRAINT "callToActionBlock_media_group_media_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_media_group_media_id_media_id_fk";
  
  ALTER TABLE "_callToActionBlock_v" DROP CONSTRAINT "_callToActionBlock_v_media_group_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_media_group_media_id_media_id_fk";
  
  DROP INDEX "callToActionBlock_media_group_media_group_media_idx";
  DROP INDEX "pages_hero_media_group_hero_media_group_media_idx";
  DROP INDEX "_callToActionBlock_v_media_group_media_group_media_idx";
  DROP INDEX "_pages_v_version_hero_media_group_version_hero_media_gro_idx";
  ALTER TABLE "callToActionBlock_locales" ADD COLUMN "media_group_media_id" uuid;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_media_group_media_id" uuid;
  ALTER TABLE "_callToActionBlock_v_locales" ADD COLUMN "media_group_media_id" uuid;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_media_group_media_id" uuid;
  ALTER TABLE "callToActionBlock_locales" ADD CONSTRAINT "callToActionBlock_locales_media_group_media_id_media_id_fk" FOREIGN KEY ("media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_hero_media_group_media_id_media_id_fk" FOREIGN KEY ("hero_media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_callToActionBlock_v_locales" ADD CONSTRAINT "_callToActionBlock_v_locales_media_group_media_id_media_id_fk" FOREIGN KEY ("media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_hero_media_group_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "callToActionBlock_media_group_media_group_media_idx" ON "callToActionBlock_locales" USING btree ("media_group_media_id","_locale");
  CREATE INDEX "pages_hero_media_group_hero_media_group_media_idx" ON "pages_locales" USING btree ("hero_media_group_media_id","_locale");
  CREATE INDEX "_callToActionBlock_v_media_group_media_group_media_idx" ON "_callToActionBlock_v_locales" USING btree ("media_group_media_id","_locale");
  CREATE INDEX "_pages_v_version_hero_media_group_version_hero_media_gro_idx" ON "_pages_v_locales" USING btree ("version_hero_media_group_media_id","_locale");
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_group_media_id";
  ALTER TABLE "pages" DROP COLUMN "hero_media_group_media_id";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_group_media_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_group_media_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "callToActionBlock_locales" DROP CONSTRAINT "callToActionBlock_locales_media_group_media_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_hero_media_group_media_id_media_id_fk";
  
  ALTER TABLE "_callToActionBlock_v_locales" DROP CONSTRAINT "_callToActionBlock_v_locales_media_group_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_locales" DROP CONSTRAINT "_pages_v_locales_version_hero_media_group_media_id_media_id_fk";
  
  DROP INDEX "callToActionBlock_media_group_media_group_media_idx";
  DROP INDEX "pages_hero_media_group_hero_media_group_media_idx";
  DROP INDEX "_callToActionBlock_v_media_group_media_group_media_idx";
  DROP INDEX "_pages_v_version_hero_media_group_version_hero_media_gro_idx";
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_group_media_id" uuid;
  ALTER TABLE "pages" ADD COLUMN "hero_media_group_media_id" uuid;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_group_media_id" uuid;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_group_media_id" uuid;
  ALTER TABLE "callToActionBlock" ADD CONSTRAINT "callToActionBlock_media_group_media_id_media_id_fk" FOREIGN KEY ("media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_group_media_id_media_id_fk" FOREIGN KEY ("hero_media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_callToActionBlock_v" ADD CONSTRAINT "_callToActionBlock_v_media_group_media_id_media_id_fk" FOREIGN KEY ("media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_group_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "callToActionBlock_media_group_media_group_media_idx" ON "callToActionBlock" USING btree ("media_group_media_id");
  CREATE INDEX "pages_hero_media_group_hero_media_group_media_idx" ON "pages" USING btree ("hero_media_group_media_id");
  CREATE INDEX "_callToActionBlock_v_media_group_media_group_media_idx" ON "_callToActionBlock_v" USING btree ("media_group_media_id");
  CREATE INDEX "_pages_v_version_hero_media_group_version_hero_media_gro_idx" ON "_pages_v" USING btree ("version_hero_media_group_media_id");
  ALTER TABLE "callToActionBlock_locales" DROP COLUMN "media_group_media_id";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_media_group_media_id";
  ALTER TABLE "_callToActionBlock_v_locales" DROP COLUMN "media_group_media_id";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_media_group_media_id";`)
}
