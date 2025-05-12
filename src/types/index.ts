
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
