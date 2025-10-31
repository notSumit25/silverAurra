"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/lib/types";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCart } from "@/lib/contexts/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;
  const { addToCart } = useCart();
  const router = useRouter();

  const onAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const onBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
    router.push("/cart");
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative overflow-hidden rounded-lg border bg-white hover-lift">
        <div className="aspect-square relative overflow-hidden bg-gray-100">
          {product.bestseller && (
            <Badge className="absolute top-2 left-2 z-10 bg-red-600 text-white">
              BESTSELLER
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>

          <Image
            src={product.imageUrls[0] || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gold">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                {discount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {discount}% OFF
                  </Badge>
                )}
              </>
            )}
          </div>

          {product.material && (
            <p className="text-xs text-muted-foreground">{product.material}</p>
          )}

          <div className="mt-3 flex gap-2">
            <Button variant="secondary" size="sm" onClick={onAdd}>
              Add to Cart
            </Button>
            <Button variant="default" size="sm" onClick={onBuy}>
              Buy
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
