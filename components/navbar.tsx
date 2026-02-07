'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/components/cart-provider';
import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

export function Navbar() {
    const { itemCount } = useCart();
    const [mounted, setMounted] = useState(false);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <nav className="bg-white sticky top-0 z-50 border-b border-black/5 py-2">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-black tracking-tighter text-black">LUI MICHY</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-12 text-black">
                        <Link href="/trending" className="text-sm font-medium hover:text-black/70 transition-colors uppercase tracking-widest">
                            Trending
                        </Link>
                        <Link href="/products" className="text-sm font-medium hover:text-black/70 transition-colors uppercase tracking-widest">
                            Shop
                        </Link>
                        <Link href="/journey" className="text-sm font-medium hover:text-black/70 transition-colors uppercase tracking-widest">
                            The Journey
                        </Link>
                        <Link href="/products?category=Bridal" className="text-sm font-medium hover:text-black/70 transition-colors uppercase tracking-widest">
                            Collections
                        </Link>
                        <Link href="/bespoke" className="text-sm font-black bg-black text-white px-4 py-1.5 hover:bg-black/80 transition-all uppercase tracking-widest scale-95 origin-center">
                            Bespoke
                        </Link>
                        {session?.user && (session.user as any).isAdmin && (
                            <Link href="/admin" className="text-sm font-bold text-primary hover:opacity-70 transition-opacity uppercase tracking-widest">
                                Admin
                            </Link>
                        )}
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="text-black hover:opacity-70 transition-opacity">
                            <Search size={20} />
                        </button>

                        {/* Auth Button */}
                        <div className="flex items-center gap-4">
                            {session ? (
                                <div className="flex items-center gap-4">
                                    <Link href="/profile" className="text-black hover:opacity-70 transition-opacity flex items-center gap-2">
                                        <div className="w-8 h-8 bg-black/5 rounded-full flex items-center justify-center">
                                            <User size={18} />
                                        </div>
                                        <div className="flex flex-col items-start leading-none">
                                            <span className="text-[10px] font-black uppercase tracking-tighter">
                                                {session.user.name.split(' ')[0]}
                                            </span>
                                            <span className="text-[8px] text-black/40 font-bold uppercase">Profile</span>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => authClient.signOut()}
                                        className="text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/auth/login"
                                    className="flex items-center gap-2 px-6 py-2 bg-black text-white hover:bg-black/80 transition-all rounded-none font-black uppercase tracking-[0.2em] text-[10px]"
                                >
                                    Sign In
                                </Link>
                            )}
                        </div>

                        <Link href="/cart" className="text-black hover:opacity-70 transition-opacity relative">
                            <ShoppingBag size={20} />
                            {mounted && itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
