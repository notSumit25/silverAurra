"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "@/lib/contexts/CartContext";

export function AddToCart({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const max = typeof product.stock === "number" ? product.stock : 99;
  const [qty, setQty] = useState(1);

  const inc = () => setQty((q) => Math.min(q + 1, Math.max(1, max)));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  const handleAdd = () => {
    if (max <= 0) return;
    addToCart(product, qty);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuy = () => {
    if (max <= 0) return;
    addToCart(product, qty);
    router.push("/cart");
  };

  const outOfStock = max <= 0;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="inline-flex items-center rounded-lg border">
        <Button
          type="button"
          variant="ghost"
          className="h-10 w-10"
          onClick={dec}
          disabled={outOfStock || qty <= 1}
        >
          −
        </Button>
        <div className="w-12 text-center text-sm font-medium">{qty}</div>
        <Button
          type="button"
          variant="ghost"
          className="h-10 w-10"
          onClick={inc}
          disabled={outOfStock || qty >= max}
        >
          +
        </Button>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={handleAdd}
          disabled={outOfStock}
        >
          {outOfStock ? "Out of stock" : "Add to Cart"}
        </Button>
        <Button type="button" onClick={handleBuy} disabled={outOfStock}>
          Buy Now
        </Button>
      </div>
    </div>
  );
}
