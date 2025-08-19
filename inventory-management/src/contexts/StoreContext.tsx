'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Category, PreciousMetalRate, StoreSettings } from '@/types';

interface StoreContextType {
  storeSettings: StoreSettings;
  updateStoreName: (name: string) => void;
  addCategory: (name: string, isPreciousMetal: boolean) => void;
  updatePreciousMetalRate: (categoryId: string, ratePerGram: number) => void;
  getPreciousMetalCategories: () => Category[];
  getRate: (categoryId: string) => number | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const defaultStoreSettings: StoreSettings = {
  storeName: 'My Inventory Store',
  categories: [
    { id: 'cat-1', name: 'Jewelry', isPreciousMetal: true },
    { id: 'cat-2', name: 'Electronics', isPreciousMetal: false },
    { id: 'cat-3', name: 'Accessories', isPreciousMetal: false },
  ],
  preciousMetalRates: [
    { categoryId: 'cat-1', ratePerGram: 50 }, // Default jewelry rate
  ],
};

interface StoreProviderProps {
  children: ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [storeSettings, setStoreSettings] = useLocalStorage<StoreSettings>(
    'inventory-store-settings',
    defaultStoreSettings
  );

  const updateStoreName = (name: string) => {
    setStoreSettings({ ...storeSettings, storeName: name });
  };

  const addCategory = (name: string, isPreciousMetal: boolean) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      isPreciousMetal,
    };
    setStoreSettings({
      ...storeSettings,
      categories: [...storeSettings.categories, newCategory],
    });
  };

  const updatePreciousMetalRate = (categoryId: string, ratePerGram: number) => {
    const existingRateIndex = storeSettings.preciousMetalRates.findIndex(
      (rate) => rate.categoryId === categoryId
    );

    if (existingRateIndex >= 0) {
      const updatedRates = [...storeSettings.preciousMetalRates];
      updatedRates[existingRateIndex].ratePerGram = ratePerGram;
      setStoreSettings({
        ...storeSettings,
        preciousMetalRates: updatedRates,
      });
    } else {
      setStoreSettings({
        ...storeSettings,
        preciousMetalRates: [
          ...storeSettings.preciousMetalRates,
          { categoryId, ratePerGram },
        ],
      });
    }
  };

  const getPreciousMetalCategories = () => {
    return storeSettings.categories.filter((cat) => cat.isPreciousMetal);
  };

  const getRate = (categoryId: string) => {
    const rate = storeSettings.preciousMetalRates.find((r) => r.categoryId === categoryId);
    return rate?.ratePerGram;
  };

  return (
    <StoreContext.Provider
      value={{
        storeSettings,
        updateStoreName,
        addCategory,
        updatePreciousMetalRate,
        getPreciousMetalCategories,
        getRate,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}