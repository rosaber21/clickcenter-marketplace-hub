
import React from "react";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
    <div>
      <div className="flex justify-end mb-4">
        <Button 
          onClick={onAddAffiliate} 
          className="gap-2"
        >
          <Plus size={16} />
          <span>Adicionar Novo Produto</span>
        </Button>
      </div>
      
      <ProductsTable
        products={products}
        onEdit={onEdit}
        onDelete={onDelete}
        showAffiliateButton={true}
        onViewDetails={(product) => onEdit(product)}
      />
    </div>
  );
};
