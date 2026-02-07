import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - LUI MICHY',
    description: 'Terms and conditions for shopping at LUI MICHY luxury fashion store.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen py-16 px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

                <p className="text-muted-foreground mb-8">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                    <p>
                        By accessing and using LUI MICHY's website and services, you accept and agree to be bound by these Terms of Service.
                        If you do not agree to these terms, please do not use our services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
                    <p>
                        Our services are available to individuals who can form legally binding contracts under applicable law.
                        You must be at least 18 years old to make purchases on our website.
                    </p>
                    <p className="mt-4">
                        You agree to:
                    </p>
                    <ul className="list-disc pl-6 mt-2">
                        <li>Provide accurate, current information during registration and checkout</li>
                        <li>Maintain the security of your account credentials</li>
                        <li>Not use our services for any unlawful purpose</li>
                        <li>Not interfere with or disrupt our services</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">3. Products and Pricing</h2>
                    <p>
                        All products are subject to availability. We reserve the right to limit quantities and discontinue products at any time.
                        Prices are displayed in Kenyan Shillings (KES) and US Dollars (USD) and are subject to change without notice.
                    </p>
                    <p className="mt-4">
                        We strive to display accurate product information, but we do not warrant that product descriptions, colors,
                        or other content is accurate, complete, or error-free.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">4. Orders and Payment</h2>
                    <p>
                        When you place an order, you are making an offer to purchase. We reserve the right to accept or decline your order
                        for any reason, including product availability, errors in pricing, or suspected fraud.
                    </p>
                    <p className="mt-4">
                        Payment must be made at the time of order through our accepted payment methods (Stripe or M-Pesa).
                        All payments are processed securely, and we do not store your payment information.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">5. Shipping and Delivery</h2>
                    <p>
                        Shipping costs and estimated delivery times are provided during checkout. While we strive to meet delivery estimates,
                        delays may occur due to circumstances beyond our control.
                    </p>
                    <p className="mt-4">
                        For detailed shipping information, please see our <a href="/policies/shipping" className="underline">Shipping Policy</a>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">6. Returns and Refunds</h2>
                    <p>
                        We accept returns within 14 days of delivery for most items in their original condition.
                        Custom and bespoke items are not eligible for return.
                    </p>
                    <p className="mt-4">
                        For complete return information, please see our <a href="/policies/returns" className="underline">Return Policy</a>.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
                    <p>
                        All content on this website, including text, graphics, logos, images, and software, is the property of LUI MICHY
                        and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without
                        our express written permission.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                    <p>
                        LUI MICHY shall not be liable for any indirect, incidental, special, or consequential damages arising from
                        your use of our services or products. Our total liability shall not exceed the amount you paid for the product.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">9. Privacy</h2>
                    <p>
                        Your privacy is important to us. Please review our <a href="/policies/privacy" className="underline">Privacy Policy</a> to
                        understand how we collect, use, and protect your personal information.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">10. Modifications to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon
                        posting to the website. Your continued use of our services after changes constitutes acceptance of the modified terms.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">11. Governing Law</h2>
                    <p>
                        These Terms of Service shall be governed by and construed in accordance with the laws of Kenya,
                        without regard to its conflict of law provisions.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
                    <p>
                        If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <ul className="list-none mt-4">
                        <li><strong>Email:</strong> info@luimichy.com</li>
                        <li><strong>Website:</strong> <a href="/contact" className="underline">Contact Page</a></li>
                    </ul>
                </section>

                <div className="mt-12 p-6 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                        By using LUI MICHY's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    </p>
                </div>
            </div>
        </div>
    );
}
