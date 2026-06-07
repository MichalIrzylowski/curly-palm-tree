import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_image_gallery_block_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_image_gallery_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_gallery_block_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery_block_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_gallery_block_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_image_gallery_block_images" ADD CONSTRAINT "pages_blocks_image_gallery_block_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_block_images" ADD CONSTRAINT "pages_blocks_image_gallery_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_block" ADD CONSTRAINT "pages_blocks_image_gallery_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_gallery_block_locales" ADD CONSTRAINT "pages_blocks_image_gallery_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_block_images" ADD CONSTRAINT "_pages_v_blocks_image_gallery_block_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_block_images" ADD CONSTRAINT "_pages_v_blocks_image_gallery_block_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_block" ADD CONSTRAINT "_pages_v_blocks_image_gallery_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_gallery_block_locales" ADD CONSTRAINT "_pages_v_blocks_image_gallery_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_gallery_block"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_image_gallery_block_images_order_idx" ON "pages_blocks_image_gallery_block_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_gallery_block_images_parent_id_idx" ON "pages_blocks_image_gallery_block_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_gallery_block_images_image_idx" ON "pages_blocks_image_gallery_block_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_gallery_block_order_idx" ON "pages_blocks_image_gallery_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_gallery_block_parent_id_idx" ON "pages_blocks_image_gallery_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_gallery_block_path_idx" ON "pages_blocks_image_gallery_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_image_gallery_block_locales_locale_parent_id_un" ON "pages_blocks_image_gallery_block_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_images_order_idx" ON "_pages_v_blocks_image_gallery_block_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_images_parent_id_idx" ON "_pages_v_blocks_image_gallery_block_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_images_image_idx" ON "_pages_v_blocks_image_gallery_block_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_order_idx" ON "_pages_v_blocks_image_gallery_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_parent_id_idx" ON "_pages_v_blocks_image_gallery_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_gallery_block_path_idx" ON "_pages_v_blocks_image_gallery_block" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_image_gallery_block_locales_locale_parent_id" ON "_pages_v_blocks_image_gallery_block_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_image_gallery_block_images" CASCADE;
  DROP TABLE "pages_blocks_image_gallery_block" CASCADE;
  DROP TABLE "pages_blocks_image_gallery_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery_block_images" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery_block" CASCADE;
  DROP TABLE "_pages_v_blocks_image_gallery_block_locales" CASCADE;`)
}
