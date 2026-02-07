'use client';

import React from "react"

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || 'Login failed');
        return;
      }

      toast.success('Welcome back to LUI MICHY');
      router.push('/');
    } catch (err: any) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <Link href="/" className="text-4xl font-black tracking-tighter text-black">
            LUI MICHY
          </Link>
          <h1 className="text-sm uppercase tracking-[0.3em] text-black/40 mt-12 mb-2 font-bold">
            Sign In
          </h1>
          <p className="text-black/60 font-medium">Access your curated selection</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase font-black tracking-widest text-black/60">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="rounded-none border-x-0 border-t-0 border-b-2 border-black/10 focus:border-black focus:ring-0 px-0 text-lg transition-all"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-xs uppercase font-black tracking-widest text-black/60">
                  Password
                </Label>
                <Link href="/auth/forgot-password" className="text-xs font-bold hover:underline">
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                className="rounded-none border-x-0 border-t-0 border-b-2 border-black/10 focus:border-black focus:ring-0 px-0 text-lg transition-all"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white hover:bg-black/90 rounded-none h-14 text-sm font-black uppercase tracking-[0.2em] transition-all"
          >
            {isLoading ? 'Processing...' : 'Enter Atelier'}
          </Button>
        </form>

        <p className="text-center text-black/40 mt-12 text-sm">
          New to the atelier?{' '}
          <Link href="/auth/register" className="text-black hover:underline font-black tracking-tight">
            Apply for Account
          </Link>
        </p>
      </div>
    </main>
  );
}
