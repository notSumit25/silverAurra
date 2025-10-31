import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export default async function AdminOrdersPage() {
  await requireAdmin();

  async function deleteOrder(formData: FormData) {
    "use server";
    const id = String(formData.get("id"));
    if (!id) return;
    await prisma.order.delete({ where: { id } });
    revalidatePath("/admin/orders");
  }

  const orders = await prisma.order.findMany({
    include: { address: true, items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Orders</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Status</th>
              <th className="p-2">Total</th>
              <th className="p-2">Items</th>
              <th className="p-2 w-56">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="p-2 text-xs">{o.id.slice(0, 8)}...</td>
                <td className="p-2">{o.status}</td>
                <td className="p-2">₹{o.totalAmount}</td>
                <td className="p-2">{o.items?.length ?? 0}</td>
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="text-blue-600"
                    >
                      Manage
                    </Link>
                    <form action={deleteOrder}>
                      <input type="hidden" name="id" value={o.id} />
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
