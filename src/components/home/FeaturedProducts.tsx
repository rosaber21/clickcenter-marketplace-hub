
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/types";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FeaturedProductsProps {
  filteredProducts: Product[];
  animate: boolean;
  onAddToCart: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  filteredProducts, 
  animate,
  onAddToCart 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewAllCategories = () => {
    navigate("/categorias");
    toast({
      title: "Categorias",
      description: "Explorando todas as categorias",
    });
  };

  const handleViewProductDetails = (productId: string) => {
    navigate(`/produto/${productId}`);
  };

  return (
    <div 
      id="products-section"
      className="mb-12"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.5s ease-out 0.3s"
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Produtos em Destaque
        </h2>
        <Button 
          variant="link" 
          className="text-primary font-medium gap-1"
          onClick={handleViewAllCategories}
        >
          Ver todos
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s ease-out ${0.3 + index * 0.1}s`
              }}
              onClick={() => handleViewProductDetails(product.id)}
              className="cursor-pointer"
            >
              <ProductCard
                product={product}
                onAddToCart={() => onAddToCart(product)}
              />
            </div>
          ))
        ) : (
          <Card className="col-span-full py-12 text-center">
            <CardContent>
              <h2 className="text-xl font-medium mb-2">Nenhum produto encontrado</h2>
              <p className="text-muted-foreground">
                Tente ajustar seus filtros de busca ou explore outras categorias.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
