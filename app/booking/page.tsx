'use client';

import React from "react"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock } from 'lucide-react';
import { useState } from 'react';

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span>Book Consultation</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-card to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Book Your Consultation
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Meet with our design team to explore your vision and create something extraordinary.
          </p>
        </div>
      </section>

      {/* Consultation Info */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card p-8 rounded-lg border border-border">
              <Calendar className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Duration</h3>
              <p className="text-muted-foreground">
                Initial consultations are 60 minutes, allowing us to understand your vision and style preferences.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <Clock className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Location</h3>
              <p className="text-muted-foreground">
                Private meetings at our Westlands atelier in Nairobi, or virtual consultations available.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">Services</h3>
              <p className="text-muted-foreground">
                Bespoke couture, bridal wear, event wear, and custom designs personalized to you.
              </p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Booking Form */}
              <div>
                <h2 className="text-3xl font-black text-foreground mb-6">Request a Time</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+254 712 345 678"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Consultation Type *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a type</option>
                      <option value="bridal">Bridal Couture</option>
                      <option value="bespoke">Bespoke Couture</option>
                      <option value="event">Event Wear</option>
                      <option value="custom">Custom Design</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Time *
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a time</option>
                      <option value="9:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Meeting Format
                    </label>
                    <select
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="in-person">In-Person at Atelier</option>
                      <option value="virtual">Virtual (Zoom/Skype)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tell Us About Your Vision
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Describe your style, occasion, and any special preferences..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Request Consultation
                  </Button>

                  {submitted && (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm text-foreground">
                      ✓ Thank you! We'll confirm your appointment shortly.
                    </div>
                  )}
                </form>
              </div>

              {/* FAQ & Info */}
              <div>
                <h2 className="text-3xl font-black text-foreground mb-6">Consultation FAQs</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-foreground mb-2">How much does a consultation cost?</h3>
                    <p className="text-muted-foreground text-sm">
                      Initial consultations are complimentary. Design fees and pricing are discussed during the meeting.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground mb-2">What should I prepare?</h3>
                    <p className="text-muted-foreground text-sm">
                      Bring inspiration photos, fabric swatches, sketches—anything that helps us understand your vision. No preparation needed!
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground mb-2">When should brides book?</h3>
                    <p className="text-muted-foreground text-sm">
                      Bridal consultations should be booked 6-8 months before your wedding to allow for design, fitting, and adjustments.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground mb-2">Do you offer rush orders?</h3>
                    <p className="text-muted-foreground text-sm">
                      Depending on availability and complexity, rush orders may be possible. Contact us directly to discuss.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground mb-2">What's your payment terms?</h3>
                    <p className="text-muted-foreground text-sm">
                      50% deposit to begin design, 50% upon completion. Payment plans available for special orders.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold text-foreground mb-2">Can I reschedule?</h3>
                    <p className="text-muted-foreground text-sm">
                      Absolutely. We require 48 hours notice for cancellations or rescheduling.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                  <h3 className="font-bold text-foreground mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call us directly at +254 (0) 712 345 678 or email consultations@luimichy.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
