'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Check, Info, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/cart-provider';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const COLORS = [
    { name: 'Imperial White', hex: '#FFFFFF', image: '/images/collection-tshirts.jpg' },
    { name: 'Onyx Black', hex: '#1A1A1A', image: '/images/bespoke-couture.jpg' },
    { name: 'Royal Navy', hex: '#002366', image: '/images/collection-outerwear.jpg' },
    { name: 'Bordeaux Red', hex: '#4C1014', image: '/images/collection-dresses.jpg' },
];

const FABRICS = [
    { name: 'Egyptian Cotton', price: 0 },
    { name: 'Satin Silk', price: 5000 },
    { name: 'French Lace', price: 12000 },
    { name: 'Fine Wool', price: 8000 },
];

interface CustomizerProps {
    baseItem: {
        id: string;
        name: string;
        basePrice: number;
        image: string;
    };
}

import { MeasurementGuide } from '@/components/measurement-guide';

export function BespokeCustomizer({ baseItem }: CustomizerProps) {
    const { addItem } = useCart();
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
    const [monogram, setMonogram] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'color' | 'fabric' | 'details'>('color');

    const totalPrice = (baseItem.basePrice + selectedFabric.price) * quantity;

    const handleAddToCart = () => {
        addItem({
            productId: `bespoke-${baseItem.id}-${Date.now()}`,
            name: `${baseItem.name} (Atelier Bespoke)`,
            price: baseItem.basePrice + selectedFabric.price,
            image: selectedColor.image,
            category: 'Bespoke',
            quantity,
            customization: {
                color: selectedColor.name,
                fabric: selectedFabric.name,
                monogram: monogram || 'None',
            }
        });
        toast.success("Bespoke creation added to your bag");
        router.push('/cart');
    };

    return (
        <div className="flex flex-col lg:flex-row gap-16">
            {/* Visualizer - Left */}
            <div className="lg:w-3/5 space-y-8">
                <div className="relative aspect-[4/5] bg-muted w-full overflow-hidden group">
                    <Image
                        src={selectedColor.image}
                        alt={baseItem.name}
                        fill
                        className="object-cover transition-all duration-1000 group-hover:scale-105"
                    />

                    {/* Monogram Overlay Simulation */}
                    {monogram && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="relative">
                                <span className="text-6xl font-serif italic text-white/60 uppercase tracking-[0.3em] drop-shadow-2xl mix-blend-overlay" style={{
                                    filter: 'contrast(1.2) brightness(0.8)',
                                    textShadow: '0 0 2px rgba(0,0,0,0.2)'
                                }}>
                                    {monogram}
                                </span>
                                {/* Subtle embroidery texture effect */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply"
                                    style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)', backgroundSize: '3px 3px' }}
                                />
                            </div>
                        </div>
                    )}

                    <div className="absolute bottom-8 left-8 flex flex-col gap-2">
                        <div className="bg-black text-white px-4 py-2 uppercase text-[10px] font-black tracking-widest">
                            {selectedColor.name}
                        </div>
                        <div className="bg-white text-black px-4 py-2 uppercase text-[10px] font-black tracking-widest">
                            {selectedFabric.name}
                        </div>
                    </div>
                </div>
            </div>

            {/* Customizer Controls - Right */}
            <div className="lg:w-2/5 space-y-12">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] font-black text-black/40 mb-4">Personalization Atelier</p>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">{baseItem.name}</h1>
                    <div className="flex items-center gap-4 mt-6 text-3xl font-black">
                        KES {totalPrice.toLocaleString()}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-black/5 gap-8">
                    {['color', 'fabric', 'details'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'border-b-2 border-black text-black' : 'text-black/30'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="min-h-[350px]">
                    {/* Color Selection */}
                    {activeTab === 'color' && (
                        <div className="space-y-10 animate-in fade-in duration-500">
                            <h3 className="text-xs font-black uppercase tracking-widest">Selected Palette</h3>
                            <div className="grid grid-cols-4 gap-6">
                                {COLORS.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color)}
                                        className={`group relative aspect-square transition-all ${selectedColor.name === color.name ? 'scale-110 ring-2 ring-black ring-offset-4' : 'opacity-40 hover:opacity-100'
                                            }`}
                                    >
                                        <div
                                            className="w-full h-full"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 whitespace-nowrap text-[8px] font-black uppercase tracking-tight transition-all">
                                            {color.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Fabric Selection */}
                    {activeTab === 'fabric' && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h3 className="text-xs font-black uppercase tracking-widest">Texture & Material</h3>
                            <div className="space-y-4">
                                {FABRICS.map((fabric) => (
                                    <button
                                        key={fabric.name}
                                        onClick={() => setSelectedFabric(fabric)}
                                        className={`w-full flex items-center justify-between p-6 border transition-all ${selectedFabric.name === fabric.name ? 'border-black bg-black text-white' : 'border-black/5 bg-white text-black hover:border-black/20'
                                            }`}
                                    >
                                        <span className="text-sm font-bold uppercase tracking-widest">{fabric.name}</span>
                                        <span className="text-xs">
                                            {fabric.price > 0 ? `+ KES ${fabric.price.toLocaleString()}` : 'Standard'}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Monogram Details */}
                    {activeTab === 'details' && (
                        <div className="space-y-12 animate-in fade-in duration-500">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                        Monogramming <Info size={12} className="opacity-30" />
                                    </h3>
                                    <span className="text-[8px] font-black text-black/40 uppercase tracking-widest">Complimentary at the atelier</span>
                                </div>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        maxLength={3}
                                        placeholder="INITIALS"
                                        className="w-full h-20 px-8 bg-[#F9F9F9] border-0 rounded-none focus:bg-white focus:ring-2 focus:ring-black/5 outline-none text-4xl font-serif italic text-center placeholder:opacity-10 transition-all uppercase tracking-[0.5em]"
                                        value={monogram}
                                        onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                                    />
                                    <p className="text-[9px] text-black/30 font-bold uppercase tracking-widest text-center">
                                        Classical cursive chain-stitch embroidery
                                    </p>
                                </div>
                            </div>

                            <div className="p-8 bg-muted/30 border border-black/5 space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest">Couture Service</h4>
                                <p className="text-xs text-black/60 leading-relaxed font-medium">For complex customizations beyond these options, please book a consultation with our master designers.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Final Actions */}
                <div className="space-y-8 pt-12 border-t border-black/5">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Quantity Selection</span>
                            <div className="flex items-center mt-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="w-16 text-center font-bold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Fit Assurance</span>
                            <MeasurementGuide />
                        </div>
                    </div>

                    <Button
                        onClick={handleAddToCart}
                        className="w-full bg-black text-white hover:bg-black/90 h-20 rounded-none text-sm font-black uppercase tracking-[0.4em] transition-all group"
                    >
                        <ShoppingBag size={18} className="mr-3 transition-transform group-hover:-translate-y-1" />
                        Place Bespoke Order
                    </Button>

                    <p className="text-[9px] text-black/30 font-bold uppercase tracking-[0.2em] text-center">
                        Secure Checkout Powered by Stripe & M-Pesa
                    </p>
                </div>
            </div>
        </div>
    );
}

