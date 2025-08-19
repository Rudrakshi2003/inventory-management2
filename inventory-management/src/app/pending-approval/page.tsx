'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PendingApprovalPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Pending Approval</CardTitle>
            <CardDescription>
              Your account has been created successfully
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Your account is currently under review by our administrators.
              </p>
              <p className="text-sm text-gray-600">
                You will be able to access the system once your account is approved.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              <span>Account created successfully</span>
            </div>
            <div className="pt-4">
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}