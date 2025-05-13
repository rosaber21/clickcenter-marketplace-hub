
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, DollarSign, Users, Link as LinkIcon, Download, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AffiliateProductsSection } from "@/components/creator/dashboard/affiliates/AffiliateProductsSection";

const AffiliateDashboard = () => {
  // Sample data - in a real application, this would come from an API
  const stats = {
    totalEarnings: "R$ 1.245,00",
    pendingPayment: "R$ 350,00",
    clicksThisMonth: 2456,
    conversionsThisMonth: 42,
    conversionRate: "1.7%"
  };
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const recentSales = [
    { id: 1, product: "Curso de Marketing Digital", date: "12/05/2023", commission: "R$ 47,00" },
    { id: 2, product: "Ebook de Produtividade", date: "10/05/2023", commission: "R$ 15,00" },
    { id: 3, product: "Curso de Design Gráfico", date: "08/05/2023", commission: "R$ 65,00" },
    { id: 4, product: "Planilha de Finanças", date: "05/05/2023", commission: "R$ 23,00" },
    { id: 5, product: "Curso de Marketing Digital", date: "01/05/2023", commission: "R$ 47,00" },
  ];

  const topProducts = [
    { id: 1, name: "Curso de Marketing Digital", commission: "50%", sales: 24 },
    { id: 2, name: "Ebook de Produtividade", commission: "30%", sales: 18 },
    { id: 3, name: "Curso de Design Gráfico", commission: "40%", sales: 15 },
    { id: 4, name: "Planilha de Finanças", commission: "20%", sales: 12 },
  ];
  
  // Sample products data for affiliate
  const affiliateProducts = [
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
  ];
  
  // Handle viewing available products for affiliation
  const handleViewProducts = () => {
    navigate("/afiliado/produtos");
    toast({
      title: "Produtos para afiliação",
      description: "Visualizando produtos disponíveis para promover",
      variant: "success",
    });
  };
  
  // Handle product actions
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

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Painel de Afiliado</h1>
          <p className="text-muted-foreground">Gerencie suas promoções e acompanhe seus ganhos</p>
        </div>
        <Button onClick={handleViewProducts} className="gap-2">
          <LinkIcon className="h-4 w-4" />
          Ver Produtos para Afiliar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Ganhos Totais</CardDescription>
            <CardTitle className="text-3xl">{stats.totalEarnings}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Pendente: <span className="font-medium">{stats.pendingPayment}</span>
            </p>
          </CardContent>
          <CardFooter>
            <DollarSign className="h-5 w-5 text-primary opacity-70" />
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Cliques este mês</CardDescription>
            <CardTitle className="text-3xl">{stats.clicksThisMonth}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Conversões: <span className="font-medium">{stats.conversionsThisMonth}</span>
            </p>
          </CardContent>
          <CardFooter>
            <Users className="h-5 w-5 text-secondary opacity-70" />
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-primary/5 to-secondary/10 border-primary/20 hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardDescription>Taxa de conversão</CardDescription>
            <CardTitle className="text-3xl">{stats.conversionRate}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Média do setor: <span className="font-medium">1.2%</span>
            </p>
          </CardContent>
          <CardFooter>
            <BarChart3 className="h-5 w-5 text-primary/70" />
          </CardFooter>
        </Card>
      </div>
      
      {/* My Affiliate Products Section */}
      <Card className="mb-8">
        <CardHeader className="bg-primary/5 flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-primary">Meus Produtos Afiliados</CardTitle>
            <CardDescription>Produtos que você está promovendo atualmente</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="py-4">
          <AffiliateProductsSection 
            products={affiliateProducts}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onAddAffiliate={handleAddAffiliate}
          />
        </CardContent>
        <CardFooter>
          <Button 
            variant="outline" 
            className="text-primary text-sm hover:text-primary/80 transition-colors flex items-center"
            onClick={handleViewProducts}
          >
            Ver mais produtos para afiliar <span className="ml-1">→</span>
          </Button>
        </CardFooter>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="sales" className="mb-8">
        <TabsList>
          <TabsTrigger value="sales">Vendas Recentes</TabsTrigger>
          <TabsTrigger value="products">Top Produtos</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="p-4 border rounded-md mt-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Produto</th>
                  <th className="text-left py-3 px-4">Data</th>
                  <th className="text-left py-3 px-4">Comissão</th>
                  <th className="text-right py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{sale.product}</td>
                    <td className="py-3 px-4">{sale.date}</td>
                    <td className="py-3 px-4 font-medium text-primary">{sale.commission}</td>
                    <td className="py-3 px-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleSaleDetails(sale.id)}
                        className="gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        Detalhes
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="products" className="p-4 border rounded-md mt-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Produto</th>
                  <th className="text-center py-3 px-4">Comissão</th>
                  <th className="text-center py-3 px-4">Vendas</th>
                  <th className="text-right py-3 px-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4 text-center">{product.commission}</td>
                    <td className="py-3 px-4 text-center">{product.sales}</td>
                    <td className="py-3 px-4 text-right flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewProductDetails(product.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleGenerateLink(product.id, product.name)}
                        className="gap-1"
                      >
                        <LinkIcon className="h-4 w-4" /> Gerar Link
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Marketing Materials */}
      <Card>
        <CardHeader>
          <CardTitle>Materiais de Marketing</CardTitle>
          <CardDescription>
            Banners e imagens para promoção de produtos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-md p-4 hover:shadow-md transition-shadow">
                <div className="aspect-video bg-muted mb-3 rounded-md flex items-center justify-center">
                  <LinkIcon className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <h4 className="font-medium mb-1">Banner de Promoção #{i}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Banner para redes sociais e campanhas online
                </p>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full gap-1"
                  onClick={() => handleDownloadMaterial(i)}
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={handleViewAllMaterials}
            className="gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            Ver Todos os Materiais
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AffiliateDashboard;
