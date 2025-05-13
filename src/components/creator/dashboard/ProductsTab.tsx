
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { Video, Users } from "lucide-react";

interface Product {
  name: string;
  creator: string;
  category: string;
  price: string;
  status: "Ativo" | "Pendente";
}

interface ProductsTabProps {
  products: Product[];
  onEdit: (product: any) => void;
  onDelete: (product: any) => void;
  onAddProduct: () => void;
  onViewAllProducts: () => void;
  onEditVideos?: () => void;
  onManageMembers?: () => void;
}

export const ProductsTab = ({
  products,
  onEdit,
  onDelete,
  onAddProduct,
  onViewAllProducts,
  onEditVideos,
  onManageMembers
}: ProductsTabProps) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-primary/5 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-primary">My Products</CardTitle>
          <CardDescription>Manage your digital products</CardDescription>
        </div>
        <div className="flex gap-2">
          {onEditVideos && (
            <Button variant="secondary" onClick={onEditVideos} className="flex items-center gap-2">
              <Video size={16} />
              <span>Editar Vídeos</span>
            </Button>
          )}
          {onManageMembers && (
            <Button variant="outline" onClick={onManageMembers} className="flex items-center gap-2">
              <Users size={16} />
              <span>Área de Membros</span>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ProductsTable
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddProduct={onAddProduct}
        />
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="text-primary text-sm hover:text-primary/80 transition-colors flex items-center"
          onClick={onViewAllProducts}
        >
          See all products <span className="ml-1">→</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
