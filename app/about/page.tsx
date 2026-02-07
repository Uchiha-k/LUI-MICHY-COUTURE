'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span>About Us</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-background py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Born from a passion for African craftsmanship and a vision of global luxury, LUI MICHY represents the intersection of heritage and innovation.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-card border-y border-border py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/images/founder-portrait.jpg"
                alt="Founder of LUI MICHY"
                width={400}
                height={500}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-black text-foreground mb-6">
                Meet Founder Lui Michy
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                With over 15 years of experience in luxury fashion design, Lui Michy established LUI MICHY in 2018 with a singular vision: to create a global luxury house rooted in Kenyan craftsmanship and artistry.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Trained at prestigious fashion institutions and inspired by the rich textile heritage of Kenya, she founded LUI MICHY to celebrate African creativity on the world stage. Every piece reflects her commitment to quality, sustainability, and empowering local artisans.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, LUI MICHY dresses discerning women across Africa, Europe, North America, and beyond—each creation a testament to bespoke excellence and cultural pride.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-foreground mb-12 text-center">
            Our Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-8 bg-card rounded-lg border border-border">
              <h3 className="text-2xl font-black text-foreground mb-4">Trust & Credibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                We build lasting relationships through transparency, exceptional quality, and unwavering commitment to every client. Your trust is our most valuable asset.
              </p>
            </div>

            <div className="p-8 bg-card rounded-lg border border-border">
              <h3 className="text-2xl font-black text-foreground mb-4">Storytelling</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every piece tells a story—of Kenyan heritage, of personal style, of moments that matter. We believe fashion is a conversation between designer and wearer.
              </p>
            </div>

            <div className="p-8 bg-card rounded-lg border border-border">
              <h3 className="text-2xl font-black text-foreground mb-4">Craftsmanship</h3>
              <p className="text-muted-foreground leading-relaxed">
                We collaborate with Kenya's finest artisans and tailors, preserving traditional techniques while embracing modern luxury standards.
              </p>
            </div>
          </div>

          {/* Long-term Vision */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12">
            <h3 className="text-3xl font-black text-foreground mb-6">Global Luxury House</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              LUI MICHY's vision is to become a globally recognized luxury house, celebrated for setting the standard in bespoke African couture. We're building:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>A signature atelier experience with private consultations in major cities</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Exclusive collections that merge African heritage with contemporary design</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>A thriving community of artisans, ensuring sustainable livelihoods</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Heritage pieces that become heirlooms, celebrated across generations</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Partnerships & Stocklists */}
      <section className="bg-card border-y border-border py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-foreground mb-12 text-center">
            Collaborations & Partnerships
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-background p-8 rounded-lg border border-border">
              <h3 className="text-xl font-black text-foreground mb-4">Featured In</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Vogue Africa Editorial</li>
                <li>• International Fashion Week Presentations</li>
                <li>• Luxury Bridal Publications</li>
                <li>• Celebrity & Red Carpet Events</li>
              </ul>
            </div>

            <div className="bg-background p-8 rounded-lg border border-border">
              <h3 className="text-xl font-black text-foreground mb-4">Stockists</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Luxury Boutiques across East Africa</li>
                <li>• Exclusive Bridal Houses</li>
                <li>• Premium Event Planners</li>
                <li>• Select International Retailers</li>
              </ul>
            </div>

            <div className="bg-background p-8 rounded-lg border border-border md:col-span-2">
              <h3 className="text-xl font-black text-foreground mb-4">Creative Collaborators</h3>
              <p className="text-muted-foreground mb-4">
                We work with Kenya's most talented photographers, stylists, and creative directors to bring our vision to life.
              </p>
              <p className="text-muted-foreground">
                Our partnerships celebrate local talent while ensuring each piece is presented with the prestige it deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-foreground mb-6">
            Experience LUI MICHY
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Ready to discover your perfect piece? Book a private consultation with our team.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/booking">
              Book Consultation
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
