import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  const current = await prisma.product.findUnique({
    where: { id },
    select: { featured: true },
  });
  if (!current)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const updated = await prisma.product.update({
    where: { id },
    data: { featured: !current.featured },
    select: { id: true, featured: true },
  });
  const redirectUrl = new URL("/admin/featured", req.nextUrl.origin);
  return NextResponse.redirect(redirectUrl);
}
