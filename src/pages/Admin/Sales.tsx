import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Download, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types"; // Import Supabase generated types
import { Skeleton } from "@/components/ui/skeleton";

// Interface para os dados de venda formatados para a tabela
interface FormattedSale {
  id: string;
  customer: string;
  product: string;
  date: string;
  total: string;
  status: string;
}

// Função para buscar as vendas do admin
const fetchAdminSales = async (): Promise<FormattedSale[]> => {
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
    console.error('Error fetching admin sales:', error);
    throw new Error(`Failed to fetch admin sales: ${error.message}`);
  }

  return data.map((sale) => ({
    id: `#${sale.id.substring(0, 6)}...`, // Usar um ID mais curto ou o ID completo
    customer: sale.buyer?.full_name || 'N/A',
    product: sale.product?.name || 'N/A',
    date: sale.sale_date ? new Date(sale.sale_date).toLocaleDateString('pt-BR') : 'N/A',
    total: `R$${sale.amount.toFixed(2)}`,
    status: sale.status as string, // status from db is 'completed', 'processing', or 'cancelled'
  }));
};

export default function AdminSales() {
  const { data: salesData, isLoading, isError, error } = useQuery<FormattedSale[], Error>({
    queryKey: ['adminSales'],
    queryFn: fetchAdminSales,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Concluído</Badge>;
      case "processing":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Processando</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Vendas</h1>
            <p className="text-muted-foreground">Gerencie todas as vendas da sua plataforma.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShoppingCart className="h-5 w-5" />
              Histórico de Vendas
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar venda..." className="pl-9 w-[200px]" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="completed">Concluído</SelectItem>
                  <SelectItem value="processing">Processando</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-2 p-4">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
              </div>
            )}
            {isError && (
              <div className="flex flex-col items-center justify-center p-8 text-red-500">
                <AlertCircle className="h-10 w-10 mb-2" />
                <p className="text-lg font-medium">Erro ao carregar vendas</p>
                <p className="text-sm">{error?.message || "Tente novamente mais tarde."}</p>
              </div>
            )}
            {!isLoading && !isError && salesData && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Produto</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center h-24">
                        Nenhuma venda encontrada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    salesData.map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{sale.id}</TableCell>
                        <TableCell className="font-medium">{sale.customer}</TableCell>
                        <TableCell>{sale.product}</TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>{sale.total}</TableCell>
                        <TableCell>{getStatusBadge(sale.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
