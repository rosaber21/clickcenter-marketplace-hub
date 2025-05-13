
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface EmptyCartProps {
  onClose: () => void;
}

export function EmptyCart({ onClose }: EmptyCartProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <ShoppingCart className="w-16 h-16 text-muted-foreground" />
      <p className="text-muted-foreground">Seu carrinho está vazio</p>
      <Button 
        variant="outline" 
        onClick={onClose}
        className="mt-2"
      >
        Continuar Comprando
      </Button>
    </div>
  );
}
