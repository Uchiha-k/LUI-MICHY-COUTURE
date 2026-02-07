'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/components/cart-provider';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock?: number;
  featured?: boolean;
  onAddToCart?: (id: string) => void;
}

import { motion } from 'framer-motion';

export function ProductCard({ id, name, price, image, category, stock, featured, onAddToCart }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();

  const isBespoke = category === 'Bespoke Couture';
  const isLimited = category === 'Limited Edition';
  const isOutOfStock = stock === 0 && !isBespoke;
  const isMadeToOrder = isBespoke || (stock === 0 && category !== 'Bridal');


  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addItem({ id, name, price, image, category });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col bg-card rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group/card"
    >
      <Link href={`/products/${id}`} className="relative w-full aspect-square overflow-hidden bg-muted group">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {featured && (
            <span className="bg-black text-white text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 shadow-lg">
              Featured
            </span>
          )}
          {isLimited && (
            <span className="bg-amber-500 text-black text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 shadow-lg">
              Limited Edition
            </span>
          )}
          {isMadeToOrder && (
            <span className="bg-white/90 text-black text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 backdrop-blur-sm shadow-lg">
              Made to Order
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-red-600 text-white text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 shadow-lg">
              Out of Stock
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all opacity-0 group-hover:opacity-100 duration-300 hover:scale-110"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'}
          />
        </button>
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4">{category}</p>
        <Link href={`/products/${id}`} className="group/title">
          <h3 className="text-sm font-black text-foreground mb-4 line-clamp-2 tracking-tighter uppercase leading-tight group-hover/title:text-black/60 transition-colors">{name}</h3>
        </Link>

        <div className="flex items-center justify-between mt-auto pt-6 border-t border-black/5">
          <div className="text-md font-black text-foreground tracking-tighter italic font-serif">
            KES {price.toLocaleString()}
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isLoading || isOutOfStock}
            className="h-10 w-10 p-0 rounded-none bg-black hover:bg-black/90 text-white transition-all hover:scale-105"
          >
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>

    </motion.div>
  );
}

