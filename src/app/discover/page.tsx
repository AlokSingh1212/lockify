import { db } from "@/db";
import { stores, products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { DiscoverClient } from "./DiscoverClient";

export default async function DiscoverPage() {
  // Fetch all products across all stores, joined with store details
  const allProducts = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      price: products.price,
      storeName: stores.name,
      storeSlug: stores.slug,
      themeColor: stores.themeColor,
      createdAt: products.createdAt,
    })
    .from(products)
    .innerJoin(stores, eq(products.storeId, stores.id))
    .orderBy(desc(products.createdAt));

  return <DiscoverClient products={allProducts} />;
}
