'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ClientWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

export function ClientWrapper({ children, requireAuth = false, requireAdmin = false }: ClientWrapperProps) {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !currentUser) {
      router.push('/');
      return;
    }
    
    if (requireAdmin && (!currentUser || !currentUser.isAdmin)) {
      router.push('/dashboard');
      return;
    }
  }, [currentUser, router, requireAuth, requireAdmin]);

  if (requireAuth && !currentUser) {
    return <div>Redirecting...</div>;
  }
  
  if (requireAdmin && (!currentUser || !currentUser.isAdmin)) {
    return <div>Redirecting...</div>;
  }

  return <>{children}</>;
}