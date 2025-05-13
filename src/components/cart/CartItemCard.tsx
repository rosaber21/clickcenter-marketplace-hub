
import React from "react";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { product, quantity } = item;
  const { updateQuantity, removeItem } = useCart();
  
  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };
  
  return (
    <div className="flex gap-4 py-2 border-b last:border-0">
      <div className="w-20 h-20 overflow-hidden rounded-md bg-muted">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
            Sem imagem
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium text-sm">{product.title}</h3>
        <p className="text-muted-foreground text-sm mb-2">
          {product.type === "digital" ? "Produto Digital" : "Produto Físico"}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="w-6 h-6"
              onClick={() => handleUpdateQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm w-6 text-center">{quantity}</span>
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="w-6 h-6"
              onClick={() => handleUpdateQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <p className="font-medium">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price * quantity)}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRemove} 
              className="text-red-500 hover:text-red-700 p-0"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remover
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
