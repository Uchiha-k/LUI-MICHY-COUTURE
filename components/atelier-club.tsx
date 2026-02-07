'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ArrowRight, Star } from 'lucide-react';

export function AtelierClub() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                toast.success("Invitation Requested", {
                    description: "Welcome to the Atelier Club circle."
                });
                setIsSubmitted(true);
                setEmail('');
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to join');
            }
        } catch (error: any) {
            toast.error(error.message || "The Atelier is currently at capacity. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="py-32 bg-white border-t border-black/5">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    {/* Content */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-px bg-black" />
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black">
                                    Exclusive Access
                                </span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
                                THE ATELIER <br /> CLUB
                            </h2>
                        </div>

                        <p className="text-black/50 text-xl font-medium max-w-lg leading-relaxed">
                            Step into our inner circle. Club members receive priority for bespoke fittings, early access to limited collections, and invitations to private viewings in Nairobi.
                        </p>

                        <ul className="space-y-4">
                            {[
                                "Priority Bespoke Appointments",
                                "Limited Edition Pre-orders",
                                "Private Atelier Event Invitations",
                                "Curated Style Forecasts"
                            ].map((benefit, i) => (
                                <li key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest">
                                    <Star size={14} className="fill-black" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Form */}
                    <div className="relative p-12 lg:p-20 bg-black text-white rounded-none overflow-hidden min-h-[500px] flex flex-col justify-center">
                        {/* Decorative element */}
                        <div className="absolute top-0 right-0 p-10 opacity-10">
                            <h3 className="text-9xl font-black italic tracking-tighter">LM</h3>
                        </div>

                        <div className="relative z-10 space-y-12">
                            {isSubmitted ? (
                                <div className="space-y-8 animate-in fade-in zoom-in duration-700">
                                    <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center">
                                        <Star size={40} className="fill-white" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-4xl font-bold tracking-tight">Invitation Received</h3>
                                        <p className="text-white/60 text-lg leading-relaxed max-w-sm">
                                            The Atelier will review your request. You will receive a private confirmation once a slot becomes available.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-[10px] font-black uppercase tracking-[0.3em] hover:opacity-100 opacity-40 transition-opacity"
                                    >
                                        Register another member
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-bold tracking-tight">Request an Invitation</h3>
                                        <p className="text-white/40 text-sm font-medium uppercase tracking-widest">
                                            Join the elite circle of LUI MICHY connoisseurs
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="space-y-6">
                                            <Input
                                                type="email"
                                                placeholder="Enter your email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-16 bg-transparent border-0 border-b-2 border-white/20 rounded-none px-0 text-xl focus-visible:ring-0 focus-visible:border-white transition-all placeholder:text-white/10"
                                            />
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full bg-white text-black hover:bg-white/90 h-16 rounded-none text-xs font-black uppercase tracking-[0.3em] transition-all group"
                                            >
                                                {isLoading ? (
                                                    <span className="animate-pulse">Processing...</span>
                                                ) : (
                                                    <>
                                                        Request My Invitation
                                                        <ArrowRight size={16} className="ml-3 transition-transform group-hover:translate-x-2" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest text-center">
                                            By joining, you agree to our terms of exclusivity.
                                        </p>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
