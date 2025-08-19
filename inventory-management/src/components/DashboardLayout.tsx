'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  Plus,
  Users,
  Settings,
  User,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/add-item',
      label: 'Add Item',
      icon: Plus,
    },
    ...(currentUser.isAdmin
      ? [
          {
            href: '/users',
            label: 'Users',
            icon: Users,
          },
        ]
      : []),
    {
      href: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b">
            <h1 className="text-xl font-bold text-gray-900">Inventory</h1>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    pathname === item.href
                      ? 'text-gray-300'
                      : 'text-gray-400 group-hover:text-gray-500'
                  )}
                />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm">
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <User className="mr-2 h-4 w-4" />
                    {currentUser.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Card className="p-6">{children}</Card>
          </div>
        </main>
      </div>
    </div>
  );
}