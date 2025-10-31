'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
            src={product.imageUrls[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>

          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gold">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
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
        </div>
      </div>
    </Link>
  );
}
