import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { notifications, products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userNotifications = await db
      .select({
        id: notifications.id,
        type: notifications.type,
        actorId: notifications.actorId,
        read: notifications.read,
        createdAt: notifications.createdAt,
        productName: products.name,
      })
      .from(notifications)
      .leftJoin(products, eq(notifications.productId, products.id))
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(20);

    return NextResponse.json(userNotifications);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { id } = await req.json();

    await db
      .update(notifications)
      .set({ read: 1 })
      .where(eq(notifications.id, id));

    return new NextResponse("OK");
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
