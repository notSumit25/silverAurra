'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

interface SortDropdownProps {
  currentSort?: string;
}

const sortOptions = [
  { value: '', label: 'Best Matches' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'bestseller', label: 'Bestsellers' },
];

export function SortDropdown({ currentSort = '' }: SortDropdownProps) {
  const searchParams = useSearchParams();

  const currentLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || 'Best Matches';

  const createSortUrl = (sortValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (sortValue) {
      params.set('sort', sortValue);
    } else {
      params.delete('sort');
    }
    params.delete('page');
    return `/products?${params.toString()}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          Sort By: {currentLabel}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {sortOptions.map((option) => (
          <DropdownMenuItem key={option.value} asChild>
            <Link
              href={createSortUrl(option.value)}
              className={`w-full ${
                currentSort === option.value ? 'bg-gold/10 text-gold font-semibold' : ''
              }`}
            >
              {option.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
