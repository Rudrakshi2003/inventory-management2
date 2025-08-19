'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Item, Bill } from '@/types';

interface DataContextType {
  items: Item[];
  bills: Bill[];
  addItem: (item: Omit<Item, 'id' | 'createdAt'>) => void;
  addBill: (bill: Omit<Bill, 'id' | 'createdAt'>) => void;
  getRecentItems: (count: number) => Item[];
  getTotalItems: () => number;
  getTotalInventoryValue: () => number;
  getTotalBills: () => number;
  getTotalBilledValue: () => number;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [items, setItems] = useLocalStorage<Item[]>('inventory-items', []);
  const [bills, setBills] = useLocalStorage<Bill[]>('inventory-bills', []);

  const addItem = (itemData: Omit<Item, 'id' | 'createdAt'>) => {
    const newItem: Item = {
      id: `item-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...itemData,
    };
    setItems([...items, newItem]);
  };

  const addBill = (billData: Omit<Bill, 'id' | 'createdAt'>) => {
    const newBill: Bill = {
      id: `bill-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...billData,
    };
    setBills([...bills, newBill]);
  };

  const getRecentItems = (count: number) => {
    return items
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, count);
  };

  const getTotalItems = () => items.length;

  const getTotalInventoryValue = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const getTotalBills = () => bills.length;

  const getTotalBilledValue = () => {
    return bills.reduce((total, bill) => total + bill.totalAmount, 0);
  };

  return (
    <DataContext.Provider
      value={{
        items,
        bills,
        addItem,
        addBill,
        getRecentItems,
        getTotalItems,
        getTotalInventoryValue,
        getTotalBills,
        getTotalBilledValue,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}