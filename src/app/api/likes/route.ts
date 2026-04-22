import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { likes, notifications, products, stores } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { productId } = await req.json();

    // Check if already liked
    const [existingLike] = await db
      .select()
      .from(likes)
      .where(and(eq(likes.productId, productId), eq(likes.userId, userId)))
      .limit(1);

    if (existingLike) {
      // Unlike
      await db.delete(likes).where(eq(likes.id, existingLike.id));
      return NextResponse.json({ liked: false });
    }

    // Like
    await db.insert(likes).values({
      productId,
      userId,
    });

    // Fetch product and store to get the ownerId for notification
    const [productWithStore] = await db
      .select({
        storeOwnerId: stores.userId,
        productName: products.name,
      })
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(eq(products.id, productId))
      .limit(1);

    if (productWithStore && productWithStore.storeOwnerId !== userId) {
      // Create notification for the store owner
      await db.insert(notifications).values({
        userId: productWithStore.storeOwnerId,
        actorId: userId,
        type: 'like',
        productId,
      });
    }

    return NextResponse.json({ liked: true });
  } catch (error) {
    console.error("[LIKES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
