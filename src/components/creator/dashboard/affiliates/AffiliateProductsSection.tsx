
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { LinkIcon } from "lucide-react";
import { Product } from "@/types"; // Import the global Product type

interface AffiliateProductsSectionProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onLinkProductToAffiliate: (productId: string, affiliateId: string) => void;
}

export const AffiliateProductsSection: React.FC<AffiliateProductsSectionProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onLinkProductToAffiliate,
}) => {
  // Display a message when there are no products
  if (!products || products.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Produtos Disponíveis para Afiliados</CardTitle>
          <CardDescription>
            Associe produtos aos seus afiliados para que eles possam promovê-los.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Nenhum produto disponível no momento.</p>
        </CardContent>
      </Card>
    );
  }

  // Dummy function for ProductCard's required onAddToCart prop
  const handleAddToCart = () => {
    console.log("Add to cart clicked - this is a placeholder function");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos Disponíveis para Afiliados</CardTitle>
        <CardDescription>
          Associe produtos aos seus afiliados para que eles possam promovê-los.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard 
                product={product} 
                onAddToCart={handleAddToCart} // Add the required prop
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onLinkProductToAffiliate(product.id, "someAffiliateId")}
              >
                <LinkIcon className="mr-2 h-4 w-4" /> Associar
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
