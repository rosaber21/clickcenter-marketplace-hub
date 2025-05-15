import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import { AffiliatePerformanceMetrics } from "./affiliates/AffiliatePerformanceMetrics";
import { TopAffiliatesTable } from "./affiliates/TopAffiliatesTable";
import { AffiliateProductsSection } from "./affiliates/AffiliateProductsSection";
import { Product, Affiliate } from "@/types"; // Import the unified Affiliate type

// Updated Affiliate interface to match TopAffiliatesTable expectations - REMOVED, using imported type

interface AffiliatesTabProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onAddAffiliate: () => void;
  onManageAffiliates?: () => void;
}


export const AffiliatesTab: React.FC<AffiliatesTabProps> = ({ 
  products: initialProducts, 
  onEdit, 
  onDelete,
  onAddAffiliate,
  onManageAffiliates
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("earnings_desc");

  // Affiliate performance metrics data
  const performanceMetricsData = {
    totalAffiliates: 120,
    activeAffiliates: 85, 
    totalAffiliateSales: 15600.75, // Renamed from totalSales to totalAffiliateSales to avoid conflict if any, but passing as totalSales
    averageConversionRate: 8.5, // Renamed from conversionRate to averageConversionRate, but passing as conversionRate
    newAffiliatesThisMonth: 30,
  };

  // Updated mock affiliates data to conform to the new Affiliate type
  const affiliates: Affiliate[] = useMemo(() => [
    { id: "af1", name: "João Silva", email: "joao@example.com", sales: 5000, conversionRate: 12.5, earnings: 1250.00, status: "active", commission: 250, productCount: 5, lastActivity: "2025-05-10", avatarUrl: "/placeholder.svg" },
    { id: "af2", name: "Maria Souza", email: "maria@example.com", sales: 4000, conversionRate: 10.2, earnings: 980.50, status: "active", commission: 196.1, productCount: 3, lastActivity: "2025-05-12", avatarUrl: "/placeholder.svg" },
    { id: "af3", name: "Carlos Lima", email: "carlos@example.com", sales: 2500, conversionRate: 7.8, earnings: 670.00, status: "pending", commission: 134, productCount: 2, lastActivity: "2025-05-01", avatarUrl: "/placeholder.svg" },
    { id: "af4", name: "Ana Pereira", email: "ana@example.com", sales: 1000, conversionRate: 5.1, earnings: 320.75, status: "suspended", commission: 64.15, productCount: 1, lastActivity: "2025-04-15", avatarUrl: "/placeholder.svg" },
  ], []);

  const filteredAffiliates = useMemo(() => {
    let tempAffiliates = affiliates.filter(affiliate =>
        affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      if (statusFilter !== "all") {
        tempAffiliates = tempAffiliates.filter(affiliate => affiliate.status === statusFilter);
      }
  
      // Sort by earnings (desc/asc)
      if (sortOption === "earnings_desc") {
        tempAffiliates.sort((a, b) => (b.earnings ?? 0) - (a.earnings ?? 0));
      } else if (sortOption === "earnings_asc") {
        tempAffiliates.sort((a, b) => (a.earnings ?? 0) - (b.earnings ?? 0));
      } 
      // Sort by conversion rate (desc)
      else if (sortOption === "conversion_desc") {
        tempAffiliates.sort((a, b) => (b.conversionRate ?? 0) - (a.conversionRate ?? 0));
      } 
      // Sort by sales (desc/asc)
      else if (sortOption === "sales_desc") {
        tempAffiliates.sort((a, b) => b.sales - a.sales);
      } else if (sortOption === "sales_asc") {
        tempAffiliates.sort((a, b) => a.sales - b.sales);
      }
      return tempAffiliates;
  }, [searchTerm, statusFilter, sortOption, affiliates]);


  return (
    <div className="space-y-6">
      <AffiliatePerformanceMetrics 
        totalAffiliates={performanceMetricsData.totalAffiliates}
        activeAffiliates={performanceMetricsData.activeAffiliates}
        totalSales={performanceMetricsData.totalAffiliateSales} // Pass totalAffiliateSales as totalSales
        conversionRate={performanceMetricsData.averageConversionRate} // Pass averageConversionRate as conversionRate
        newAffiliatesThisMonth={performanceMetricsData.newAffiliatesThisMonth}
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gerenciar Afiliados</CardTitle>
            <p className="text-sm text-muted-foreground">Visualize e gerencie seus afiliados.</p>
          </div>
          {onManageAffiliates ? (
             <Button onClick={onManageAffiliates} className="gap-2"> 
                Gerenciar Afiliados Convidados
             </Button>
          ) : (
            <Button onClick={onAddAffiliate} className="gap-2">
              <Plus size={16} /> Adicionar Afiliado
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar afiliados..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <Filter size={16} />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="suspended">Suspenso</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem> 
              </SelectContent>
            </Select>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger>
                <div className="flex items-center gap-2">
                  <ArrowUpDown size={16} />
                  <SelectValue placeholder="Ordenar por" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="earnings_desc">Maiores Ganhos</SelectItem>
                <SelectItem value="earnings_asc">Menores Ganhos</SelectItem>
                <SelectItem value="conversion_desc">Melhor Conversão</SelectItem>
                <SelectItem value="sales_desc">Mais Vendas</SelectItem>
                <SelectItem value="sales_asc">Menos Vendas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <TopAffiliatesTable
            affiliates={filteredAffiliates} 
            onViewAffiliateDetails={(affiliateId) => console.log('View affiliate details', affiliateId)}
          />
        </CardContent>
      </Card>

      <AffiliateProductsSection 
        products={initialProducts}
        onEditProduct={onEdit}
        onDeleteProduct={onDelete}
        onLinkProductToAffiliate={(productId, affiliateId) => {
          console.log(`Link product ${productId} to affiliate ${affiliateId}`);
        }}
      />
    </div>
  );
};
