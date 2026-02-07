import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { AtelierClub } from '@/components/atelier-club';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Section - Full Width Image with Text Overlay */}
      <section className="relative w-full h-screen">
        <Image
          src="/images/hero-lui-michy.jpg"
          alt="LUI MICHY - Luxury Fashion"
          fill
          className="object-cover object-[center_20%] brightness-[1.05]"
          priority
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pt-32">
          <p className="text-white text-[10px] font-black mb-6 tracking-[0.5em] uppercase opacity-60">
            Established 2018
          </p>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-8 max-w-5xl text-balance tracking-tighter">
            Kenyan Luxury Couture for the Global Woman
          </h1>
          <p className="text-white/60 text-sm uppercase tracking-[0.2em] mb-12 max-w-2xl mx-auto font-bold">Bespoke elegance. Artisan craft. Timeless pieces.</p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="bg-white !text-black hover:bg-white/90 rounded-none px-14 font-black shadow-lg">
              <Link href="/products" className="!text-black uppercase tracking-widest text-xs">
                View Collections
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white !text-white hover:bg-white/10 bg-transparent rounded-none px-14 font-black">
              <Link href="/booking" className="!text-white uppercase tracking-widest text-xs">
                Book Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="bg-background">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20 sm:py-32">
          <h2 className="text-5xl md:text-7xl font-black text-foreground mb-6 text-center tracking-tighter">
            Collections
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
            Explore our curated collections of bespoke couture, bridal wear, and limited edition pieces
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bridal Collection */}
            <Link href="/products?category=Bridal" className="group relative overflow-hidden h-96">
              <Image
                src="/images/bridal-collection.jpg"
                alt="Bridal Collection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Bridal</h3>
                  <p className="text-white/80 text-[10px] font-black uppercase tracking-widest">The Ivory Series</p>
                </div>
              </div>
            </Link>

            {/* Bespoke Couture */}
            <Link href="/products?category=Bespoke%20Couture" className="group relative overflow-hidden h-96">
              <Image
                src="/images/bespoke-couture.jpg"
                alt="Bespoke Couture"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Bespoke Couture</h3>
                  <p className="text-white/80 text-[10px] font-black uppercase tracking-widest">Tailored Excellence</p>
                </div>
              </div>
            </Link>

            {/* Event Wear */}
            <Link href="/products?category=Event%20Wear" className="group relative overflow-hidden h-96">
              <Image
                src="/images/event-wear.jpg"
                alt="Event Wear"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Event Wear</h3>
                  <p className="text-white/80 text-[10px] font-black uppercase tracking-widest">The Gala Collection</p>
                </div>
              </div>
            </Link>

            {/* Limited Editions */}
            <Link href="/products?category=Limited%20Edition" className="group relative overflow-hidden h-96">
              <Image
                src="/images/limited-edition.jpg"
                alt="Limited Edition"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Limited Editions</h3>
                  <p className="text-white/80 text-[10px] font-black uppercase tracking-widest">Exclusive Drops</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white text-black py-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2 relative aspect-square w-full max-w-2xl">
            <Image
              src="/images/hero-lui-michy.jpg"
              alt="Our Story"
              fill
              className="object-cover grayscale brightness-110"
            />
            <div className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-muted hidden lg:block -z-10" />
          </div>
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-sm uppercase tracking-[0.4em] font-black text-black/40">Our Legacy</h2>
            <h3 className="text-5xl md:text-7xl font-black tracking-tighter italic font-serif leading-tight">
              Crafting <br /> Luxury <br /> Redefined
            </h3>
            <p className="text-lg text-black/60 leading-relaxed max-w-xl font-medium">
              LUI MICHY celebrates individuality through curated pieces that blend timeless elegance with contemporary style. Each collection tells a story of craftsmanship, quality, and the art of living well. Born in Nairobi, designed for the world.
            </p>
            <Button asChild variant="outline" className="border-black text-black rounded-none px-12 py-8 h-auto font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all">
              <Link href="/journey">Our Journey</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Atelier Club Section */}
      <AtelierClub />
    </main>
  );
}

