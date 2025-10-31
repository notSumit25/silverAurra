import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await requireAdmin();
  const products = await prisma.product.findMany({
    include: { category: true },
  });
  return NextResponse.json({ products });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const data = await req.json();
  const product = await prisma.product.create({ data });
  return NextResponse.json({ product }, { status: 201 });
}
