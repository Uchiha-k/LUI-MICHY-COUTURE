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

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || 'Registration failed');
        return;
      }

      toast.success('Welcome to the LUI MICHY Atelier');
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
            Create Account
          </h1>
          <p className="text-black/60 font-medium">Join our curated community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs uppercase font-black tracking-widest text-black/60">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="rounded-none border-x-0 border-t-0 border-b-2 border-black/10 focus:border-black focus:ring-0 px-0 text-lg transition-all"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase font-black tracking-widest text-black/60">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-none border-x-0 border-t-0 border-b-2 border-black/10 focus:border-black focus:ring-0 px-0 text-lg transition-all"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs uppercase font-black tracking-widest text-black/60">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="rounded-none border-x-0 border-t-0 border-b-2 border-black/10 focus:border-black focus:ring-0 px-0 text-lg transition-all"
                placeholder="••••••••"
                required
              />
              <p className="text-[10px] uppercase font-bold text-black/30 tracking-widest mt-2">
                Minimum 8 characters for security
              </p>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white hover:bg-black/90 rounded-none h-14 text-sm font-black uppercase tracking-[0.2em] transition-all"
          >
            {isLoading ? 'Registering...' : 'Submit Application'}
          </Button>
        </form>

        <p className="text-center text-black/40 mt-12 text-sm">
          Already registered?{' '}
          <Link href="/auth/login" className="text-black hover:underline font-black tracking-tight">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
