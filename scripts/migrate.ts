import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log('Applying migrations...');

  try {
    // Create new tables
    await sql`
      CREATE TABLE IF NOT EXISTS "comments" (
        "id" serial PRIMARY KEY NOT NULL,
        "product_id" integer NOT NULL,
        "user_id" text NOT NULL,
        "content" text NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "likes" (
        "id" serial PRIMARY KEY NOT NULL,
        "product_id" integer NOT NULL,
        "user_id" text NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "notifications" (
        "id" serial PRIMARY KEY NOT NULL,
        "user_id" text NOT NULL,
        "actor_id" text NOT NULL,
        "type" text NOT NULL,
        "product_id" integer,
        "read" integer DEFAULT 0 NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    // Add foreign keys (using try-catch for each in case they already exist)
    try {
      await sql`ALTER TABLE "comments" ADD CONSTRAINT "comments_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;`;
    } catch (e) {}

    try {
      await sql`ALTER TABLE "likes" ADD CONSTRAINT "likes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;`;
    } catch (e) {}

    try {
      await sql`ALTER TABLE "notifications" ADD CONSTRAINT "notifications_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;`;
    } catch (e) {}

    console.log('Migrations applied successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrate();
