'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Category } from '@/lib/types';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: Category | null;
  priceRange: { min: number; max: number };
  minPrice: number;
  maxPrice: number;
}

export function FilterSidebar({
  categories,
  selectedCategory,
  priceRange,
  minPrice,
  maxPrice,
}: FilterSidebarProps) {
  const searchParams = useSearchParams();
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [expandedSections, setExpandedSections] = useState<{
    category: boolean;
    price: boolean;
  }>({
    category: true,
    price: true,
  });

  const toggleSection = (section: 'category' | 'price') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const createFilterUrl = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    return `/products?${params.toString()}`;
  };

  const updatePriceFilter = (newMin: number, newMax: number) => {
    const params = new URLSearchParams(searchParams);
    if (newMin > 0) params.set('minPrice', newMin.toString());
    if (newMax < priceRange.max) params.set('maxPrice', newMax.toString());
    params.delete('page');
    window.location.href = `/products?${params.toString()}`;
  };

  const clearFilters = () => {
    window.location.href = '/products';
  };

  const hasActiveFilters = selectedCategory || minPrice > 0 || maxPrice < priceRange.max;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">Filters</h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between font-semibold text-sm mb-4"
        >
          Category
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              expandedSections.category ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedSections.category && (
          <div className="space-y-3">
            <Link
              href="/products"
              className={`flex items-center gap-2 text-sm py-2 ${
                !selectedCategory ? 'text-gold font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All Categories
            </Link>

            {categories.map((category) => (
              <Link
                key={category.id}
                href={createFilterUrl('category', category.slug)}
                className={`flex items-center gap-2 text-sm py-2 ${
                  selectedCategory?.id === category.id
                    ? 'text-gold font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="border rounded-lg p-4">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between font-semibold text-sm mb-4"
        >
          Price Range
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              expandedSections.price ? 'rotate-180' : ''
            }`}
          />
        </button>

        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              defaultValue={[localMinPrice, localMaxPrice]}
              min={priceRange.min}
              max={priceRange.max}
              step={1000}
              onValueChange={(value) => {
                setLocalMinPrice(value[0]);
                setLocalMaxPrice(value[1]);
              }}
              onValueCommit={(value) => {
                updatePriceFilter(value[0], value[1]);
              }}
              className="w-full"
            />

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Min</label>
                <div className="text-sm font-semibold text-gold">
                  ₹{localMinPrice.toLocaleString('en-IN')}
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs text-muted-foreground mb-1 block">Max</label>
                <div className="text-sm font-semibold text-gold">
                  ₹{localMaxPrice.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="font-semibold text-sm mb-4">Material</h3>
        <div className="space-y-3">
          {['Gold', 'Diamond', 'Platinum', 'Pearl'].map((material) => (
            <label key={material} className="flex items-center gap-2 cursor-pointer">
              <Checkbox id={material} />
              <span className="text-sm text-muted-foreground hover:text-foreground">
                {material}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button className="w-full bg-gold hover:bg-gold/90 text-white" onClick={clearFilters}>
        Show {categories.length} Products
      </Button>
    </div>
  );
}
