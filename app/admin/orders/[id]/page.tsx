import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export default async function ManageOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      address: true,
      user: true,
    },
  });
  if (!order)
    return <div className="text-sm text-red-600">Order not found</div>;

  async function updateStatus(formData: FormData) {
    "use server";
    await prisma.order.update({
      where: { id },
      data: { status: formData.get("status") as any },
    });
  }

  return (
    <div className="space-y-4">
      <div className="rounded border p-4">
        <div className="mb-2 text-sm text-muted-foreground">Order ID</div>
        <div className="font-mono text-sm">{order.id}</div>
      </div>

      <div className="rounded border p-4">
        <div className="mb-2 text-sm text-muted-foreground">Status</div>
        <form action={updateStatus} className="flex items-center gap-2">
          <select
            name="status"
            defaultValue={order.status}
            className="rounded border p-2"
          >
            {(
              [
                "PENDING",
                "CONFIRMED",
                "SHIPPED",
                "DELIVERED",
                "CANCELLED",
              ] as const
            ).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            className="rounded bg-black px-3 py-1 text-white"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>

      <div className="rounded border p-4">
        <div className="mb-2 text-sm text-muted-foreground">Items</div>
        <ul className="space-y-1 text-sm">
          {order.items.map((it) => (
            <li key={it.id} className="flex justify-between">
              <span>
                {it.product?.name} × {it.quantity}
              </span>
              <span>₹{it.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
