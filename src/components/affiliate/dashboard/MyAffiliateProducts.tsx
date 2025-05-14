
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AffiliateProductsSection } from "@/components/creator/dashboard/affiliates/AffiliateProductsSection";
import { AffiliateProduct } from "@/hooks/use-affiliate-dashboard";
import { Product } from "@/types"; // Import the global Product type

interface MyAffiliateProductsProps {
  products: AffiliateProduct[]; 
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
  onAddAffiliate: () => void;
  onViewProducts: () => void;
}

// Map AffiliateProduct to the global Product type
const mapAffiliateProductToGlobalProduct = (p: AffiliateProduct): Product => ({
  id: String(p.id),
  title: p.name,
  price: typeof p.price === 'number' ? p.price : 0,
  description: `Affiliate product with ${p.commission} commission rate`,
  type: "digital",
  images: p.imageUrl ? [p.imageUrl] : [],
  createdById: "affiliate-user",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const MyAffiliateProducts = ({
  products,
  onEdit,
  onDelete,
  onAddAffiliate,
  onViewProducts
}: MyAffiliateProductsProps) => {

  // Map AffiliateProduct from the hook to the global Product structure
  const mappedProducts: Product[] = products.map(mapAffiliateProductToGlobalProduct);

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
          products={mappedProducts}
          onEditProduct={onEdit}
          onDeleteProduct={onDelete}
          onLinkProductToAffiliate={(productId, affiliateId) => {
            console.log(`Link product ${productId} to affiliate ${affiliateId} from MyAffiliateProducts`);
            onAddAffiliate();
          }}
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
