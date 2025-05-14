import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { StatsCards } from '@/components/affiliate/dashboard/StatsCards';
import { SalesAndProductsTabs } from '@/components/affiliate/dashboard/SalesAndProductsTabs';
import { MarketingMaterials } from '@/components/affiliate/dashboard/MarketingMaterials';
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

// Type for individual marketing material item
interface MarketingMaterialItem {
  id: string;
  type: string;
  name: string;
  previewUrl: string;
}

// Ensure this interface matches what DashboardHeader expects
interface DashboardHeaderProps {
  onRequestPayout: () => void;
  onEditProfile: () => void;
  onViewProducts: () => void;
}

// Ensure this interface matches what MarketingMaterials expects
interface MarketingMaterialsProps {
  materials: MarketingMaterialItem[];
  onViewMaterial: (materialId: string) => void;
  onViewAllMaterials: () => void;
}

const fetchAffiliateDashboardData = async (): Promise<{
  stats: DashboardStatsData;
  products: AffiliateProductData[];
  sales: SaleData[];
  marketingMaterials: MarketingMaterialItem[];
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
    marketingMaterials: [
      { id: 'banner1', type: 'Banner', name: 'Banner Promocional Curso React', previewUrl: '/placeholder.svg' },
      { id: 'email1', type: 'Email', name: 'Modelo de Email Lançamento', previewUrl: '/placeholder.svg' },
      { id: 'video_ad1', type: 'Vídeo Ad', name: 'Anúncio em Vídeo - Novo Curso', previewUrl: '/placeholder.svg' },
    ],
  };
};

const AffiliateDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['affiliateDashboardDataWithMaterials'],
    queryFn: fetchAffiliateDashboardData,
  });

  const handleViewDetails = useCallback((productId: string | number) => {
    console.log("Ver detalhes do produto:", productId);
    navigate(`/produto/${productId}`);
  }, [navigate]);

  const handleViewSaleDetails = useCallback((saleId: string) => {
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
  
  const handleViewAllMarketingMaterials = useCallback(() => {
    console.log("Ver todos os materiais de marketing");
    toast({ title: "Todos os Materiais", description: "Navegando para a página de todos os materiais de marketing (simulado)." });
  }, [toast]);

  const handleGenerateLink = useCallback((productId: number, productName: string) => {
    toast({ title: "Link de Afiliado Gerado", description: `Link para ${productName} (ID: ${productId}) foi copiado (simulado).` });
    navigator.clipboard.writeText(`https://sua-plataforma.com/produto/${productId}?ref=SEU_CODIGO_AFILIADO`).then(() => {
      toast({ title: "Link Copiado!", description: "Link de afiliado copiado para a área de transferência."});
    }).catch(err => {
      console.error('Falha ao copiar o link: ', err);
      toast({ title: "Erro ao Copiar", description: "Não foi possível copiar o link.", variant: "destructive"});
    });
  }, [toast]);

  const handleViewAffiliateProducts = useCallback(() => {
    navigate('/afiliado/produtos');
    toast({ title: "Ver Produtos", description: "Navegando para a lista de produtos para afiliação." });
  }, [navigate, toast]);

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
  
  const topProductsForTabs: TabTopProduct[] = data.products.map(p => ({
    id: parseInt(p.id.replace('prod',''), 10) || 0,
    name: p.name,
    commission: `${p.commission}%`,
    sales: p.sales,
  }));

  const recentSalesForTabs: TabAffiliateSale[] = data.sales.map(s => ({
    id: s.id,
    product: s.productName,
    date: new Date(s.date).toLocaleDateString('pt-BR'),
    commission: `R$ ${s.commissionEarned.toFixed(2)}`,
  }));

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader 
        onEditProfile={handleEditProfile}
        onRequestPayout={handleRequestPayout}
        onViewProducts={handleViewAffiliateProducts}
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
          materials={data.marketingMaterials}
          onViewMaterial={handleViewMarketingMaterial}
          onViewAllMaterials={handleViewAllMarketingMaterials}
        />
      </main>
    </div>
  );
};

export default AffiliateDashboard;
