'use client';

import Link from 'next/link';

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span>Shipping Policy</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-foreground mb-2">Shipping & Delivery Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: January 2026</p>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Delivery Timeframes</h2>
              <p className="mb-4">Standard delivery times are as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Nairobi:</strong> 2-3 business days</li>
                <li><strong>Kenya (outside Nairobi):</strong> 3-5 business days</li>
                <li><strong>East Africa (Regional):</strong> 5-7 business days</li>
                <li><strong>International:</strong> 10-14 business days</li>
              </ul>
              <p className="mt-4 text-sm italic">Note: Timeframes exclude weekends and public holidays. Custom and bespoke orders have separate lead times confirmed at consultation.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Shipping Costs</h2>
              <p className="mb-4">Shipping costs are calculated based on:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Destination location</li>
                <li>Order weight and dimensions</li>
                <li>Shipping method selected</li>
              </ul>
              <p className="mt-4">Costs are displayed at checkout before payment confirmation.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Free Shipping</h2>
              <p>
                Orders above KES 50,000 within Nairobi qualify for free standard shipping. Other regions and premium shipping options may have additional fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Shipping Location</h2>
              <p>
                We ship to addresses within Kenya, East Africa, and internationally. Customs duties and taxes for international orders are the customer's responsibility.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Tracking & Updates</h2>
              <p>
                Once your order ships, you'll receive a tracking number via email. Track your package in real-time to monitor delivery progress.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Packaging & Handling</h2>
              <p>
                All orders are carefully packaged in premium boxes with protective materials to ensure your garment arrives in pristine condition. Delicate pieces receive special handling with tissue paper and garment bags.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Delivery Signature</h2>
              <p>
                International orders and high-value pieces may require signature upon delivery. We will contact you to arrange preferred delivery times.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Lost or Damaged Shipments</h2>
              <p className="mb-4">If your package arrives damaged or is lost in transit:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Report damage within 48 hours of delivery</li>
                <li>Provide photos of the damage and packaging</li>
                <li>We will file a claim with the courier and work to resolve</li>
                <li>Replacement or refund issued upon successful claim</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Custom Orders & Lead Times</h2>
              <p className="mb-4">Custom and bespoke orders have extended lead times:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Bespoke Couture:</strong> 8-16 weeks + 2-3 days shipping</li>
                <li><strong>Bridal Bespoke:</strong> 12-20 weeks + 2-3 days shipping</li>
                <li><strong>Event Wear Customization:</strong> 4-8 weeks + 2-3 days shipping</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. International Customs</h2>
              <p>
                International customers are responsible for any customs duties, import taxes, and processing fees imposed by their country. We will provide necessary documentation for customs clearance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Delayed Deliveries</h2>
              <p>
                While we strive to meet delivery timeframes, occasional delays may occur due to unforeseen circumstances. We will keep you updated and provide an estimated new delivery date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Us</h2>
              <p>
                For shipping inquiries, tracking issues, or delivery concerns, please contact us at hello@luimichy.com or call +254 (0) 712 345 678.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
