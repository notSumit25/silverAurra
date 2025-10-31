import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export default async function AdminFeaturedPage() {
  await requireAdmin();
  const featured = await prisma.product.findMany({
    where: { featured: true },
    select: { id: true, name: true, featured: true },
  });

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Featured Collection</h2>
      <p className="mb-2 text-sm text-muted-foreground">
        Toggle which products are featured on the homepage.
      </p>
      <ul className="space-y-2">
        {featured.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between rounded border p-2"
          >
            <span>{p.name}</span>
            <form
              action={`/api/admin/products/${p.id}/toggle-featured`}
              method="post"
            >
              <button
                className="rounded bg-black px-3 py-1 text-white"
                type="submit"
              >
                {p.featured ? "Unfeature" : "Feature"}
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
