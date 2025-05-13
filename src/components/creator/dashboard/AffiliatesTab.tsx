
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { useAffiliateActions } from "./affiliates/hooks/useAffiliateActions";
import { AffiliatePerformanceMetrics } from "./affiliates/AffiliatePerformanceMetrics";
import { TopAffiliatesTable } from "./affiliates/TopAffiliatesTable";
import { AffiliateActions } from "./affiliates/AffiliateActions";

interface Product {
  name: string;
  creator: string;
  category: string;
  price: string;
  status: "Ativo" | "Pendente";
}

interface AffiliatesTabProps {
  products: Product[];
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
  onAddAffiliate: () => void;
  onManageAffiliates: () => void;
}

export const AffiliatesTab = ({
  products,
  onEdit,
  onDelete,
  onAddAffiliate,
  onManageAffiliates
}: AffiliatesTabProps) => {
  const { 
    handleViewAffiliate, 
    handleViewAllAffiliates, 
    handleGenerateReport 
  } = useAffiliateActions();
  
  // Sample data for top affiliates
  const topAffiliates = [
    {
      name: "João Silva",
      sales: 1240.00,
      commission: 248.00,
      productCount: 5
    },
    {
      name: "Maria Oliveira",
      sales: 950.50,
      commission: 190.10,
      productCount: 3
    },
    {
      name: "Carlos Mendes",
      sales: 780.30,
      commission: 156.06,
      productCount: 2
    }
  ];

  // Sample metrics data
  const metricsData = {
    totalAffiliates: 27,
    newAffiliatesThisMonth: 5,
    affiliateSalesAmount: 3465.80,
    totalSalesPercentage: 44,
    commissionsAmount: 692.90,
    commissionsPercentage: 20
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-secondary/5">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <CardTitle className="text-secondary">Afiliados</CardTitle>
            <CardDescription>Desempenho dos afiliados</CardDescription>
          </div>
          <AffiliateActions 
            onGenerateReport={handleGenerateReport}
            onViewAllAffiliates={handleViewAllAffiliates}
            onManageAffiliates={onManageAffiliates}
          />
        </div>
      </CardHeader>
      <CardContent>
        <ProductsTable
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddAffiliate={onAddAffiliate}
          showAffiliateButton={true}
        />
        
        <AffiliatePerformanceMetrics {...metricsData} />
        
        <TopAffiliatesTable 
          affiliates={topAffiliates}
          onViewAffiliate={handleViewAffiliate}
        />
      </CardContent>
      <CardFooter>
        <AffiliateActions 
          onGenerateReport={handleGenerateReport}
          onViewAllAffiliates={handleViewAllAffiliates}
          onManageAffiliates={onManageAffiliates}
        />
      </CardFooter>
    </Card>
  );
};
