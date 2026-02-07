'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus, ChevronRight } from 'lucide-react';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
}

import { useCart } from '@/components/cart-provider';

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = totalPrice;
  const shippingCost = subtotal > 0 ? 0 : 0; // Free shipping
  const tax = Math.round(subtotal * 0.16); // 16% VAT for Kenya
  const total = subtotal + shippingCost + tax;

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-black/50">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="text-black">Shopping Cart</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground">Shopping Cart</h1>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 text-center">
          <p className="text-black/50 text-xl mb-12">Your selections are empty.</p>
          <Button asChild className="bg-black text-white hover:bg-black/90 px-12 py-6 text-lg rounded-none">
            <Link href="/products">Discover Pieces</Link>
          </Button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-12">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-8 group"
                  >
                    <Link href={`/products/${item.productId}`} className="flex-shrink-0">
                      <div className="relative w-32 h-40 bg-muted rounded-none overflow-hidden">
                        <Image
                          src={item.image || '/placeholder.png'}
                          alt={item.name}
                          fill
                          className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            href={`/products/${item.productId}`}
                            className="text-xl font-bold text-black uppercase tracking-tighter hover:opacity-70 transition-opacity"
                          >
                            {item.name}
                          </Link>
                          <div className="mt-2 space-y-1">
                            <p className="text-sm text-black/40 uppercase tracking-widest">
                              {item.category}
                            </p>
                            {item.customization && (
                              <div className="pt-2 space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-tighter text-black/60">
                                  Color: <span className="text-black">{item.customization.color}</span>
                                </p>
                                <p className="text-[10px] font-black uppercase tracking-tighter text-black/60">
                                  Fabric: <span className="text-black">{item.customization.fabric}</span>
                                </p>
                                <p className="text-[10px] font-black uppercase tracking-tighter text-black/60">
                                  Monogram: <span className="text-black italic font-serif">{item.customization.monogram}</span>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="text-xl font-black text-black">
                          KES {item.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-8">
                        <div className="flex items-center border border-black/10">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-3 hover:bg-black hover:text-white transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-6 font-bold text-lg min-w-[50px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="p-3 hover:bg-black hover:text-white transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="flex items-center gap-2 text-black/40 hover:text-red-500 transition-colors uppercase text-xs font-black tracking-widest"
                        >
                          <Trash2 size={14} />
                          Remove Piece
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Button variant="outline" asChild className="w-full bg-transparent border-black text-black hover:bg-black hover:text-white rounded-none h-14 text-sm font-black uppercase tracking-widest transition-all">
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-black text-white p-12 sticky top-32">
                <h2 className="text-sm uppercase tracking-[0.3em] font-bold mb-12">
                  Order Summary
                </h2>

                <div className="space-y-6 mb-12 pb-12 border-b border-white/10 uppercase text-xs tracking-widest font-black">
                  <div className="flex justify-between">
                    <span className="opacity-40">Subtotal</span>
                    <span>KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-40">Shipping</span>
                    <span>{shippingCost === 0 ? 'Complimentary' : `KES ${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-40">Tax (16%)</span>
                    <span>KES {tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-12 text-2xl font-black tracking-tighter">
                  <span>Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>

                <Button asChild className="w-full bg-white hover:bg-white/90 rounded-none h-14 text-sm font-black uppercase tracking-widest">
                  <Link href="/checkout" className="text-black">Proceed to Checkout</Link>
                </Button>

                <p className="text-[10px] text-white/30 text-center mt-6 uppercase tracking-[0.2em]">
                  Secure checkout with Stripe & M-Pesa
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
