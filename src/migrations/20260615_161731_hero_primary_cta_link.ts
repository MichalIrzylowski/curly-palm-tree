import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_block_primary_cta_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_block_primary_cta_type" AS ENUM('reference', 'custom');
  ALTER TABLE "pages_blocks_hero_block_locales" ALTER COLUMN "primary_cta_label" DROP DEFAULT;
  ALTER TABLE "_pages_v_blocks_hero_block_locales" ALTER COLUMN "primary_cta_label" DROP DEFAULT;
  ALTER TABLE "pages_blocks_hero_block" ADD COLUMN "primary_cta_type" "enum_pages_blocks_hero_block_primary_cta_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_hero_block" ADD COLUMN "primary_cta_new_tab" boolean;
  ALTER TABLE "pages_blocks_hero_block" ADD COLUMN "primary_cta_url" varchar;
  ALTER TABLE "_pages_v_blocks_hero_block" ADD COLUMN "primary_cta_type" "enum__pages_v_blocks_hero_block_primary_cta_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_hero_block" ADD COLUMN "primary_cta_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_hero_block" ADD COLUMN "primary_cta_url" varchar;
  UPDATE "pages_blocks_hero_block" SET "primary_cta_type" = 'custom', "primary_cta_url" = '/contact';
  UPDATE "_pages_v_blocks_hero_block" SET "primary_cta_type" = 'custom', "primary_cta_url" = '/contact';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_block_locales" ALTER COLUMN "primary_cta_label" SET DEFAULT 'Umów wizytę';
  ALTER TABLE "_pages_v_blocks_hero_block_locales" ALTER COLUMN "primary_cta_label" SET DEFAULT 'Umów wizytę';
  ALTER TABLE "pages_blocks_hero_block" DROP COLUMN "primary_cta_type";
  ALTER TABLE "pages_blocks_hero_block" DROP COLUMN "primary_cta_new_tab";
  ALTER TABLE "pages_blocks_hero_block" DROP COLUMN "primary_cta_url";
  ALTER TABLE "_pages_v_blocks_hero_block" DROP COLUMN "primary_cta_type";
  ALTER TABLE "_pages_v_blocks_hero_block" DROP COLUMN "primary_cta_new_tab";
  ALTER TABLE "_pages_v_blocks_hero_block" DROP COLUMN "primary_cta_url";
  DROP TYPE "public"."enum_pages_blocks_hero_block_primary_cta_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_block_primary_cta_type";`)
}
