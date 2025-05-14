import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download,
  FileSpreadsheet,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  AlertCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types"; // Import Supabase generated types

// Interface para os dados de venda formatados para a DataTable
interface FormattedSale {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: string; // DataTable expects 'amount' as per current 'columns'
  status: string;
}

// Função para buscar as vendas do criador
const fetchCreatorSales = async (): Promise<FormattedSale[]> => {
  // A RLS "Producers can view sales of their products" filtrará automaticamente
  // as vendas para o produtor logado no backend do Supabase.
  const { data, error } = await supabase
    .from('sales')
    .select(`
      id,
      sale_date,
      status,
      amount,
      product:products (name),
      buyer:profiles!sales_buyer_id_fkey (full_name)
    `)
    .order('sale_date', { ascending: false });

  if (error) {
    console.error('Error fetching creator sales:', error);
    throw new Error(`Failed to fetch creator sales: ${error.message}`);
  }

  return data.map((sale) => ({
    id: sale.id, // Usar o ID completo ou formatar como #INV-001 etc.
    customer: sale.buyer?.full_name || 'N/A',
    product: sale.product?.name || 'N/A',
    date: sale.sale_date ? new Date(sale.sale_date).toLocaleDateString('pt-BR') : 'N/A',
    amount: `R$ ${sale.amount.toFixed(2)}`, // Corresponde à coluna 'amount' na DataTable
    status: sale.status as string, // ex: 'Pago', 'Pendente', 'Estornado'
  }));
};


export default function Sales() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  
  const { data: salesData, isLoading, isError, error: queryError } = useQuery<FormattedSale[], Error>({
    queryKey: ['creatorSales'],
    queryFn: fetchCreatorSales,
  });

  // Colunas para a DataTable (a chave 'key' deve corresponder às props de FormattedSale)
  const columns: { key: keyof FormattedSale; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "customer", label: "Cliente" },
    { key: "product", label: "Produto" },
    { key: "date", label: "Data" },
    { key: "amount", label: "Valor" },
    { key: "status", label: "Status" },
  ];

  const handleExportCSV = () => {
    // setLoading(true); // isLoading from useQuery can be used
    setTimeout(() => {
      toast({
        title: "Exportação iniciada",
        description: "Seus dados de vendas estão sendo exportados para CSV.",
      });
      // setLoading(false);
    }, 800);
  };

  const handleExportExcel = () => {
    // setLoading(true);
    setTimeout(() => {
      toast({
        title: "Exportação iniciada",
        description: "Seus dados de vendas estão sendo exportados para Excel.",
      });
      // setLoading(false);
    }, 800);
  };

  const handleNewSale = () => {
    toast({
      title: "Nova venda",
      description: "Formulário de registro de nova venda aberto.",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filtros",
      description: "Painel de filtros de vendas aberto.",
    });
  };


  const salesStats = [
    { title: "Total de Vendas", value: "R$ 32.459,00", change: "+12%" },
    { title: "Vendas do Mês", value: "R$ 8.912,00", change: "+5%" },
    { title: "Ticket Médio", value: "R$ 347,00", change: "+2%" },
    { title: "Taxa de Conversão", value: "3.2%", change: "+0.5%" },
  ];
  
  // Filtrar dados para as abas (precisa ajustar os status se forem diferentes dos mock)
  // Os status do banco são 'completed', 'processing', 'cancelled'.
  // Os status do mock eram 'Pago', 'Pendente', 'Estornado'. Vamos mapeá-los ou usar os do banco.
  // Para simplificar, vou usar os status do banco e ajustar os filtros.
  // 'completed' -> 'Pago'
  // 'processing' -> 'Pendente'
  // 'cancelled' -> 'Estornado'

  const getFilteredSales = (status?: 'completed' | 'processing' | 'cancelled') => {
    if (!salesData) return [];
    if (!status) return salesData;
    return salesData.filter(sale => sale.status === status);
  };
  
  const allSales = salesData || [];
  const pendingSales = getFilteredSales('processing'); // Mapear para 'Pendente'
  const completedSales = getFilteredSales('completed'); // Mapear para 'Pago'
  const refundedSales = getFilteredSales('cancelled'); // Mapear para 'Estornado'


  return (
    <CreatorLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Vendas</h1>
            <p className="text-muted-foreground">
              Gerencie e acompanhe suas vendas
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportCSV}
              disabled={isLoading}
            >
              <Download size={16} className="mr-2" />
              CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportExcel}
              disabled={isLoading}
            >
              <FileSpreadsheet size={16} className="mr-2" />
              Excel
            </Button>
            <Button 
              size="sm" 
              onClick={handleNewSale}
              disabled={isLoading}
            >
              <Plus size={16} className="mr-2" />
              Nova Venda
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {salesStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} desde o último mês
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sales Filters and Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="all">Todas as Vendas</TabsTrigger>
              <TabsTrigger value="pending">Pendentes (Processando)</TabsTrigger>
              <TabsTrigger value="completed">Concluídas</TabsTrigger>
              <TabsTrigger value="refunded">Canceladas (Estornadas)</TabsTrigger>
            </TabsList>
          
            {/* Sales Table */}
            <div className="border rounded-md mt-4">
              {isLoading && (
                <div className="p-4">
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-md" />)}
                  </div>
                </div>
              )}
              {isError && (
                <div className="flex flex-col items-center justify-center p-8 text-red-500">
                  <AlertCircle className="h-10 w-10 mb-2" />
                  <p className="text-lg font-medium">Erro ao carregar vendas</p>
                  <p className="text-sm">{queryError?.message || "Tente novamente mais tarde."}</p>
                </div>
              )}
              {!isLoading && !isError && salesData && (
                <>
                  <TabsContent value="all" className="m-0">
                    <DataTable
                      data={allSales}
                      columns={columns}
                      caption={`Todas as vendas (${allSales.length})`}
                    />
                  </TabsContent>
                  <TabsContent value="pending" className="m-0">
                    <DataTable
                      data={pendingSales}
                      columns={columns}
                      caption={`Vendas pendentes (${pendingSales.length})`}
                    />
                  </TabsContent>
                  <TabsContent value="completed" className="m-0">
                    <DataTable
                      data={completedSales}
                      columns={columns}
                      caption={`Vendas concluídas (${completedSales.length})`}
                    />
                  </TabsContent>
                  <TabsContent value="refunded" className="m-0">
                    <DataTable
                      data={refundedSales}
                      columns={columns}
                      caption={`Vendas canceladas/estornadas (${refundedSales.length})`}
                    />
                  </TabsContent>
                </>
              )}
            </div>
          </Tabs>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar venda..."
                className="rounded-md border border-input pl-8 pr-3 py-2 text-sm w-full"
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleFilter}>
              <Filter size={16} className="mr-2" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <SlidersHorizontal size={16} className="mr-2" />
              Colunas
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-4 w-40 mx-auto" />
          ) : !isError && salesData ? (
            <span>Mostrando {salesData.length} de {salesData.length} vendas</span>
          ) : null}
        </div>
      </div>
    </CreatorLayout>
  );
}
