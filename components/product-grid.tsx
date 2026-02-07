'use client';

import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  stock?: number;
  featured?: boolean;
}


interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onAddToCart?: (id: string) => void;
}

export function ProductGrid({ products, isLoading, onAddToCart }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-square rounded-lg" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.images[0] || '/placeholder.png'}
          category={product.category}
          stock={product.stock}
          featured={product.featured}
          onAddToCart={onAddToCart}
        />
      ))}

    </div>
  );
}
