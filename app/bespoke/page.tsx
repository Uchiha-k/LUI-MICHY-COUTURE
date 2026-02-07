'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, Palette, Scissors, Ruler, User } from 'lucide-react';
import { MeasurementGuide } from '@/components/measurement-guide';

export default function BespokePage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/images/hero-lui-michy.jpg"
                    alt="Atelier Bespoke"
                    fill
                    className="object-cover opacity-80 brightness-75"
                    priority
                />
                <div className="relative z-10 text-center px-6">
                    <p className="text-white/80 text-xs uppercase tracking-[0.5em] font-black mb-8">
                        The Ultimate Luxury Experience
                    </p>
                    <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-12">
                        ATELIER <br /> BESPOKE
                    </h1>
                    <div className="flex flex-col md:flex-row gap-6 justify-center">
                        <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 rounded-none px-12 h-16 text-sm font-black uppercase tracking-widest transition-all">
                            <Link href="#start">Customize Now</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-32 px-6 lg:px-12 max-w-[1600px] mx-auto text-center">
                <h2 className="text-sm uppercase tracking-[0.4em] font-black text-black/40 mb-12">
                    A Unique Piece, From Start to Finish
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mt-24">
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center mb-8">
                            <Palette size={32} strokeWidth={1} />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-widest mb-4 text-black">Personalisation</h3>
                        <p className="text-black/50 text-sm leading-relaxed max-w-xs">
                            Select your palette, textures, and monograms. Every detail reflects your individual presence.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center mb-8">
                            <Scissors size={32} strokeWidth={1} />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-widest mb-4 text-black">Artisan Made</h3>
                        <p className="text-black/50 text-sm leading-relaxed max-w-xs">
                            Handcrafted in our Nairobi atelier by master tailors with decades of couture experience.
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border border-black/10 flex items-center justify-center mb-8">
                            <User size={32} strokeWidth={1} />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-widest mb-4 text-black">In Your Hands</h3>
                        <p className="text-black/50 text-sm leading-relaxed max-w-xs">
                            A one-of-a-kind creation delivered to your door, perfectly fitted to your unique measurements.
                        </p>
                    </div>
                </div>
            </section>

            {/* Selection Grid */}
            <section id="start" className="py-32 bg-black text-white px-6 lg:px-12">
                <div className="max-w-[1600px] mx-auto">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                            CHOOSE YOUR CANVAS
                        </h2>
                        <p className="text-white/40 uppercase tracking-widest text-xs font-bold">
                            Select a category to begin your customization journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { name: 'The Signature T-Shirt', image: '/images/collection-tshirts.jpg', color: 'White Cotton' },
                            { name: 'The Evening Gown', image: '/images/bespoke-couture.jpg', color: 'Silk Satin' },
                            { name: 'The Power Suit', image: '/images/collection-outerwear.jpg', color: 'Wool Crepe' },
                            { name: 'The Day Dress', image: '/images/collection-dresses.jpg', color: 'Linen Blend' },
                        ].map((item, idx) => (
                            <Link
                                key={idx}
                                href={`/bespoke/customize?item=${item.name.toLowerCase().replace(/ /g, '-')}`}
                                className="group relative aspect-[3/4] overflow-hidden"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-50"
                                />
                                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-white/60 mb-2">Base Category</p>
                                    <h4 className="text-2xl font-black tracking-tight mb-4">{item.name}</h4>
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                                        Customize now <ChevronRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Measurement Guide CTA */}
            <section className="py-32 px-6 lg:px-12 border-t border-black/5">
                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 relative aspect-square w-full max-w-xl">
                        <Image
                            src="/images/bespoke-couture.jpg"
                            alt="Measurements"
                            fill
                            className="object-cover shadow-2xl"
                        />
                    </div>
                    <div className="flex-1 space-y-8 text-center md:text-left">
                        <h2 className="text-5xl font-black tracking-tighter italic font-serif">A Perfect Fit</h2>
                        <p className="text-black/60 leading-relaxed text-lg max-w-lg">
                            Our bespoke service takes into account every nuance of your form. Follow our digital measurement guide for a fit that feels like a second skin.
                        </p>
                        <MeasurementGuide>
                            <Button variant="outline" className="rounded-none border-black text-black px-12 py-6 h-auto text-sm font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                                View Measurement Guide
                            </Button>
                        </MeasurementGuide>
                    </div>
                </div>
            </section>
        </main>
    );
}
