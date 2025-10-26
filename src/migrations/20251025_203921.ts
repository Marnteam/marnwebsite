import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "archiveBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "callToActionBlock" ALTER COLUMN "badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "carouselBlock_columns" ALTER COLUMN "badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "carouselBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "customHtmlBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "faqBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "featuredAppsBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "featuresBlock_columns" ALTER COLUMN "badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "featuresBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "galleryBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "logosBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "metricsBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "pricingBlock_pricing_cards" ALTER COLUMN "badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "pricingBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "richTextBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "testimonialsBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "pages" ALTER COLUMN "hero_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_archiveBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_callToActionBlock_v" ALTER COLUMN "badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_carouselBlock_v_columns" ALTER COLUMN "badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_carouselBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_customHtmlBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_faqBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_featuredAppsBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_featuresBlock_v_columns" ALTER COLUMN "badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_featuresBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_galleryBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_logosBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_metricsBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_pricingBlock_v_pricing_cards" ALTER COLUMN "badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_pricingBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_richTextBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_testimonialsBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_badge_color" SET DEFAULT 'gray'::"public"."badge_color";
  ALTER TYPE "public"."badge_color" RENAME VALUE 'purple' TO 'violet';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "archiveBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "callToActionBlock" ALTER COLUMN "badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "carouselBlock_columns" ALTER COLUMN "badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "carouselBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "customHtmlBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "faqBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "featuredAppsBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "featuresBlock_columns" ALTER COLUMN "badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "featuresBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "galleryBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "logosBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "metricsBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "pricingBlock_pricing_cards" ALTER COLUMN "badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "pricingBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "richTextBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "testimonialsBlock" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "pages" ALTER COLUMN "hero_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_archiveBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_callToActionBlock_v" ALTER COLUMN "badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_carouselBlock_v_columns" ALTER COLUMN "badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_carouselBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_customHtmlBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_faqBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_featuredAppsBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_featuresBlock_v_columns" ALTER COLUMN "badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_featuresBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_galleryBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_logosBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_metricsBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_pricingBlock_v_pricing_cards" ALTER COLUMN "badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_pricingBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_richTextBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_testimonialsBlock_v" ALTER COLUMN "block_header_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_hero_badge_color" SET DEFAULT 'blue'::"public"."badge_color";
  ALTER TYPE "public"."badge_color" RENAME VALUE 'violet' TO 'purple';`)
}
