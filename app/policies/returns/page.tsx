'use client';

import Link from 'next/link';

export default function ReturnsPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span>Returns & Exchanges</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-foreground mb-2">Returns & Exchanges Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: January 2026</p>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Return Window</h2>
              <p>
                <strong>Ready-to-wear items:</strong> 30 days from purchase date
              </p>
              <p>
                <strong>Custom & Bespoke orders:</strong> Non-returnable (custom fit and personalized design)
              </p>
              <p>
                <strong>Sale items:</strong> Final sale, no returns or exchanges
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Return Eligibility</h2>
              <p className="mb-4">Items must meet the following conditions to be eligible for return:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Unworn and unwashed</li>
                <li>Original tags attached</li>
                <li>Original packaging intact</li>
                <li>Not damaged or altered</li>
                <li>Received within 30 days of purchase</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Non-Returnable Items</h2>
              <p className="mb-4">The following cannot be returned:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Custom or bespoke orders</li>
                <li>Sale or final sale items</li>
                <li>Items showing signs of wear</li>
                <li>Altered or damaged pieces</li>
                <li>Items purchased as gifts (without receipt)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. How to Initiate a Return</h2>
              <p className="mb-4">To start a return:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact hello@luimichy.com with your order number</li>
                <li>Provide reason for return</li>
                <li>Wait for return shipping instructions</li>
                <li>Ship item back to us in original packaging (insured)</li>
                <li>Allow 5-10 business days for processing</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Return Shipping</h2>
              <p>
                <strong>Free returns:</strong> LUI MICHY covers return shipping for defective items or incorrect orders
              </p>
              <p>
                <strong>Paid returns:</strong> Customer covers return shipping for changes of mind or sizing issues. We recommend insured shipping.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Refunds</h2>
              <p className="mb-4">Refunds are processed as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refund issued to original payment method</li>
                <li>Processing time: 7-10 business days</li>
                <li>Full refund of item price (less return shipping if applicable)</li>
                <li>Original shipping costs are non-refundable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Exchanges</h2>
              <p className="mb-4">We offer exchanges for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Defective items</li>
                <li>Incorrect items sent</li>
                <li>Different size/color (within 30 days, original condition)</li>
              </ul>
              <p className="mt-4">Exchange shipping is free for eligible exchanges. Customer pays return shipping for size/color changes of mind.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Defective or Damaged Items</h2>
              <p className="mb-4">If you receive a defective or damaged item:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Report within 48 hours of delivery with photos</li>
                <li>We will provide return label</li>
                <li>Full refund or replacement issued</li>
                <li>Return shipping fully covered by LUI MICHY</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Bespoke & Custom Orders</h2>
              <p>
                Bespoke and custom orders are made specifically for you and are non-returnable. However, if an error on our part has occurred, we will work with you to resolve the issue. Multiple fittings are scheduled during the creation process to ensure perfection before final delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Sales & Clearance Items</h2>
              <p>
                All sale and clearance items are marked as final sale and cannot be returned, exchanged, or refunded.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. International Returns</h2>
              <p className="mb-4">For international customers:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Customer covers return shipping</li>
                <li>Declare returns for customs purposes</li>
                <li>Provide tracking and customs documentation</li>
                <li>Refund processed upon receipt and inspection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Contact Us</h2>
              <p>
                For questions about returns, exchanges, or to initiate a return, contact hello@luimichy.com or call +254 (0) 712 345 678.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
