'use client';

import { useState, useEffect } from 'react';
import { TrendingGrid } from '@/components/trending-grid';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    description?: string;
}

export default function TrendingPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/products?featured=true&limit=12');
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Failed to fetch trending products:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrending();
    }, []);

    return (
        <main className="min-h-screen bg-white">
            {/* Breadcrumb - Minimalist */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
                    <Link href="/" className="hover:text-black transition-colors">Home</Link>
                    <ChevronRight size={12} strokeWidth={3} />
                    <span className="text-black">Trending Now</span>
                </div>
            </div>

            {/* Editorial Header */}
            <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-24">
                <div className="max-w-4xl">
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-12">
                        THE <br />
                        <span className="italic font-serif">IDENTITY</span> <br />
                        OF LUXURY.
                    </h1>
                    <div className="grid md:grid-cols-2 gap-12 items-end">
                        <p className="text-sm font-bold uppercase tracking-widest text-black/60 leading-relaxed">
                            A curated selection of our most coveted pieces. Hand-picked artifacts of Kenyan couture that define the modern silhouette.
                        </p>
                        <div className="flex justify-end">
                            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-black/20 vertical-rl rotate-180 py-8">
                                SEASON 2026 / TRENDING
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pb-32">
                <TrendingGrid products={products} isLoading={isLoading} />
            </section>

            {/* Editorial Footer Note */}
            <section className="bg-black text-white py-32">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-8">Not seeing what you envisioned?</h2>
                    <Link
                        href="/bespoke"
                        className="inline-block text-[12px] font-black uppercase tracking-[0.5em] border-b-2 border-white pb-2 hover:opacity-70 transition-opacity"
                    >
                        Explore Bespoke Services
                    </Link>
                </div>
            </section>
        </main>
    );
}
