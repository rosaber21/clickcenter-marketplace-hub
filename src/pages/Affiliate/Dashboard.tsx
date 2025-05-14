
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BarChart3, ShoppingCart, Settings, Users, Package, CreditCard } from 'lucide-react';
import { StatsCards } from '@/components/affiliate/dashboard/StatsCards';
import { SalesAndProductsTabs } from '@/components/affiliate/dashboard/SalesAndProductsTabs';
import { MarketingMaterials } from '@/components/affiliate/dashboard/MarketingMaterials';
import { MyAffiliateProducts } from '@/components/affiliate/dashboard/MyAffiliateProducts';
import { DashboardHeader } from '@/components/affiliate/dashboard/DashboardHeader';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
// import { useAffiliateDashboard, AffiliateProduct, Sale, DashboardStats } from '@/hooks/use-affiliate-dashboard'; // Assuming types are here
// Simulating types locally if not available or causing issues from read-only hook
interface AffiliateProduct {
  id: string;
  name: string;
  commission: number;
  sales: number;
  imageUrl: string;
  category: string;
}
interface Sale {
  id: string;
  productName: string;
  date: string;
  amount: number;
  commissionEarned: number;
  status: string;
}
interface DashboardStats {
  totalSales: number;
  totalEarnings: number;
  conversionRate: number;
  totalClicks: number;
}


const fetchAffiliateDashboardData = async (): Promise<{
  stats: DashboardStats;
  products: AffiliateProduct[];
  sales: Sale[];
}> => {
  // Mock data fetching
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    stats: { totalSales: 120, totalEarnings: 2500, conversionRate: 12.5, totalClicks: 960 },
    products: [
      { id: 'prod1', name: 'Curso Online de React', commission: 20, sales: 50, imageUrl: '/placeholder.svg', category: 'Desenvolvimento' },
      { id: 'prod2', name: 'Ebook de Marketing Digital', commission: 15, sales: 70, imageUrl: '/placeholder.svg', category: 'Marketing' },
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
    queryKey: ['affiliateDashboard'],
    queryFn: fetchAffiliateDashboardData,
  });

  const handleViewDetails = useCallback((productId: string | number) => { // Changed to string | number
    console.log("Ver detalhes do produto:", productId);
    navigate(`/produto/${productId}`);
  }, [navigate]);

  const handleInviteAffiliate = useCallback((productId: number) => { // Changed to number
    console.log("Convidar afiliado para o produto:", productId);
    // Lógica de convite
    toast({ title: "Convite enviado", description: `Convite para produto ${productId} será processado.` });
  }, [toast]);

  const handleViewSaleDetails = useCallback((saleId: number) => { // Changed to number
    console.log("Ver detalhes da venda:", saleId);
    // Lógica para ver detalhes da venda
    toast({ title: "Detalhes da Venda", description: `Carregando detalhes para venda ${saleId}.` });
  }, [toast]);

  const handleRequestPayout = useCallback(() => {
    console.log("Solicitar pagamento");
    toast({ title: "Solicitação de Pagamento", description: "Sua solicitação de pagamento está sendo processada." });
  }, [toast]);

  const handleEditProfile = useCallback(() => {
    navigate('/afiliado/configuracoes'); // Supondo que esta seja a rota
  }, [navigate]);

  const handleViewMarketingMaterial = useCallback((materialId: string) => {
    console.log("Ver material de marketing:", materialId);
    toast({ title: "Material de Marketing", description: `Abrindo material ${materialId}.` });
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

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        title="Painel do Afiliado"
        onEditProfile={handleEditProfile}
        onRequestPayout={handleRequestPayout}
      />
      <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
        <StatsCards stats={data.stats} />
        
        <SalesAndProductsTabs
          products={data.products}
          sales={data.sales}
          onViewDetails={handleViewDetails}
          onInviteAffiliate={handleInviteAffiliate}
          onViewSaleDetails={handleViewSaleDetails}
        />

        <MarketingMaterials 
          materials={[
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
