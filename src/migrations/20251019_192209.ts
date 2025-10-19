import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "archiveBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "callToActionBlock_locales" ALTER COLUMN "rich_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "carouselBlock_columns_locales" ALTER COLUMN "content_subtitle" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "carouselBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "customHtmlBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "faqBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "featuredAppsBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "featuresBlock_columns_locales" ALTER COLUMN "content_subtitle" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "featuresBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "galleryBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "logosBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "metricsBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "pricingBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "richTextBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "testimonialsBlock_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_archiveBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_callToActionBlock_v_locales" ALTER COLUMN "rich_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_carouselBlock_v_columns_locales" ALTER COLUMN "content_subtitle" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_carouselBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_customHtmlBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_faqBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_featuredAppsBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_featuresBlock_v_columns_locales" ALTER COLUMN "content_subtitle" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_featuresBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_galleryBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_logosBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_metricsBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_pricingBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_richTextBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_testimonialsBlock_v_locales" ALTER COLUMN "block_header_header_text" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "blog_posts_locales" ALTER COLUMN "content" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;
  ALTER TABLE "_blog_posts_v_locales" ALTER COLUMN "version_content" SET DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'::jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "archiveBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "callToActionBlock_locales" ALTER COLUMN "rich_text" DROP DEFAULT;
  ALTER TABLE "carouselBlock_columns_locales" ALTER COLUMN "content_subtitle" DROP DEFAULT;
  ALTER TABLE "carouselBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "customHtmlBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "faqBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "featuredAppsBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "featuresBlock_columns_locales" ALTER COLUMN "content_subtitle" DROP DEFAULT;
  ALTER TABLE "featuresBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "galleryBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "logosBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "metricsBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "pricingBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "richTextBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "testimonialsBlock_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_archiveBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_callToActionBlock_v_locales" ALTER COLUMN "rich_text" DROP DEFAULT;
  ALTER TABLE "_carouselBlock_v_columns_locales" ALTER COLUMN "content_subtitle" DROP DEFAULT;
  ALTER TABLE "_carouselBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_customHtmlBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_faqBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_featuredAppsBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_featuresBlock_v_columns_locales" ALTER COLUMN "content_subtitle" DROP DEFAULT;
  ALTER TABLE "_featuresBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_galleryBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_logosBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_metricsBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_pricingBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_richTextBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "_testimonialsBlock_v_locales" ALTER COLUMN "block_header_header_text" DROP DEFAULT;
  ALTER TABLE "blog_posts_locales" ALTER COLUMN "content" DROP DEFAULT;
  ALTER TABLE "_blog_posts_v_locales" ALTER COLUMN "version_content" DROP DEFAULT;`)
}
