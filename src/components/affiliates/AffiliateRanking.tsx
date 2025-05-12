
import React from "react";
import { Button } from "@/components/ui/button";

interface AffiliateData {
  id: number;
  name: string;
  sales: number;
  earnings: string;
  avatar: string;
}

interface AffiliateRankingProps {
  affiliates: AffiliateData[];
  onAffiliateSignup: () => void;
}

export const AffiliateRanking: React.FC<AffiliateRankingProps> = ({ 
  affiliates, 
  onAffiliateSignup 
}) => {
  return (
    <>
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Top Afiliados do Mês</h3>
          <p className="text-muted-foreground mb-6">
            Os afiliados com melhor desempenho neste mês. Seja o próximo!
          </p>
          
          <div className="space-y-6">
            {affiliates.map((affiliate, index) => (
              <div key={affiliate.id} className="flex items-center gap-4 p-4 rounded-lg border bg-muted/20">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={affiliate.avatar} 
                    alt={affiliate.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{affiliate.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {affiliate.sales} vendas
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{affiliate.earnings}</p>
                  <p className="text-sm text-muted-foreground">
                    em comissões
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 p-8 rounded-lg bg-gradient-to-r from-secondary/80 to-primary text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Quer aparecer neste ranking?</h3>
            <p className="opacity-90">
              Junte-se ao nosso programa de afiliados e comece a ganhar comissões agora mesmo!
            </p>
          </div>
          <Button 
            variant="default" 
            size="lg" 
            className="bg-white text-primary hover:bg-gray-100"
            onClick={onAffiliateSignup}
          >
            Comece Agora
          </Button>
        </div>
      </div>
    </>
  );
};

