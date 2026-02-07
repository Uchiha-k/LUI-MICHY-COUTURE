'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Package, Truck } from 'lucide-react';

interface OrderItem {
  id: string;
  quantity: number;
  priceAtTime: number;
  product: {
    id: string;
    name: string;
    sku: string;
  };
}

interface Order {
  id: string;
  orderNumber: string;
  email: string;
  status: string;
  paymentStatus: string;
  total: number;
  subtotal: number;
  tax: number;
  createdAt: string;
  items: OrderItem[];
  shippingAddress: string;
}

export default function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const [orderId, setOrderId] = useState<string>('');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState<any>(null);

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
          if (data.shippingAddress) {
            setShippingAddress(JSON.parse(data.shippingAddress));
          }
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

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
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-green-100 dark:bg-green-950">
              <CheckCircle2 size={48} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Thank You!</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Your order has been confirmed and is being processed.
          </p>
          <p className="text-lg text-foreground font-semibold">
            Order Number: <span className="font-mono text-primary">{order.orderNumber}</span>
          </p>
        </div>

        {/* Order Details */}
        <div className="border border-border rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Order Details</h2>

          {/* Order Items */}
          <div className="mb-8 pb-8 border-b border-border">
            <h3 className="font-semibold text-foreground mb-4">Items Ordered</h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-foreground">
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    KES {(item.priceAtTime * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8 pb-8 border-b border-border space-y-3">
            <div className="flex justify-between text-foreground">
              <span>Subtotal</span>
              <span>KES {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-foreground">
              <span>Tax (16%)</span>
              <span>KES {order.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Total</span>
              <span className="text-primary">KES {order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Shipping Address */}
          {shippingAddress && (
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Truck size={20} />
                  Shipping Address
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">{shippingAddress.fullName}</p>
                  <p>{shippingAddress.street}</p>
                  <p>
                    {shippingAddress.city}
                    {shippingAddress.state && `, ${shippingAddress.state}`}
                  </p>
                  <p>{shippingAddress.postalCode}</p>
                  <p>{shippingAddress.country}</p>
                  {shippingAddress.phone && <p>{shippingAddress.phone}</p>}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Order Status</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Order Status</p>
                    <p className="font-semibold text-foreground capitalize">
                      {order.status.toLowerCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Status</p>
                    <p className={`font-semibold ${
                      order.paymentStatus === 'COMPLETED'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}>
                      {order.paymentStatus === 'COMPLETED' ? 'Paid' : 'Pending'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Date</p>
                    <p className="font-semibold text-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Steps */}
        <div className="border border-border rounded-lg p-8 mb-8 bg-muted/50">
          <h2 className="text-xl font-bold text-foreground mb-4">What's Next?</h2>
          <ol className="space-y-3 text-foreground list-decimal list-inside">
            <li className="flex gap-3">
              <span>A confirmation email will be sent to <strong>{order.email}</strong></span>
            </li>
            <li className="flex gap-3">
              <span>Your order will be processed and shipped within 2-3 business days</span>
            </li>
            <li className="flex gap-3">
              <span>You will receive a tracking number via email once your order ships</span>
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button asChild className="flex-1">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button variant="outline" asChild className="flex-1 bg-transparent">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
