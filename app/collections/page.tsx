'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

const collections: Collection[] = [
  {
    slug: 'bridal',
    name: 'Bridal Collection',
    description: 'Your most important day deserves a dress as unique as you. Our bridal collection features hand-beaded gowns, intricate embroidery, and timeless elegance. Each piece is customizable to reflect your personal style and heritage.',
    image: '/images/bridal-collection.jpg',
    count: 12,
  },
  {
    slug: 'bespoke-couture',
    name: 'Bespoke Couture',
    description: 'Made exclusively for you. Our bespoke couture process begins with a personal consultation, fabric selection, and multiple fittings to ensure perfection. We work with premium fabrics sourced from around the world.',
    image: '/images/bespoke-couture.jpg',
    count: 8,
  },
  {
    slug: 'event-wear',
    name: 'Event Wear',
    description: 'Make an entrance at every occasion. From galas to galas, our event wear collection combines bold silhouettes with sophisticated details. Each dress is designed to turn heads and boost confidence.',
    image: '/images/event-wear.jpg',
    count: 15,
  },
  {
    slug: 'limited-edition',
    name: 'Limited Editions',
    description: 'Exclusive pieces, limited quantities. These are one-of-a-kind or very limited run designs featuring experimental fabrics, innovative techniques, and artistic expression. Own a wearable masterpiece.',
    image: '/images/limited-edition.jpg',
    count: 6,
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span>Collections</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-card to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Collections
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Explore our curated collections of bespoke couture, bridal wear, event wear, and limited edition pieces.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {collections.map((collection, index) => (
              <div key={collection.slug} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    width={500}
                    height={600}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                    {collection.count} Pieces
                  </div>
                  <h2 className="text-4xl font-black text-foreground mb-4">
                    {collection.name}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {collection.description}
                  </p>
                  
                  {collection.slug === 'bridal' && (
                    <div className="bg-card p-4 rounded-lg border border-border mb-6">
                      <p className="text-sm text-muted-foreground">
                        <strong>Fabrics:</strong> Belgian lace, Italian silk, hand-beaded tulle, Kenyan cotton blends
                      </p>
                    </div>
                  )}
                  
                  {collection.slug === 'bespoke-couture' && (
                    <div className="bg-card p-4 rounded-lg border border-border mb-6">
                      <p className="text-sm text-muted-foreground">
                        <strong>Lead Time:</strong> 8-16 weeks | <strong>Starting Price:</strong> Upon consultation
                      </p>
                    </div>
                  )}
                  
                  {collection.slug === 'event-wear' && (
                    <div className="bg-card p-4 rounded-lg border border-border mb-6">
                      <p className="text-sm text-muted-foreground">
                        <strong>Available:</strong> Ready-to-wear and made-to-order options available
                      </p>
                    </div>
                  )}
                  
                  {collection.slug === 'limited-edition' && (
                    <div className="bg-card p-4 rounded-lg border border-border mb-6">
                      <p className="text-sm text-muted-foreground">
                        <strong>Availability:</strong> Limited quantities—once sold, designs are retired
                      </p>
                    </div>
                  )}
                  
                  <Button asChild size="lg">
                    <Link href={`/collections/${collection.slug}`}>
                      Explore {collection.name.split(' ')[0]}
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 border-y border-primary/20 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-foreground mb-6">
            Need a Custom Piece?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Book a consultation with our design team to create something truly unique.
          </p>
          <Button asChild size="lg">
            <Link href="/booking">
              Book Consultation
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
