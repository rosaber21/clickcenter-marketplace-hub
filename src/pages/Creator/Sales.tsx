
import React, { useState } from "react";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart3,
  Download,
  CalendarRange,
  Filter,
  ArrowUpDown,
  CreditCard,
  Wallet,
  TrendingUp
} from "lucide-react";

export default function Sales() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for sales
  const salesData = [
    { id: "1", customer: "João Silva", product: "Curso de Marketing Digital", date: "2025-05-10", amount: 297.00, status: "completed" },
    { id: "2", customer: "Maria Santos", product: "Mentorias de Negócios", date: "2025-05-09", amount: 997.00, status: "completed" },
    { id: "3", customer: "Carlos Oliveira", product: "Ebook: Estratégias de Vendas", date: "2025-05-08", amount: 47.00, status: "completed" },
    { id: "4", customer: "Ana Pereira", product: "Workshop de Estratégias", date: "2025-05-07", amount: 127.00, status: "pending" },
    { id: "5", customer: "Roberto Costa", product: "Curso de Marketing Digital", date: "2025-05-06", amount: 297.00, status: "completed" },
    { id: "6", customer: "Fernanda Lima", product: "Mentorias de Negócios", date: "2025-05-05", amount: 997.00, status: "refunded" }
  ];
  
  // Mock data for the sales summary
  const summary = {
    totalSales: "R$ 2.762,00",
    totalOrders: 6,
    averageOrder: "R$ 460,33",
    conversionRate: "3.8%"
  };
  
  // Columns for the sales table
  const salesColumns = [
    { key: "id", label: "ID" },
    { key: "customer", label: "Cliente" },
    { key: "product", label: "Produto" },
    { key: "date", label: "Data" },
    { key: "amount", label: "Valor (R$)" },
    { key: "status", label: "Status" }
  ];

  const handleExportData = () => {
    toast({
      title: "Exportando dados",
      description: "Os dados de vendas estão sendo exportados para CSV"
    });
  };
  
  const handleFilterDate = () => {
    toast({
      title: "Filtrar por data",
      description: "Seletor de período aberto"
    });
  };
  
  const handleSortChange = () => {
    toast({
      title: "Ordenar dados",
      description: "Opções de ordenação abertas"
    });
  };

  return (
    <CreatorLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-primary">Vendas</h1>
            <p className="text-muted-foreground">Acompanhe e gerencie todas as suas vendas de produtos digitais</p>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center gap-2" onClick={handleFilterDate}>
              <CalendarRange size={16} />
              <span>Período</span>
            </Button>
            
            <Button variant="outline" className="flex items-center gap-2" onClick={handleExportData}>
              <Download size={16} />
              <span>Exportar</span>
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vendido</p>
                <h3 className="text-2xl font-bold mt-1">{summary.totalSales}</h3>
              </div>
              <Wallet className="h-8 w-8 text-primary opacity-80" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pedidos</p>
                <h3 className="text-2xl font-bold mt-1">{summary.totalOrders}</h3>
              </div>
              <CreditCard className="h-8 w-8 text-primary opacity-80" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <h3 className="text-2xl font-bold mt-1">{summary.averageOrder}</h3>
              </div>
              <BarChart3 className="h-8 w-8 text-primary opacity-80" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
                <h3 className="text-2xl font-bold mt-1">{summary.conversionRate}</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-primary opacity-80" />
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
            <TabsTrigger value="subscriptions">Assinaturas</TabsTrigger>
            <TabsTrigger value="refunds">Reembolsos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Todas as Vendas</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter size={14} />
                      <span>Filtrar</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleSortChange}>
                      <ArrowUpDown size={14} />
                      <span>Ordenar</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable 
                  data={salesData} 
                  columns={salesColumns}
                  caption="Listagem de todas as vendas realizadas"
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Histórico de Transações</h3>
                <p className="text-muted-foreground text-center py-8">
                  Visualize o histórico detalhado de todas as suas transações
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subscriptions">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Assinaturas Ativas</h3>
                <p className="text-muted-foreground text-center py-8">
                  Gerencie as assinaturas recorrentes dos seus produtos
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="refunds">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Reembolsos e Cancelamentos</h3>
                <p className="text-muted-foreground text-center py-8">
                  Acompanhe solicitações de reembolso e cancelamentos
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CreatorLayout>
  );
}
