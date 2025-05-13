
import React from "react";
import { ProductsTable } from "@/components/admin/products/ProductsTable";

interface Product {
  name: string;
  creator: string;
  category: string;
  price: string;
  status: "Ativo" | "Pendente";
}

interface AffiliateProductsSectionProps {
  products: Product[];
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
  onAddAffiliate: () => void;
}

export const AffiliateProductsSection: React.FC<AffiliateProductsSectionProps> = ({
  products,
  onEdit,
  onDelete,
  onAddAffiliate
}) => {
  return (
    <ProductsTable
      products={products}
      onEdit={onEdit}
      onDelete={onDelete}
      onAddAffiliate={onAddAffiliate}
      showAffiliateButton={true}
    />
  );
};
