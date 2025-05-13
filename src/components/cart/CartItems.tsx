
import React from "react";
import { CartItemCard } from "./CartItemCard";
import { CartItem } from "@/types";

interface CartItemsProps {
  items: CartItem[];
}

export function CartItems({ items }: CartItemsProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItemCard key={item.product.id} item={item} />
      ))}
    </div>
  );
}
