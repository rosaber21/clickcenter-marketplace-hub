import React, { useCallback } from 'react'; // useEffect, useState removed as data comes from useQuery
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, ShoppingCart, Settings, Users, Package, CreditCard } from 'lucide-react';
import { StatsCards } from '@/components/affiliate/dashboard/StatsCards';
import { SalesAndProductsTabs } from '@/components/affiliate/dashboard/SalesAndProductsTabs';
import { MarketingMaterials } from '@/components/affiliate/dashboard/MarketingMaterials';
// MyAffiliateProducts is not used on this page in current code
import { DashboardHeader } from '@/components/affiliate/dashboard/DashboardHeader';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

// Types for data structure from fetchAffiliateDashboardData
interface AffiliateProductData {
  id: string;
  name: string;
  commission: number;
  sales: number;
  imageUrl: string;
  category: string;
  price: number; 
}
interface SaleData {
  id: string;
  productName: string;
  date: string;
  amount: number;
  commissionEarned: number;
  status: string;
}
interface DashboardStatsData {
  totalSales: number;
  totalEarnings: number;
  conversionRate: number;
  totalClicks: number;
}

// Types for SalesAndProductsTabs
interface TabAffiliateSale {
  id: string;
  product: string;
  date: string;
  commission: string;
}

interface TabTopProduct {
  id: number;
  name: string;
  commission: string;
  sales: number;
}


const fetchAffiliateDashboardData = async (): Promise<{
  stats: DashboardStatsData;
  products: AffiliateProductData[];
  sales: SaleData[];
}> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    stats: { totalSales: 120, totalEarnings: 2500, conversionRate: 12.5, totalClicks: 960 },
    products: [
      { id: 'prod1', name: 'Curso Online de React', commission: 20, sales: 50, imageUrl: '/placeholder.svg', category: 'Desenvolvimento', price: 99.90 },
      { id: 'prod2', name: 'Ebook de Marketing Digital', commission: 15, sales: 70, imageUrl: '/placeholder.svg', category: 'Marketing', price: 29.90 },
    ],
    sales: [
      { id: 'sale1', productName: 'Curso Online de React', date: '2024-07-15', amount: 99.90, commissionEarned: 19.98, status: 'Concluída' },
      { id: 'sale2', productName: 'Ebook de Marketing Digital', date: '2024-07-16', amount: 29.90, commissionEarned: 4.48, status: 'Pendente' },
    ],
  };
};

const AffiliateDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['affiliateDashboardData'], // Changed queryKey to avoid conflict with useAffiliateDashboard hook
    queryFn: fetchAffiliateDashboardData,
  });

  const handleViewDetails = useCallback((productId: string | number) => {
    console.log("Ver detalhes do produto:", productId);
    navigate(`/produto/${productId}`);
  }, [navigate, toast]);

  const handleViewSaleDetails = useCallback((saleId: string) => { // Accepts string ID
    console.log("Ver detalhes da venda:", saleId);
    toast({ title: "Detalhes da Venda", description: `Carregando detalhes para venda ${saleId}.` });
  }, [toast]);

  const handleRequestPayout = useCallback(() => {
    console.log("Solicitar pagamento");
    toast({ title: "Solicitação de Pagamento", description: "Sua solicitação de pagamento está sendo processada." });
  }, [toast]);

  const handleEditProfile = useCallback(() => {
    navigate('/afiliado/configuracoes');
  }, [navigate]);

  const handleViewMarketingMaterial = useCallback((materialId: string) => {
    console.log("Ver material de marketing:", materialId);
    toast({ title: "Material de Marketing", description: `Abrindo material ${materialId}.` });
  }, [toast]);
  
  const handleGenerateLink = useCallback((productId: number, productName: string) => {
    toast({ title: "Link de Afiliado Gerado", description: `Link para ${productName} (ID: ${productId}) foi copiado (simulado).` });
    // Lógica para copiar para o clipboard pode ser adicionada aqui
    navigator.clipboard.writeText(`https://sua-plataforma.com/produto/${productId}?ref=SEU_CODIGO_AFILIADO`).then(() => {
      toast({ title: "Link Copiado!", description: "Link de afiliado copiado para a área de transferência."});
    }).catch(err => {
      console.error('Falha ao copiar o link: ', err);
      toast({ title: "Erro ao Copiar", description: "Não foi possível copiar o link.", variant: "destructive"});
    });
  }, [toast]);


  if (isLoading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 md:p-6 text-red-500">Erro ao carregar dados do dashboard: {error.message}</div>;
  }

  if (!data) {
    return <div className="p-4 md:p-6">Nenhum dado encontrado.</div>;
  }
  
  // Transform data for SalesAndProductsTabs
  const topProductsForTabs: TabTopProduct[] = data.products.map(p => ({
    id: parseInt(p.id.replace('prod',''), 10) || 0, // Ensure ID is a number
    name: p.name,
    commission: `${p.commission}%`,
    sales: p.sales,
  }));

  const recentSalesForTabs: TabAffiliateSale[] = data.sales.map(s => ({
    id: s.id,
    product: s.productName,
    date: new Date(s.date).toLocaleDateString('pt-BR'), // Format date
    commission: `R$ ${s.commissionEarned.toFixed(2)}`,
  }));


  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        onEditProfile={handleEditProfile}
        onRequestPayout={handleRequestPayout}
      />
      <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
        <StatsCards stats={data.stats} />
        
        <SalesAndProductsTabs
          topProducts={topProductsForTabs}
          recentSales={recentSalesForTabs}
          onViewProductDetails={(productId: number) => handleViewDetails(String(productId))}
          onSaleDetails={handleViewSaleDetails}
          onGenerateLink={handleGenerateLink}
        />

        <MarketingMaterials 
          marketingMaterials={[ // Assuming 'marketingMaterials' is the correct prop name
            { id: 'banner1', type: 'Banner', name: 'Banner Promocional Curso React', previewUrl: '/placeholder.svg' },
            { id: 'email1', type: 'Email', name: 'Modelo de Email Lançamento', previewUrl: '/placeholder.svg' },
          ]}
          onViewMaterial={handleViewMarketingMaterial}
        />
      </main>
    </div>
  );
};

export default AffiliateDashboard;
