export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  storeId?: string;
}

export type UserRole = 'admin' | 'manager' | 'staff';

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  enabledMenus: Menu[];
}

export type Menu = 
  | 'dashboard'
  | 'inventory'
  | 'orders'
  | 'images'
  | 'statistics'
  | 'movements'
  | 'sales';

export interface ClothingGenre {
  id: string;
  name: string;
  description?: string;
}

export interface ClothingClass {
  id: string;
  name: string;
  description?: string;
}

export interface ClothingMaterial {
  id: string;
  name: string;
  description?: string;
}

export interface ClothingPattern {
  id: string;
  name: string;
  description?: string;
}

export interface ClothingDesign {
  id: string;
  name: string;
  description?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  genreId: string;
  classId: string;
  materialId: string;
  patternId: string;
  designId: string;
  price: number;
  cost: number;
  quantity: number;
  reorderPoint: number;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventorySummary {
  totalItems: number;
  lowStock: number;
  outOfStock: number;
  recentlyAdded: number;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  roles: UserRole[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface ChartData {
  name: string;
  value: number;
}