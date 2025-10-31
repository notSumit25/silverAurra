import { requireAdmin } from "@/lib/auth";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <nav className="flex gap-4 text-sm">
            <Link
              href="/admin"
              className="text-muted-foreground hover:text-foreground"
            >
              Overview
            </Link>
            <Link
              href="/admin/products"
              className="text-muted-foreground hover:text-foreground"
            >
              Products
            </Link>
            <Link
              href="/admin/categories"
              className="text-muted-foreground hover:text-foreground"
            >
              Categories
            </Link>
            <Link
              href="/admin/featured"
              className="text-muted-foreground hover:text-foreground"
            >
              Featured
            </Link>
            <Link
              href="/admin/orders"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
          </nav>
        </div>
        <div className="rounded-lg border bg-white p-4">{children}</div>
      </div>
    </div>
  );
}
