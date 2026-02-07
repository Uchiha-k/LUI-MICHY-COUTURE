'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ProductForm } from '@/components/admin/product-form';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
    const params = useParams();
    const id = params.id as string;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id && id !== 'new') {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center font-black tracking-widest uppercase">
                Retrieving Piece Details...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-6">
                <h2 className="text-2xl font-black uppercase tracking-widest">Piece Not Found</h2>
                <Link
                    href="/admin/products"
                    className="text-xs font-black uppercase tracking-widest border-b border-black pb-1"
                >
                    Back to Inventory
                </Link>
            </div>
        );
    }

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
                            <h1 className="text-3xl font-bold text-foreground">Edit Piece</h1>
                            <p className="text-muted-foreground mt-1 text-sm uppercase tracking-widest font-black opacity-50">Refining: {product.name}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
                <div className="bg-card border border-border p-8 lg:p-16">
                    <ProductForm initialData={product} isEditing />
                </div>
            </div>
        </main>
    );
}
