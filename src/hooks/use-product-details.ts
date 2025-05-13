
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Product, User } from "@/types";
import { useCart } from "@/context/CartContext";

// Dados de exemplo para simular produtos e usuários
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Curso de Marketing Digital",
    description: "Aprenda técnicas avançadas de marketing digital para expandir seu negócio online. Este curso abrange desde o básico até estratégias avançadas de SEO, mídias sociais, marketing de conteúdo e tráfego pago. Ideal para iniciantes e profissionais que desejam atualizar seus conhecimentos.",
    price: 297.00,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085", "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a"],
    createdById: "user1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Planilha de Gestão Financeira",
    description: "Organize suas finanças pessoais e empresariais com essa planilha completa. Controle de despesas, orçamento mensal, planejamento financeiro e relatórios automáticos. Perfeito para quem busca organização financeira.",
    price: 49.90,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f"],
    createdById: "user2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const MOCK_USERS: User[] = [
  {
    id: "user1",
    name: "João Silva",
    email: "joao@example.com",
    role: "criador",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user2",
    name: "Maria Souza",
    email: "maria@example.com",
    role: "criador",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    createdAt: new Date().toISOString(),
  },
];

export function useProductDetails(productId: string | undefined) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useCart();
  
  // Simula busca do produto pelo ID
  const product = MOCK_PRODUCTS.find(p => p.id === productId);
  
  // Simula busca do criador
  const creator = product ? MOCK_USERS.find(u => u.id === product.createdById) : undefined;
  
  const handleAddToCart = () => {
    if (!product) return;
    
    // Add item to cart
    addItem({
      id: product.id,
      product: product,
      quantity: 1
    });
    
    toast({
      title: "Produto adicionado ao carrinho",
      description: `${product.title} foi adicionado ao seu carrinho.`,
      variant: "success",
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    // Add item to cart first
    addItem({
      id: product.id,
      product: product,
      quantity: 1
    });
    
    toast({
      title: "Redirecionando para o checkout",
      description: "Processando sua compra...",
      variant: "success",
    });
    // Redirecionar para página de checkout
    // navigate("/checkout");
  };

  const handleBackToProducts = () => {
    navigate("/");
    toast({
      title: "Voltando para produtos",
      description: "Explorando mais opções",
    });
  };
  
  return {
    product,
    creator,
    handleAddToCart,
    handleBuyNow,
    handleBackToProducts
  };
}
