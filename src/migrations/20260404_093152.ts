import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_hero_block_trust_signals" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_block_trust_signals_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_quick_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_highlights_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_highlights_block_locales" (
  	"heading" varchar DEFAULT 'Nasze usługi',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_grid_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_team_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_grid_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_team_teaser_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_teaser_block_locales" (
  	"heading" varchar DEFAULT 'Poznaj nasz zespół',
  	"cta_label" varchar DEFAULT 'Poznaj nasz zespół',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_why_us_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" varchar
  );
  
  CREATE TABLE "pages_blocks_why_us_block_items_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_why_us_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_why_us_block_locales" (
  	"heading" varchar DEFAULT 'Dlaczego my?',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_equipment_highlight_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_equipment_highlight_block_locales" (
  	"heading" varchar DEFAULT 'Nowoczesny sprzęt',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_map_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_block_trust_signals" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_block_trust_signals_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_quick_info_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_highlights_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_highlights_block_locales" (
  	"heading" varchar DEFAULT 'Nasze usługi',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_service_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_grid_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_team_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_grid_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_team_teaser_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_teaser_block_locales" (
  	"heading" varchar DEFAULT 'Poznaj nasz zespół',
  	"cta_label" varchar DEFAULT 'Poznaj nasz zespół',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_why_us_block_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_us_block_items_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_why_us_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_why_us_block_locales" (
  	"heading" varchar DEFAULT 'Dlaczego my?',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_equipment_highlight_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_equipment_highlight_block_locales" (
  	"heading" varchar DEFAULT 'Nowoczesny sprzęt',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_map_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "team_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "services_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "team_id" integer;
  ALTER TABLE "services" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_hero_block_trust_signals" ADD CONSTRAINT "pages_blocks_hero_block_trust_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_block_trust_signals_locales" ADD CONSTRAINT "pages_blocks_hero_block_trust_signals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_block_trust_signals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quick_info_block" ADD CONSTRAINT "pages_blocks_quick_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_highlights_block" ADD CONSTRAINT "pages_blocks_services_highlights_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_highlights_block_locales" ADD CONSTRAINT "pages_blocks_services_highlights_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_highlights_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_grid" ADD CONSTRAINT "pages_blocks_service_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_grid_locales" ADD CONSTRAINT "pages_blocks_service_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid" ADD CONSTRAINT "pages_blocks_team_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_locales" ADD CONSTRAINT "pages_blocks_team_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_teaser_block" ADD CONSTRAINT "pages_blocks_team_teaser_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_teaser_block_locales" ADD CONSTRAINT "pages_blocks_team_teaser_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_teaser_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_us_block_items" ADD CONSTRAINT "pages_blocks_why_us_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_us_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_us_block_items_locales" ADD CONSTRAINT "pages_blocks_why_us_block_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_us_block_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_us_block" ADD CONSTRAINT "pages_blocks_why_us_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_why_us_block_locales" ADD CONSTRAINT "pages_blocks_why_us_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_why_us_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_equipment_highlight_block" ADD CONSTRAINT "pages_blocks_equipment_highlight_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_equipment_highlight_block_locales" ADD CONSTRAINT "pages_blocks_equipment_highlight_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_equipment_highlight_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_block" ADD CONSTRAINT "pages_blocks_map_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block_trust_signals" ADD CONSTRAINT "_pages_v_blocks_hero_block_trust_signals_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_block_trust_signals_locales" ADD CONSTRAINT "_pages_v_blocks_hero_block_trust_signals_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_block_trust_signals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quick_info_block" ADD CONSTRAINT "_pages_v_blocks_quick_info_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_highlights_block" ADD CONSTRAINT "_pages_v_blocks_services_highlights_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_highlights_block_locales" ADD CONSTRAINT "_pages_v_blocks_services_highlights_block_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_highlights_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_grid" ADD CONSTRAINT "_pages_v_blocks_service_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_grid_locales" ADD CONSTRAINT "_pages_v_blocks_service_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_grid" ADD CONSTRAINT "_pages_v_blocks_team_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_grid_locales" ADD CONSTRAINT "_pages_v_blocks_team_grid_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_teaser_block" ADD CONSTRAINT "_pages_v_blocks_team_teaser_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_teaser_block_locales" ADD CONSTRAINT "_pages_v_blocks_team_teaser_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_teaser_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_us_block_items" ADD CONSTRAINT "_pages_v_blocks_why_us_block_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_us_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_us_block_items_locales" ADD CONSTRAINT "_pages_v_blocks_why_us_block_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_us_block_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_us_block" ADD CONSTRAINT "_pages_v_blocks_why_us_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_why_us_block_locales" ADD CONSTRAINT "_pages_v_blocks_why_us_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_why_us_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_equipment_highlight_block" ADD CONSTRAINT "_pages_v_blocks_equipment_highlight_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_equipment_highlight_block_locales" ADD CONSTRAINT "_pages_v_blocks_equipment_highlight_block_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_equipment_highlight_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map_block" ADD CONSTRAINT "_pages_v_blocks_map_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_block_trust_signals_order_idx" ON "pages_blocks_hero_block_trust_signals" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_block_trust_signals_parent_id_idx" ON "pages_blocks_hero_block_trust_signals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_block_trust_signals_locales_locale_parent_" ON "pages_blocks_hero_block_trust_signals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_quick_info_block_order_idx" ON "pages_blocks_quick_info_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_quick_info_block_parent_id_idx" ON "pages_blocks_quick_info_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quick_info_block_path_idx" ON "pages_blocks_quick_info_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_highlights_block_order_idx" ON "pages_blocks_services_highlights_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_highlights_block_parent_id_idx" ON "pages_blocks_services_highlights_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_highlights_block_path_idx" ON "pages_blocks_services_highlights_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_services_highlights_block_locales_locale_parent" ON "pages_blocks_services_highlights_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_service_grid_order_idx" ON "pages_blocks_service_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_grid_parent_id_idx" ON "pages_blocks_service_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_grid_path_idx" ON "pages_blocks_service_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_service_grid_locales_locale_parent_id_unique" ON "pages_blocks_service_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_team_grid_order_idx" ON "pages_blocks_team_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_parent_id_idx" ON "pages_blocks_team_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_path_idx" ON "pages_blocks_team_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_team_grid_locales_locale_parent_id_unique" ON "pages_blocks_team_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_team_teaser_block_order_idx" ON "pages_blocks_team_teaser_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_teaser_block_parent_id_idx" ON "pages_blocks_team_teaser_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_teaser_block_path_idx" ON "pages_blocks_team_teaser_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_team_teaser_block_locales_locale_parent_id_uniq" ON "pages_blocks_team_teaser_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_why_us_block_items_order_idx" ON "pages_blocks_why_us_block_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_us_block_items_parent_id_idx" ON "pages_blocks_why_us_block_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_why_us_block_items_locales_locale_parent_id_uni" ON "pages_blocks_why_us_block_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_why_us_block_order_idx" ON "pages_blocks_why_us_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_why_us_block_parent_id_idx" ON "pages_blocks_why_us_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_why_us_block_path_idx" ON "pages_blocks_why_us_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_why_us_block_locales_locale_parent_id_unique" ON "pages_blocks_why_us_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_equipment_highlight_block_order_idx" ON "pages_blocks_equipment_highlight_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_equipment_highlight_block_parent_id_idx" ON "pages_blocks_equipment_highlight_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_equipment_highlight_block_path_idx" ON "pages_blocks_equipment_highlight_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_equipment_highlight_block_locales_locale_parent" ON "pages_blocks_equipment_highlight_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_map_block_order_idx" ON "pages_blocks_map_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_map_block_parent_id_idx" ON "pages_blocks_map_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_map_block_path_idx" ON "pages_blocks_map_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_block_trust_signals_order_idx" ON "_pages_v_blocks_hero_block_trust_signals" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_block_trust_signals_parent_id_idx" ON "_pages_v_blocks_hero_block_trust_signals" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_block_trust_signals_locales_locale_pare" ON "_pages_v_blocks_hero_block_trust_signals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_quick_info_block_order_idx" ON "_pages_v_blocks_quick_info_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quick_info_block_parent_id_idx" ON "_pages_v_blocks_quick_info_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quick_info_block_path_idx" ON "_pages_v_blocks_quick_info_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_highlights_block_order_idx" ON "_pages_v_blocks_services_highlights_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_highlights_block_parent_id_idx" ON "_pages_v_blocks_services_highlights_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_highlights_block_path_idx" ON "_pages_v_blocks_services_highlights_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_services_highlights_block_locales_locale_par" ON "_pages_v_blocks_services_highlights_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_service_grid_order_idx" ON "_pages_v_blocks_service_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_grid_parent_id_idx" ON "_pages_v_blocks_service_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_grid_path_idx" ON "_pages_v_blocks_service_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_service_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_service_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_team_grid_order_idx" ON "_pages_v_blocks_team_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_grid_parent_id_idx" ON "_pages_v_blocks_team_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_grid_path_idx" ON "_pages_v_blocks_team_grid" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_team_grid_locales_locale_parent_id_unique" ON "_pages_v_blocks_team_grid_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_team_teaser_block_order_idx" ON "_pages_v_blocks_team_teaser_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_teaser_block_parent_id_idx" ON "_pages_v_blocks_team_teaser_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_teaser_block_path_idx" ON "_pages_v_blocks_team_teaser_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_team_teaser_block_locales_locale_parent_id_u" ON "_pages_v_blocks_team_teaser_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_why_us_block_items_order_idx" ON "_pages_v_blocks_why_us_block_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_us_block_items_parent_id_idx" ON "_pages_v_blocks_why_us_block_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_why_us_block_items_locales_locale_parent_id_" ON "_pages_v_blocks_why_us_block_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_why_us_block_order_idx" ON "_pages_v_blocks_why_us_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_why_us_block_parent_id_idx" ON "_pages_v_blocks_why_us_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_why_us_block_path_idx" ON "_pages_v_blocks_why_us_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_why_us_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_why_us_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_equipment_highlight_block_order_idx" ON "_pages_v_blocks_equipment_highlight_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_equipment_highlight_block_parent_id_idx" ON "_pages_v_blocks_equipment_highlight_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_equipment_highlight_block_path_idx" ON "_pages_v_blocks_equipment_highlight_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_equipment_highlight_block_locales_locale_par" ON "_pages_v_blocks_equipment_highlight_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_map_block_order_idx" ON "_pages_v_blocks_map_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_map_block_parent_id_idx" ON "_pages_v_blocks_map_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_map_block_path_idx" ON "_pages_v_blocks_map_block" USING btree ("_path");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "pages_rels_team_id_idx" ON "pages_rels" USING btree ("team_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_rels_team_id_idx" ON "_pages_v_rels" USING btree ("team_id");
  ALTER TABLE "services_locales" DROP COLUMN "price_text";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_block_trust_signals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_block_trust_signals_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_quick_info_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_highlights_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_services_highlights_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_service_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_service_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_teaser_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_teaser_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_why_us_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_why_us_block_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_why_us_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_why_us_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_equipment_highlight_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_equipment_highlight_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_map_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_block_trust_signals" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_block_trust_signals_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_quick_info_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_highlights_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_services_highlights_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_grid_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_teaser_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_teaser_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_why_us_block_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_why_us_block_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_why_us_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_why_us_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_equipment_highlight_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_equipment_highlight_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_map_block" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_block_trust_signals" CASCADE;
  DROP TABLE "pages_blocks_hero_block_trust_signals_locales" CASCADE;
  DROP TABLE "pages_blocks_quick_info_block" CASCADE;
  DROP TABLE "pages_blocks_services_highlights_block" CASCADE;
  DROP TABLE "pages_blocks_services_highlights_block_locales" CASCADE;
  DROP TABLE "pages_blocks_service_grid" CASCADE;
  DROP TABLE "pages_blocks_service_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_team_grid" CASCADE;
  DROP TABLE "pages_blocks_team_grid_locales" CASCADE;
  DROP TABLE "pages_blocks_team_teaser_block" CASCADE;
  DROP TABLE "pages_blocks_team_teaser_block_locales" CASCADE;
  DROP TABLE "pages_blocks_why_us_block_items" CASCADE;
  DROP TABLE "pages_blocks_why_us_block_items_locales" CASCADE;
  DROP TABLE "pages_blocks_why_us_block" CASCADE;
  DROP TABLE "pages_blocks_why_us_block_locales" CASCADE;
  DROP TABLE "pages_blocks_equipment_highlight_block" CASCADE;
  DROP TABLE "pages_blocks_equipment_highlight_block_locales" CASCADE;
  DROP TABLE "pages_blocks_map_block" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_block_trust_signals" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_block_trust_signals_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_quick_info_block" CASCADE;
  DROP TABLE "_pages_v_blocks_services_highlights_block" CASCADE;
  DROP TABLE "_pages_v_blocks_services_highlights_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_service_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_service_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_team_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_team_grid_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_team_teaser_block" CASCADE;
  DROP TABLE "_pages_v_blocks_team_teaser_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_why_us_block_items" CASCADE;
  DROP TABLE "_pages_v_blocks_why_us_block_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_why_us_block" CASCADE;
  DROP TABLE "_pages_v_blocks_why_us_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_equipment_highlight_block" CASCADE;
  DROP TABLE "_pages_v_blocks_equipment_highlight_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_map_block" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_services_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_team_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_services_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_team_fk";
  
  DROP INDEX "pages_rels_services_id_idx";
  DROP INDEX "pages_rels_team_id_idx";
  DROP INDEX "_pages_v_rels_services_id_idx";
  DROP INDEX "_pages_v_rels_team_id_idx";
  ALTER TABLE "services_locales" ADD COLUMN "price_text" varchar;
  ALTER TABLE "pages_rels" DROP COLUMN "services_id";
  ALTER TABLE "pages_rels" DROP COLUMN "team_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "services_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "team_id";
  ALTER TABLE "services" DROP COLUMN "featured";`)
}
