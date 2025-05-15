
import React from "react";

interface AffiliateMetricsProps {
  totalAffiliates: number;
  activeAffiliates: number; // Changed from activeAffiliatesCount
  totalSales: number;       // Changed from affiliateSalesAmount
  conversionRate: number;   // Changed from totalSalesPercentage
  newAffiliatesThisMonth: number;
}

export const AffiliatePerformanceMetrics: React.FC<AffiliateMetricsProps> = ({
  totalAffiliates,
  activeAffiliates,
  totalSales,
  conversionRate,
  newAffiliatesThisMonth
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div className="border rounded-lg p-3 hover:border-primary/30 hover:bg-primary/5 transition-colors">
        <p className="font-medium text-primary">Total de afiliados</p>
        <p className="text-2xl font-bold mt-2">{totalAffiliates}</p>
        <p className="text-xs text-muted-foreground mt-1">+{newAffiliatesThisMonth} novos este mês</p>
      </div>
      
      <div className="border rounded-lg p-3 hover:border-secondary/30 hover:bg-secondary/5 transition-colors">
        <p className="font-medium text-secondary">Vendas por afiliados</p>
        <p className="text-2xl font-bold mt-2">€ {totalSales.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-1">{conversionRate}% das suas vendas totais</p>
      </div>
      
      <div className="border rounded-lg p-3 bg-muted/50 hover:bg-muted transition-colors">
        <p className="font-medium">Afiliados ativos</p>
        <p className="text-2xl font-bold mt-2 text-primary">{activeAffiliates}</p>
        <p className="text-xs text-muted-foreground mt-1">{Math.round((activeAffiliates / totalAffiliates) * 100)}% do total de afiliados</p>
      </div>
    </div>
  );
};
