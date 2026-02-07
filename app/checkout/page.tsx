'use client';

import React from "react"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronRight, Lock } from 'lucide-react';

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
}

const COUNTRIES = ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Other'];

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'STRIPE' | 'MPESA'>('STRIPE');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const items = await response.json();
        setCartItems(items);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const tax = Math.round(subtotal * 0.16);
      const total = subtotal + tax;

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          paymentMethod,
          subtotal,
          tax,
          total,
          items: cartItems.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            priceAtTime: item.product.price,
          })),
        }),
      });

      if (response.ok) {
        const order = await response.json();
        // Redirect to payment page based on payment method
        if (paymentMethod === 'STRIPE') {
          window.location.href = `/payment/stripe/${order.id}`;
        } else {
          window.location.href = `/payment/mpesa/${order.id}`;
        }
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background animate-pulse" />;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.16);
  const total = subtotal + tax;

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight size={16} />
            <Link href="/cart" className="hover:text-foreground">
              Cart
            </Link>
            <ChevronRight size={16} />
            <span className="text-foreground">Checkout</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-foreground flex items-center gap-3">
            <Lock size={32} />
            Secure Checkout
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">Your cart is empty</p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2">
              <div className="space-y-8">
                {/* Contact Information */}
                <div className="border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="block mb-2">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="block mb-2">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+254 712 345 678"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="block mb-2">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="block mb-2">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country" className="block mb-2">
                        Country
                      </Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) =>
                          handleSelectChange('country', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {COUNTRIES.map((country) => (
                            <SelectItem key={country} value={country}>
                              {country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="street" className="block mb-2">
                        Street Address
                      </Label>
                      <Input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="123 Main St"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="block mb-2">
                          City
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Nairobi"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="block mb-2">
                          State/Province
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="County"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode" className="block mb-2">
                          Postal Code
                        </Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          placeholder="00100"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="border border-border rounded-lg p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="STRIPE"
                        checked={paymentMethod === 'STRIPE'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mr-3"
                      />
                      <span className="font-semibold text-foreground">
                        Stripe (International Cards)
                      </span>
                    </label>
                    <label className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="MPESA"
                        checked={paymentMethod === 'MPESA'}
                        onChange={(e) => setPaymentMethod(e.target.value as any)}
                        className="mr-3"
                      />
                      <span className="font-semibold text-foreground">
                        M-Pesa (Mobile Money)
                      </span>
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? 'Processing...' : 'Continue to Payment'}
                </Button>
              </div>
            </form>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-lg p-6 sticky top-6">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-foreground"
                    >
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">
                        KES {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span>KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Tax (16%)</span>
                    <span>KES {tax.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span>KES {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
