import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."of" AS ENUM('cover', 'contain', 'fill', 'none', 'scale-down');
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_desktop_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_desktop_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_desktop_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_desktop_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_desktop_video_controls_object_fit" "of" DEFAULT 'cover';
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_mobile_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_mobile_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_mobile_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_mobile_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "callToActionBlock" ADD COLUMN "media_mobile_video_controls_object_fit" "of" DEFAULT 'cover';
  ALTER TABLE "pages" ADD COLUMN "hero_media_desktop_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_desktop_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_desktop_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_desktop_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_desktop_video_controls_object_fit" "of" DEFAULT 'cover';
  ALTER TABLE "pages" ADD COLUMN "hero_media_mobile_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_mobile_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_mobile_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_mobile_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "pages" ADD COLUMN "hero_media_mobile_video_controls_object_fit" "of" DEFAULT 'cover';
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_desktop_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_desktop_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_desktop_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_desktop_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_desktop_video_controls_object_fit" "of" DEFAULT 'cover';
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_mobile_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_mobile_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_mobile_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_mobile_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "_callToActionBlock_v" ADD COLUMN "media_mobile_video_controls_object_fit" "of" DEFAULT 'cover';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_desktop_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_desktop_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_desktop_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_desktop_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_desktop_video_controls_object_fit" "of" DEFAULT 'cover';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_mobile_video_controls_autoplay" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_mobile_video_controls_loop" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_mobile_video_controls_muted" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_mobile_video_controls_controls" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_mobile_video_controls_object_fit" "of" DEFAULT 'cover';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "callToActionBlock" DROP COLUMN "media_desktop_video_controls_autoplay";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_desktop_video_controls_loop";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_desktop_video_controls_muted";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_desktop_video_controls_controls";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_desktop_video_controls_object_fit";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_mobile_video_controls_autoplay";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_mobile_video_controls_loop";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_mobile_video_controls_muted";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_mobile_video_controls_controls";
  ALTER TABLE "callToActionBlock" DROP COLUMN "media_mobile_video_controls_object_fit";
  ALTER TABLE "pages" DROP COLUMN "hero_media_desktop_video_controls_autoplay";
  ALTER TABLE "pages" DROP COLUMN "hero_media_desktop_video_controls_loop";
  ALTER TABLE "pages" DROP COLUMN "hero_media_desktop_video_controls_muted";
  ALTER TABLE "pages" DROP COLUMN "hero_media_desktop_video_controls_controls";
  ALTER TABLE "pages" DROP COLUMN "hero_media_desktop_video_controls_object_fit";
  ALTER TABLE "pages" DROP COLUMN "hero_media_mobile_video_controls_autoplay";
  ALTER TABLE "pages" DROP COLUMN "hero_media_mobile_video_controls_loop";
  ALTER TABLE "pages" DROP COLUMN "hero_media_mobile_video_controls_muted";
  ALTER TABLE "pages" DROP COLUMN "hero_media_mobile_video_controls_controls";
  ALTER TABLE "pages" DROP COLUMN "hero_media_mobile_video_controls_object_fit";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_desktop_video_controls_autoplay";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_desktop_video_controls_loop";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_desktop_video_controls_muted";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_desktop_video_controls_controls";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_desktop_video_controls_object_fit";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_mobile_video_controls_autoplay";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_mobile_video_controls_loop";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_mobile_video_controls_muted";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_mobile_video_controls_controls";
  ALTER TABLE "_callToActionBlock_v" DROP COLUMN "media_mobile_video_controls_object_fit";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_desktop_video_controls_autoplay";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_desktop_video_controls_loop";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_desktop_video_controls_muted";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_desktop_video_controls_controls";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_desktop_video_controls_object_fit";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_mobile_video_controls_autoplay";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_mobile_video_controls_loop";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_mobile_video_controls_muted";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_mobile_video_controls_controls";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_mobile_video_controls_object_fit";
  DROP TYPE "public"."of";`)
}
