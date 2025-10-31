import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await requireAdmin();
  const orders = await prisma.order.findMany({
    include: { items: true, address: true },
  });
  return NextResponse.json({ orders });
}
