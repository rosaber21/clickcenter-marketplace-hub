import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react"; // Removed Users, DollarSign, Percent, LineChart as they are not used here.
import { AffiliatePerformanceMetrics } from "./affiliates/AffiliatePerformanceMetrics";
import { TopAffiliatesTable } from "./affiliates/TopAffiliatesTable";
import { AffiliateProductsSection } from "./affiliates/AffiliateProductsSection";
import { Product } from "@/types";

// Updated Affiliate interface to match TopAffiliatesTable expectations
interface Affiliate {
  id: string;
  name: string;
  email: string;
  sales: number; // Added
  conversionRate: number;
  earnings: number;
  status: 'active' | 'pending' | 'suspended'; // Adjusted status values
  commissionRate: number; // Changed from commission
  productCount?: number; // Kept if used locally, though not in TopAffiliatesTable.Affiliate
  avatarUrl?: string; // Optional, added for closer match
  lastActivity?: string; // Optional, added for closer match
}

interface AffiliatesTabProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onAddAffiliate: () => void;
  onManageAffiliates?: () => void; // Added this prop
}


export const AffiliatesTab: React.FC<AffiliatesTabProps> = ({ 
  products: initialProducts, 
  onEdit, 
  onDelete,
  onAddAffiliate,
  onManageAffiliates // Destructure the new prop
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("earnings_desc");

  // Affiliate performance metrics data
  const performanceMetricsData = {
    totalAffiliates: 120,
    activeAffiliates: 85, // This will be passed as activeAffiliatesCount
    totalAffiliateSales: 15600.75,
    averageConversionRate: 8.5,
    newAffiliatesThisMonth: 30,
    affiliateSalesAmount: 7800.50,
    totalSalesPercentage: 15.0,
    commissionsAmount: 2340.15,
    commissionsPercentage: 30.0,
  };

  // Updated mock affiliates data
  const affiliates: Affiliate[] = useMemo(() => [
    { id: "af1", name: "João Silva", email: "joao@example.com", sales: 50, conversionRate: 12.5, earnings: 1250.00, status: "active", commissionRate: 20, productCount: 5, lastActivity: "2025-05-10" },
    { id: "af2", name: "Maria Souza", email: "maria@example.com", sales: 40, conversionRate: 10.2, earnings: 980.50, status: "active", commissionRate: 15, productCount: 3, lastActivity: "2025-05-12" },
    { id: "af3", name: "Carlos Lima", email: "carlos@example.com", sales: 25, conversionRate: 7.8, earnings: 670.00, status: "pending", commissionRate: 25, productCount: 2, lastActivity: "2025-05-01" },
    { id: "af4", name: "Ana Pereira", email: "ana@example.com", sales: 10, conversionRate: 5.1, earnings: 320.75, status: "suspended", commissionRate: 10, productCount: 1, lastActivity: "2025-04-15" }, // Changed 'inactive' to 'suspended'
  ], []);

  const filteredAffiliates = useMemo(() => {
    let tempAffiliates = affiliates.filter(affiliate =>
        affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      if (statusFilter !== "all") {
        tempAffiliates = tempAffiliates.filter(affiliate => affiliate.status === statusFilter);
      }
  
      if (sortOption === "earnings_desc") {
        tempAffiliates.sort((a, b) => b.earnings - a.earnings);
      } else if (sortOption === "earnings_asc") {
        tempAffiliates.sort((a, b) => a.earnings - b.earnings);
      } else if (sortOption === "conversion_desc") {
        tempAffiliates.sort((a, b) => b.conversionRate - a.conversionRate);
      }
      // Add sorting by sales if needed
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
        activeAffiliatesCount={performanceMetricsData.activeAffiliates} // Corrected prop name
        totalSales={performanceMetricsData.totalAffiliateSales} // Assuming totalAffiliateSales maps to totalSales
        conversionRate={performanceMetricsData.averageConversionRate}
        newAffiliatesThisMonth={performanceMetricsData.newAffiliatesThisMonth}
        // These props are not in AffiliatePerformanceMetrics.tsx, based on common patterns, they might be:
        // affiliateSalesAmount={performanceMetricsData.affiliateSalesAmount}
        // totalSalesPercentage={performanceMetricsData.totalSalesPercentage}
        // commissionsAmount={performanceMetricsData.commissionsAmount}
        // commissionsPercentage={performanceMetricsData.commissionsPercentage}
        // For now, I'll comment them out to avoid new errors if they don't exist on the component.
        // If AffiliatePerformanceMetrics expects them with different names, we'll need to adjust.
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
                <SelectItem value="suspended">Suspenso</SelectItem> {/* Changed Inativo to Suspenso */}
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
                <SelectItem value="sales_desc">Mais Vendas</SelectItem> {/* Added sort by sales */}
                <SelectItem value="sales_asc">Menos Vendas</SelectItem> {/* Added sort by sales */}
              </SelectContent>
            </Select>
          </div>
          
          <TopAffiliatesTable
            affiliates={filteredAffiliates} // This should now match the expected type
            onViewAffiliateDetails={(affiliateId) => console.log('View affiliate details', affiliateId)} // Assuming onViewAffiliateDetails is the prop name
            // onManageAffiliate is also a potential prop, if needed by TopAffiliatesTable
            // The original error in DashboardTabs was about onManageAffiliates prop to AffiliatesTab itself, which is now handled
            // If TopAffiliatesTable needs onManageAffiliates, it should be passed here:
            // onManageAffiliate={onManageAffiliates} 
          />
        </CardContent>
      </Card>

      <AffiliateProductsSection 
        products={initialProducts}
        // onAddProductToAffiliate={() => console.log("Add product to affiliate")} // Removed this incorrect prop
        onEditProduct={onEdit}
        onDeleteProduct={onDelete}
        onLinkProductToAffiliate={(productId, affiliateId) => {
          console.log(`Link product ${productId} to affiliate ${affiliateId}`);
          // The original onAddAffiliate call here seemed out of place for onLinkProductToAffiliate.
          // If linking a product should trigger adding an affiliate, it can remain, but it's unusual.
          // For now, commenting it out to stick to the original intent of linking.
          // onAddAffiliate(); 
        }}
      />
    </div>
  );
};
