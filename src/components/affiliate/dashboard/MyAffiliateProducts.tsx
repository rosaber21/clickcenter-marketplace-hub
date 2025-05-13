
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AffiliateProductsSection } from "@/components/creator/dashboard/affiliates/AffiliateProductsSection";
import { AffiliateProduct } from "@/hooks/use-affiliate-dashboard";

interface MyAffiliateProductsProps {
  products: AffiliateProduct[];
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
  onAddAffiliate: () => void;
  onViewProducts: () => void;
}

export const MyAffiliateProducts = ({
  products,
  onEdit,
  onDelete,
  onAddAffiliate,
  onViewProducts
}: MyAffiliateProductsProps) => {
  return (
    <Card className="mb-8">
      <CardHeader className="bg-primary/5 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-primary">Meus Produtos Afiliados</CardTitle>
          <CardDescription>Produtos que você está promovendo atualmente</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <AffiliateProductsSection 
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddAffiliate={onAddAffiliate}
        />
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="text-primary text-sm hover:text-primary/80 transition-colors flex items-center"
          onClick={onViewProducts}
        >
          Ver mais produtos para afiliar <span className="ml-1">→</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
