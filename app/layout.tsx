import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CartProvider } from '@/components/cart-provider'
import { CookieConsent } from '@/components/cookie-consent'
import { Toaster } from 'sonner'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'LUI MICHY - Luxury Fashion & Lifestyle',
  description: 'Discover LUI MICHY\'s curated collection of luxury clothing, accessories, and lifestyle pieces. Premium fashion with secure payment options including Stripe and M-Pesa.',
  generator: 'v0.app',
  keywords: ['luxury fashion', 'Kenya fashion', 'Nairobi boutique', 'premium clothing', 'online fashion store'],
  authors: [{ name: 'LUI MICHY' }],
  openGraph: {
    title: 'LUI MICHY - Luxury Fashion & Lifestyle',
    description: 'Discover LUI MICHY\'s curated collection of luxury clothing and accessories.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'LUI MICHY',
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUI MICHY - Luxury Fashion',
    description: 'Discover LUI MICHY\'s curated collection of luxury clothing and accessories.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <CookieConsent />
          <Analytics />
          <Toaster position="top-center" richColors />
        </CartProvider>
      </body>
    </html>
  )
}

