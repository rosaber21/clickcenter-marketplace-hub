
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AffiliateActions } from "./affiliates/AffiliateActions";
import { AffiliatePerformanceMetrics } from "./affiliates/AffiliatePerformanceMetrics";
import { TopAffiliatesTable } from "./affiliates/TopAffiliatesTable";
import { AffiliateProductsSection } from "./affiliates/AffiliateProductsSection";
import { useAffiliateData } from "./affiliates/hooks/useAffiliateData";
import { useAffiliateActions } from "./affiliates/hooks/useAffiliateActions";

interface AffiliatesTabProps {
  products: Product[];
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
  onAddAffiliate: () => void;
  onManageAffiliates: () => void;
}

interface Product {
  name: string;
  creator: string;
  category: string;
  price: string;
  status: "Ativo" | "Pendente";
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
    handleGenerateReport,
    handleManageAffiliates: localHandleManageAffiliates
  } = useAffiliateActions();
  
  // Get affiliate data from our hook
  const { topAffiliates, metricsData } = useAffiliateData();
  
  // Use the provided onManageAffiliates from props or fall back to the local handler
  const handleManageAffiliatesClick = () => {
    if (onManageAffiliates) {
      onManageAffiliates();
    } else {
      localHandleManageAffiliates();
    }
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
            onManageAffiliates={handleManageAffiliatesClick}
          />
        </div>
      </CardHeader>
      <CardContent>
        <AffiliateProductsSection
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddAffiliate={onAddAffiliate}
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
          onManageAffiliates={handleManageAffiliatesClick}
        />
      </CardFooter>
    </Card>
  );
};
