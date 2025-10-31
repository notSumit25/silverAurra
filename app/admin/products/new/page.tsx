import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  await requireAdmin();
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">New Product</h2>
      <ProductForm categories={categories as any} />
    </div>
  );
}
