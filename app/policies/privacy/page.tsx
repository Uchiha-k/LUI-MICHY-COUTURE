'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-foreground mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: January 2026</p>

          <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
              <p>
                LUI MICHY ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect information you provide directly, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name, email address, phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through Stripe and M-Pesa)</li>
                <li>Consultation preferences and design details</li>
                <li>Account credentials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and fulfill orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Schedule and manage consultations</li>
                <li>Respond to inquiries and customer service requests</li>
                <li>Send marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and ensure security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Payment Security</h2>
              <p>
                LUI MICHY does not store full credit card information. All payment processing is handled securely through Stripe and M-Pesa, which comply with PCI DSS standards. Your payment information is encrypted and protected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Sharing of Information</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share information with trusted partners only as necessary to provide our services (e.g., shipping partners, payment processors).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies & Tracking</h2>
              <p>
                Our website uses cookies to enhance user experience, remember preferences, and analyze usage patterns. You can disable cookies in your browser settings, though this may affect functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Retention</h2>
              <p>
                We retain your personal information as long as necessary to fulfill the purposes for which it was collected, including legal and accounting requirements. You may request deletion of your data at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us at hello@luimichy.com or call +254 (0) 712 345 678.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
