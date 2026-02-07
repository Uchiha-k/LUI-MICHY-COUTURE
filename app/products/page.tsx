'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/product-grid';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { useCart } from '@/components/cart-provider';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
}

interface PaginationData {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

const CATEGORIES = [
  'All',
  'Bridal',
  'Bespoke Couture',
  'Event Wear',
  'Limited Edition',
  'Clothing',
  'Accessories',
  'Home',
  'Beauty',
  'Shoes'
];


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          limit: '12',
        });

        if (selectedCategory !== 'All') {
          queryParams.append('category', selectedCategory);
        }

        const response = await fetch(`/api/products?${queryParams}`);
        const data: PaginationData = await response.json();
        setProducts(data.products);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, currentPage]);



  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="text-foreground">Shop</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Curated Collection</h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover our handpicked selection of premium products, crafted for those who appreciate quality and design.
          </p>
        </div>
      </div>

      {/* Filters and Products */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
        {/* Bespoke Promotion Banner */}
        <div className="mb-16 relative overflow-hidden bg-black text-white p-12 lg:p-20">
          <div className="relative z-10 max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-6">Lui Michy Atelier</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 italic font-serif">A piece as unique as your presence</h2>
            <p className="text-white/60 mb-10 leading-relaxed uppercase tracking-widest text-xs font-bold">
              Experience the pinnacle of luxury with our bespoke customization service. Handcrafted to your measurements.
            </p>
            <Button asChild className="bg-white text-black hover:bg-white/90 rounded-none px-10 py-6 h-auto text-[10px] font-black uppercase tracking-[0.3em]">
              <Link href="/bespoke">Start Customization</Link>
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
            <Image
              src="/images/bespoke-couture.jpg"
              alt="Couture"
              fill
              className="object-cover opacity-60 grayscale"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-3 flex-wrap">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
              >
                {cat}
              </Button>
            ))}
          </div>
          <Select value="relevance">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} isLoading={isLoading} />

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: pagination.pages }).map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? 'default' : 'outline'}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              disabled={currentPage === pagination.pages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
