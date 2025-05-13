
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AffiliateProducts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Sample product data that affiliates can promote
  const products = [
    {
      id: 1,
      name: "Curso de Marketing Digital",
      creator: "João Silva",
      category: "Marketing",
      price: "€ 149,90",
      commission: "€ 45,00",
      status: "available"
    },
    {
      id: 2,
      name: "E-book Gestão Financeira",
      creator: "Maria Oliveira",
      category: "Finanças",
      price: "€ 29,90",
      commission: "€ 9,00",
      status: "available"
    },
    {
      id: 3,
      name: "Curso de Desenvolvimento Web",
      creator: "Carlos Pereira",
      category: "Tecnologia",
      price: "€ 199,90",
      commission: "€ 60,00",
      status: "available"
    },
    {
      id: 4,
      name: "Mentoria de Empreendedorismo",
      creator: "Ana Sousa",
      category: "Negócios",
      price: "€ 299,90",
      commission: "€ 90,00",
      status: "available"
    },
    {
      id: 5,
      name: "Podcast Premium: Investimentos",
      creator: "Roberto Castro",
      category: "Finanças",
      price: "€ 19,90",
      commission: "€ 6,00",
      status: "available"
    }
  ];

  // Filter products by search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePromote = (productId: number) => {
    const product = products.find(p => p.id === productId);
    toast({
      title: "Link de afiliado gerado",
      description: `Agora você está promovendo ${product?.name}`,
      variant: "success",
    });
  };

  const handleBackToCategories = () => {
    navigate("/afiliados");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-500">Disponível</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="container py-6 space-y-6">
      <Button 
        variant="ghost" 
        onClick={handleBackToCategories}
        className="gap-2 hover:bg-muted/50"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para categorias
      </Button>
      
      <div>
        <h1 className="text-3xl font-bold mb-2">Produtos para Afiliação</h1>
        <p className="text-muted-foreground">
          Escolha os produtos que você deseja promover como afiliado
        </p>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">
            Lista de Produtos Disponíveis
          </CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar produtos..." 
              className="pl-9" 
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Criador</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Comissão</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.creator}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell className="text-green-600 font-medium">{product.commission}</TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handlePromote(product.id)}
                    >
                      Promover
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateProducts;
