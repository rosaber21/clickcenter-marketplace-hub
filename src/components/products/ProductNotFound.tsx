
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProductNotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
      <p className="text-muted-foreground mb-8">O produto que você está procurando não existe ou foi removido.</p>
      <Button onClick={() => navigate("/")} className="gap-2">
        <ArrowLeft className="h-4 w-4" />
        Voltar para a Página Inicial
      </Button>
    </div>
  );
}
