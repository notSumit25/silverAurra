import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export default async function AdminHome() {
  const [productsCount, ordersCount, categoriesCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.category.count(),
  ]);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Products" value={productsCount} />
      <StatCard title="Orders" value={ordersCount} />
      <StatCard title="Categories" value={categoriesCount} />
      <StatCard title="Revenue" value={"₹" + 0} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
    </div>
  );
}
