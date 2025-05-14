
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AffiliatePerformanceMetrics } from "./affiliates/AffiliatePerformanceMetrics"; // Corrected import path if necessary
import { TopAffiliatesTable } from "./affiliates/TopAffiliatesTable";
import { AffiliateProductsSection } from "./affiliates/AffiliateProductsSection";

// Interface for Product, consistent with AffiliateProductsSection's needs if it can't use global
interface Product {
  id: string;
  name: string; // ProductCard might use 'name' or 'title'. AffiliateProductsSection will handle mapping if needed.
  price: number;
  category?: string;
  imageUrl?: string;
  status?: string;
  creator?: string;
  description?: string; // Added to match usage in AffiliateProductsSection
  // Fields required by the global Product type, if AffiliateProductsSection starts using it.
  // title?: string;
  // type?: "digital" | "physical";
  // createdById?: string;
  // createdAt?: string | Date;
  // updatedAt?: string | Date;
  // images?: string[];
}

interface Affiliate {
  id: string;
  name: string;
  email?: string;
  sales: number;
  conversionRate: number;
  earnings: number;
  status: 'active' | 'pending' | 'inactive';
  commission?: number; // Changed to number as per error indication for TopAffiliatesTable
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

  // This data should align with AffiliateMetricsProps in AffiliatePerformanceMetrics.tsx
  const performanceMetricsData = {
    totalAffiliates: 120,
    activeAffiliates: 85, // Assuming this maps to 'newAffiliatesThisMonth' or similar if structure differs
    totalAffiliateSales: 15600.75, // Assuming this maps to 'affiliateSalesAmount'
    averageConversionRate: 8.5, // This might not directly map, or could be part of derived metrics
    // Ensure all props expected by AffiliatePerformanceMetrics are provided
    // Mapping to AffiliatePerformanceMetrics props:
    newAffiliatesThisMonth: 30, // Example value, adjust as needed
    affiliateSalesAmount: 15600.75,
    totalSalesPercentage: 60, // Example value
    commissionsAmount: 3120.15, // Example value
    commissionsPercentage: 20, // Example value
  };


  const topAffiliatesData: Affiliate[] = [
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

      <AffiliatePerformanceMetrics {...performanceMetricsData} />

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
            affiliates={filteredAffiliates}
            onEditAffiliate={(affiliateId) => console.log('Edit affiliate', affiliateId)}
            onDeleteAffiliate={(affiliateId) => console.log('Delete affiliate', affiliateId)}
          />
        </CardContent>
      </Card>

      <AffiliateProductsSection
        products={products as any} // Using 'as any' for now, ideally products type should align with what AffiliateProductsSection expects
        onEditProduct={onEdit}
        onDeleteProduct={onDelete}
        onLinkProductToAffiliate={(productId, affiliateId) => console.log(`Link product ${productId} to affiliate ${affiliateId}`)}
      />
    </div>
  );
};
