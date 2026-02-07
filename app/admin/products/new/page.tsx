'use client';

import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ProductForm } from '@/components/admin/product-form';

export default function NewProductPage() {
    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/products">
                            <ChevronLeft className="text-muted-foreground hover:text-foreground transition-colors" size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Add New Piece</h1>
                            <p className="text-muted-foreground mt-1 text-sm uppercase tracking-widest font-black opacity-50">Create a new entry in your luxury catalog</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
                <div className="bg-card border border-border p-8 lg:p-16">
                    <ProductForm />
                </div>
            </div>
        </main>
    );
}
