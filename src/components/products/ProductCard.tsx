
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="clickcenter-card group">
      <Link to={`/produto/${product.id}`} className="block">
        <div className="aspect-[4/3] mb-3 overflow-hidden rounded-md bg-muted">
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
          <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded">
            {product.type === "digital" ? "Digital" : "Físico"}
          </div>
        </div>
        
        <h3 className="font-medium line-clamp-2 mb-1 min-h-[2.5rem]">{product.title}</h3>
        
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </p>
        </div>
      </Link>
      
      <div className="mt-3">
        <Button 
          onClick={onAddToCart} 
          className="w-full gap-2"
          variant="outline"
        >
          <ShoppingCart className="h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}
