
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard"; // Assuming ProductCard expects Product
import { LinkIcon } from "lucide-react";

// Assuming Product type. Should ideally come from a central types file.
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string; // ProductCard likely uses this
  category?: string;  // And this
  creator?: string; // And this
  // Add other fields ProductCard might need, ensure they are present in sample data
  description?: string; 
  status?: string;
}

interface AffiliateProductsSectionProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
  onLinkProductToAffiliate: (productId: string, affiliateId: string) => void; // Example
}

export const AffiliateProductsSection: React.FC<AffiliateProductsSectionProps> = ({
  products, // This is now Product[]
  onEditProduct,
  onDeleteProduct,
  onLinkProductToAffiliate,
}) => {
  // Sample data, ensure it matches the Product interface and what ProductCard expects
  // This data is now of type Product[]
  const sampleProductsData: Product[] = products.length > 0 ? products : [
    { 
      id: 'prod101', 
      name: 'Curso Completo de Design UX/UI', 
      price: 199.90, 
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFzaGJvYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', 
      category: 'Design',
      creator: 'Estúdio Criativo',
      description: 'Aprenda os fundamentos e técnicas avançadas de UX/UI design.',
      status: 'active',
    },
    { 
      id: 'prod102', 
      name: 'Masterclass de Fotografia Profissional', 
      price: 249.00, 
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y291cnNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', 
      category: 'Fotografia',
      creator: 'FotoPro Academy',
      description: 'Domine a arte da fotografia com esta masterclass completa.',
      status: 'active',
    },
  ];


  if (!sampleProductsData || sampleProductsData.length === 0) {
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
          {sampleProductsData.map((product) => (
            <div key={product.id} className="relative group">
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
