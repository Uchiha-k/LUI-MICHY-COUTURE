'use client';

import Link from 'next/link';

export default function PaymentsPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span>Payment Policy</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-foreground mb-2">Payment Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: January 2026</p>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Accepted Payment Methods</h2>
              <p className="mb-4">We accept the following payment methods:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Credit & Debit Cards:</strong> Visa, MasterCard via Stripe</li>
                <li><strong>M-Pesa:</strong> Mobile money payments for Kenya</li>
                <li><strong>Bank Transfer:</strong> Direct international transfers (upon request)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Payment Security</h2>
              <p className="mb-4">Your payment security is our priority:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All transactions are encrypted using SSL technology</li>
                <li>We do not store full credit card information</li>
                <li>Payments processed through PCI DSS compliant processors (Stripe, M-Pesa)</li>
                <li>Your personal and financial data is protected</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Payment Processing</h2>
              <p className="mb-4">Payment processing times:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Card Payments:</strong> Immediate confirmation</li>
                <li><strong>M-Pesa:</strong> Instant (within minutes)</li>
                <li><strong>Bank Transfer:</strong> 1-3 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Order Confirmation</h2>
              <p>
                Upon successful payment, you will receive an order confirmation email with order number, itemized details, and tracking information once your order ships.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Pricing & Taxes</h2>
              <p className="mb-4">Pricing information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All prices are displayed in KES (Kenya Shilling) or currency of your region</li>
                <li>Prices include applicable VAT for Kenya (16%)</li>
                <li>International customers may be subject to customs duties and import taxes</li>
                <li>Shipping costs calculated at checkout and added to total</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Payment Failures</h2>
              <p className="mb-4">If a payment fails:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>You will receive a notification with the reason</li>
                <li>Your cart is saved and can be completed later</li>
                <li>No charges are made until payment is successful</li>
                <li>Contact us for payment assistance: hello@luimichy.com</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Custom & Bespoke Order Payments</h2>
              <p className="mb-4">For custom and bespoke orders:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Deposit:</strong> 50% due upon order confirmation to begin design</li>
                <li><strong>Final Payment:</strong> 50% due upon completion before delivery</li>
                <li><strong>Multiple Fittings:</strong> May require additional fees if significant changes are requested</li>
                <li><strong>Deposits:</strong> Non-refundable unless order is canceled by LUI MICHY</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Payment Plans</h2>
              <p>
                For orders exceeding KES 100,000, we may offer payment plans upon request. Contact our team to discuss options.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Currency & Exchange Rates</h2>
              <p>
                Prices are displayed in your local currency based on current exchange rates. Exchange rates may fluctuate slightly between cart and checkout due to real-time rate updates.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. International Payments</h2>
              <p className="mb-4">For international customers:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Payments accepted in major currencies</li>
                <li>Currency conversion handled by payment processor</li>
                <li>Your bank may charge foreign transaction fees</li>
                <li>We recommend checking with your bank before international purchase</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Refund Processing</h2>
              <p className="mb-4">Refunds are processed to the original payment method:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Card Refunds:</strong> 5-10 business days</li>
                <li><strong>M-Pesa Refunds:</strong> 3-5 business days</li>
                <li><strong>Bank Transfer Refunds:</strong> 7-14 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">12. Disputed Transactions</h2>
              <p className="mb-4">If you dispute a charge:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contact us immediately at hello@luimichy.com</li>
                <li>Provide order number and reason for dispute</li>
                <li>We will investigate and respond within 7 business days</li>
                <li>If fraudulent activity is suspected, we will work with payment processors</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">13. Promotions & Discounts</h2>
              <p>
                Promotional codes and discounts are applied at checkout. Discounts cannot be combined unless explicitly stated. Expired or invalid codes will be rejected at checkout.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">14. Contact Us</h2>
              <p>
                For payment questions or concerns, contact hello@luimichy.com or call +254 (0) 712 345 678. Our team is available during business hours to assist you.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
