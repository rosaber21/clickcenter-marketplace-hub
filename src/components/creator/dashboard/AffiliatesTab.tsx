import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, ArrowUpDown, Users, DollarSign, Percent, LineChart } from "lucide-react";
import { AffiliatePerformanceMetrics } from "./affiliates/AffiliatePerformanceMetrics"; // Assuming this is the correct path
import { TopAffiliatesTable } from "./affiliates/TopAffiliatesTable"; // Assuming this is the correct path
import { AffiliateProductsSection } from "./affiliates/AffiliateProductsSection"; // Assuming this is the correct path
import { Product } from "@/types"; // Using the global Product type

interface Affiliate {
  id: string;
  name: string;
  email: string;
  conversionRate: number;
  earnings: number;
  status: 'active' | 'pending' | 'inactive';
  commission: number;
  productCount?: number;
}

interface AffiliatesTabProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onAddAffiliate: () => void;
  // Add other necessary props here
}


export const AffiliatesTab: React.FC<AffiliatesTabProps> = ({ 
  products: initialProducts, 
  onEdit, 
  onDelete,
  onAddAffiliate
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("earnings_desc");

  // Affiliate performance metrics data
  const performanceMetricsData = {
    totalAffiliates: 120,
    activeAffiliates: 85,
    totalAffiliateSales: 15600.75,
    averageConversionRate: 8.5,
    newAffiliatesThisMonth: 30,
    affiliateSalesAmount: 7800.50, // Example value
    totalSalesPercentage: 15.0, // Example value: 15% of total sales are from affiliates
    commissionsAmount: 2340.15, // Example value
    commissionsPercentage: 30.0, // Example value: 30% average commission rate
  };

  // Mock affiliates data - replace with actual data fetching
  const affiliates: Affiliate[] = useMemo(() => [
    { id: "af1", name: "João Silva", email: "joao@example.com", conversionRate: 12.5, earnings: 1250.00, status: "active", commission: 20, productCount: 5 },
    { id: "af2", name: "Maria Souza", email: "maria@example.com", conversionRate: 10.2, earnings: 980.50, status: "active", commission: 15, productCount: 3 },
    { id: "af3", name: "Carlos Lima", email: "carlos@example.com", conversionRate: 7.8, earnings: 670.00, status: "pending", commission: 25, productCount: 2 },
    { id: "af4", name: "Ana Pereira", email: "ana@example.com", conversionRate: 5.1, earnings: 320.75, status: "inactive", commission: 10, productCount: 1 },
  ], []);

  const filteredAffiliates = useMemo(() => {
    let tempAffiliates = affiliates.filter(affiliate =>
        affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      if (statusFilter !== "all") {
        tempAffiliates = tempAffiliates.filter(affiliate => affiliate.status === statusFilter);
      }
  
      // Sorting logic (add more options as needed)
      if (sortOption === "earnings_desc") {
        tempAffiliates.sort((a, b) => b.earnings - a.earnings);
      } else if (sortOption === "earnings_asc") {
        tempAffiliates.sort((a, b) => a.earnings - b.earnings);
      } else if (sortOption === "conversion_desc") {
        tempAffiliates.sort((a, b) => b.conversionRate - a.conversionRate);
      }
      return tempAffiliates;
  }, [searchTerm, statusFilter, sortOption, affiliates]);


  return (
    <div className="space-y-6">
      <AffiliatePerformanceMetrics 
        totalAffiliates={performanceMetricsData.totalAffiliates}
        activeAffiliates={performanceMetricsData.activeAffiliates}
        totalAffiliateSales={performanceMetricsData.totalAffiliateSales}
        averageConversionRate={performanceMetricsData.averageConversionRate}
        newAffiliatesThisMonth={performanceMetricsData.newAffiliatesThisMonth}
        affiliateSalesAmount={performanceMetricsData.affiliateSalesAmount}
        totalSalesPercentage={performanceMetricsData.totalSalesPercentage}
        commissionsAmount={performanceMetricsData.commissionsAmount}
        commissionsPercentage={performanceMetricsData.commissionsPercentage}
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Gerenciar Afiliados</CardTitle>
            <p className="text-sm text-muted-foreground">Visualize e gerencie seus afiliados.</p>
          </div>
          <Button onClick={onAddAffiliate} className="gap-2">
            <Plus size={16} /> Adicionar Afiliado
          </Button>
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
              </SelectContent>
            </Select>
          </div>
          
          <TopAffiliatesTable
            affiliates={filteredAffiliates}
            onViewAffiliate={(affiliateId) => console.log('View affiliate details', affiliateId)}
          />
        </CardContent>
      </Card>

      <AffiliateProductsSection 
        products={initialProducts}
        onAddProductToAffiliate={() => console.log("Add product to affiliate")}
        onEditProduct={onEdit}
        onDeleteProduct={onDelete}
        onLinkProductToAffiliate={(productId, affiliateId) => {
          console.log(`Link product ${productId} to affiliate ${affiliateId}`);
          onAddAffiliate(); 
        }}
      />
    </div>
  );
};
