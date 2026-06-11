import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "services_services_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_services_details_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_services_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "services" DROP CONSTRAINT "services_category_id_categories_id_fk";
  
  DROP INDEX "services_category_idx";
  ALTER TABLE "services_locales" ADD COLUMN "summary" varchar;
  ALTER TABLE "services_services_details" ADD CONSTRAINT "services_services_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_services_details_locales" ADD CONSTRAINT "services_services_details_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_services_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_services" ADD CONSTRAINT "services_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_services_locales" ADD CONSTRAINT "services_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "services_services_details_order_idx" ON "services_services_details" USING btree ("_order");
  CREATE INDEX "services_services_details_parent_id_idx" ON "services_services_details" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_services_details_locales_locale_parent_id_unique" ON "services_services_details_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_services_order_idx" ON "services_services" USING btree ("_order");
  CREATE INDEX "services_services_parent_id_idx" ON "services_services" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_services_locales_locale_parent_id_unique" ON "services_services_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "services" DROP COLUMN "category_id";
  ALTER TABLE "services" DROP COLUMN "featured";
  ALTER TABLE "services_locales" DROP COLUMN "description";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "services_services_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_services_details_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "services_services_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "services_services_details" CASCADE;
  DROP TABLE "services_services_details_locales" CASCADE;
  DROP TABLE "services_services" CASCADE;
  DROP TABLE "services_services_locales" CASCADE;
  ALTER TABLE "services" ADD COLUMN "category_id" integer;
  ALTER TABLE "services" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "services_locales" ADD COLUMN "description" jsonb;
  ALTER TABLE "services" ADD CONSTRAINT "services_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "services_category_idx" ON "services" USING btree ("category_id");
  ALTER TABLE "services_locales" DROP COLUMN "summary";`)
}
