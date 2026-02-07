'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, Eye } from 'lucide-react';

interface OrderItem {
  id: string;
  quantity: number;
  product: { name: string };
}

interface Order {
  id: string;
  orderNumber: string;
  email: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

const ORDER_STATUSES = ['all', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '10',
        });
        if (search) params.append('search', search);
        if (status !== 'all') params.append('status', status);

        const response = await fetch(`/api/admin/orders?${params}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [search, status, page]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'FAILED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <ChevronLeft className="text-muted-foreground hover:text-foreground" size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-foreground">Manage Orders</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <Input
            placeholder="Search by order number or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="max-w-md"
          />
          <Select value={status} onValueChange={(value) => {
            setStatus(value);
            setPage(1);
          }}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === 'all' ? 'All Statuses' : s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Loading orders...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono font-semibold text-foreground">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{order.email}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      KES {order.total.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link href={`/admin/orders/${order.id}`}>
                          <Eye size={16} />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            {Array.from({ length: pagination.pages }).map((_, i) => (
              <Button
                key={i + 1}
                variant={page === i + 1 ? 'default' : 'outline'}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              disabled={page === pagination.pages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
