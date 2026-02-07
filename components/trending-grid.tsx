'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    description?: string;
}

interface TrendingGridProps {
    products: Product[];
    isLoading?: boolean;
}

export function TrendingGrid({ products, isLoading }: TrendingGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-[3/4] rounded-none" />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-20 border border-dashed border-black/10">
                <p className="text-black/40 text-sm uppercase tracking-[0.2em] font-black">No trending pieces at the moment</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-24 gap-x-12">
            {products.map((product, index) => {
                // Create an asymmetrical layout pattern
                const isSpanned = index % 3 === 0;
                const colSpan = isSpanned ? 'lg:col-span-8' : 'lg:col-span-4';
                const aspect = isSpanned ? 'aspect-[16/9]' : 'aspect-[3/4]';

                return (
                    <div key={product.id} className={`${colSpan} group`}>
                        <Link href={`/products/${product.id}`} className="block relative overflow-hidden bg-black/5">
                            <div className={aspect}>
                                <Image
                                    src={product.images[0] || '/placeholder.png'}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                            <div className="mt-8 space-y-4">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-2">{product.category}</p>
                                        <h3 className="text-2xl font-black tracking-tighter group-hover:italic transition-all">{product.name}</h3>
                                    </div>
                                    <p className="text-sm font-black italic">KES {product.price.toLocaleString()}</p>
                                </div>
                                <p className="text-sm text-black/60 line-clamp-2 leading-relaxed max-w-xl">
                                    {product.description || "A masterfully crafted piece from our latest collection, embodying the spirit of Kenyan luxury."}
                                </p>
                                <div className="pt-4 h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] border-b-2 border-black pb-1">View Details</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
