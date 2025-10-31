import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = prisma as any;
  const reviews = await db.review.findMany({
    where: { productId: id },
    include: { user: { select: { id: true, name: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ reviews });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAuth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const rating = Math.max(1, Math.min(5, Number(body.rating)));
  const comment = typeof body.comment === "string" ? body.comment.trim() : null;

  try {
    const db = prisma as any;
    const review = await db.review.upsert({
      where: { productId_userId: { productId: id, userId: session.id } },
      update: { rating, comment },
      create: { productId: id, userId: session.id, rating, comment },
      include: { user: { select: { id: true, name: true } } },
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to save review" },
      { status: 400 }
    );
  }
}
