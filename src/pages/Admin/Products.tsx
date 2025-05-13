
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { AddProductDialog } from "@/components/admin/products/AddProductDialog";
import { ProductFormValues } from "@/components/admin/products/AddProductForm";
import { useNavigate } from "react-router-dom";

// Sample product data
const sampleProducts = [
  {
    name: "Curso de Marketing Digital",
    creator: "João Silva",
    category: "Marketing",
    price: "€ 149,90",
    status: "Ativo" as const
  },
  {
    name: "E-book Gestão Financeira",
    creator: "Maria Oliveira",
    category: "Finanças",
    price: "€ 29,90",
    status: "Ativo" as const
  }
];

export default function AdminProducts() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState(sampleProducts);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (values: ProductFormValues) => {
    setIsSubmitting(true);
    
    // Simulando um atraso na API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Produto adicionado:", values);
    
    // Add the new product to the list
    const newProduct = {
      name: values.name,
      creator: values.creator,
      category: values.category,
      price: `€ ${values.price}`,
      status: "Ativo" as const
    };
    
    setProducts([...products, newProduct]);
    
    toast({
      title: "Produto adicionado com sucesso!",
      variant: "success",
    });
    
    setIsSubmitting(false);
    setOpen(false);
  };

  const handleEdit = (product: typeof products[0]) => {
    console.log("Editar produto:", product);
    toast({
      title: "Editando produto",
      description: `${product.name}`,
      variant: "default",
    });
    navigate(`/admin/produtos/editar/${product.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleDelete = (product: typeof products[0]) => {
    console.log("Excluir produto:", product);
    toast({
      title: "Tem certeza que deseja excluir?",
      description: `Produto: ${product.name}`,
      variant: "destructive",
    });
    // Implementação real teria uma confirmação adicional
  };
  
  const handleViewDetails = (product: typeof products[0]) => {
    console.log("Visualizar detalhes:", product);
    toast({
      title: "Visualizando detalhes",
      description: `${product.name}`,
      variant: "default",
    });
    navigate(`/admin/produtos/detalhes/${product.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
          <Button className="gap-2" onClick={() => setOpen(true)}>
            <Plus size={16} />
            <span>Adicionar Produto</span>
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Lista de Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProductsTable 
              products={products} 
              onEdit={handleEdit} 
              onDelete={handleDelete}
              onViewDetails={handleViewDetails}
            />
          </CardContent>
        </Card>
      </div>

      <AddProductDialog 
        open={open} 
        onOpenChange={setOpen} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </>
  );
}
