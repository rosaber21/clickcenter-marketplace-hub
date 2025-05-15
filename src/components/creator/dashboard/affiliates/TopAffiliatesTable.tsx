
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Affiliate } from "@/types"; // Import the unified Affiliate type

// Update the Affiliate interface to match the one in AffiliatesTab - REMOVED, using imported type

interface TopAffiliatesTableProps {
  affiliates: Affiliate[];
  onViewAffiliateDetails: (affiliateId: string) => void;
}

export const TopAffiliatesTable: React.FC<TopAffiliatesTableProps> = ({
  affiliates,
  onViewAffiliateDetails
}) => {
  return (
    <div className="mt-6">
      <h3 className="font-medium mb-3">Afiliados com Melhor Desempenho</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 font-medium text-primary/80">Afiliado</th>
            <th className="text-left py-2 font-medium text-primary/80">Vendas</th>
            <th className="text-left py-2 font-medium text-primary/80">Comissão</th>
            <th className="text-left py-2 font-medium text-primary/80">Produtos</th>
            <th className="text-right py-2 font-medium text-primary/80">Ações</th>
          </tr>
        </thead>
        <tbody>
          {affiliates.map((affiliate) => (
            <tr key={affiliate.id} className="border-b hover:bg-muted/30 transition-colors">
              <td className="py-3">{affiliate.name}</td>
              <td className="py-3">€ {affiliate.sales.toFixed(2)}</td>
              <td className="py-3">€ {affiliate.commission.toFixed(2)}</td>
              <td className="py-3">{affiliate.productCount || 0}</td>
              <td className="py-3 text-right">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewAffiliateDetails(affiliate.id)}
                  className="gap-1"
                >
                  <Eye className="h-4 w-4" />
                  Detalhes
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

