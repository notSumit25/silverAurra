"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/types";

export type CartLine = {
  product: Product;
  quantity: number;
};

interface CartContextType {
  items: CartLine[];
  itemsCount: number; // total quantity
  subtotal: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "luxe_cart_v1";

function loadFromStorage(): CartLine[] {
  try {
    const raw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    // Basic validation/sanitization
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l) => l && l.product && typeof l.quantity === "number" && l.quantity > 0
    );
  } catch {
    return [];
  }
}

function saveToStorage(items: CartLine[]) {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  } catch {
    // ignore persistence errors
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);

  // Load once
  useEffect(() => {
    setItems(loadFromStorage());
  }, []);

  // Persist on change
  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  const addToCart = (product: Product, qty: number = 1) => {
    setItems((prev) => {
      const stock =
        typeof product.stock === "number" ? product.stock : Infinity;
      if (stock <= 0) return prev;
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + qty, stock);
        return prev.map((l) =>
          l.product.id === product.id ? { ...l, quantity: newQty } : l
        );
      }
      const initialQty = Math.min(Math.max(1, qty), stock);
      if (initialQty <= 0) return prev;
      return [...prev, { product, quantity: initialQty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((l) => l.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((l) => {
          if (l.product.id !== productId) return l;
          const stock =
            typeof l.product.stock === "number" ? l.product.stock : Infinity;
          const nextQty = Math.min(Math.max(qty, 1), stock);
          return { ...l, quantity: nextQty };
        })
        .filter((l) => l.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const itemsCount = useMemo(
    () => items.reduce((sum, l) => sum + l.quantity, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [items]
  );

  const value: CartContextType = {
    items,
    itemsCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
