"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const {
    items,
    subtotal,
    itemsCount,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-muted-foreground mb-6">Your cart is empty.</p>
        <Link href="/products">
          <Button variant="default">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
          <div className="space-y-6">
            {items.map((line) => (
              <div key={line.product.id} className="flex gap-4 items-center">
                <div className="relative h-24 w-24 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={line.product.imageUrls[0] || "/placeholder.jpg"}
                    alt={line.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium">{line.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ₹{line.product.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(line.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex items-center border rounded-md">
                      <button
                        className="px-3 py-1"
                        onClick={() =>
                          updateQuantity(
                            line.product.id,
                            Math.max(1, line.quantity - 1)
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 min-w-10 text-center">
                        {line.quantity}
                      </span>
                      <button
                        className="px-3 py-1"
                        onClick={() =>
                          updateQuantity(line.product.id, line.quantity + 1)
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="ml-auto font-medium">
                      ₹
                      {(line.product.price * line.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[380px] h-fit border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Items ({itemsCount})</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <Button
            className="w-full mt-6"
            onClick={() => alert("Proceed to checkout")}
          >
            Checkout
          </Button>
          <Button
            variant="ghost"
            className="w-full mt-2"
            onClick={() => clearCart()}
          >
            Clear Cart
          </Button>
          <Link
            href="/products"
            className="block mt-2 text-center text-sm text-gold hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
