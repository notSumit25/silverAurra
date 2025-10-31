"use client";

import { useState } from "react";
import { Category } from "@/lib/types";

export function CategoryForm({ category }: { category?: Category }) {
  const [form, setForm] = useState({
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    description: category?.description ?? "",
    imageUrl: category?.imageUrl ?? "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(
      category
        ? `/api/admin/categories/${category.id}`
        : "/api/admin/categories",
      {
        method: category ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      window.location.href = "/admin/categories";
    } else {
      alert("Failed to save category");
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
          <span className="text-sm text-muted-foreground">Slug</span>
          <input
            className="mt-1 rounded border p-2"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            required
          />
        </label>
        <label className="flex flex-col md:col-span-2">
          <span className="text-sm text-muted-foreground">Description</span>
          <textarea
            className="mt-1 h-28 rounded border p-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <label className="flex flex-col md:col-span-2">
          <span className="text-sm text-muted-foreground">Image URL</span>
          <input
            className="mt-1 rounded border p-2"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </label>
      </div>
      <button className="rounded bg-black px-4 py-2 text-white" type="submit">
        {category ? "Update" : "Create"} Category
      </button>
    </form>
  );
}
