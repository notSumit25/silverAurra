import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-gold mb-4">LUXE</h3>
            <p className="text-sm text-muted-foreground">
              Crafting timeless elegance with exquisite jewelry since 1985.
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-gold">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-gold">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-gold">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-gold">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-gold">
                  All Jewellery
                </Link>
              </li>
              <li>
                <Link href="/products?category=rings" className="hover:text-gold">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/products?category=earrings" className="hover:text-gold">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/products?category=necklaces" className="hover:text-gold">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/products?category=bangles" className="hover:text-gold">
                  Bangles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-gold">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-gold">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-gold">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-gold">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-gold">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">About Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-gold">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/stores" className="hover:text-gold">
                  Find a Store
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gold">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 LUXE Jewellery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
