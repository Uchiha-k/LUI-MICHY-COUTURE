'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Share2, ShoppingCart, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useCart } from '@/components/cart-provider';
import { ProductSchema, BrandSchema } from '@/components/seo-schema';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUSD?: number;
  sku: string;
  category: string;
  images: string[];
  stock: number;
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    (async () => {
      const { id: resolvedId } = await params;
      setId(resolvedId);
    })();
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    setQuantity(1);
    // Optional: redirect to cart or show success
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background animate-pulse" />;
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-center text-muted-foreground">Product not found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <ProductSchema product={{
        name: product.name,
        description: product.description || '',
        image: product.images[0] || '',
        price: product.price,
        sku: product.sku,
        category: product.category
      }} />
      <BrandSchema />
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight size={16} />
            <Link href="/products" className="hover:text-foreground">
              Shop
            </Link>
            <ChevronRight size={16} />
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || '/placeholder.png'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === idx ? 'border-primary' : 'border-border'
                      }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-foreground">
                  KES {product.price.toLocaleString()}
                </span>
                {product.priceUSD && (
                  <span className="text-muted-foreground">
                    USD ${product.priceUSD.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {product.description && (
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="mb-8 pb-8 border-b border-border">
              <p className="text-sm font-semibold text-foreground mb-3">SKU: {product.sku}</p>
              <p className={`text-sm mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-destructive'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-muted transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="px-6 py-2 font-semibold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-muted transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus size={18} />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 gap-2"
                size="lg"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-3 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Heart
                  size={20}
                  className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'}
                />
              </button>
            </div>

            {/* Share */}
            <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors p-3 -ml-3">
              <Share2 size={18} />
              Share this product
            </button>
          </div>
        </div>

        {/* Related Products Section - Placeholder */}
        <div className="mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-8">You might also like</h2>
          <div className="text-center py-12 text-muted-foreground">
            <p>Related products will appear here</p>
          </div>
        </div>
      </div>
    </main>
  );
}
