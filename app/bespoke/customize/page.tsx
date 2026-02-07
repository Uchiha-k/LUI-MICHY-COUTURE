'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BespokeCustomizer } from '@/components/bespoke-customizer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const MOCK_ITEMS: Record<string, any> = {
    'the-signature-t-shirt': { id: 'tshirt', name: 'The Signature T-Shirt', basePrice: 12000, image: '/images/collection-tshirts.jpg' },
    'the-evening-gown': { id: 'gown', name: 'The Evening Gown', basePrice: 85000, image: '/images/bespoke-couture.jpg' },
    'the-power-suit': { id: 'suit', name: 'The Power Suit', basePrice: 95000, image: '/images/collection-outerwear.jpg' },
    'the-day-dress': { id: 'dress', name: 'The Day Dress', basePrice: 35000, image: '/images/collection-dresses.jpg' },
};

function CustomizeContent() {
    const searchParams = useSearchParams();
    const itemKey = searchParams.get('item');
    const baseItem = MOCK_ITEMS[itemKey || 'the-signature-t-shirt'];

    return (
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24">
            <Link
                href="/bespoke"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors mb-20"
            >
                <ChevronLeft size={16} /> Back to Atelier
            </Link>

            <BespokeCustomizer baseItem={baseItem} />
        </div>
    );
}

export default function BespokeCustomizePage() {
    return (
        <main className="min-h-screen bg-white">
            <Suspense fallback={<div className="h-screen flex items-center justify-center font-black tracking-widest uppercase">Loading Atelier...</div>}>
                <CustomizeContent />
            </Suspense>
        </main>
    );
}
