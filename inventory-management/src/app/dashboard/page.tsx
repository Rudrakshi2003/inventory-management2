'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ClientWrapper } from '@/components/ClientWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Package, DollarSign, FileText, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

function DashboardContent() {
  const { currentUser } = useAuth();
  const {
    getTotalItems,
    getTotalInventoryValue,
    getTotalBills,
    getTotalBilledValue,
    getRecentItems,
  } = useData();

  if (!currentUser) {
    return null;
  }

  const recentItems = getRecentItems(5);

  return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Link href="/add-item">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Item
            </Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getTotalItems()}</div>
              <p className="text-xs text-muted-foreground">Items in inventory</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${getTotalInventoryValue().toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Current inventory worth</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bills</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getTotalBills()}</div>
              <p className="text-xs text-muted-foreground">Generated bills</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Billed Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${getTotalBilledValue().toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Total billed amount</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Items */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Items</CardTitle>
            <CardDescription>Your 5 most recently added inventory items</CardDescription>
          </CardHeader>
          <CardContent>
            {recentItems.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No items</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by adding your first item.</p>
                <div className="mt-6">
                  <Link href="/add-item">
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Item
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
  );
}

export default function DashboardPage() {
  return (
    <ClientWrapper requireAuth={true}>
      <DashboardLayout>
        <DashboardContent />
      </DashboardLayout>
    </ClientWrapper>
  );
}