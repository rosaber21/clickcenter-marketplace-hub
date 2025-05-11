
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types";
import { CartItemCard } from "./CartItemCard";

interface CartProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Cart({ open, setOpen }: CartProps) {
  // Isso seria conectado a um contexto real de carrinho
  const [items, setItems] = React.useState<CartItem[]>([]);
  
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Seu carrinho está vazio."
              : `${items.length} ${items.length === 1 ? "item" : "itens"} no carrinho.`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <ShoppingCart className="w-16 h-16 text-muted-foreground" />
              <p className="text-muted-foreground">Seu carrinho está vazio</p>
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="mt-2"
              >
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemCard 
                  key={item.product.id} 
                  item={item} 
                  onRemove={() => {
                    // Remover item do carrinho
                  }}
                  onUpdateQuantity={(quantity) => {
                    // Atualizar quantidade
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
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
            
            <Button className="w-full" onClick={() => {
              // Iniciar processo de checkout
            }}>
              Finalizar Compra
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// Placeholder para o ícone
function ShoppingCart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
