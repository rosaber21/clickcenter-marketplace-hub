
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EmptyCart } from "./EmptyCart";
import { CartItems } from "./CartItems";
import { CartSummary } from "./CartSummary";
import { useCart } from "@/context/CartContext";

interface CartProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Cart({ open, setOpen }: CartProps) {
  const { items, total } = useCart();
  
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
            <EmptyCart onClose={() => setOpen(false)} />
          ) : (
            <CartItems items={items} />
          )}
        </div>

        {items.length > 0 && (
          <CartSummary total={total} />
        )}
      </SheetContent>
    </Sheet>
  );
}
