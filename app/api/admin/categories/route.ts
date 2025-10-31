import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await requireAdmin();
  const categories = await prisma.category.findMany({});
  return NextResponse.json({ categories });
}

export async function POST(req: NextRequest) {
  await requireAdmin();
  const data = await req.json();
  const category = await prisma.category.create({ data });
  return NextResponse.json({ category }, { status: 201 });
}
