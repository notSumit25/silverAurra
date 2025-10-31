import { requireAdmin } from "@/lib/auth";
import { CategoryForm } from "@/components/admin/CategoryForm";

export default async function NewCategoryPage() {
  await requireAdmin();
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">New Category</h2>
      <CategoryForm />
    </div>
  );
}
