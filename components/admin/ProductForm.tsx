"use client";

import { useState } from "react";
import { Category, Product } from "@/lib/types";

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const [form, setForm] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    originalPrice: product?.originalPrice ?? undefined,
    stock: product?.stock ?? 0,
    imageUrls: product?.imageUrls?.join(", ") ?? "",
    categoryId: product?.categoryId ?? categories[0]?.id ?? "",
    featured: product?.featured ?? false,
    bestseller: product?.bestseller ?? false,
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      stock: Number(form.stock),
      imageUrls: form.imageUrls
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const res = await fetch(
      product ? `/api/admin/products/${product.id}` : "/api/admin/products",
      {
        method: product ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (res.ok) {
      window.location.href = "/admin/products";
    } else {
      alert("Failed to save product");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col">
          <span className="text-sm text-muted-foreground">Name</span>
          <input
            className="mt-1 rounded border p-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-muted-foreground">Price</span>
          <input
            type="number"
            step="0.01"
            className="mt-1 rounded border p-2"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value as unknown as number })
            }
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-muted-foreground">Original Price</span>
          <input
            type="number"
            step="0.01"
            className="mt-1 rounded border p-2"
            value={form.originalPrice as any}
            onChange={(e) =>
              setForm({ ...form, originalPrice: e.target.value as any })
            }
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-muted-foreground">Stock</span>
          <input
            type="number"
            className="mt-1 rounded border p-2"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value as unknown as number })
            }
            required
          />
        </label>
        <label className="flex flex-col md:col-span-2">
          <span className="text-sm text-muted-foreground">Description</span>
          <textarea
            className="mt-1 h-28 rounded border p-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </label>
        <label className="flex flex-col md:col-span-2">
          <span className="text-sm text-muted-foreground">
            Image URLs (comma separated)
          </span>
          <input
            className="mt-1 rounded border p-2"
            value={form.imageUrls}
            onChange={(e) => setForm({ ...form, imageUrls: e.target.value })}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-muted-foreground">Category</span>
          <select
            className="mt-1 rounded border p-2"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          <span>Featured</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.bestseller}
            onChange={(e) => setForm({ ...form, bestseller: e.target.checked })}
          />
          <span>Bestseller</span>
        </label>
      </div>
      <button className="rounded bg-black px-4 py-2 text-white" type="submit">
        {product ? "Update" : "Create"} Product
      </button>
    </form>
  );
}
