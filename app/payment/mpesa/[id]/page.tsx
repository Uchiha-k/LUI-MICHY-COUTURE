'use client';

import React from "react"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MpesaPaymentState {
  status: 'idle' | 'processing' | 'pending' | 'success' | 'failed';
  checkoutRequestId?: string;
  message?: string;
}

export default function MpesaPaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string>('');
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState('254712345678');
  const [paymentState, setPaymentState] = useState<MpesaPaymentState>({ status: 'idle' });

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

  const formatPhoneNumber = (value: string) => {
    // Remove non-digits
    let cleaned = value.replace(/\D/g, '');

    // Ensure it starts with 254
    if (!cleaned.startsWith('254')) {
      if (cleaned.startsWith('0')) {
        cleaned = '254' + cleaned.substring(1);
      } else {
        cleaned = '254' + cleaned;
      }
    }

    // Limit to 12 digits (254 + 10 digit number)
    cleaned = cleaned.slice(0, 12);

    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  const handleInitiatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPaymentState({ status: 'processing' });

    try {
      // Validate phone
      if (!phone || phone.length !== 12 || !phone.startsWith('254')) {
        setError('Please enter a valid phone number');
        setPaymentState({ status: 'idle' });
        return;
      }

      // Call M-Pesa API
      const response = await fetch(`/api/payment/mpesa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          phone,
          amount: order.total,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate payment');
      }

      const data = await response.json();

      setPaymentState({
        status: 'pending',
        checkoutRequestId: data.checkoutRequestId,
        message: data.message,
      });

      // In production, you would poll the M-Pesa API to check payment status
      // For demo, we'll simulate success after 5 seconds
      setTimeout(() => {
        setPaymentState({ status: 'success' });
        // Update order
        fetch(`/api/payment/mpesa`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId,
            checkoutRequestId: data.checkoutRequestId,
            resultCode: '0',
          }),
        }).then(() => {
          router.push(`/order-confirmation/${orderId}`);
        });
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to initiate payment');
      setPaymentState({ status: 'failed' });
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
          <h1 className="text-3xl font-bold text-foreground">M-Pesa Payment</h1>
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
              <span>Order Number</span>
              <span className="font-mono">{order.orderNumber}</span>
            </div>
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

        {paymentState.status === 'idle' || paymentState.status === 'processing' ? (
          <form onSubmit={handleInitiatePayment} className="space-y-6">
            <div>
              <Label htmlFor="phone" className="block mb-2">
                M-Pesa Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="254712345678"
                disabled={paymentState.status === 'processing'}
                required
              />
              <p className="text-xs text-muted-foreground mt-2">
                Enter your M-Pesa registered phone number (format: 254XXXXXXXXX)
              </p>
            </div>

            <Button
              type="submit"
              disabled={paymentState.status === 'processing'}
              className="w-full"
              size="lg"
            >
              {paymentState.status === 'processing'
                ? 'Initiating Payment...'
                : `Pay KES ${order.total.toLocaleString()} via M-Pesa`}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              You will receive an M-Pesa prompt on your phone to enter your PIN.
            </p>
          </form>
        ) : paymentState.status === 'pending' ? (
          <div className="space-y-6">
            <div className="p-6 border border-border rounded-lg bg-muted/50">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={24} className="text-primary animate-spin" />
                <div>
                  <h3 className="font-semibold text-foreground">Payment Pending</h3>
                  <p className="text-sm text-muted-foreground">
                    {paymentState.message}
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground mb-4">
                Waiting for M-Pesa confirmation...
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Phone: +{phone}</p>
                <p>• Amount: KES {order.total.toLocaleString()}</p>
                <p>• Reference: {order.orderNumber}</p>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : paymentState.status === 'success' ? (
          <div className="p-6 border border-border rounded-lg bg-green-50 dark:bg-green-950">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={28} className="text-green-600" />
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-50">
                Payment Successful!
              </h3>
            </div>
            <p className="text-green-800 dark:text-green-100 mt-4">
              Your payment has been received. Redirecting to order confirmation...
            </p>
          </div>
        ) : null}

        <div className="mt-8 p-6 border border-border rounded-lg bg-muted/50">
          <h3 className="font-semibold text-foreground mb-3">How M-Pesa Works</h3>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Enter your M-Pesa registered phone number</li>
            <li>You will receive a payment prompt on your phone</li>
            <li>Enter your M-Pesa PIN to confirm</li>
            <li>Payment will be processed immediately</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
