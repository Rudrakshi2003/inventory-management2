import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { StoreProvider } from '@/contexts/StoreContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Inventory Management System',
  description: 'A complete inventory management application built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <DataProvider>
            <StoreProvider>
              {children}
              <Toaster />
            </StoreProvider>
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}