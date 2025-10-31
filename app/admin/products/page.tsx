import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function AdminProductsPage() {
  await requireAdmin();

  async function deleteProduct(formData: FormData) {
    "use server";
    await requireAdmin();
    const id = String(formData.get("id"));
    if (!id) return;
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
  }

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <Link
          href="/admin/products/new"
          className="rounded bg-black px-3 py-2 text-white"
        >
          Add Product
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2">Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Featured</th>
              <th className="p-2 w-56">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.category?.name}</td>
                <td className="p-2">₹{p.price}</td>
                <td className="p-2">{p.stock}</td>
                <td className="p-2">{p.featured ? "Yes" : "No"}</td>
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-blue-600"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/products/${p.id}`}
                      className="text-muted-foreground"
                    >
                      View
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={p.id} />
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
