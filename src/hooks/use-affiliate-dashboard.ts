
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export interface AffiliateSale {
  id: number;
  product: string;
  date: string;
  commission: string;
}

export interface TopProduct {
  id: number;
  name: string;
  commission: string;
  sales: number;
}

export interface AffiliateProduct {
  name: string;
  creator: string;
  category: string;
  price: string;
  status: "Ativo" | "Pendente";
}

export interface DashboardStats {
  totalEarnings: string;
  pendingPayment: string;
  clicksThisMonth: number;
  conversionsThisMonth: number;
  conversionRate: string;
}

export const useAffiliateDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Sample data
  const [stats] = useState<DashboardStats>({
    totalEarnings: "R$ 1.245,00",
    pendingPayment: "R$ 350,00",
    clicksThisMonth: 2456,
    conversionsThisMonth: 42,
    conversionRate: "1.7%"
  });
  
  const [recentSales] = useState<AffiliateSale[]>([
    { id: 1, product: "Curso de Marketing Digital", date: "12/05/2023", commission: "R$ 47,00" },
    { id: 2, product: "Ebook de Produtividade", date: "10/05/2023", commission: "R$ 15,00" },
    { id: 3, product: "Curso de Design Gráfico", date: "08/05/2023", commission: "R$ 65,00" },
    { id: 4, product: "Planilha de Finanças", date: "05/05/2023", commission: "R$ 23,00" },
    { id: 5, product: "Curso de Marketing Digital", date: "01/05/2023", commission: "R$ 47,00" },
  ]);
  
  const [topProducts] = useState<TopProduct[]>([
    { id: 1, name: "Curso de Marketing Digital", commission: "50%", sales: 24 },
    { id: 2, name: "Ebook de Produtividade", commission: "30%", sales: 18 },
    { id: 3, name: "Curso de Design Gráfico", commission: "40%", sales: 15 },
    { id: 4, name: "Planilha de Finanças", commission: "20%", sales: 12 },
  ]);
  
  const [affiliateProducts] = useState<AffiliateProduct[]>([
    {
      name: "Curso de Marketing Digital",
      creator: "João Silva",
      category: "Marketing",
      price: "R$ 149,90",
      status: "Ativo"
    },
    {
      name: "Ebook de Produtividade",
      creator: "Maria Oliveira",
      category: "Produtividade",
      price: "R$ 29,90",
      status: "Ativo"
    },
    {
      name: "Curso de Design Gráfico",
      creator: "Carlos Pereira",
      category: "Design",
      price: "R$ 199,90",
      status: "Pendente"
    }
  ]);

  // Action handlers
  const handleViewProducts = () => {
    navigate("/afiliado/produtos");
    toast({
      title: "Produtos para afiliação",
      description: "Visualizando produtos disponíveis para promover",
      variant: "success",
    });
  };
  
  const handleEditProduct = (product: any) => {
    toast({
      title: "Editar produto",
      description: `Editando informações do produto ${product.name}`,
      variant: "success",
    });
  };
  
  const handleDeleteProduct = (product: any) => {
    toast({
      title: "Remover produto",
      description: `Produto ${product.name} removido da sua lista`,
      variant: "destructive",
    });
  };
  
  const handleAddAffiliate = () => {
    navigate("/afiliado/produtos");
    toast({
      title: "Adicionar produto para afiliação",
      description: "Escolha novos produtos para promover",
      variant: "success",
    });
  };
  
  const handleSaleDetails = (saleId: number) => {
    toast({
      title: "Detalhes da venda",
      description: `Visualizando detalhes da venda #${saleId}`,
      variant: "success",
    });
    navigate(`/afiliado/vendas/${saleId}`);
  };
  
  const handleGenerateLink = (productId: number, productName: string) => {
    const affiliateLink = `https://example.com/aff/${productId}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(affiliateLink)
      .then(() => {
        toast({
          title: "Link gerado com sucesso!",
          description: `Link do produto "${productName}" copiado para a área de transferência.`,
          variant: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Erro ao copiar link",
          description: "Não foi possível copiar o link para a área de transferência.",
          variant: "destructive",
        });
      });
  };
  
  const handleDownloadMaterial = (materialId: number) => {
    toast({
      title: "Download iniciado",
      description: "O material será baixado em instantes.",
      variant: "success",
    });
  };
  
  const handleViewAllMaterials = () => {
    navigate("/afiliado/materiais");
    toast({
      title: "Materiais de marketing",
      description: "Visualizando todos os materiais disponíveis",
      variant: "success",
    });
  };

  const handleViewProductDetails = (productId: number) => {
    navigate(`/afiliado/produtos/${productId}`);
    toast({
      title: "Detalhes do produto",
      description: "Visualizando informações detalhadas do produto",
      variant: "success",
    });
  };

  return {
    stats,
    recentSales,
    topProducts,
    affiliateProducts,
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
