import { db } from "@/db";
import { stores, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ClientStorefront } from "./ClientStorefront";

interface StorefrontPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function StorefrontPage({ params }: StorefrontPageProps) {
  const { slug } = await params;

  // 1. Fetch store by slug
  const [store] = await db
    .select()
    .from(stores)
    .where(eq(stores.slug, slug))
    .limit(1);

  if (!store) {
    notFound();
  }

  // 2. Fetch products for this store
  const storeProducts = await db
    .select()
    .from(products)
    .where(eq(products.storeId, store.id))
    .orderBy(products.createdAt);

  return (
    <ClientStorefront 
      store={{
        name: store.name,
        tagline: store.tagline,
        description: store.description,
        themeColor: store.themeColor
      }} 
      products={storeProducts} 
    />
  );
}
