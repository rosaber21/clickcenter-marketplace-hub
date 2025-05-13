
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, ShoppingBag, Filter } from "lucide-react";

interface BenefitsSectionProps {
  animate: boolean;
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ animate }) => {
  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(40px)",
        transition: "all 0.5s ease-out 0.4s"
      }}
    >
      <Card className="hover:shadow-md transition-all">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Entrega Instantânea</h3>
          <p className="text-muted-foreground">Produtos digitais com acesso imediato após a compra.</p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-all">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Produtos de Qualidade</h3>
          <p className="text-muted-foreground">Selecionados e aprovados por nossa equipe de especialistas.</p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-all">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Filter className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-medium mb-2">Suporte Dedicado</h3>
          <p className="text-muted-foreground">Atendimento personalizado para todas as suas dúvidas.</p>
        </CardContent>
      </Card>
    </div>
  );
};
