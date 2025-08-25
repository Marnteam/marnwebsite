import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Narrow featuresBlock types to 01–12 only; no carousel DDL here (handled earlier).
  await db.execute(sql`
  ALTER TABLE "featuresBlock" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "featuresBlock" ALTER COLUMN "type" SET DEFAULT '01'::text;
  -- Map deprecated values before retyping
  UPDATE "featuresBlock" SET "type" = '09' WHERE "type" = '14';
  UPDATE "featuresBlock" SET "type" = '10' WHERE "type" = '15';
  UPDATE "featuresBlock" SET "type" = '11' WHERE "type" = '16';
  UPDATE "featuresBlock" SET "type" = '12' WHERE "type" = '17';
  -- Fallback: coerce any remaining invalids to a supported value
  UPDATE "featuresBlock"
  SET "type" = '01'
  WHERE "type" NOT IN ('01','02','03','04','05','06','07','08','09','10','11','12');
  DROP TYPE "public"."enum_featuresBlock_type";
  CREATE TYPE "public"."enum_featuresBlock_type" AS ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
  ALTER TABLE "featuresBlock" ALTER COLUMN "type" SET DEFAULT '01'::"public"."enum_featuresBlock_type";
  ALTER TABLE "featuresBlock" ALTER COLUMN "type" SET DATA TYPE "public"."enum_featuresBlock_type" USING "type"::"public"."enum_featuresBlock_type";
  ALTER TABLE "_featuresBlock_v" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "_featuresBlock_v" ALTER COLUMN "type" SET DEFAULT '01'::text;
  -- Map deprecated values in versions as well
  UPDATE "_featuresBlock_v" SET "type" = '09' WHERE "type" = '14';
  UPDATE "_featuresBlock_v" SET "type" = '10' WHERE "type" = '15';
  UPDATE "_featuresBlock_v" SET "type" = '11' WHERE "type" = '16';
  UPDATE "_featuresBlock_v" SET "type" = '12' WHERE "type" = '17';
  -- Fallback: coerce any remaining invalids to a supported value
  UPDATE "_featuresBlock_v"
  SET "type" = '01'
  WHERE "type" NOT IN ('01','02','03','04','05','06','07','08','09','10','11','12');
  DROP TYPE "public"."enum__featuresBlock_v_type";
  CREATE TYPE "public"."enum__featuresBlock_v_type" AS ENUM('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
  ALTER TABLE "_featuresBlock_v" ALTER COLUMN "type" SET DEFAULT '01'::"public"."enum__featuresBlock_v_type";
  ALTER TABLE "_featuresBlock_v" ALTER COLUMN "type" SET DATA TYPE "public"."enum__featuresBlock_v_type" USING "type"::"public"."enum__featuresBlock_v_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // Non-destructive down: just re-allow legacy features types; keep carousel intact.
  await db.execute(sql`
  DO $$ BEGIN
    ALTER TYPE "public"."enum_featuresBlock_type" ADD VALUE '13';
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TYPE "public"."enum_featuresBlock_type" ADD VALUE '14';
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TYPE "public"."enum_featuresBlock_type" ADD VALUE '15';
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TYPE "public"."enum_featuresBlock_type" ADD VALUE '16';
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TYPE "public"."enum_featuresBlock_type" ADD VALUE '17';
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  DO $$ BEGIN
    ALTER TYPE "public"."enum__featuresBlock_v_type" ADD VALUE '13';
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TYPE "public"."enum__featuresBlock_v_type" ADD VALUE '14';
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TYPE "public"."enum__featuresBlock_v_type" ADD VALUE '15';
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TYPE "public"."enum__featuresBlock_v_type" ADD VALUE '16';
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  DO $$ BEGIN
    ALTER TYPE "public"."enum__featuresBlock_v_type" ADD VALUE '17';
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;`)
}
