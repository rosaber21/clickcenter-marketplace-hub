
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Create cart item and add to cart
    addItem({
      id: product.id,
      product: product,
      quantity: 1
    });
    
    // Still call the original handler for toast notifications
    onAddToCart();
  };
  
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-muted bg-card shadow-sm transition-all hover:shadow-md">
      <Link to={`/produto/${product.id}`} className="flex-1">
        <div className="aspect-[4/3] relative overflow-hidden bg-muted">
          {product.images && product.images.length > 0 ? (
            <img 
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              Sem imagem
            </div>
          )}
          <Badge 
            className={cn(
              "absolute top-2 right-2 opacity-90", 
              product.type === "digital" 
                ? "bg-secondary hover:bg-secondary/80" 
                : "bg-primary hover:bg-primary/80"
            )}
          >
            {product.type === "digital" ? "Digital" : "Físico"}
          </Badge>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium line-clamp-2 mb-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
            {product.title}
          </h3>
          
          <p className="line-clamp-3 text-sm text-muted-foreground mb-4">
            {product.description}
          </p>
          
          <div className="mt-auto">
            <p className="font-bold text-lg text-foreground">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </p>
          </div>
        </div>
      </Link>
      
      <div className="p-4 pt-0 mt-auto">
        <Button 
          onClick={handleAddToCart} 
          className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </div>
      
      <div className="absolute right-2 top-24 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          size="icon"
          variant="secondary" 
          className="rounded-full shadow-md"
          onClick={handleAddToCart}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
