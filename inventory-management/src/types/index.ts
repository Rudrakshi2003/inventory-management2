export interface User {
  id: string;
  email: string;
  phone: string;
  password: string;
  isAdmin: boolean;
  status: 'pending' | 'approved' | 'denied';
  createdAt: string;
}

export interface Item {
  id: string;
  name: string;
  category: string;
  description: string;
  weight?: number;
  price: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  isPreciousMetal: boolean;
}

export interface PreciousMetalRate {
  categoryId: string;
  ratePerGram: number;
}

export interface StoreSettings {
  storeName: string;
  categories: Category[];
  preciousMetalRates: PreciousMetalRate[];
}

export interface Bill {
  id: string;
  itemIds: string[];
  totalAmount: number;
  createdAt: string;
}