import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { Product as ProductType, Category } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { SortDropdown } from "@/components/SortDropdown";
import { ChevronDown } from "lucide-react";

export const revalidate = 60;

interface SearchParams {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  page?: string;
}

async function getProducts(params: SearchParams) {
  try {
    const where: any = {};

    if (params.category) {
      const category = await prisma.category.findUnique({
        where: { slug: params.category },
      });
      if (category) {
        where.categoryId = category.id;
      }
    }

    if (params.minPrice || params.maxPrice) {
      where.price = {};
      if (params.minPrice) {
        where.price.gte = parseInt(params.minPrice);
      }
      if (params.maxPrice) {
        where.price.lte = parseInt(params.maxPrice);
      }
    }

    let orderBy: any = { createdAt: "desc" };

    switch (params.sort) {
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "bestseller":
        orderBy = [{ bestseller: "desc" }, { createdAt: "desc" }];
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      take: 12,
      skip: (parseInt(params.page || "1") - 1) * 12,
    });

    const totalCount = await prisma.product.count({ where });

    return {
      products: products as ProductType[],
      total: totalCount,
      page: parseInt(params.page || "1"),
      totalPages: Math.ceil(totalCount / 12),
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0, page: 1, totalPages: 1 };
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    return [];
  }
}

async function getPriceRange() {
  try {
    const minProduct = await prisma.product.findFirst({
      orderBy: { price: "asc" },
      select: { price: true },
    });

    const maxProduct = await prisma.product.findFirst({
      orderBy: { price: "desc" },
      select: { price: true },
    });

    return {
      min: minProduct?.price || 0,
      max: maxProduct?.price || 500000,
    };
  } catch (error) {
    return { min: 0, max: 500000 };
  }
}

interface ProductsPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const sp = await searchParams;

  const [productsData, categories, priceRange] = await Promise.all([
    getProducts(sp),
    getCategories(),
    getPriceRange(),
  ]);

  const selectedCategory = sp.category
    ? categories.find((c) => c.slug === sp.category) ?? null
    : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b bg-gray-50 py-4">
        <div className="container">
          <h1 className="text-3xl font-bold font-serif mb-2">All Jewellery</h1>
          <p className="text-muted-foreground">
            Showing {productsData.products.length} of {productsData.total}{" "}
            products
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Suspense fallback={<div>Loading filters...</div>}>
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              minPrice={parseInt(sp.minPrice || "0")}
              maxPrice={parseInt(sp.maxPrice || priceRange.max.toString())}
            />
          </Suspense>

          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {productsData.products.length > 0
                    ? `Showing ${(productsData.page - 1) * 12 + 1}-${Math.min(
                        productsData.page * 12,
                        productsData.total
                      )} of ${productsData.total} results`
                    : "No products found"}
                </p>
              </div>

              <Suspense fallback={<div>Loading sort...</div>}>
                <SortDropdown currentSort={sp.sort} />
              </Suspense>
            </div>

            {productsData.products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {productsData.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {productsData.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 py-8">
                    {Array.from({ length: productsData.totalPages }).map(
                      (_, i) => {
                        const page = i + 1;
                        const isActive = page === productsData.page;
                        const params = new URLSearchParams(
                          Object.fromEntries(
                            Object.entries(sp).map(([key, value]) => [
                              key,
                              Array.isArray(value)
                                ? value.join(",")
                                : value ?? "",
                            ])
                          )
                        );
                        params.set("page", page.toString());

                        return (
                          <a
                            key={page}
                            href={`/products?${params.toString()}`}
                            className={`px-3 py-2 rounded-lg transition-colors ${
                              isActive
                                ? "bg-gold text-white"
                                : "bg-gray-100 text-foreground hover:bg-gray-200"
                            }`}
                          >
                            {page}
                          </a>
                        );
                      }
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="col-span-3 py-16 text-center">
                <p className="text-lg text-muted-foreground mb-4">
                  No products found matching your filters
                </p>
                <a href="/products" className="text-gold hover:underline">
                  Clear filters and try again
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
