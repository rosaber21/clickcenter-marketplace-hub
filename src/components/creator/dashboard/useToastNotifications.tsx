
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export const useToastNotifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleViewAllProducts = () => {
    toast({
      title: "All Products",
      description: "Redirecting to products page",
      variant: "default",
    });
    navigate("/meus-produtos");
  };

  const handleManageAffiliates = () => {
    toast({
      title: "Gerenciar Afiliados",
      description: "Acessando página de gerenciamento de afiliados",
      variant: "success", 
    });
    // Navigation is now handled in the component to avoid duplicate navigations
  };

  const handleEditProduct = (product: any) => {
    toast({
      title: "Edit Product",
      description: "Editing product details",
      variant: "default",
    });
  };

  const handleDeleteProduct = (product: any) => {
    toast({
      title: "Delete Product",
      description: "Are you sure you want to delete this product?",
      variant: "destructive",
    });
  };
  
  return {
    handleViewAllProducts,
    handleManageAffiliates,
    handleEditProduct,
    handleDeleteProduct
  };
};
