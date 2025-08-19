'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useStore } from '@/contexts/StoreContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ClientWrapper } from '@/components/ClientWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Store, Tag, DollarSign, Lock } from 'lucide-react';

function SettingsContent() {
  const { currentUser, changePassword } = useAuth();
  const {
    storeSettings,
    updateStoreName,
    addCategory,
    updatePreciousMetalRate,
    getPreciousMetalCategories,
    getRate,
  } = useStore();

  // Store settings state
  const [storeName, setStoreName] = useState(storeSettings.storeName);
  
  // Category management state
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isPreciousMetal, setIsPreciousMetal] = useState(false);
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Loading states
  const [isUpdatingStore, setIsUpdatingStore] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (!currentUser) {
    return null;
  }

  const preciousMetalCategories = getPreciousMetalCategories();

  const handleUpdateStoreName = async () => {
    setIsUpdatingStore(true);
    try {
      updateStoreName(storeName);
      toast.success('Store name updated successfully!');
    } catch (error) {
      toast.error('Failed to update store name');
    } finally {
      setIsUpdatingStore(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('Category name is required');
      return;
    }

    setIsAddingCategory(true);
    try {
      addCategory(newCategoryName.trim(), isPreciousMetal);
      toast.success('Category added successfully!');
      setNewCategoryName('');
      setIsPreciousMetal(false);
    } catch (error) {
      toast.error('Failed to add category');
    } finally {
      setIsAddingCategory(false);
    }
  };

  const handleUpdateRate = async (categoryId: string, rate: string) => {
    const rateValue = parseFloat(rate);
    if (isNaN(rateValue) || rateValue < 0) {
      toast.error('Please enter a valid rate');
      return;
    }

    try {
      updatePreciousMetalRate(categoryId, rateValue);
      toast.success('Rate updated successfully!');
    } catch (error) {
      toast.error('Failed to update rate');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsChangingPassword(true);
    try {
      const success = await changePassword(currentPassword, newPassword);
      if (success) {
        toast.success('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error('Current password is incorrect');
      }
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-muted-foreground">Manage your application settings</p>
        </div>

        <Tabs defaultValue="store" className="space-y-4">
          <TabsList>
            <TabsTrigger value="store" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Store
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Categories
            </TabsTrigger>
            <TabsTrigger value="rates" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Metal Rates
            </TabsTrigger>
            <TabsTrigger value="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </TabsTrigger>
          </TabsList>

          {/* Store Settings */}
          <TabsContent value="store">
            <Card>
              <CardHeader>
                <CardTitle>Store Settings</CardTitle>
                <CardDescription>
                  Update your store information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="Enter store name"
                  />
                </div>
                <Button onClick={handleUpdateStoreName} disabled={isUpdatingStore}>
                  {isUpdatingStore ? 'Updating...' : 'Update Store Name'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Category Management */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Category Management</CardTitle>
                <CardDescription>
                  Add new item categories and configure precious metal settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="categoryName">New Category Name</Label>
                    <Input
                      id="categoryName"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Enter category name"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isPreciousMetal"
                      checked={isPreciousMetal}
                      onCheckedChange={(checked) => setIsPreciousMetal(checked === true)}
                    />
                    <Label htmlFor="isPreciousMetal">This is a precious metal category</Label>
                  </div>
                  <Button onClick={handleAddCategory} disabled={isAddingCategory}>
                    {isAddingCategory ? 'Adding...' : 'Add Category'}
                  </Button>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium">Existing Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {storeSettings.categories.map((category) => (
                      <Badge key={category.id} variant="outline" className="px-3 py-1">
                        {category.name}
                        {category.isPreciousMetal && ' 🥇'}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Precious Metal Rates */}
          <TabsContent value="rates">
            <Card>
              <CardHeader>
                <CardTitle>Precious Metal Rates</CardTitle>
                <CardDescription>
                  Set the price per gram for precious metal categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                {preciousMetalCategories.length > 0 ? (
                  <div className="space-y-4">
                    {preciousMetalCategories.map((category) => (
                      <div key={category.id} className="flex items-center gap-4">
                        <div className="flex-1">
                          <Label>{category.name} Rate (per gram)</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">$</span>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            className="w-24"
                            defaultValue={getRate(category.id) || 0}
                            onBlur={(e) => handleUpdateRate(category.id, e.target.value)}
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <DollarSign className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      No precious metal categories
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Add categories marked as precious metals to set rates.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Change Password */}
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your account password for security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
                <Button onClick={handleChangePassword} disabled={isChangingPassword}>
                  {isChangingPassword ? 'Changing...' : 'Change Password'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}

export default function SettingsPage() {
  return (
    <ClientWrapper requireAuth={true}>
      <DashboardLayout>
        <SettingsContent />
      </DashboardLayout>
    </ClientWrapper>
  );
}