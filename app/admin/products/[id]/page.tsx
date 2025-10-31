import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!product)
    return <div className="text-sm text-red-600">Product not found</div>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Edit Product</h2>
      <ProductForm product={product as any} categories={categories as any} />
    </div>
  );
}
