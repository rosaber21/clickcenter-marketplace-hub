
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  ArrowUpDown,
  Edit,
  Trash,
  Eye,
  BarChart
} from "lucide-react";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreatorProducts() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [sortOption, setSortOption] = useState("recentes");

  // Mock product data
  const products = [
    {
      id: "prod1",
      name: "Curso de Marketing Digital",
      price: 297.00,
      category: "curso",
      sales: 128,
      status: "active",
      date: "2025-03-15"
    },
    {
      id: "prod2",
      name: "Ebook: Estratégias de Vendas",
      price: 47.00,
      category: "ebook",
      sales: 342,
      status: "active",
      date: "2025-04-02"
    },
    {
      id: "prod3",
      name: "Mentorias de Negócios",
      price: 997.00,
      category: "mentoria",
      sales: 56,
      status: "active",
      date: "2025-01-20"
    },
    {
      id: "prod4",
      name: "Workshop de Estratégias",
      price: 127.00,
      category: "workshop",
      sales: 89,
      status: "inactive",
      date: "2024-11-10"
    }
  ];

  const handleAddProduct = () => {
    toast({
      title: "Adicionar Produto",
      description: "Formulário de adição de produto aberto",
    });
  };

  const handleViewProduct = (id: string) => {
    toast({
      title: "Visualizar Produto",
      description: `Visualizando produto ${id}`,
    });
  };

  const handleEditProduct = (id: string) => {
    toast({
      title: "Editar Produto",
      description: `Editando produto ${id}`,
    });
  };

  const handleDeleteProduct = (id: string) => {
    toast({
      title: "Excluir Produto",
      description: `Excluindo produto ${id}`,
      variant: "destructive",
    });
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (selectedCategory === "todos" || product.category === selectedCategory)
  );

  return (
    <CreatorLayout>
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-primary">Produtos</h1>
            <p className="text-muted-foreground">Gerencie todos os seus produtos digitais</p>
          </div>
          
          <Button 
            className="flex items-center gap-2 mt-4 md:mt-0"
            onClick={handleAddProduct}
          >
            <Plus size={16} />
            Adicionar Produto
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filtrar Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar produtos" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <Filter size={16} />
                    <SelectValue placeholder="Categoria" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as categorias</SelectItem>
                  <SelectItem value="curso">Cursos</SelectItem>
                  <SelectItem value="ebook">Ebooks</SelectItem>
                  <SelectItem value="mentoria">Mentorias</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <ArrowUpDown size={16} />
                    <SelectValue placeholder="Ordenar por" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recentes">Mais recentes</SelectItem>
                  <SelectItem value="antigos">Mais antigos</SelectItem>
                  <SelectItem value="vendas">Mais vendidos</SelectItem>
                  <SelectItem value="preco-alto">Maior preço</SelectItem>
                  <SelectItem value="preco-baixo">Menor preço</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid gap-4">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="bg-gray-100 p-6 flex items-center justify-center md:w-24">
                    <Package size={32} className="text-gray-500" />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <span className="capitalize">{product.category}</span>
                          <span>•</span>
                          <span className={product.status === "active" ? "text-green-600" : "text-gray-400"}>
                            {product.status === "active" ? "Ativo" : "Inativo"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-md">
                          <BarChart size={14} />
                          <span>{product.sales} vendas</span>
                        </div>
                        <div className="font-semibold">
                          R$ {product.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleViewProduct(product.id)}
                      >
                        <Eye size={14} />
                        <span>Visualizar</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit size={14} />
                        <span>Editar</span>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash size={14} />
                        <span>Excluir</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </CreatorLayout>
  );
}
