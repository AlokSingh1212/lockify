import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { stores, products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { AdsClient } from "./AdsClient";

export default async function AdsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // Fetch all products for all stores owned by the user
  const userStores = await db
    .select()
    .from(stores)
    .where(eq(stores.userId, userId));

  const storeIds = userStores.map(s => s.id);
  
  if (storeIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No stores found</h2>
        <p className="text-gray-400">Create a store first to generate magic ads.</p>
      </div>
    );
  }

  // Fetch products and join with store name
  const allProducts = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      storeName: stores.name,
    })
    .from(products)
    .innerJoin(stores, eq(products.storeId, stores.id))
    .where(eq(stores.userId, userId));

  return <AdsClient products={allProducts} />;
}
