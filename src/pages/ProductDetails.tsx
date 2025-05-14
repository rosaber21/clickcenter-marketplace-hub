
import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProductImages } from "@/components/products/ProductImages";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductNotFound } from "@/components/products/ProductNotFound";
import { useProductDetails } from "@/hooks/use-product-details";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { product, creator, handleAddToCart, handleBuyNow, handleBackToProducts } = useProductDetails(id);
  
  // Se o produto não for encontrado, mostra uma mensagem
  if (!product) {
    return (
      <div className="container py-6">
        <ProductNotFound />
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={handleBackToProducts}
          className="gap-2 hover:bg-muted/50"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para Produtos
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galeria de imagens */}
        <ProductImages images={product.images || []} title={product.title} />
        
        {/* Informações do produto */}
        <ProductInfo 
          product={product} 
          creator={creator}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
