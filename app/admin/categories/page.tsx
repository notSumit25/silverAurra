import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function AdminCategoriesPage() {
  await requireAdmin();

  async function deleteCategory(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    if (!id) return;
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
  }

  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Link
          href="/admin/categories/new"
          className="rounded bg-black px-3 py-2 text-white"
        >
          Add Category
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Slug</th>
              <th className="p-2">Created</th>
              <th className="p-2 w-56">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.slug}</td>
                <td className="p-2">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/categories/${c.id}`}
                      className="text-blue-600"
                    >
                      Edit
                    </Link>
                    <form action={deleteCategory}>
                      <input type="hidden" name="id" value={c.id} />
                      <button type="submit" className="text-red-600">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
