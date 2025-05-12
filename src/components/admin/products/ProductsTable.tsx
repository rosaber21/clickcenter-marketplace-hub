
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

interface Product {
  name: string;
  creator: string;
  category: string;
  price: string;
  status: "Ativo" | "Inativo" | "Pendente";
}

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onAddProduct?: () => void;
  onAddAffiliate?: () => void;
  showAffiliateButton?: boolean;
}

export const ProductsTable = ({ 
  products, 
  onEdit, 
  onDelete,
  onAddProduct,
  onAddAffiliate,
  showAffiliateButton = false
}: ProductsTableProps) => {
  return (
    <div>
      {(onAddProduct || onAddAffiliate) && (
        <div className="flex justify-end mb-4 gap-2">
          {onAddProduct && (
            <Button 
              onClick={onAddProduct} 
              className="gap-2"
            >
              <Plus size={16} />
              <span>Adicionar Produto</span>
            </Button>
          )}
          
          {showAffiliateButton && onAddAffiliate && (
            <Button 
              onClick={onAddAffiliate}
              variant="secondary" 
              className="gap-2"
            >
              <Plus size={16} />
              <span>Adicionar Afiliado</span>
            </Button>
          )}
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Criador</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.creator}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <span className={`rounded-full px-2 py-1 text-xs ${
                  product.status === "Ativo" ? "bg-green-100 text-green-800" : 
                  product.status === "Pendente" ? "bg-yellow-100 text-yellow-800" : 
                  "bg-red-100 text-red-800"
                }`}>
                  {product.status}
                </span>
              </TableCell>
              <TableCell className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onEdit(product)}
                >
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500"
                  onClick={() => onDelete(product)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
