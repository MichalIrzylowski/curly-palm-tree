import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team_teaser_block" ADD COLUMN "cta_link_id" integer;
  ALTER TABLE "_pages_v_blocks_team_teaser_block" ADD COLUMN "cta_link_id" integer;
  ALTER TABLE "pages_blocks_team_teaser_block" ADD CONSTRAINT "pages_blocks_team_teaser_block_cta_link_id_pages_id_fk" FOREIGN KEY ("cta_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_teaser_block" ADD CONSTRAINT "_pages_v_blocks_team_teaser_block_cta_link_id_pages_id_fk" FOREIGN KEY ("cta_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_team_teaser_block_cta_link_idx" ON "pages_blocks_team_teaser_block" USING btree ("cta_link_id");
  CREATE INDEX "_pages_v_blocks_team_teaser_block_cta_link_idx" ON "_pages_v_blocks_team_teaser_block" USING btree ("cta_link_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team_teaser_block" DROP CONSTRAINT "pages_blocks_team_teaser_block_cta_link_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_team_teaser_block" DROP CONSTRAINT "_pages_v_blocks_team_teaser_block_cta_link_id_pages_id_fk";
  
  DROP INDEX "pages_blocks_team_teaser_block_cta_link_idx";
  DROP INDEX "_pages_v_blocks_team_teaser_block_cta_link_idx";
  ALTER TABLE "pages_blocks_team_teaser_block" DROP COLUMN "cta_link_id";
  ALTER TABLE "_pages_v_blocks_team_teaser_block" DROP COLUMN "cta_link_id";`)
}
