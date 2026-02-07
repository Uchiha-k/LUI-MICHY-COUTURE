'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
};

export default function JourneyPage() {
    return (
        <main className="min-h-screen bg-white text-black">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/images/hero-lui-michy.jpg"
                        alt="The Couture Journey"
                        fill
                        className="object-cover grayscale"
                        priority
                    />
                </motion.div>

                <div className="relative z-10 text-center px-6">
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        animate={{ opacity: 1, letterSpacing: "0.5em" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="text-[10px] text-white/60 font-black uppercase mb-8"
                    >
                        LUI MICHY ATELIER
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-[0.8] mb-12 uppercase italic font-serif"
                    >
                        THE <br /> JOURNEY
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto font-bold uppercase tracking-widest leading-relaxed"
                    >
                        From the spark of vision to the global unveil—witness the alchemy of couture.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <div className="w-px h-24 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
                </motion.div>
            </section>

            {/* Philosophy Section */}
            <section className="py-40 px-6 lg:px-12 bg-white flex items-center justify-center">
                <motion.div
                    {...fadeInUp}
                    className="max-w-4xl mx-auto text-center space-y-12"
                >
                    <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Philosophy</h2>
                    <p className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight">
                        Luxury is not the final product; it is the <span className="font-black italic">passion</span>, the <span className="font-black italic">precision</span>, and the <span className="font-black italic">patience</span> woven into every single stitch.
                    </p>
                    <div className="w-24 h-px bg-black/10 mx-auto" />
                </motion.div>
            </section>

            {/* The Steps */}
            <section className="py-24 px-6 lg:px-12 bg-[#F9F9F9]">
                <div className="max-w-[1600px] mx-auto space-y-48">
                    {/* Step 1 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)]"
                        >
                            <Image
                                src="/images/bespoke-couture.jpg"
                                alt="Artistic Sketching"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        <motion.div
                            {...fadeInUp}
                            className="space-y-10"
                        >
                            <span className="text-9xl font-black opacity-[0.03] font-serif absolute -top-12 -left-12 pointer-events-none">01</span>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Vision</p>
                                <h2 className="text-6xl font-black tracking-tighter uppercase italic font-serif">Visionary Sketching</h2>
                            </div>
                            <p className="text-xl text-black/60 leading-relaxed font-medium">
                                Every LUI MICHY masterpiece begins with a conversation. We translate your essence into artistic sketches, selecting the finest silks, tulles, and local Kenyan textiles that will form the body of your garment.
                            </p>
                            <div className="h-px w-20 bg-black/10" />
                            <p className="text-sm font-bold uppercase tracking-widest text-black/30">
                                4 weeks of design perfection
                            </p>
                        </motion.div>
                    </div>

                    {/* Step 2 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            {...fadeInUp}
                            className="lg:order-2 relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)]"
                        >
                            <Image
                                src="/images/hero-lui-michy.jpg"
                                alt="Master Craftsmanship"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="lg:order-1 space-y-10 lg:text-right"
                        >
                            <span className="text-9xl font-black opacity-[0.03] font-serif absolute -top-12 -right-12 pointer-events-none">02</span>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Creation</p>
                                <h2 className="text-6xl font-black tracking-tighter uppercase italic font-serif">Artisan Craft</h2>
                            </div>
                            <p className="text-xl text-black/60 leading-relaxed font-medium">
                                This is the heart of the atelier. Our master artisans meticulously hand-apply beadwork, embroidery, and structural boning. Each piece is a testament to Kenyan heritage blended with global luxury standards.
                            </p>
                            <div className="h-px w-20 bg-black/10 lg:ml-auto" />
                            <p className="text-sm font-bold uppercase tracking-widest text-black/30">
                                Over 300 hours of manual labor
                            </p>
                        </motion.div>
                    </div>

                    {/* Step 3 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center pb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative aspect-[4/5] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)]"
                        >
                            <Image
                                src="/images/limited-edition.jpg"
                                alt="Global Delivery"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                        <motion.div
                            {...fadeInUp}
                            className="space-y-12"
                        >
                            <span className="text-9xl font-black opacity-[0.03] font-serif absolute -top-12 -left-12 pointer-events-none">03</span>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">The Final Act</p>
                                <h2 className="text-6xl font-black tracking-tighter uppercase italic font-serif">The Unveiling</h2>
                            </div>
                            <p className="text-xl text-black/60 leading-relaxed font-medium">
                                Final fittings are followed by a rigorous quality audit. Your garment is then encased in our signature LUI MICHY packaging and shipped globally—bringing the magic of Nairobi couture directly to your doorstep.
                            </p>
                            <Button asChild className="mt-8 bg-black text-white hover:bg-black/90 rounded-none px-12 py-8 h-auto font-black uppercase tracking-[0.2em] text-[10px]">
                                <Link href="/booking">Book Your Journey</Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 bg-black text-white text-center">
                <motion.div
                    {...fadeInUp}
                    className="max-w-4xl mx-auto px-6 space-y-12"
                >
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-tight italic font-serif">The wait <br /> is over</h2>
                    <p className="text-lg text-white/40 font-bold uppercase tracking-[0.3em]">
                        Your bespoke legacy begins now.
                    </p>
                    <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 rounded-none px-16 py-8 h-auto font-black uppercase tracking-[0.2em] text-[10px]">
                        <Link href="/booking">Reserve an Appointment</Link>
                    </Button>
                </motion.div>
            </section>
        </main>
    );
}

