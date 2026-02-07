'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit2, Trash2, Plus, ChevronLeft } from 'lucide-react';

import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  published: boolean;
  images: string[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '10',
        });
        if (search) params.append('search', search);

        const response = await fetch(`/api/admin/products?${params}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [search, page]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <ChevronLeft className="text-muted-foreground hover:text-foreground" size={24} />
              </Link>
              <h1 className="text-3xl font-bold text-foreground">Manage Products</h1>
            </div>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus size={20} className="mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="max-w-md"
          />
        </div>

        {/* Products Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Loading products...
                  </TableCell>
                </TableRow>
              ) : products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative w-12 h-12 bg-muted rounded overflow-hidden">
                        {product.images && product.images[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Plus className="text-muted-foreground opacity-20" size={16} />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-foreground">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-mono">
                      {product.sku}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.category}
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      KES {product.price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${product.stock > 0
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                          }`}
                      >
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex px-3 py-1 rounded text-sm font-medium ${product.published
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                          }`}
                      >
                        {product.published ? 'Published' : 'Draft'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <Link href={`/admin/products/${product.id}`}>
                            <Edit2 size={16} />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="text-destructive"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
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
