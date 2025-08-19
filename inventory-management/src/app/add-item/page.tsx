'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useStore } from '@/contexts/StoreContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { ClientWrapper } from '@/components/ClientWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function AddItemContent() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useAuth();
  const { addItem } = useData();
  const { storeSettings, getRate } = useStore();
  const router = useRouter();

  const selectedCategory = storeSettings.categories.find((cat) => cat.name === category);
  const isPreciousMetalCategory = selectedCategory?.isPreciousMetal || false;

  // Auto-calculate price for precious metals
  useEffect(() => {
    if (isPreciousMetalCategory && weight && selectedCategory) {
      const rate = getRate(selectedCategory.id);
      if (rate) {
        const calculatedPrice = parseFloat(weight) * rate;
        setPrice(calculatedPrice.toFixed(2));
      }
    }
  }, [weight, category, isPreciousMetalCategory, selectedCategory, getRate]);

  if (!currentUser) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      addItem({
        name,
        category,
        description,
        weight: weight ? parseFloat(weight) : undefined,
        price: parseFloat(price),
      });

      toast.success('Item added successfully!');
      
      // Reset form
      setName('');
      setCategory('');
      setDescription('');
      setWeight('');
      setPrice('');
      
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to add item');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Item</h1>
          <p className="text-muted-foreground">Add a new item to your inventory</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Item Details</CardTitle>
            <CardDescription>
              Fill in the information for your new inventory item
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {storeSettings.categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                          {cat.isPreciousMetal && ' (Precious Metal)'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter item description"
                  rows={3}
                />
              </div>

              {isPreciousMetalCategory && (
                <div>
                  <Label htmlFor="weight">Weight (grams)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    step="0.01"
                    min="0"
                    placeholder="Enter weight in grams"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => !isPreciousMetalCategory && setPrice(e.target.value)}
                  step="0.01"
                  min="0"
                  required
                  placeholder="Enter price"
                  readOnly={isPreciousMetalCategory}
                  className={isPreciousMetalCategory ? 'bg-gray-50' : ''}
                />
                {isPreciousMetalCategory && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Price is automatically calculated based on weight and precious metal rate
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Item'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  );
}

export default function AddItemPage() {
  return (
    <ClientWrapper requireAuth={true}>
      <DashboardLayout>
        <AddItemContent />
      </DashboardLayout>
    </ClientWrapper>
  );
}