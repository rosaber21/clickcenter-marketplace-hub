
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/integrations/supabase/client"; // Importar o cliente Supabase

// A lista MOCK_PRODUCTS será removida ou comentada, pois os dados virão do Supabase.
/*
const MOCK_PRODUCTS: Product[] = [
  // ... MOCK_PRODUCTS data was here
];
*/

// Função para buscar produtos do Supabase
const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      price,
      producer_id,
      created_at,
      updated_at
    `);

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error(error.message);
  }

  // Mapear os dados do Supabase para o tipo Product da aplicação
  return data.map((item: any) => ({
    id: item.id,
    title: item.name, // Mapear 'name' para 'title'
    description: item.description || "",
    price: item.price,
    type: "digital", // Valor padrão, pois não existe na tabela products do Supabase
    images: [], // Valor padrão, pois não existe na tabela products do Supabase
    createdById: item.producer_id, // Mapear 'producer_id' para 'createdById'
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
};

export const useProducts = () => {
  // const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS); // Linha original
  const { data: productsData, isLoading, isError } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  const products = productsData || []; // Usar os dados do useQuery, ou array vazio se undefined

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "digital" | "physical">("all");
  const [animate, setAnimate] = useState(false);
  const { toast } = useToast();
  const { addItem } = useCart();
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  // Adicionar log para verificar os produtos carregados e o estado de carregamento
  useEffect(() => {
    if (isLoading) {
      console.log("Carregando produtos do Supabase...");
    } else if (isError) {
      console.error("Erro ao carregar produtos do Supabase.");
    } else {
      console.log("Produtos carregados do Supabase:", products);
    }
  }, [products, isLoading, isError]);

  const filteredProducts = products.filter(product => {
    const titleMatch = product.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = titleMatch || descriptionMatch;
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && product.type === activeFilter;
  });

  const handleAddToCart = (product: Product) => {
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

  return {
    products: filteredProducts, // Retornar os produtos já filtrados
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    // filteredProducts, // Não é mais necessário retornar filteredProducts separadamente se products já é o filtrado
    handleAddToCart,
    animate,
    setAnimate,
    isLoadingProducts: isLoading, // Expor o estado de carregamento
    errorLoadingProducts: isError, // Expor o estado de erro
  };
};
