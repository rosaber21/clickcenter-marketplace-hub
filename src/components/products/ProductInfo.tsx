
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { Product, User as UserType } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductInfoProps {
  product: Product;
  creator?: UserType;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

export function ProductInfo({ product, creator, onAddToCart, onBuyNow }: ProductInfoProps) {
  const { addItem } = useCart();
  
  const handleAddToCart = () => {
    // Create cart item and add to cart
    addItem({
      id: product.id,
      product: product,
      quantity: 1
    });
    
    // Still call the original handler for toast notifications
    onAddToCart();
  };
  
  const handleBuyNow = () => {
    // Create cart item and add to cart first
    addItem({
      id: product.id,
      product: product,
      quantity: 1
    });
    
    // Then call the original handler for checkout and notifications
    onBuyNow();
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary">
            {product.type === "digital" ? "Produto Digital" : "Produto Físico"}
          </span>
        </div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </span>
        </div>
      </div>
      
      {creator && (
        <div className="flex items-center gap-2 py-2">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-muted">
            {creator.avatar ? (
              <img 
                src={creator.avatar} 
                alt={creator.name} 
                className="h-full w-full object-cover" 
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-primary">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium">{creator.name}</p>
            <p className="text-xs text-muted-foreground">Criador</p>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Descrição</h2>
        <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
      </div>
      
      <div className="pt-4 space-y-3">
        <Button 
          onClick={handleAddToCart} 
          variant="outline" 
          className="w-full gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
        <Button 
          onClick={handleBuyNow} 
          className="w-full"
        >
          Comprar Agora
        </Button>
      </div>
      
      {product.type === "digital" && (
        <div className="rounded-md bg-accent/50 p-4">
          <h3 className="font-medium mb-1">Informações sobre entrega:</h3>
          <p className="text-sm text-muted-foreground">
            Este é um produto digital. O acesso será disponibilizado imediatamente após a confirmação do pagamento através de seu e-mail de cadastro.
          </p>
        </div>
      )}
    </div>
  );
}
