import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { stores, products } from '@/db/schema';
import { StorefrontConfig } from '../generate/route';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const storeConfig: StorefrontConfig = await req.json();
    
    // Generate a simple slug
    const baseSlug = storeConfig.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const randomHash = Math.random().toString(36).substring(2, 6);
    const slug = `${baseSlug}-${randomHash}`;

    // Insert the store
    const [newStore] = await db.insert(stores).values({
      userId,
      name: storeConfig.name,
      slug,
      tagline: storeConfig.tagline,
      description: storeConfig.description,
      themeColor: storeConfig.themeColor,
    }).returning({ id: stores.id });

    // Insert the products
    if (storeConfig.products && storeConfig.products.length > 0) {
      const productsToInsert = storeConfig.products.map(p => ({
        storeId: newStore.id,
        name: p.name,
        description: p.description,
        price: p.price,
        type: p.type,
        features: p.features,
      }));
      
      await db.insert(products).values(productsToInsert);
    }

    return NextResponse.json({ success: true, storeId: newStore.id, slug });

  } catch (error) {
    console.error("[SAVE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
