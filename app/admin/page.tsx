'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalSubscribers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    totalSubscribers: 0,
  });
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch products
        const productsRes = await fetch('/api/admin/products?limit=1');
        const productsData = await productsRes.json();

        // Fetch orders
        const ordersRes = await fetch('/api/admin/orders?limit=1');
        const ordersData = await ordersRes.json();

        // Fetch subscribers
        const subscribersRes = await fetch('/api/admin/subscribers');
        const subscribersData = await subscribersRes.json();
        setSubscribers(subscribersData.subscribers || []);

        const totalRevenue = ordersData.orders?.reduce(
          (sum: number, order: any) => sum + order.total,
          0
        ) || 0;

        const pendingOrders = ordersData.orders?.filter(
          (order: any) => order.status === 'PENDING'
        ).length || 0;

        setStats({
          totalProducts: productsData.pagination?.total || 0,
          totalOrders: ordersData.pagination?.total || 0,
          totalRevenue,
          pendingOrders,
          totalSubscribers: subscribersData.subscribers?.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage your store inventory and orders</p>
            </div>
            <Button asChild>
              <Link href="/">Back to Store</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {isLoading ? '—' : stats.totalProducts}
                </p>
              </div>
              <Package size={24} className="text-primary opacity-20" />
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {isLoading ? '—' : stats.totalOrders}
                </p>
              </div>
              <ShoppingCart size={24} className="text-primary opacity-20" />
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-foreground mt-2 text-green-600">
                  {isLoading ? '—' : `KES ${stats.totalRevenue.toLocaleString()}`}
                </p>
              </div>
              <DollarSign size={24} className="opacity-20 text-green-600" />
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground mt-2">
                  {isLoading ? '—' : stats.pendingOrders}
                </p>
              </div>
              <Users size={24} className="text-primary opacity-20" />
            </div>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card border-black/10 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Club Members</p>
                <p className="text-2xl font-black text-black mt-2">
                  {isLoading ? '—' : stats.totalSubscribers}
                </p>
              </div>
              <Star size={24} className="text-black fill-black" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="subscribers">Atelier Club</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="border border-border rounded-lg p-6 mt-6 bg-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Orders</h2>
              <Button asChild variant="outline">
                <Link href="/admin/orders">View All Orders</Link>
              </Button>
            </div>
            <p className="text-muted-foreground">
              Manage customer orders, update shipping status, and handle refunds.
            </p>
          </TabsContent>

          <TabsContent value="products" className="border border-border rounded-lg p-6 mt-6 bg-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Inventory</h2>
              <Button asChild>
                <Link href="/admin/products">Manage Products</Link>
              </Button>
            </div>
            <p className="text-muted-foreground">
              Add, edit, or remove products from your catalog. Update pricing, images, and stock levels.
            </p>
          </TabsContent>

          <TabsContent value="subscribers" className="border border-border rounded-lg p-6 mt-6 bg-card">
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                  Atelier Club Members
                  <span className="bg-black text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-widest font-black">VIP Waitlist</span>
                </h2>
                <p className="text-muted-foreground">
                  View and manage invitation requests for your elite circle.
                </p>
              </div>

              <div className="border border-border rounded-none overflow-hidden">
                <table className="w-full text-left bg-white">
                  <thead className="bg-muted/50 border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Email Address</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Requested On</th>
                      <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {subscribers.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground font-medium italic">
                          No invitation requests yet.
                        </td>
                      </tr>
                    ) : (
                      subscribers.map((sub) => (
                        <tr key={sub.id} className="hover:bg-muted/30 transition-colors">
                          <td className="px-6 py-4 font-bold text-sm tracking-tight">{sub.email}</td>
                          <td className="px-6 py-4 text-xs text-muted-foreground">
                            {new Date(sub.createdAt).toLocaleDateString()} at {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <a
                              href={`mailto:${sub.email}?subject=Your Invitation to the LUI MICHY Atelier Club&body=Dear Connoisseur,%0D%0A%0D%0AIt is our distinct pleasure to invite you to join the LUI MICHY Atelier Club.%0D%0A%0D%0AAs a member, you will receive:%0D%0A- Priority booking for bespoke fittings.%0D%0A- Private access to limited edition drops.%0D%0A- VIP invitations to Nairobi atelier events.%0D%0A%0D%0AVisit our boutique to experience the new collection: ${window.location.origin}%0D%0A%0D%0AStay Elegant,%0D%0ALUI MICHY COUTURE`}
                              className="text-[10px] font-black uppercase tracking-widest text-black hover:underline cursor-pointer"
                            >
                              Send Invitation
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

import { Star } from 'lucide-react';
