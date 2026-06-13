import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_campaigns_link_type" AS ENUM('internal', 'external');
  CREATE TABLE "campaigns_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer
  );
  
  ALTER TABLE "campaigns" ADD COLUMN "link_type" "enum_campaigns_link_type" DEFAULT 'external' NOT NULL;
  ALTER TABLE "campaigns" ADD COLUMN "external_url" varchar;
  ALTER TABLE "campaigns_rels" ADD CONSTRAINT "campaigns_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaigns_rels" ADD CONSTRAINT "campaigns_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaigns_rels" ADD CONSTRAINT "campaigns_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "campaigns_rels_order_idx" ON "campaigns_rels" USING btree ("order");
  CREATE INDEX "campaigns_rels_parent_idx" ON "campaigns_rels" USING btree ("parent_id");
  CREATE INDEX "campaigns_rels_path_idx" ON "campaigns_rels" USING btree ("path");
  CREATE INDEX "campaigns_rels_pages_id_idx" ON "campaigns_rels" USING btree ("pages_id");
  CREATE INDEX "campaigns_rels_posts_id_idx" ON "campaigns_rels" USING btree ("posts_id");
  ALTER TABLE "campaigns" DROP COLUMN "url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "campaigns_rels" CASCADE;
  ALTER TABLE "campaigns" ADD COLUMN "url" varchar NOT NULL;
  ALTER TABLE "campaigns" DROP COLUMN "link_type";
  ALTER TABLE "campaigns" DROP COLUMN "external_url";
  DROP TYPE "public"."enum_campaigns_link_type";`)
}
