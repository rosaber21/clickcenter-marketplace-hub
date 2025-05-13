
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Download,
  FileSpreadsheet,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

// Define proper types for sales data
interface SalesData {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: string;
  status: string;
}

export default function Sales() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  
  // Sample sales data with proper types
  const salesData: SalesData[] = [
    {
      id: "INV-001",
      customer: "João Silva",
      product: "Curso Básico de Marketing Digital",
      date: "05/05/2023",
      amount: "R$ 297,00",
      status: "Pago",
    },
    {
      id: "INV-002",
      customer: "Maria Souza",
      product: "Curso Avançado de SEO",
      date: "12/05/2023",
      amount: "R$ 497,00",
      status: "Pendente",
    },
    {
      id: "INV-003",
      customer: "Pedro Santos",
      product: "Curso de Copywriting",
      date: "15/05/2023",
      amount: "R$ 197,00",
      status: "Pago",
    },
    {
      id: "INV-004",
      customer: "Ana Rodrigues",
      product: "Combo Marketing Digital Completo",
      date: "22/05/2023",
      amount: "R$ 997,00",
      status: "Estornado",
    },
    {
      id: "INV-005",
      customer: "Lucas Oliveira",
      product: "Curso de Tráfego Pago",
      date: "01/06/2023",
      amount: "R$ 397,00",
      status: "Pago",
    },
  ];
  
  // Define table columns with proper types
  const columns: { key: keyof SalesData; label: string }[] = [
    { key: "id", label: "ID" },
    { key: "customer", label: "Cliente" },
    { key: "product", label: "Produto" },
    { key: "date", label: "Data" },
    { key: "amount", label: "Valor" },
    { key: "status", label: "Status" },
  ];

  const handleExportCSV = () => {
    setLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Exportação iniciada",
        description: "Seus dados de vendas estão sendo exportados para CSV.",
      });
      setLoading(false);
    }, 800);
  };

  const handleExportExcel = () => {
    setLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Exportação iniciada",
        description: "Seus dados de vendas estão sendo exportados para Excel.",
      });
      setLoading(false);
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
              disabled={loading}
            >
              <Download size={16} className="mr-2" />
              CSV
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportExcel}
              disabled={loading}
            >
              <FileSpreadsheet size={16} className="mr-2" />
              Excel
            </Button>
            <Button 
              size="sm" 
              onClick={handleNewSale}
              disabled={loading}
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
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="completed">Concluídas</TabsTrigger>
              <TabsTrigger value="refunded">Estornadas</TabsTrigger>
            </TabsList>
          
            {/* Sales Table */}
            <div className="border rounded-md mt-4">
              {loading ? (
                <div className="p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
              ) : (
                <>
                  <TabsContent value="all" className="m-0">
                    <DataTable
                      data={salesData}
                      columns={columns}
                      caption="Todas as vendas"
                    />
                  </TabsContent>
                  <TabsContent value="pending" className="m-0">
                    <DataTable
                      data={salesData.filter(sale => sale.status === "Pendente")}
                      columns={columns}
                      caption="Vendas pendentes"
                    />
                  </TabsContent>
                  <TabsContent value="completed" className="m-0">
                    <DataTable
                      data={salesData.filter(sale => sale.status === "Pago")}
                      columns={columns}
                      caption="Vendas concluídas"
                    />
                  </TabsContent>
                  <TabsContent value="refunded" className="m-0">
                    <DataTable
                      data={salesData.filter(sale => sale.status === "Estornado")}
                      columns={columns}
                      caption="Vendas estornadas"
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
          {loading ? (
            <Skeleton className="h-4 w-40 mx-auto" />
          ) : (
            <span>Mostrando {salesData.length} de {salesData.length} vendas</span>
          )}
        </div>
      </div>
    </CreatorLayout>
  );
}
