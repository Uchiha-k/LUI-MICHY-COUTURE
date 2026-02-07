'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-card to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Have questions about our collections or services? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-black text-foreground mb-8">Contact Information</h2>

              <div className="space-y-8">
                {/* Location */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Atelier & Showroom</h3>
                    <p className="text-muted-foreground">
                      Westlands, Nairobi<br />
                      Kenya
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Phone</h3>
                    <p className="text-muted-foreground">
                      +254 (0) 707 663 569<br />
                      Available during business hours
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      loganclub69@gmail.com<br />
                      For inquiries and consultations
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10">
                <Button asChild size="lg" className="w-full">
                  <Link href="/booking">
                    Book an Appointment
                  </Link>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-card p-8 rounded-lg border border-border">
                <h2 className="text-3xl font-black text-foreground mb-6">Send us a Message</h2>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shipping & Location Info */}
      <section className="bg-card border-y border-border py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-black text-foreground mb-4">Shipping & Delivery</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Nairobi:</strong> 2-3 business days</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Kenya (outside Nairobi):</strong> 3-5 business days</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Regional (East Africa):</strong> 5-7 business days</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>International:</strong> 10-14 business days</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-black text-foreground mb-4">Custom Orders & Lead Times</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Bespoke Couture:</strong> 8-16 weeks</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Bridal Bespoke:</strong> 12-20 weeks (book 6 months before)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Event Wear Customization:</strong> 4-8 weeks</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>All lead times confirmed at consultation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
