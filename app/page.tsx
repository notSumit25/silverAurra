import Link from 'next/link';
import { ArrowRight, Sparkles, Truck as TruckIcon, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/prisma';
import { Category, Product } from '@/lib/types';

export const revalidate = 3600;

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      take: 8,
      orderBy: { createdAt: 'desc' },
    });
    return products as Product[];
  } catch (error) {
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    return await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getCategories();

  return (
    <div className="flex flex-col">
      <section className="relative h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1454188/pexels-photo-1454188.jpeg')] bg-cover bg-center opacity-30" />
        <div className="container relative h-full flex items-center">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold font-serif">
              Timeless Elegance,
              <span className="block text-gold">Crafted to Perfection</span>
            </h1>
            <p className="text-lg text-gray-200">
              Discover our exclusive collection of handcrafted jewelry, where tradition meets modern luxury.
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-white">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/products?featured=true">
                <Button size="lg" variant="outline" className="border-gold text-white hover:bg-gold/10">
                  New Arrivals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Premium Quality</h3>
                <p className="text-sm text-muted-foreground">Certified gold and diamonds</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <TruckIcon className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders above ₹25,000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Lifetime Exchange</h3>
                <p className="text-sm text-muted-foreground">Hassle-free exchange policy</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                <Award className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">BIS Hallmarked</h3>
                <p className="text-sm text-muted-foreground">100% certified jewelry</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Shop by Category</h2>
            <p className="text-muted-foreground">Explore our curated collections</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="group text-center"
              >
                <div className="aspect-square rounded-full bg-gray-100 mb-4 overflow-hidden hover-lift">
                  <img
                    src={category.imageUrl || 'https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg'}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <h3 className="font-semibold group-hover:text-gold transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-2">Featured Collection</h2>
              <p className="text-muted-foreground">Handpicked pieces just for you</p>
            </div>
            <Link href="/products?featured=true">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured products available yet.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Please set up the database and run the seed script.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Join Our Exclusive Community
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to receive updates on new arrivals, special offers, and exclusive events.
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <Button className="bg-gold hover:bg-gold/90 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
