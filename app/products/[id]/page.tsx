import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Product as ProductType, Review as ReviewType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AddToCart } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";
import { ReviewsSection } from "@/components/ReviewsSection";

export const revalidate = 60;

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) return notFound();

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Fetch related products from the same category, excluding the current one
  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: id } },
    include: { category: true },
    orderBy: [
      { bestseller: "desc" },
      { featured: "desc" },
      { createdAt: "desc" },
    ],
    take: 8,
  });

  // Fetch reviews and average with runtime guard when Prisma client isn't regenerated yet
  const dbAny = prisma as any;
  const hasReviewModel = !!dbAny?.review?.findMany;
  let reviews: ReviewType[] = [];
  let avgRating = 0;
  let totalReviews = 0;
  if (hasReviewModel) {
    const [rs, agg] = await Promise.all([
      dbAny.review.findMany({
        where: { productId: id },
        include: { user: { select: { id: true, name: true } } },
        orderBy: { createdAt: "desc" },
        take: 50,
      }),
      dbAny.review.aggregate({
        _avg: { rating: true },
        _count: { _all: true },
        where: { productId: id },
      }),
    ]);
    reviews = rs;
    avgRating = Number(agg?._avg?.rating ?? 0);
    totalReviews = Number(agg?._count?._all ?? 0);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b bg-gray-50 py-4">
        <div className="container">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:underline">
              Products
            </Link>
            {product.category && (
              <>
                <span className="mx-2">/</span>
                <Link
                  href={`/products?category=${product.category.slug}`}
                  className="hover:underline"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.imageUrls[0] || "/placeholder.jpg"}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.bestseller && (
                <Badge className="absolute left-2 top-2 bg-red-600 text-white">
                  BESTSELLER
                </Badge>
              )}
              {product.featured && (
                <Badge className="absolute left-2 top-10 bg-gold text-white">
                  FEATURED
                </Badge>
              )}
            </div>
            {product.imageUrls.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.imageUrls.slice(0, 8).map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-md bg-gray-100"
                  >
                    <Image
                      src={url}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div>
            <h1 className="mb-2 font-serif text-3xl font-bold">
              {product.name}
            </h1>
            <div className="mb-4 flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gold">
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

            <p className="mb-6 text-muted-foreground">{product.description}</p>

            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {product.material && (
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">Material</div>
                  <div className="text-sm font-medium">{product.material}</div>
                </div>
              )}
              {product.weight && (
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">Weight</div>
                  <div className="text-sm font-medium">{product.weight}</div>
                </div>
              )}
              {product.dimensions && (
                <div className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">
                    Dimensions
                  </div>
                  <div className="text-sm font-medium">
                    {product.dimensions}
                  </div>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <AddToCart product={product as unknown as ProductType} />

            {product.category && (
              <div className="mt-8 text-sm text-muted-foreground">
                Category:{" "}
                <Link
                  href={`/products?category=${product.category.slug}`}
                  className="text-gold hover:underline"
                >
                  {product.category.name}
                </Link>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <Separator className="mb-8" />
            <h2 className="mb-6 font-serif text-2xl font-bold">
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p as unknown as ProductType} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Separator className="mb-8" />
          <ReviewsSection
            productId={id}
            reviews={reviews}
            averageRating={avgRating}
            totalReviews={totalReviews}
          />
        </div>
      </div>
    </div>
  );
}
