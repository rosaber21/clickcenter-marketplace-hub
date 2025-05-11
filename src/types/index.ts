
export type UserRole = "aluno" | "afiliado" | "criador" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  type: "digital" | "physical";
  images: string[];
  createdById: string;
  createdBy?: User;
  externalLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  productId: string;
  product?: Product;
  buyerId: string;
  buyer?: User;
  affiliateId?: string;
  affiliate?: User;
  amount: number;
  commission: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

export interface Commission {
  id: string;
  affiliateId: string;
  affiliate?: User;
  saleId: string;
  sale?: Sale;
  amount: number;
  status: "pending" | "paid";
  paymentMethod?: "pix" | "paypal" | "other";
  paidAt?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
