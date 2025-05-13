
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

interface CartSummaryProps {
  total: number;
}

export function CartSummary({ total }: CartSummaryProps) {
  const handleCheckout = () => {
    // Placeholder for checkout process
    toast({
      title: "Iniciando checkout",
      description: "Redirecionando para o processo de pagamento...",
    });
  };

  return (
    <div className="border-t pt-4">
      <div className="flex justify-between mb-4">
        <span className="font-medium">Total</span>
        <span className="font-semibold">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(total)}
        </span>
      </div>
      
      <Button className="w-full" onClick={handleCheckout}>
        Finalizar Compra
      </Button>
    </div>
  );
}
