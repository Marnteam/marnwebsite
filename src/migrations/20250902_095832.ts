import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "marketplaceBlock_initial_filters_initial_filters_ecosystem_idx";
  DROP INDEX IF EXISTS "marketplaceBlock_initial_filters_initial_filters_category_idx";
  DROP INDEX IF EXISTS "_marketplaceBlock_v_initial_filters_initial_filters_ecosystem_idx";
  DROP INDEX IF EXISTS "_marketplaceBlock_v_initial_filters_initial_filters_category_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_media_desktop_version_hero_media_desktop_light_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_media_desktop_version_hero_media_desktop_dark_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_media_mobile_version_hero_media_mobile_light_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_media_mobile_version_hero_media_mobile_dark_idx";
  DROP INDEX IF EXISTS "customers_testimonial_company_testimonial_company_company_logo_idx";
  DROP INDEX IF EXISTS "customers_testimonial_author_info_testimonial_author_info_avatar_idx";
  DROP INDEX IF EXISTS "_customers_v_version_testimonial_version_testimonial_featured_image_idx";
  DROP INDEX IF EXISTS "_customers_v_version_testimonial_company_version_testimonial_company_company_logo_idx";
  DROP INDEX IF EXISTS "_customers_v_version_testimonial_author_info_version_testimonial_author_info_avatar_idx";
  ALTER TABLE "forms" ADD COLUMN "hubspot_portal_id" varchar;
  ALTER TABLE "forms" ADD COLUMN "hubspot_form_id" varchar;
  ALTER TABLE "settings" ADD COLUMN "hubspot_access_token" varchar;
  ALTER TABLE "settings" ADD COLUMN "ai_translator_config_api_key" varchar;
  ALTER TABLE "settings" ADD COLUMN "ai_translator_config_system_prompt" varchar;
  CREATE INDEX "marketplaceBlock_initial_filters_initial_filters_ecosyst_idx" ON "marketplaceBlock" USING btree ("initial_filters_ecosystem_id");
  CREATE INDEX "marketplaceBlock_initial_filters_initial_filters_categor_idx" ON "marketplaceBlock" USING btree ("initial_filters_category_id");
  CREATE INDEX "_marketplaceBlock_v_initial_filters_initial_filters_ecos_idx" ON "_marketplaceBlock_v" USING btree ("initial_filters_ecosystem_id");
  CREATE INDEX "_marketplaceBlock_v_initial_filters_initial_filters_cate_idx" ON "_marketplaceBlock_v" USING btree ("initial_filters_category_id");
  CREATE INDEX "_pages_v_version_hero_media_desktop_version_hero_media_d_idx" ON "_pages_v_locales" USING btree ("version_hero_media_desktop_light_id","_locale");
  CREATE INDEX "_pages_v_version_hero_media_desktop_version_hero_media_1_idx" ON "_pages_v_locales" USING btree ("version_hero_media_desktop_dark_id","_locale");
  CREATE INDEX "_pages_v_version_hero_media_mobile_version_hero_media_mo_idx" ON "_pages_v_locales" USING btree ("version_hero_media_mobile_light_id","_locale");
  CREATE INDEX "_pages_v_version_hero_media_mobile_version_hero_media__1_idx" ON "_pages_v_locales" USING btree ("version_hero_media_mobile_dark_id","_locale");
  CREATE INDEX "customers_testimonial_company_testimonial_company_compan_idx" ON "customers" USING btree ("testimonial_company_company_logo_id");
  CREATE INDEX "customers_testimonial_author_info_testimonial_author_inf_idx" ON "customers" USING btree ("testimonial_author_info_avatar_id");
  CREATE INDEX "_customers_v_version_testimonial_version_testimonial_fea_idx" ON "_customers_v" USING btree ("version_testimonial_featured_image_id");
  CREATE INDEX "_customers_v_version_testimonial_company_version_testimo_idx" ON "_customers_v" USING btree ("version_testimonial_company_company_logo_id");
  CREATE INDEX "_customers_v_version_testimonial_author_info_version_tes_idx" ON "_customers_v" USING btree ("version_testimonial_author_info_avatar_id");
  ALTER TABLE "settings" DROP COLUMN "analytics_scripts";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "marketplaceBlock_initial_filters_initial_filters_ecosyst_idx";
  DROP INDEX "marketplaceBlock_initial_filters_initial_filters_categor_idx";
  DROP INDEX "_marketplaceBlock_v_initial_filters_initial_filters_ecos_idx";
  DROP INDEX "_marketplaceBlock_v_initial_filters_initial_filters_cate_idx";
  DROP INDEX "_pages_v_version_hero_media_desktop_version_hero_media_d_idx";
  DROP INDEX "_pages_v_version_hero_media_desktop_version_hero_media_1_idx";
  DROP INDEX "_pages_v_version_hero_media_mobile_version_hero_media_mo_idx";
  DROP INDEX "_pages_v_version_hero_media_mobile_version_hero_media__1_idx";
  DROP INDEX "customers_testimonial_company_testimonial_company_compan_idx";
  DROP INDEX "customers_testimonial_author_info_testimonial_author_inf_idx";
  DROP INDEX "_customers_v_version_testimonial_version_testimonial_fea_idx";
  DROP INDEX "_customers_v_version_testimonial_company_version_testimo_idx";
  DROP INDEX "_customers_v_version_testimonial_author_info_version_tes_idx";
  ALTER TABLE "settings" ADD COLUMN "analytics_scripts" varchar;
  CREATE INDEX "marketplaceBlock_initial_filters_initial_filters_ecosystem_idx" ON "marketplaceBlock" USING btree ("initial_filters_ecosystem_id");
  CREATE INDEX "marketplaceBlock_initial_filters_initial_filters_category_idx" ON "marketplaceBlock" USING btree ("initial_filters_category_id");
  CREATE INDEX "_marketplaceBlock_v_initial_filters_initial_filters_ecosystem_idx" ON "_marketplaceBlock_v" USING btree ("initial_filters_ecosystem_id");
  CREATE INDEX "_marketplaceBlock_v_initial_filters_initial_filters_category_idx" ON "_marketplaceBlock_v" USING btree ("initial_filters_category_id");
  CREATE INDEX "_pages_v_version_hero_media_desktop_version_hero_media_desktop_light_idx" ON "_pages_v_locales" USING btree ("version_hero_media_desktop_light_id","_locale");
  CREATE INDEX "_pages_v_version_hero_media_desktop_version_hero_media_desktop_dark_idx" ON "_pages_v_locales" USING btree ("version_hero_media_desktop_dark_id","_locale");
  CREATE INDEX "_pages_v_version_hero_media_mobile_version_hero_media_mobile_light_idx" ON "_pages_v_locales" USING btree ("version_hero_media_mobile_light_id","_locale");
  CREATE INDEX "_pages_v_version_hero_media_mobile_version_hero_media_mobile_dark_idx" ON "_pages_v_locales" USING btree ("version_hero_media_mobile_dark_id","_locale");
  CREATE INDEX "customers_testimonial_company_testimonial_company_company_logo_idx" ON "customers" USING btree ("testimonial_company_company_logo_id");
  CREATE INDEX "customers_testimonial_author_info_testimonial_author_info_avatar_idx" ON "customers" USING btree ("testimonial_author_info_avatar_id");
  CREATE INDEX "_customers_v_version_testimonial_version_testimonial_featured_image_idx" ON "_customers_v" USING btree ("version_testimonial_featured_image_id");
  CREATE INDEX "_customers_v_version_testimonial_company_version_testimonial_company_company_logo_idx" ON "_customers_v" USING btree ("version_testimonial_company_company_logo_id");
  CREATE INDEX "_customers_v_version_testimonial_author_info_version_testimonial_author_info_avatar_idx" ON "_customers_v" USING btree ("version_testimonial_author_info_avatar_id");
  ALTER TABLE "forms" DROP COLUMN "hubspot_portal_id";
  ALTER TABLE "forms" DROP COLUMN "hubspot_form_id";
  ALTER TABLE "settings" DROP COLUMN "hubspot_access_token";
  ALTER TABLE "settings" DROP COLUMN "ai_translator_config_api_key";
  ALTER TABLE "settings" DROP COLUMN "ai_translator_config_system_prompt";`)
}
