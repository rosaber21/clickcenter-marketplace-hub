import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AffiliateProductsSection } from "@/components/creator/dashboard/affiliates/AffiliateProductsSection";
import { AffiliateProduct } from "@/hooks/use-affiliate-dashboard"; // This now has .price

// This interface must align with what AffiliateProductsSection expects for its 'products' prop.
// The Product type from AffiliatesTab.tsx requires price, and potentially title, type etc.
// AffiliateProduct from the hook now has 'price'. If other fields are strictly needed by AffiliateProductsSection,
// they would need to be added to AffiliateProduct type in the hook or mapped here.
// For now, ensuring 'price' is present.
interface MappedProductForAffiliateSection {
  id: string; // AffiliateProductsSection Product id is string
  name: string;
  price: number;
  category?: string;
  imageUrl?: string;
  status?: string;
  creator?: string;
  // Optional fields from AffiliatesTab.Product, if strictly needed by AffiliateProductsSection
  title?: string;
  type?: string;
  createdById?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}


interface MyAffiliateProductsProps {
  products: AffiliateProduct[]; // From use-affiliate-dashboard (id: number, price: number)
  onEdit: (product: any) => void; // Change 'any' to a more specific type if possible
  onDelete: (product: any) => void; // Change 'any' to a more specific type if possible
  onAddAffiliate: () => void; // This prop name might be confusing here; AffiliateProductsSection has onLinkProductToAffiliate
  onViewProducts: () => void;
}

export const MyAffiliateProducts = ({
  products,
  onEdit,
  onDelete,
  onAddAffiliate, // Consider renaming or re-evaluating this prop for clarity if passed to AffiliateProductsSection
  onViewProducts
}: MyAffiliateProductsProps) => {

  // Map AffiliateProduct from the hook to the structure expected by AffiliateProductsSection
  const mappedProducts: MappedProductForAffiliateSection[] = products.map(p => ({
    id: String(p.id), // Ensure id is string for AffiliateProductsSection
    name: p.name,
    price: p.price,
    imageUrl: p.imageUrl,
    // category: p.category, // If AffiliateProduct had category
    // title: p.name, // Example mapping
  }));

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
          products={mappedProducts} // Pass mapped products
          onEditProduct={onEdit} // Prop name for AffiliateProductsSection
          onDeleteProduct={onDelete} // Prop name for AffiliateProductsSection
          // onAddAffiliate is not a direct prop of AffiliateProductsSection.
          // It has onLinkProductToAffiliate. If onAddAffiliate is meant for something else, keep it separate.
          // For now, assuming onAddAffiliate is not directly passed if it doesn't match a prop.
          // If onAddAffiliate was intended for the "Link Product" action, it needs different parameters.
          onLinkProductToAffiliate={(productId, affiliateId) => {
            console.log(`Link product ${productId} to affiliate ${affiliateId} from MyAffiliateProducts`);
            // onAddAffiliate might be called here or related logic.
            // Current onAddAffiliate() has no params.
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
