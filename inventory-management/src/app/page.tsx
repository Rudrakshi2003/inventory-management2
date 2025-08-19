'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(emailOrPhone, password);
      if (success) {
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        toast.error('Invalid credentials or account not approved');
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Inventory Management</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your email or phone number and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="emailOrPhone">Email or Phone Number</Label>
                <Input
                  id="emailOrPhone"
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                  placeholder="Enter your email or phone"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">Demo Admin Account:</p>
              <p className="text-xs text-blue-600">Email: adimn-sanumishra01234@gmail.com</p>
              <p className="text-xs text-blue-600">Password: Mishra@123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}