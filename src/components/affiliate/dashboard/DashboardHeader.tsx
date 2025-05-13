
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onViewProducts: () => void;
}

export const DashboardHeader = ({ onViewProducts }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">Painel de Afiliado</h1>
        <p className="text-muted-foreground">Gerencie suas promoções e acompanhe seus ganhos</p>
      </div>
      <Button onClick={onViewProducts} className="gap-2">
        <LinkIcon className="h-4 w-4" />
        Ver Produtos para Afiliar
      </Button>
    </div>
  );
};
