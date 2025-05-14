
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

// Interfaces for data types
export interface AffiliateStat {
  label: string;
  value: string;
  change?: string;
  icon?: React.ElementType;
}

export interface AffiliateProduct {
  id: number; // DB product ID will be UUID string, adjust if necessary
  name: string;
  commission: string;
  sales: number;
  imageUrl: string;
}

export interface AffiliateSale {
  id: string; // Sale ID from DB (UUID)
  product: string;
  date: string;
  commission: string; // This will represent total sale amount for now
}

export interface TopProduct {
  id: number; // DB product ID will be UUID string
  name:string;
  commission: string;
  sales: number;
}

// Function to fetch affiliate sales
const fetchAffiliateSales = async (): Promise<AffiliateSale[]> => {
  // RLS "Affiliates can view their sales" will filter sales for the logged-in affiliate
  const { data, error } = await supabase
    .from('sales')
    .select(`
      id,
      sale_date,
      amount,
      product:products (name)
    `)
    .order('sale_date', { ascending: false })
    .limit(10); // Fetch recent 10 sales for the dashboard

  if (error) {
    console.error('Error fetching affiliate sales:', error);
    throw new Error(`Failed to fetch affiliate sales: ${error.message}`);
  }

  return data.map((sale) => ({
    id: sale.id,
    product: sale.product?.name || 'N/A',
    date: sale.sale_date ? new Date(sale.sale_date).toLocaleDateString('pt-BR') : 'N/A',
    // Displaying total sale amount as 'commission' for now.
    // True commission calculation would require more logic or a dedicated field.
    commission: `R$ ${sale.amount.toFixed(2)} (Venda Total)`, 
  }));
};


export const useAffiliateDashboard = () => {
  const { toast } = useToast();

  // Fetch recent sales using useQuery
  const { data: recentSales = [], isLoading: isLoadingSales, isError: isErrorSales } = useQuery<AffiliateSale[], Error>({
    queryKey: ['affiliateRecentSales'],
    queryFn: fetchAffiliateSales,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Mock data for other sections (can be replaced with Supabase calls later)
  const [stats] = useState<AffiliateStat[]>([
    { label: "Total de Vendas (Mês)", value: "R$ 1.250,80", change: "+15%", icon: undefined },
    { label: "Comissões (Mês)", value: "R$ 250,16", change: "+12%", icon: undefined },
    { label: "Cliques no Link", value: "850", change: "+8%", icon: undefined },
    { label: "Taxa de Conversão", value: "3.5%", change: "-0.5%", icon: undefined },
  ]);

  const [topProducts] = useState<TopProduct[]>([
    { id: 1, name: "Curso de Marketing Digital Completo", commission: "20%", sales: 15 },
    { id: 2, name: "eBook: Guia de SEO Avançado", commission: "15%", sales: 25 },
    { id: 3, name: "Mentoria Individual de Carreira", commission: "25%", sales: 5 },
  ]);

  const [affiliateProducts] = useState<AffiliateProduct[]>([
    { id: 1, name: "Curso de Marketing Digital Completo", commission: "20%", sales: 15, imageUrl: "/placeholder.svg" },
    { id: 2, name: "eBook: Guia de SEO Avançado", commission: "15%", sales: 25, imageUrl: "/placeholder.svg" },
  ]);

  // Handler functions (remain as stubs for now)
  const handleViewProducts = useCallback(() => {
    toast({ title: "Ação: Ver Produtos", description: "Visualizando todos os produtos disponíveis para afiliação." });
  }, [toast]);

  const handleEditProduct = useCallback((productId: number) => {
    toast({ title: "Ação: Editar Produto Afiliado", description: `Editando configurações do produto ID: ${productId}.` });
  }, [toast]);

  const handleDeleteProduct = useCallback((productId: number) => {
    toast({ title: "Ação: Remover Produto Afiliado", description: `Removendo produto ID: ${productId} da sua lista.` });
  }, [toast]);
  
  const handleAddAffiliate = useCallback((productId: number) => {
    toast({ title: "Ação: Adicionar Produto para Afiliação", description: `Adicionando produto ID: ${productId} à sua lista de afiliação.` });
  }, [toast]);

  const handleSaleDetails = useCallback((saleId: string) => { // saleId is now string (UUID)
    toast({ title: "Ação: Detalhes da Venda", description: `Visualizando detalhes da venda ID: ${saleId}.` });
  }, [toast]);

  const handleGenerateLink = useCallback((productId: number, productName: string) => {
    toast({ title: "Ação: Gerar Link de Afiliado", description: `Link gerado para ${productName}. (Simulado)` });
    // Actual link generation logic would go here
  }, [toast]);

  const handleDownloadMaterial = useCallback((materialId: number) => {
    toast({ title: "Ação: Baixar Material de Marketing", description: `Baixando material ID: ${materialId}. (Simulado)` });
  }, [toast]);
  
  const handleViewAllMaterials = useCallback(() => {
    toast({ title: "Ação: Ver Todos Materiais", description: "Visualizando todos os materiais de marketing." });
  }, [toast]);
  
  const handleViewProductDetails = useCallback((productId: number) => {
    toast({ title: "Ação: Detalhes do Produto", description: `Visualizando detalhes do produto ID: ${productId}.`});
  }, [toast]);

  return {
    stats,
    recentSales: recentSales || [], // Ensure recentSales is always an array
    topProducts,
    affiliateProducts,
    isLoadingSales,
    isErrorSales,
    handleViewProducts,
    handleEditProduct,
    handleDeleteProduct,
    handleAddAffiliate,
    handleSaleDetails,
    handleGenerateLink,
    handleDownloadMaterial,
    handleViewAllMaterials,
    handleViewProductDetails
  };
};
