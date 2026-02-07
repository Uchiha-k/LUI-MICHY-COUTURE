'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { ChevronLeft, Save, X, Calculator } from 'lucide-react';
import Link from 'next/link';
import { ImageManager } from './image-manager';

interface ProductFormProps {
    initialData?: any;
    isEditing?: boolean;
}

const KES_TO_USD_RATE = 129.0;

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [autoCalculateUSD, setAutoCalculateUSD] = useState(true);
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        sku: initialData?.sku || '',
        category: initialData?.category || '',
        price: initialData?.price || 0,
        priceUSD: initialData?.priceUSD || 0,
        description: initialData?.description || '',
        stock: initialData?.stock || 0,
        images: initialData?.images || [], // Now an array
        published: initialData?.published ?? false,
        featured: initialData?.featured ?? false,
    });

    const handlePriceChange = (value: string) => {
        const price = parseFloat(value) || 0;
        const updates: any = { price };

        if (autoCalculateUSD) {
            updates.priceUSD = parseFloat((price / KES_TO_USD_RATE).toFixed(2));
        }

        setFormData({ ...formData, ...updates });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                price: parseFloat(formData.price.toString()),
                priceUSD: parseFloat(formData.priceUSD.toString()),
                stock: parseInt(formData.stock.toString()),
                id: initialData?.id
            };

            const response = await fetch('/api/admin/products', {
                method: isEditing ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success(isEditing ? 'Product updated' : 'Product created');
                router.push('/admin/products');
                router.refresh();
            } else {
                const error = await response.json();
                toast.error(error.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Submit error:', error);
            toast.error('Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Basic Info */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest">Product Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g., Signature Silk Dress"
                            className="rounded-none border-black/10 focus:border-black h-12"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <Label htmlFor="sku" className="text-xs font-black uppercase tracking-widest">SKU</Label>
                            <Input
                                id="sku"
                                value={formData.sku}
                                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                                placeholder="LM-DR-001"
                                className="rounded-none border-black/10 focus:border-black h-12 font-mono"
                                required
                            />
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="category" className="text-xs font-black uppercase tracking-widest">Category</Label>
                            <Input
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="Dresses"
                                className="rounded-none border-black/10 focus:border-black h-12"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-black uppercase tracking-widest">Pricing</Label>
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={autoCalculateUSD}
                                    onCheckedChange={setAutoCalculateUSD}
                                    id="auto-calc"
                                />
                                <Label htmlFor="auto-calc" className="text-[10px] font-black uppercase tracking-tighter opacity-50">Auto-calc USD</Label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <Label htmlFor="price" className="text-[10px] font-bold uppercase text-muted-foreground">Price (KES)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => handlePriceChange(e.target.value)}
                                    className="rounded-none border-black/10 focus:border-black h-12 font-bold"
                                    required
                                />
                            </div>
                            <div className="space-y-4">
                                <Label htmlFor="priceUSD" className="text-[10px] font-bold uppercase text-muted-foreground">Price (USD)</Label>
                                <Input
                                    id="priceUSD"
                                    type="number"
                                    value={formData.priceUSD}
                                    onChange={(e) => setFormData({ ...formData, priceUSD: parseFloat(e.target.value) })}
                                    className="rounded-none border-black/10 focus:border-black h-12 font-bold"
                                    disabled={autoCalculateUSD}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Label htmlFor="description" className="text-xs font-black uppercase tracking-widest">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="rounded-none border-black/10 focus:border-black min-h-[150px] resize-none"
                            placeholder="Tell the story of this piece..."
                        />
                    </div>
                </div>

                {/* Right Column: Inventory & Media */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <Label htmlFor="stock" className="text-xs font-black uppercase tracking-widest">Stock Level</Label>
                        <Input
                            id="stock"
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                            className="rounded-none border-black/10 focus:border-black h-12"
                            required
                        />
                    </div>

                    <ImageManager
                        images={formData.images}
                        onChange={(images) => setFormData({ ...formData, images })}
                    />

                    <div className="grid grid-cols-2 gap-8 pt-4">
                        <div className="flex items-center justify-between p-4 border border-black/5 bg-background">
                            <div className="grid gap-1">
                                <Label className="text-xs font-black uppercase tracking-widest">Published</Label>
                                <p className="text-[10px] text-muted-foreground uppercase">Visible to customers</p>
                            </div>
                            <Switch
                                checked={formData.published}
                                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 border border-black/5 bg-background">
                            <div className="grid gap-1">
                                <Label className="text-xs font-black uppercase tracking-widest">Featured</Label>
                                <p className="text-[10px] text-muted-foreground uppercase">Home page spotlight</p>
                            </div>
                            <Switch
                                checked={formData.featured}
                                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-12 border-t border-black/5 flex items-center justify-between">
                <Link
                    href="/admin/products"
                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-black/40 hover:text-red-500 transition-colors"
                >
                    <X size={16} /> Discard Changes
                </Link>
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white hover:bg-black/90 rounded-none px-12 h-14 text-xs font-black uppercase tracking-[0.3em] shadow-2xl transition-all"
                >
                    {loading ? 'Processing...' : (
                        <>
                            <Save size={18} className="mr-3" />
                            {isEditing ? 'Update Piece' : 'Create Piece'}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
