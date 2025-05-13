
import React from "react";

interface AffiliateMetricsProps {
  totalAffiliates: number;
  newAffiliatesThisMonth: number;
  affiliateSalesAmount: number;
  totalSalesPercentage: number;
  commissionsAmount: number;
  commissionsPercentage: number;
}

export const AffiliatePerformanceMetrics: React.FC<AffiliateMetricsProps> = ({
  totalAffiliates,
  newAffiliatesThisMonth,
  affiliateSalesAmount,
  totalSalesPercentage,
  commissionsAmount,
  commissionsPercentage
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
        <p className="text-2xl font-bold mt-2">€ {affiliateSalesAmount.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-1">{totalSalesPercentage}% das suas vendas totais</p>
      </div>
      
      <div className="border rounded-lg p-3 bg-muted/50 hover:bg-muted transition-colors">
        <p className="font-medium">Comissões pagas</p>
        <p className="text-2xl font-bold mt-2 text-primary">€ {commissionsAmount.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-1">{commissionsPercentage}% das vendas de afiliados</p>
      </div>
    </div>
  );
};
