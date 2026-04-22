import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { comments, notifications, products, stores } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return new NextResponse("Product ID required", { status: 400 });
  }

  try {
    const productComments = await db
      .select()
      .from(comments)
      .where(eq(comments.productId, parseInt(productId)))
      .orderBy(desc(comments.createdAt));

    return NextResponse.json(productComments);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { productId, content } = await req.json();

    if (!content) {
      return new NextResponse("Content required", { status: 400 });
    }

    const [newComment] = await db.insert(comments).values({
      productId,
      userId,
      content,
    }).returning();

    // Notify owner
    const [productWithStore] = await db
      .select({
        storeOwnerId: stores.userId,
      })
      .from(products)
      .innerJoin(stores, eq(products.storeId, stores.id))
      .where(eq(products.id, productId))
      .limit(1);

    if (productWithStore && productWithStore.storeOwnerId !== userId) {
      await db.insert(notifications).values({
        userId: productWithStore.storeOwnerId,
        actorId: userId,
        type: 'comment',
        productId,
      });
    }

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("[COMMENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
