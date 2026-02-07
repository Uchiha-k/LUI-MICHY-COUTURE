'use client';

import React from "react"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function StripPaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string>('');
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: '',
  });

  useEffect(() => {
    (async () => {
      const { id: resolvedId } = await params;
      setOrderId(resolvedId);
    })();
  }, [params]);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders?id=${orderId}`);
        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        } else {
          setError('Failed to load order');
        }
      } catch (err) {
        setError('Failed to load order');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }

    // Limit CVC to 3-4 digits
    if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setCardData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // Validate card data
      if (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvc) {
        setError('Please fill in all card details');
        return;
      }

      // In production, use Stripe.js library
      // For demo purposes, we'll create a mock payment
      const response = await fetch(`/api/payment/stripe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          amount: order.total,
          currency: 'KES',
        }),
      });

      if (!response.ok) {
        throw new Error('Payment failed');
      }

      const paymentData = await response.json();

      // Update order with payment status
      await fetch(`/api/payment/stripe`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          paymentIntentId: paymentData.clientSecret,
          status: 'succeeded',
        }),
      });

      // Redirect to success page
      router.push(`/order-confirmation/${orderId}`);
    } catch (err: any) {
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background animate-pulse" />;
  }

  if (!order) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-4 py-12">
          <p className="text-center text-muted-foreground mb-6">Order not found</p>
          <Button asChild className="w-full">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-8">
          <Lock size={28} />
          <h1 className="text-3xl font-bold text-foreground">Payment</h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg flex gap-3">
            <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-destructive">{error}</p>
          </div>
        )}

        <div className="mb-8 p-6 border border-border rounded-lg bg-muted/50">
          <h2 className="font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-foreground">
              <span>Subtotal</span>
              <span>KES {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-foreground">
              <span>Tax</span>
              <span>KES {order.tax.toLocaleString()}</span>
            </div>
          </div>
          <div className="border-t border-border pt-4 flex justify-between text-lg font-bold text-foreground">
            <span>Total</span>
            <span>KES {order.total.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="cardholderName" className="block mb-2">
              Cardholder Name
            </Label>
            <Input
              id="cardholderName"
              name="cardholderName"
              value={cardData.cardholderName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <Label htmlFor="cardNumber" className="block mb-2">
              Card Number
            </Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleInputChange}
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              required
            />
            <p className="text-xs text-muted-foreground mt-2">
              Test card: 4242 4242 4242 4242
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate" className="block mb-2">
                Expiry Date
              </Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                value={cardData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </div>
            <div>
              <Label htmlFor="cvc" className="block mb-2">
                CVC
              </Label>
              <Input
                id="cvc"
                name="cvc"
                value={cardData.cvc}
                onChange={handleInputChange}
                placeholder="123"
                maxLength={4}
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={isProcessing} className="w-full" size="lg">
            {isProcessing ? 'Processing...' : `Pay KES ${order.total.toLocaleString()}`}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Your payment information is secure and encrypted.
          </p>
        </form>

        <div className="mt-8 p-6 border border-border rounded-lg bg-muted/50">
          <h3 className="font-semibold text-foreground mb-3">Test Payment Details</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Card:</strong> 4242 4242 4242 4242</p>
            <p><strong>Expiry:</strong> Any future date</p>
            <p><strong>CVC:</strong> Any 3-4 digits</p>
            <p className="pt-2 text-xs">
              This is a demo integration. In production, this would process real Stripe payments.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
