
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AffiliatePerformanceMetrics } from "./affiliates/AffiliatePerformanceMetrics";
import { TopAffiliatesTable } from "./affiliates/TopAffiliatesTable";
import { AffiliateProductsSection } from "./affiliates/AffiliateProductsSection";
import { Product } from "@/types"; // Import the global Product type

// Interface for local Affiliate type to avoid conflicts with imported types
interface LocalAffiliate {
  id: string;
  name: string;
  email?: string;
  sales: number;
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
  onManageAffiliates: () => void;
}

export const AffiliatesTab: React.FC<AffiliatesTabProps> = ({
  products,
  onEdit,
  onDelete,
  onAddAffiliate,
  onManageAffiliates,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Affiliate performance metrics data
  const performanceMetricsData = {
    totalAffiliates: 120,
    activeAffiliates: 85, 
    totalAffiliateSales: 15600.75,
    averageConversionRate: 8.5,
    newAffiliatesThisMonth: 30,
    affiliateSalesAmount: 15600.75,
    totalSalesPercentage: 60,
    commissionsAmount: 3120.15,
    commissionsPercentage: 20,
  };

  // Top affiliates data with number-only commission
  const topAffiliatesData: LocalAffiliate[] = [
    { id: '1', name: 'Affiliate One', email: 'one@example.com', sales: 150, conversionRate: 12, earnings: 2500, status: 'active', commission: 250, productCount: 5 },
    { id: '2', name: 'Affiliate Two', email: 'two@example.com', sales: 120, conversionRate: 10, earnings: 1800, status: 'active', commission: 180, productCount: 3 },
    { id: '3', name: 'Affiliate Three', email: 'three@example.com', sales: 90, conversionRate: 7, earnings: 1200, status: 'pending', commission: 120, productCount: 2 },
  ];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAffiliates = topAffiliatesData.filter((affiliate) =>
    affiliate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Gerenciar Afiliados</h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe o desempenho e gerencie seus afiliados.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onManageAffiliates}>
            <Settings className="mr-2 h-4 w-4" /> Configurações de Afiliados
          </Button>
          <Button onClick={onAddAffiliate}>
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Afiliado
          </Button>
        </div>
      </div>

      <AffiliatePerformanceMetrics 
        totalAffiliates={performanceMetricsData.totalAffiliates}
        activeAffiliatesCount={performanceMetricsData.activeAffiliates} 
        totalAffiliateSales={performanceMetricsData.totalAffiliateSales}
        averageConversionRate={performanceMetricsData.averageConversionRate}
        newAffiliatesThisMonth={performanceMetricsData.newAffiliatesThisMonth}
        affiliateSalesAmount={performanceMetricsData.affiliateSalesAmount}
        totalSalesPercentage={performanceMetricsData.totalSalesPercentage}
        commissionsAmount={performanceMetricsData.commissionsAmount}
        commissionsPercentage={performanceMetricsData.commissionsPercentage}
      />

      <Card>
        <CardHeader>
          <CardTitle>Top Afiliados</CardTitle>
          <CardDescription>Lista dos seus afiliados com melhor desempenho.</CardDescription>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar afiliados..."
                className="pl-8 w-full sm:w-[300px]"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <TopAffiliatesTable
            affiliates={filteredAffiliates as any} // Consider defining a proper type for TopAffiliatesTableProps's affiliates
            onViewAffiliate={(affiliateId) => console.log('View affiliate details', affiliateId)}
          />
        </CardContent>
      </Card>

      <AffiliateProductsSection
        products={products}
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
