'use client';

import Link from 'next/link';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

export function Footer() {
    const { data: session } = authClient.useSession();
    const isAdmin = (session?.user as any)?.isAdmin;

    return (
        <footer className="bg-foreground text-background">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 sm:py-24">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="mb-6">
                            <span className="text-2xl font-black tracking-tighter">LUI MICHY</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium">
                            Kenyan Luxury Couture for the Global Woman. Your presence counts.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-black text-lg mb-6">Shop</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/collections" className="hover:opacity-70 transition-opacity">
                                    Collections
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="hover:opacity-70 transition-opacity">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/booking" className="hover:opacity-70 transition-opacity">
                                    Book Consultation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-6">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/about" className="hover:opacity-70 transition-opacity">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:opacity-70 transition-opacity">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:opacity-70 transition-opacity">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-6">Support</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/policies/shipping" className="hover:opacity-70 transition-opacity">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/policies/returns" className="hover:opacity-70 transition-opacity">
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:opacity-70 transition-opacity">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/policies/privacy" className="hover:opacity-70 transition-opacity">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/policies/payments" className="hover:opacity-70 transition-opacity">
                                    Payment Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/policies/custom-orders" className="hover:opacity-70 transition-opacity">
                                    Custom Orders
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-6">Follow</h4>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="#" className="hover:opacity-70 transition-opacity">
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:opacity-70 transition-opacity">
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:opacity-70 transition-opacity">
                                    TikTok
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-80 gap-4">
                    <p>&copy; 2026 LUI MICHY. All rights reserved. | Kenyan Luxury Couture</p>
                    {isAdmin && (
                        <Link href="/admin" className="text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-100 opacity-30 transition-opacity">
                            Admin Portal
                        </Link>
                    )}
                </div>
            </div>
        </footer>
    );
}
