import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { CategoryForm } from "@/components/admin/CategoryForm";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id },
  });
  if (!category)
    return <div className="text-sm text-red-600">Category not found</div>;

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Edit Category</h2>
      <CategoryForm category={category as any} />
    </div>
  );
}
