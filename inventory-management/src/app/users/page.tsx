'use client';

import { useAuth } from '@/contexts/AuthContext';
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
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Users as UsersIcon } from 'lucide-react';
import { toast } from 'sonner';

function UsersContent() {
  const { currentUser, approveUser, denyUser, getPendingUsers, getApprovedUsers } = useAuth();

  if (!currentUser) {
    return null;
  }

  const pendingUsers = getPendingUsers();
  const approvedUsers = getApprovedUsers();

  const handleApprove = (userId: string) => {
    approveUser(userId);
    toast.success('User approved successfully!');
  };

  const handleDeny = (userId: string) => {
    denyUser(userId);
    toast.success('User denied and removed from system');
  };

  return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and approvals</p>
        </div>

        {/* Pending Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-5 w-5" />
              Pending Approval ({pendingUsers.length})
            </CardTitle>
            <CardDescription>
              Users waiting for admin approval to access the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pendingUsers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(user.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeny(user.id)}
                          >
                            <XCircle className="mr-1 h-3 w-3" />
                            Deny
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6">
                <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No pending users</h3>
                <p className="mt-1 text-sm text-gray-500">
                  All user accounts have been reviewed.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Approved Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Approved Users ({approvedUsers.length})
            </CardTitle>
            <CardDescription>
              Users with approved access to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {approvedUsers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvedUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Badge variant={user.isAdmin ? 'default' : 'secondary'}>
                          {user.isAdmin ? 'Admin' : 'User'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-green-600">
                          {user.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-6">
                <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No approved users</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No users have been approved yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
  );
}

export default function UsersPage() {
  return (
    <ClientWrapper requireAuth={true} requireAdmin={true}>
      <DashboardLayout>
        <UsersContent />
      </DashboardLayout>
    </ClientWrapper>
  );
}