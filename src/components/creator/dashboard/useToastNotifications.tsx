
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useToastNotifications = () => {
  const navigate = useNavigate();
  
  const handleViewAllProducts = () => {
    toast("All Products", {
      description: "Redirecting to products page",
    });
    navigate("/meus-produtos");
  };

  const handleManageAffiliates = () => {
    toast.success("Gerenciar Afiliados", {
      description: "Acessando página de gerenciamento de afiliados",
    });
    // Navigation is now handled in the component to avoid duplicate navigations
  };

  const handleEditProduct = (product: any) => {
    toast("Edit Product", {
      description: "Editing product details",
    });
  };

  const handleDeleteProduct = (product: any) => {
    toast.error("Delete Product", {
      description: "Are you sure you want to delete this product?",
    });
  };
  
  return {
    handleViewAllProducts,
    handleManageAffiliates,
    handleEditProduct,
    handleDeleteProduct
  };
};
