import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_services_highlights_block_val_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_services_highlights_block_val_link_type" AS ENUM('reference', 'custom');
  ALTER TABLE "pages_blocks_services_highlights_block" ADD COLUMN "val_link_type" "enum_pages_blocks_services_highlights_block_val_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_services_highlights_block" ADD COLUMN "val_link_new_tab" boolean;
  ALTER TABLE "pages_blocks_services_highlights_block" ADD COLUMN "val_link_url" varchar;
  ALTER TABLE "_pages_v_blocks_services_highlights_block" ADD COLUMN "val_link_type" "enum__pages_v_blocks_services_highlights_block_val_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_services_highlights_block" ADD COLUMN "val_link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_services_highlights_block" ADD COLUMN "val_link_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_services_highlights_block" DROP COLUMN "val_link_type";
  ALTER TABLE "pages_blocks_services_highlights_block" DROP COLUMN "val_link_new_tab";
  ALTER TABLE "pages_blocks_services_highlights_block" DROP COLUMN "val_link_url";
  ALTER TABLE "_pages_v_blocks_services_highlights_block" DROP COLUMN "val_link_type";
  ALTER TABLE "_pages_v_blocks_services_highlights_block" DROP COLUMN "val_link_new_tab";
  ALTER TABLE "_pages_v_blocks_services_highlights_block" DROP COLUMN "val_link_url";
  DROP TYPE "public"."enum_pages_blocks_services_highlights_block_val_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_services_highlights_block_val_link_type";`)
}
