
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ProductsTable } from "@/components/admin/products/ProductsTable";
import { AddProductDialog } from "@/components/admin/products/AddProductDialog";
import { ProductFormValues } from "@/components/admin/products/AddProductForm";

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
    // A edição será implementada em uma futura iteração
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A edição de produtos será implementada em breve.",
      variant: "default",
    });
  };

  const handleDelete = (product: typeof products[0]) => {
    console.log("Excluir produto:", product);
    // A exclusão seria implementada com uma confirmação adicional
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A exclusão de produtos será implementada em breve.",
      variant: "default",
    });
  };

  return (
    <AdminLayout>
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
    </AdminLayout>
  );
}
