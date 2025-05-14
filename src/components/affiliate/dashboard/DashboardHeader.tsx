
import React from "react";
import { Button } from "@/components/ui/button";
import { Settings, CreditCard, ShoppingCart } from "lucide-react"; // Added icons

interface DashboardHeaderProps {
  onEditProfile: () => void;
  onRequestPayout: () => void;
  onViewProducts: () => void; // Keeping this as the original button's action
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  onEditProfile, 
  onRequestPayout,
  onViewProducts
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
      <div className="flex-1">
        <h1 className="text-3xl font-bold">Painel de Afiliado</h1>
        <p className="text-muted-foreground">Gerencie suas promoções e acompanhe seus ganhos</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
        <Button onClick={onViewProducts} variant="outline" className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Ver Produtos
        </Button>
        <Button onClick={onEditProfile} variant="outline" className="gap-2">
          <Settings className="h-4 w-4" />
          Editar Perfil
        </Button>
        <Button onClick={onRequestPayout} className="gap-2">
          <CreditCard className="h-4 w-4" />
          Solicitar Pagamento
        </Button>
      </div>
    </div>
  );
};
