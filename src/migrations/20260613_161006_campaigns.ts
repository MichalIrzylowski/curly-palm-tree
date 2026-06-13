import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_campaigns_show_on_locales" AS ENUM('pl', 'en');
  CREATE TYPE "public"."enum_campaigns_variant" AS ENUM('small-bottom-right');
  CREATE TABLE "campaigns_show_on_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_campaigns_show_on_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "campaigns" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"enabled" boolean DEFAULT false,
  	"variant" "enum_campaigns_variant" DEFAULT 'small-bottom-right' NOT NULL,
  	"url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "campaigns_locales" (
  	"headline" varchar,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages" ADD COLUMN "campaign_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_campaign_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "campaigns_id" integer;
  ALTER TABLE "campaigns_show_on_locales" ADD CONSTRAINT "campaigns_show_on_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaigns_locales" ADD CONSTRAINT "campaigns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "campaigns_show_on_locales_order_idx" ON "campaigns_show_on_locales" USING btree ("order");
  CREATE INDEX "campaigns_show_on_locales_parent_idx" ON "campaigns_show_on_locales" USING btree ("parent_id");
  CREATE INDEX "campaigns_updated_at_idx" ON "campaigns" USING btree ("updated_at");
  CREATE INDEX "campaigns_created_at_idx" ON "campaigns" USING btree ("created_at");
  CREATE UNIQUE INDEX "campaigns_locales_locale_parent_id_unique" ON "campaigns_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages" ADD CONSTRAINT "pages_campaign_id_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_campaign_id_campaigns_id_fk" FOREIGN KEY ("version_campaign_id") REFERENCES "public"."campaigns"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_campaigns_fk" FOREIGN KEY ("campaigns_id") REFERENCES "public"."campaigns"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_campaign_idx" ON "pages" USING btree ("campaign_id");
  CREATE INDEX "_pages_v_version_version_campaign_idx" ON "_pages_v" USING btree ("version_campaign_id");
  CREATE INDEX "payload_locked_documents_rels_campaigns_id_idx" ON "payload_locked_documents_rels" USING btree ("campaigns_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "campaigns_show_on_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaigns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaigns_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "campaigns_show_on_locales" CASCADE;
  DROP TABLE "campaigns" CASCADE;
  DROP TABLE "campaigns_locales" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_campaign_id_campaigns_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_campaign_id_campaigns_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_campaigns_fk";
  
  DROP INDEX "pages_campaign_idx";
  DROP INDEX "_pages_v_version_version_campaign_idx";
  DROP INDEX "payload_locked_documents_rels_campaigns_id_idx";
  ALTER TABLE "pages" DROP COLUMN "campaign_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_campaign_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "campaigns_id";
  DROP TYPE "public"."enum_campaigns_show_on_locales";
  DROP TYPE "public"."enum_campaigns_variant";`)
}
