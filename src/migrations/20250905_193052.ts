import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "callToActionBlock" RENAME COLUMN "media_desktop_video_controls_autoplay" TO "media_group_video_controls_autoplay";
  ALTER TABLE "callToActionBlock" RENAME COLUMN "media_desktop_video_controls_loop" TO "media_group_video_controls_loop";
  ALTER TABLE "callToActionBlock" RENAME COLUMN "media_desktop_video_controls_muted" TO "media_group_video_controls_muted";
  ALTER TABLE "callToActionBlock" RENAME COLUMN "media_desktop_video_controls_controls" TO "media_group_video_controls_controls";
  ALTER TABLE "callToActionBlock" RENAME COLUMN "media_desktop_video_controls_object_fit" TO "media_group_video_controls_object_fit";
  ALTER TABLE "pages" RENAME COLUMN "hero_media_desktop_video_controls_autoplay" TO "hero_media_group_video_controls_autoplay";
  ALTER TABLE "pages" RENAME COLUMN "hero_media_desktop_video_controls_loop" TO "hero_media_group_video_controls_loop";
  ALTER TABLE "pages" RENAME COLUMN "hero_media_desktop_video_controls_muted" TO "hero_media_group_video_controls_muted";
  ALTER TABLE "pages" RENAME COLUMN "hero_media_desktop_video_controls_controls" TO "hero_media_group_video_controls_controls";
  ALTER TABLE "pages" RENAME COLUMN "hero_media_desktop_video_controls_object_fit" TO "hero_media_group_video_controls_object_fit";
  ALTER TABLE "_callToActionBlock_v" RENAME COLUMN "media_desktop_video_controls_autoplay" TO "media_group_video_controls_autoplay";
  ALTER TABLE "_callToActionBlock_v" RENAME COLUMN "media_desktop_video_controls_loop" TO "media_group_video_controls_loop";
  ALTER TABLE "_callToActionBlock_v" RENAME COLUMN "media_desktop_video_controls_muted" TO "media_group_video_controls_muted";
  ALTER TABLE "_callToActionBlock_v" RENAME COLUMN "media_desktop_video_controls_controls" TO "media_group_video_controls_controls";
  ALTER TABLE "_callToActionBlock_v" RENAME COLUMN "media_desktop_video_controls_object_fit" TO "media_group_video_controls_object_fit";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_media_desktop_video_controls_autoplay" TO "version_hero_media_group_video_controls_autoplay";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_media_desktop_video_controls_loop" TO "version_hero_media_group_video_controls_loop";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_media_desktop_video_controls_muted" TO "version_hero_media_group_video_controls_muted";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_media_desktop_video_controls_controls" TO "version_hero_media_group_video_controls_controls";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_media_desktop_video_controls_object_fit" TO "version_hero_media_group_video_controls_object_fit";
  ALTER TABLE "callToActionBlock_locales" DROP CONSTRAINT "callToActionBlock_locales_media_desktop_light_id_media_id_fk";
  
  ALTER TABLE "callToActionBlock_locales" DROP CONSTRAINT "callToActionBlock_locales_media_desktop_dark_id_media_id_fk";
  
  ALTER TABLE "callToActionBlock_locales" DROP CONSTRAINT "callToActionBlock_locales_media_mobile_light_id_media_id_fk";
  
  ALTER TABLE "callToActionBlock_locales" DROP CONSTRAINT "callToActionBlock_locales_media_mobile_dark_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_hero_media_desktop_light_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_hero_media_desktop_dark_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_hero_media_mobile_light_id_media_id_fk";
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_hero_media_mobile_dark_id_media_id_fk";
  
  ALTER TABLE "_callToActionBlock_v_locales" DROP CONSTRAINT "_callToActionBlock_v_locales_media_desktop_light_id_media_id_fk";
  
  ALTER TABLE "_callToActionBlock_v_locales" DROP CONSTRAINT "_callToActionBlock_v_locales_media_desktop_dark_id_media_id_fk";
  
  ALTER TABLE "_callToActionBlock_v_locales" DROP CONSTRAINT "_callToActionBlock_v_locales_media_mobile_light_id_media_id_fk";
  
  ALTER TABLE "_callToActionBlock_v_locales" DROP CONSTRAINT "_callToActionBlock_v_locales_media_mobile_dark_id_media_id_fk";
  
  ALTER TABLE "_pages_v_locales" DROP CONSTRAINT "_pages_v_locales_version_hero_media_desktop_light_id_media_id_fk";
  
  ALTER TABLE "_pages_v_locales" DROP CONSTRAINT "_pages_v_locales_version_hero_media_desktop_dark_id_media_id_fk";
  
  ALTER TABLE "_pages_v_locales" DROP CONSTRAINT "_pages_v_locales_version_hero_media_mobile_light_id_media_id_fk";
  
  ALTER TABLE "_pages_v_locales" DROP CONSTRAINT "_pages_v_locales_version_hero_media_mobile_dark_id_media_id_fk";
  
  DROP INDEX "callToActionBlock_media_desktop_media_desktop_light_idx";
  DROP INDEX "callToActionBlock_media_desktop_media_desktop_dark_idx";
  DROP INDEX "callToActionBlock_media_mobile_media_mobile_light_idx";
  DROP INDEX "callToActionBlock_media_mobile_media_mobile_dark_idx";
  DROP INDEX "pages_hero_media_desktop_hero_media_desktop_light_idx";
  DROP INDEX "pages_hero_media_desktop_hero_media_desktop_dark_idx";
  DROP INDEX "pages_hero_media_mobile_hero_media_mobile_light_idx";
  DROP INDEX "pages_hero_media_mobile_hero_media_mobile_dark_idx";
  DROP INDEX "_callToActionBlock_v_media_desktop_media_desktop_light_idx";
  DROP INDEX "_callToActionBlock_v_media_desktop_media_desktop_dark_idx";
  DROP INDEX "_callToActionBlock_v_media_mobile_media_mobile_light_idx";
  DROP INDEX "_callToActionBlock_v_media_mobile_media_mobile_dark_idx";
  DROP INDEX "_pages_v_version_hero_media_desktop_version_hero_media_d_idx";
  DROP INDEX "_pages_v_version_hero_media_desktop_version_hero_media_1_idx";
  DROP INDEX "_pages_v_version_hero_media_mobile_version_hero_media_mo_idx";
  DROP INDEX "_pages_v_version_hero_media_mobile_version_hero_media__1_idx";
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_group_media_id" uuid;
  ALTER TABLE "pages" ADD COLUMN "hero_media_group_media_id" uuid;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_group_media_id" uuid;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_group_media_id" uuid;
  ALTER TABLE "media" ADD COLUMN "dark_id" uuid;
  ALTER TABLE "media" ADD COLUMN "mobile_id" uuid;
  ALTER TABLE "media" ADD COLUMN "mobile_dark_id" uuid;
  ALTER TABLE "callToActionBlock" ADD CONSTRAINT "callToActionBlock_media_group_media_id_media_id_fk" FOREIGN KEY ("media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_group_media_id_media_id_fk" FOREIGN KEY ("hero_media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_callToActionBlock_v" ADD CONSTRAINT "_callToActionBlock_v_media_group_media_id_media_id_fk" FOREIGN KEY ("media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_group_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_group_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_dark_id_media_id_fk" FOREIGN KEY ("dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_mobile_id_media_id_fk" FOREIGN KEY ("mobile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_mobile_dark_id_media_id_fk" FOREIGN KEY ("mobile_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "callToActionBlock_media_group_media_group_media_idx" ON "callToActionBlock" USING btree ("media_group_media_id");
  CREATE INDEX "pages_hero_media_group_hero_media_group_media_idx" ON "pages" USING btree ("hero_media_group_media_id");
  CREATE INDEX "_callToActionBlock_v_media_group_media_group_media_idx" ON "_callToActionBlock_v" USING btree ("media_group_media_id");
  CREATE INDEX "_pages_v_version_hero_media_group_version_hero_media_gro_idx" ON "_pages_v" USING btree ("version_hero_media_group_media_id");
  CREATE INDEX "media_dark_idx" ON "media" USING btree ("dark_id");
  CREATE INDEX "media_mobile_idx" ON "media" USING btree ("mobile_id");
  CREATE INDEX "media_mobile_dark_idx" ON "media" USING btree ("mobile_dark_id");
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_mobile_video_controls_autoplay";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_mobile_video_controls_loop";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_mobile_video_controls_muted";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_mobile_video_controls_controls";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_mobile_video_controls_object_fit";
  ALTER TABLE "callToActionBlock_locales" DROP COLUMN "media_desktop_light_id";
  ALTER TABLE "callToActionBlock_locales" DROP COLUMN "media_desktop_dark_id";
  ALTER TABLE "callToActionBlock_locales" DROP COLUMN "media_mobile_light_id";
  ALTER TABLE "callToActionBlock_locales" DROP COLUMN "media_mobile_dark_id";
  ALTER TABLE "pages" DROP COLUMN "hero_media_mobile_video_controls_autoplay";
  ALTER TABLE "pages" DROP COLUMN "hero_media_mobile_video_controls_loop";
  ALTER TABLE "pages" DROP COLUMN "hero_media_mobile_video_controls_muted";
  ALTER TABLE "pages" DROP COLUMN "hero_media_mobile_video_controls_controls";
  ALTER TABLE "pages" DROP COLUMN "hero_media_mobile_video_controls_object_fit";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_media_desktop_light_id";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_media_desktop_dark_id";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_media_mobile_light_id";
  ALTER TABLE "pages_locales" DROP COLUMN "hero_media_mobile_dark_id";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_mobile_video_controls_autoplay";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_mobile_video_controls_loop";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_mobile_video_controls_muted";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_mobile_video_controls_controls";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_mobile_video_controls_object_fit";
  ALTER TABLE "_callToActionBlock_v_locales" DROP COLUMN "media_desktop_light_id";
  ALTER TABLE "_callToActionBlock_v_locales" DROP COLUMN "media_desktop_dark_id";
  ALTER TABLE "_callToActionBlock_v_locales" DROP COLUMN "media_mobile_light_id";
  ALTER TABLE "_callToActionBlock_v_locales" DROP COLUMN "media_mobile_dark_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_mobile_video_controls_autoplay";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_mobile_video_controls_loop";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_mobile_video_controls_muted";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_mobile_video_controls_controls";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_mobile_video_controls_object_fit";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_media_desktop_light_id";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_media_desktop_dark_id";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_media_mobile_light_id";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_hero_media_mobile_dark_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "callToActionBlock" RENAME COLUMN "media_group_video_controls_autoplay" TO "media_desktop_video_controls_autoplay";
  ALTER TABLE "callToActionBlock" RENAME COLUMN "media_group_video_controls_loop" TO "media_desktop_video_controls_loop";
  ALTER TABLE "callToActionBlock" RENAME COLUMN "media_group_video_controls_muted" TO "media_desktop_video_controls_muted";
  ALTER TABLE "callToActionBlock" RENAME COLUMN "media_group_video_controls_controls" TO "media_desktop_video_controls_controls";
  ALTER TABLE "callToActionBlock" RENAME COLUMN "media_group_video_controls_object_fit" TO "media_desktop_video_controls_object_fit";
  ALTER TABLE "pages" RENAME COLUMN "hero_media_group_video_controls_autoplay" TO "hero_media_desktop_video_controls_autoplay";
  ALTER TABLE "pages" RENAME COLUMN "hero_media_group_video_controls_loop" TO "hero_media_desktop_video_controls_loop";
  ALTER TABLE "pages" RENAME COLUMN "hero_media_group_video_controls_muted" TO "hero_media_desktop_video_controls_muted";
  ALTER TABLE "pages" RENAME COLUMN "hero_media_group_video_controls_controls" TO "hero_media_desktop_video_controls_controls";
  ALTER TABLE "pages" RENAME COLUMN "hero_media_group_video_controls_object_fit" TO "hero_media_desktop_video_controls_object_fit";
  ALTER TABLE "_callToActionBlock_v" RENAME COLUMN "media_group_video_controls_autoplay" TO "media_desktop_video_controls_autoplay";
  ALTER TABLE "_callToActionBlock_v" RENAME COLUMN "media_group_video_controls_loop" TO "media_desktop_video_controls_loop";
  ALTER TABLE "_callToActionBlock_v" RENAME COLUMN "media_group_video_controls_muted" TO "media_desktop_video_controls_muted";
  ALTER TABLE "_callToActionBlock_v" RENAME COLUMN "media_group_video_controls_controls" TO "media_desktop_video_controls_controls";
  ALTER TABLE "_callToActionBlock_v" RENAME COLUMN "media_group_video_controls_object_fit" TO "media_desktop_video_controls_object_fit";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_media_group_video_controls_autoplay" TO "version_hero_media_desktop_video_controls_autoplay";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_media_group_video_controls_loop" TO "version_hero_media_desktop_video_controls_loop";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_media_group_video_controls_muted" TO "version_hero_media_desktop_video_controls_muted";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_media_group_video_controls_controls" TO "version_hero_media_desktop_video_controls_controls";
  ALTER TABLE "_pages_v" RENAME COLUMN "version_hero_media_group_video_controls_object_fit" TO "version_hero_media_desktop_video_controls_object_fit";
  ALTER TABLE "callToActionBlock" DROP CONSTRAINT "callToActionBlock_media_group_media_id_media_id_fk";
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_media_group_media_id_media_id_fk";
  
  ALTER TABLE "_callToActionBlock_v" DROP CONSTRAINT "_callToActionBlock_v_media_group_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_media_group_media_id_media_id_fk";
  
  ALTER TABLE "media" DROP CONSTRAINT "media_dark_id_media_id_fk";
  
  ALTER TABLE "media" DROP CONSTRAINT "media_mobile_id_media_id_fk";
  
  ALTER TABLE "media" DROP CONSTRAINT "media_mobile_dark_id_media_id_fk";
  
  DROP INDEX "callToActionBlock_media_group_media_group_media_idx";
  DROP INDEX "pages_hero_media_group_hero_media_group_media_idx";
  DROP INDEX "_callToActionBlock_v_media_group_media_group_media_idx";
  DROP INDEX "_pages_v_version_hero_media_group_version_hero_media_gro_idx";
  DROP INDEX "media_dark_idx";
  DROP INDEX "media_mobile_idx";
  DROP INDEX "media_mobile_dark_idx";
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_mobile_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_mobile_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_mobile_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_mobile_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_mobile_video_controls_object_fit" "of" DEFAULT 'cover';
  ALTER TABLE "callToActionBlock_locales" ADD COLUMN "media_desktop_light_id" uuid;
  ALTER TABLE "callToActionBlock_locales" ADD COLUMN "media_desktop_dark_id" uuid;
  ALTER TABLE "callToActionBlock_locales" ADD COLUMN "media_mobile_light_id" uuid;
  ALTER TABLE "callToActionBlock_locales" ADD COLUMN "media_mobile_dark_id" uuid;
  ALTER TABLE "pages" ADD COLUMN "hero_media_mobile_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_mobile_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_mobile_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_mobile_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_mobile_video_controls_object_fit" "of" DEFAULT 'cover';
  ALTER TABLE "pages_locales" ADD COLUMN "hero_media_desktop_light_id" uuid;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_media_desktop_dark_id" uuid;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_media_mobile_light_id" uuid;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_media_mobile_dark_id" uuid;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_mobile_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_mobile_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_mobile_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_mobile_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_mobile_video_controls_object_fit" "of" DEFAULT 'cover';
  ALTER TABLE "_callToActionBlock_v_locales" ADD COLUMN "media_desktop_light_id" uuid;
  ALTER TABLE "_callToActionBlock_v_locales" ADD COLUMN "media_desktop_dark_id" uuid;
  ALTER TABLE "_callToActionBlock_v_locales" ADD COLUMN "media_mobile_light_id" uuid;
  ALTER TABLE "_callToActionBlock_v_locales" ADD COLUMN "media_mobile_dark_id" uuid;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_mobile_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_mobile_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_mobile_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_mobile_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_mobile_video_controls_object_fit" "of" DEFAULT 'cover';
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_media_desktop_light_id" uuid;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_media_desktop_dark_id" uuid;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_media_mobile_light_id" uuid;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_media_mobile_dark_id" uuid;
  ALTER TABLE "callToActionBlock_locales" ADD CONSTRAINT "callToActionBlock_locales_media_desktop_light_id_media_id_fk" FOREIGN KEY ("media_desktop_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "callToActionBlock_locales" ADD CONSTRAINT "callToActionBlock_locales_media_desktop_dark_id_media_id_fk" FOREIGN KEY ("media_desktop_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "callToActionBlock_locales" ADD CONSTRAINT "callToActionBlock_locales_media_mobile_light_id_media_id_fk" FOREIGN KEY ("media_mobile_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "callToActionBlock_locales" ADD CONSTRAINT "callToActionBlock_locales_media_mobile_dark_id_media_id_fk" FOREIGN KEY ("media_mobile_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_hero_media_desktop_light_id_media_id_fk" FOREIGN KEY ("hero_media_desktop_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_hero_media_desktop_dark_id_media_id_fk" FOREIGN KEY ("hero_media_desktop_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_hero_media_mobile_light_id_media_id_fk" FOREIGN KEY ("hero_media_mobile_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_hero_media_mobile_dark_id_media_id_fk" FOREIGN KEY ("hero_media_mobile_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_callToActionBlock_v_locales" ADD CONSTRAINT "_callToActionBlock_v_locales_media_desktop_light_id_media_id_fk" FOREIGN KEY ("media_desktop_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_callToActionBlock_v_locales" ADD CONSTRAINT "_callToActionBlock_v_locales_media_desktop_dark_id_media_id_fk" FOREIGN KEY ("media_desktop_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_callToActionBlock_v_locales" ADD CONSTRAINT "_callToActionBlock_v_locales_media_mobile_light_id_media_id_fk" FOREIGN KEY ("media_mobile_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_callToActionBlock_v_locales" ADD CONSTRAINT "_callToActionBlock_v_locales_media_mobile_dark_id_media_id_fk" FOREIGN KEY ("media_mobile_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_hero_media_desktop_light_id_media_id_fk" FOREIGN KEY ("version_hero_media_desktop_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_hero_media_desktop_dark_id_media_id_fk" FOREIGN KEY ("version_hero_media_desktop_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_hero_media_mobile_light_id_media_id_fk" FOREIGN KEY ("version_hero_media_mobile_light_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_hero_media_mobile_dark_id_media_id_fk" FOREIGN KEY ("version_hero_media_mobile_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "callToActionBlock_media_desktop_media_desktop_light_idx" ON "callToActionBlock_locales" USING btree ("media_desktop_light_id","_locale");
  CREATE INDEX "callToActionBlock_media_desktop_media_desktop_dark_idx" ON "callToActionBlock_locales" USING btree ("media_desktop_dark_id","_locale");
  CREATE INDEX "callToActionBlock_media_mobile_media_mobile_light_idx" ON "callToActionBlock_locales" USING btree ("media_mobile_light_id","_locale");
  CREATE INDEX "callToActionBlock_media_mobile_media_mobile_dark_idx" ON "callToActionBlock_locales" USING btree ("media_mobile_dark_id","_locale");
  CREATE INDEX "pages_hero_media_desktop_hero_media_desktop_light_idx" ON "pages_locales" USING btree ("hero_media_desktop_light_id","_locale");
  CREATE INDEX "pages_hero_media_desktop_hero_media_desktop_dark_idx" ON "pages_locales" USING btree ("hero_media_desktop_dark_id","_locale");
  CREATE INDEX "pages_hero_media_mobile_hero_media_mobile_light_idx" ON "pages_locales" USING btree ("hero_media_mobile_light_id","_locale");
  CREATE INDEX "pages_hero_media_mobile_hero_media_mobile_dark_idx" ON "pages_locales" USING btree ("hero_media_mobile_dark_id","_locale");
  CREATE INDEX "_callToActionBlock_v_media_desktop_media_desktop_light_idx" ON "_callToActionBlock_v_locales" USING btree ("media_desktop_light_id","_locale");
  CREATE INDEX "_callToActionBlock_v_media_desktop_media_desktop_dark_idx" ON "_callToActionBlock_v_locales" USING btree ("media_desktop_dark_id","_locale");
  CREATE INDEX "_callToActionBlock_v_media_mobile_media_mobile_light_idx" ON "_callToActionBlock_v_locales" USING btree ("media_mobile_light_id","_locale");
  CREATE INDEX "_callToActionBlock_v_media_mobile_media_mobile_dark_idx" ON "_callToActionBlock_v_locales" USING btree ("media_mobile_dark_id","_locale");
  CREATE INDEX "_pages_v_version_hero_media_desktop_version_hero_media_d_idx" ON "_pages_v_locales" USING btree ("version_hero_media_desktop_light_id","_locale");
  CREATE INDEX "_pages_v_version_hero_media_desktop_version_hero_media_1_idx" ON "_pages_v_locales" USING btree ("version_hero_media_desktop_dark_id","_locale");
  CREATE INDEX "_pages_v_version_hero_media_mobile_version_hero_media_mo_idx" ON "_pages_v_locales" USING btree ("version_hero_media_mobile_light_id","_locale");
  CREATE INDEX "_pages_v_version_hero_media_mobile_version_hero_media__1_idx" ON "_pages_v_locales" USING btree ("version_hero_media_mobile_dark_id","_locale");
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_group_media_id";
  ALTER TABLE "pages" DROP COLUMN "hero_media_group_media_id";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_group_media_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_group_media_id";
  ALTER TABLE "media" DROP COLUMN "dark_id";
  ALTER TABLE "media" DROP COLUMN "mobile_id";
  ALTER TABLE "media" DROP COLUMN "mobile_dark_id";`)
}
