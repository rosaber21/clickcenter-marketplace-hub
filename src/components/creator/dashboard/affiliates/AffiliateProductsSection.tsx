
import React from "react";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AffiliateProduct } from "@/hooks/use-affiliate-dashboard";

interface AffiliateProductsSectionProps {
  products: AffiliateProduct[];
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
