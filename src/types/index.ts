export type UserRole = "admin" | "criador" | "afiliado" | "aluno";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "digital" | "physical";
  images?: string[];
  createdById: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  sales: number; // Total sales amount or count generated by affiliate
  conversionRate?: number;
  earnings?: number;
  status: 'active' | 'pending' | 'suspended' | 'inactive'; // Merged statuses
  commission: number; // Earned commission amount (numeric)
  productCount?: number;
  avatarUrl?: string;
  lastActivity?: string; // Unified from lastActive
}
