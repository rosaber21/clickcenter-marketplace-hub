
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AddProductDialog } from "@/components/admin/products/AddProductDialog";
import { ProductFormValues } from "@/components/admin/products/AddProductForm";

interface ProductDialogHandlerProps {
  products: Array<{
    name: string;
    creator: string;
    category: string;
    price: string;
    status: "Ativo" | "Pendente";
  }>;
  setProducts: React.Dispatch<React.SetStateAction<Array<{
    name: string;
    creator: string;
    category: string;
    price: string;
    status: "Ativo" | "Pendente";
  }>>>;
}

export const ProductDialogHandler: React.FC<ProductDialogHandlerProps> = ({ 
  products, 
  setProducts 
}) => {
  const { toast } = useToast();
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const handleOpenProductDialog = () => {
      setProductDialogOpen(true);
    };
    
    document.addEventListener('openProductDialog', handleOpenProductDialog);
    
    return () => {
      document.removeEventListener('openProductDialog', handleOpenProductDialog);
    };
  }, []);

  const handleAddProduct = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    
    // Simulating API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add the new product
    const newProduct = {
      name: values.name,
      creator: "You",
      category: values.category,
      price: `€ ${values.price}`,
      status: "Pendente" as const
    };
    
    setProducts([...products, newProduct]);
    
    toast({
      title: "Produto adicionado com sucesso!",
      description: "Seu novo produto está aguardando aprovação.",
      variant: "success",
    });
    
    setIsSubmitting(false);
    setProductDialogOpen(false);
  };

  return (
    <AddProductDialog
      open={productDialogOpen}
      onOpenChange={setProductDialogOpen}
      onSubmit={handleAddProduct}
      isSubmitting={isSubmitting}
    />
  );
};
