
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";

// Dados de exemplo para simular produtos
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Curso de Marketing Digital",
    description: "Aprenda técnicas avançadas de marketing digital para expandir seu negócio online.",
    price: 297.00,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085"],
    createdById: "creator1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Planilha de Gestão Financeira",
    description: "Organize suas finanças pessoais e empresariais com essa planilha completa.",
    price: 49.90,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f"],
    createdById: "creator2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "E-book: Produtividade sem Estresse",
    description: "Descubra como aumentar sua produtividade sem comprometer sua saúde mental.",
    price: 29.90,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794"],
    createdById: "creator1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Kit de Agendas e Planners",
    description: "Kit completo com agendas físicas personalizadas e planners para organizar sua rotina.",
    price: 149.90,
    type: "physical",
    images: ["https://images.unsplash.com/photo-1517842645767-c639042777db"],
    createdById: "creator3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Curso de Photoshop Avançado",
    description: "Domine técnicas avançadas de edição de imagem e design gráfico com o Photoshop.",
    price: 397.00,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1581291518857-4e27b48ff24e"],
    createdById: "creator2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Camiseta Exclusiva ClickCenter",
    description: "Camiseta premium de algodão com estampa exclusiva ClickCenter.",
    price: 89.90,
    type: "physical",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    createdById: "creator3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "digital" | "physical">("all");
  const [animate, setAnimate] = useState(false);
  const { toast } = useToast();
  const { addItem } = useCart();
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && product.type === activeFilter;
  });

  const handleAddToCart = (product: Product) => {
    // Add to cart context
    addItem({
      id: product.id,
      product: product,
      quantity: 1
    });
    
    // Show toast notification
    toast({
      title: "Produto adicionado ao carrinho",
      description: `${product.title} foi adicionado ao seu carrinho.`,
      variant: "success",
    });
  };

  return {
    products,
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    filteredProducts,
    handleAddToCart,
    animate,
    setAnimate
  };
};
