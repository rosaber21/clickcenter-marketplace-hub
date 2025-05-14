
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";
import { LinkIcon } from "lucide-react";
import { Product as GlobalProduct } from "@/types"; // Import the global Product type

// The props will now expect an array of GlobalProduct
interface AffiliateProductsSectionProps {
  products: GlobalProduct[];
  onEditProduct: (product: GlobalProduct) => void;
  onDeleteProduct: (product: GlobalProduct) => void;
  onLinkProductToAffiliate: (productId: string, affiliateId: string) => void;
}

export const AffiliateProductsSection: React.FC<AffiliateProductsSectionProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
  onLinkProductToAffiliate,
}) => {
  // Sample data, ensure it matches the GlobalProduct interface and what ProductCard expects.
  // ProductCard is read-only, so we must adapt to its expected props.
  // Let's assume ProductCard can take a subset of GlobalProduct, or we map to its specific needs.
  // For now, we'll make sampleProductsData conform to GlobalProduct.
  const sampleProductsData: GlobalProduct[] = products.length > 0 ? products : [
    {
      id: 'prod101',
      title: 'Curso Completo de Design UX/UI', // Changed from name to title
      price: 199.90,
      images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'], // Changed from imageUrl
      type: 'digital', // Mapped from category
      createdById: 'user_estudio_criativo', // Mapped from creator
      description: 'Aprenda os fundamentos e técnicas avançadas de UX/UI design.',
      createdAt: new Date().toISOString(), // Added required field
      updatedAt: new Date().toISOString(), // Added required field
      // Fields from original local Product that ProductCard might use, if not covered by GlobalProduct directly
      // category: 'Design', // Now part of 'type' or custom metadata if needed
      // creator: 'Estúdio Criativo', // Now 'createdById'
      // status: 'active', // Not in GlobalProduct, remove or handle if ProductCard uses it
    },
    {
      id: 'prod102',
      title: 'Masterclass de Fotografia Profissional', // Changed from name to title
      price: 249.00,
      images: ['https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y291cnNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'], // Changed from imageUrl
      type: 'digital', // Mapped from category
      createdById: 'user_fotopro_academy', // Mapped from creator
      description: 'Domine a arte da fotografia com esta masterclass completa.',
      createdAt: new Date().toISOString(), // Added required field
      updatedAt: new Date().toISOString(), // Added required field
    },
  ];

  const displayProducts = sampleProductsData; // Use the transformed or received products

  if (!displayProducts || displayProducts.length === 0) {
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
          {displayProducts.map((product) => (
            <div key={product.id} className="relative group">
              {/* ProductCard expects 'product' prop. Ensure its type matches what ProductCard actually uses.
                  If ProductCard expects fields like `name`, `category`, `creator`, `imageUrl` specifically,
                  we might need to pass a slightly transformed product object or ensure GlobalProduct covers them.
                  For now, assuming ProductCard uses fields compatible with GlobalProduct (like `title`, `images`).
                  If `ProductCard` is very rigid and expects old fields, we'd need an adapter.
                  Given the error, it seems ProductCard or downstream wants the fields from GlobalProduct.
              */}
              <ProductCard product={product} />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onLinkProductToAffiliate(product.id, "someAffiliateId")} // Placeholder for affiliateId
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
