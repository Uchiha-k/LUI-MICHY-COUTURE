'use client';

import Link from 'next/link';

export default function CustomOrdersPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span>Custom Order Policy</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-foreground mb-2">Custom Order Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: January 2026</p>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. What Is a Custom Order?</h2>
              <p>
                Custom orders (also called bespoke or made-to-order) are garments designed and created specifically for you. Unlike ready-to-wear items, custom orders are tailored to your exact specifications, measurements, and preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Custom Order Types</h2>
              <p className="mb-4">We offer custom orders for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Bespoke Couture:</strong> Full custom design and creation</li>
                <li><strong>Bridal Bespoke:</strong> Custom wedding dresses with multiple fittings</li>
                <li><strong>Event Wear:</strong> Custom gowns for special occasions</li>
                <li><strong>Modifications:</strong> Alterations to ready-to-wear pieces</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. The Consultation Process</h2>
              <p className="mb-4">Custom orders begin with a detailed consultation:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Book a consultation (in-person or virtual)</li>
                <li>Discuss your vision, style, and preferences</li>
                <li>Share inspiration photos and design ideas</li>
                <li>Confirm timeline and lead time requirements</li>
                <li>Receive design proposal and pricing quote</li>
                <li>Place order with 50% deposit</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Lead Times</h2>
              <p className="mb-4">Custom order lead times (from order confirmation):</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Bespoke Couture:</strong> 8-16 weeks</li>
                <li><strong>Bridal Bespoke:</strong> 12-20 weeks (recommend booking 6-8 months before wedding)</li>
                <li><strong>Event Wear Customization:</strong> 4-8 weeks</li>
                <li><strong>Simple Modifications:</strong> 2-4 weeks</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Design & Development</h2>
              <p className="mb-4">The custom design process includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Detailed design sketches provided for approval</li>
                <li>Fabric selection and sourcing</li>
                <li>Pattern making tailored to your measurements</li>
                <li>Initial sample/mockup for feedback</li>
                <li>Design revisions (2 rounds included, additional rounds may incur fees)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Measurements & Fittings</h2>
              <p className="mb-4">For custom orders:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Initial Measurements:</strong> Provided during consultation</li>
                <li><strong>Bridal Fittings:</strong> Minimum 3 fittings (4-6 weeks, 8 weeks, 2 weeks before wedding)</li>
                <li><strong>Couture Fittings:</strong> Minimum 2 fittings (early stage, final fitting)</li>
                <li><strong>Virtual Measurements:</strong> Available for international clients</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Pricing & Payments</h2>
              <p className="mb-4">Custom order payment terms:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Deposit:</strong> 50% upon order confirmation (non-refundable, begins production)</li>
                <li><strong>Final Payment:</strong> 50% due upon completion before delivery</li>
                <li><strong>Design Consultation Fee:</strong> May be charged for complex or elaborate designs (credited toward final order)</li>
                <li><strong>Fabric & Material Costs:</strong> Charged separately based on selection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Fabric & Material Selection</h2>
              <p className="mb-4">Custom orders allow for premium fabric selection:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access to exclusive designer fabrics</li>
                <li>Import sourcing from international suppliers</li>
                <li>Local Kenyan textiles and artisanal fabrics</li>
                <li>Fabric costs vary and are quoted separately</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Design Modifications & Revisions</h2>
              <p className="mb-4">Design changes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Included:</strong> 2 rounds of design revisions</li>
                <li><strong>Additional Revisions:</strong> May incur additional fees (KES 5,000-10,000 per revision)</li>
                <li><strong>Major Design Changes:</strong> After production begins may delay timeline significantly</li>
                <li><strong>Timeline Impact:</strong> Revisions may extend lead time by 1-2 weeks</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Cancellation & Refund Policy</h2>
              <p className="mb-4">Custom order cancellations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Before Production Begins:</strong> 50% of deposit refunded, 50% retained as cancellation fee</li>
                <li><strong>After Production Begins:</strong> Deposit non-refundable; final payment must be paid upon completion</li>
                <li><strong>Close to Delivery:</strong> Full payment required; order cannot be canceled once nearly complete</li>
                <li><strong>Our Cancellation:</strong> If we cannot fulfill the order, full refund issued immediately</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Rush Orders</h2>
              <p>
                Depending on schedule availability and complexity, rush orders may be available at a premium rate (typically 25-50% surcharge). Contact our team to discuss rush order options.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Quality Assurance</h2>
              <p className="mb-4">Every custom order undergoes rigorous quality control:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Expert tailors hand-stitch and finish all pieces</li>
                <li>Multiple quality checkpoints throughout production</li>
                <li>Final inspection before delivery</li>
                <li>Defect-free guarantee or re-work at no additional cost</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Bridal Specific Terms</h2>
              <p className="mb-4">For bridal custom orders:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Booking:</strong> Must book at least 6 months before wedding date</li>
                <li><strong>Lead Time:</strong> 12-20 weeks from order confirmation</li>
                <li><strong>Fittings:</strong> Minimum 3-4 fittings scheduled over 16-20 weeks</li>
                <li><strong>Rush Weddings:</strong> Contact for availability; premium charges apply</li>
                <li><strong>Non-Refundable:</strong> Bridal custom orders are non-returnable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">14. Delivery & Packaging</h2>
              <p>
                Custom orders are carefully packaged in premium garment boxes with protective materials. Delivery timelines match the regions specified in our Shipping Policy. International custom orders may require additional lead time for customs clearance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">15. Communication & Updates</h2>
              <p>
                We maintain regular communication throughout the custom order process with progress updates, fitting schedules, and final delivery details via email and phone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">16. Intellectual Property</h2>
              <p>
                Custom designs created for you are exclusive. However, LUI MICHY retains the right to feature finished pieces in portfolio, marketing materials, and exhibitions with your permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">17. Contact & Support</h2>
              <p>
                For custom order inquiries, questions, or support, contact consultations@luimichy.com or call +254 (0) 712 345 678. Book your consultation at luimichy.com/booking.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
