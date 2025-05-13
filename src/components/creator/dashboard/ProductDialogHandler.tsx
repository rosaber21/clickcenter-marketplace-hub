
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
  const [productMedia, setProductMedia] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  
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
    
    // Handling the media upload if a file was selected
    if (productMedia) {
      // In a real application, this would upload the file to a server or Supabase storage
      console.log("Uploading media:", productMedia.name, "Type:", mediaType);
      
      // For now, just log that we would upload the file
      toast({
        title: mediaType === "video" ? "Vídeo do produto enviado" : "Imagem do produto enviada",
        description: `Arquivo: ${productMedia.name}`,
        variant: "success",
      });
    }
    
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
    setProductMedia(null); // Reset the media state
    setMediaType(null); // Reset the media type
  };
  
  const handleMediaChange = (file: File | null) => {
    setProductMedia(file);
    
    if (file) {
      // Determine if the file is an image or video
      const fileType = file.type.split('/')[0];
      setMediaType(fileType === 'video' ? 'video' : 'image');
    } else {
      setMediaType(null);
    }
  };

  return (
    <AddProductDialog
      open={productDialogOpen}
      onOpenChange={setProductDialogOpen}
      onSubmit={handleAddProduct}
      isSubmitting={isSubmitting}
      onMediaChange={handleMediaChange}
      productMedia={productMedia}
      mediaType={mediaType}
    />
  );
};
