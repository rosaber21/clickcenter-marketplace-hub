
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";
import { useToast } from "@/components/ui/use-toast";

// Dados de exemplo para simular produtos
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Curso de Marketing Digital",
    description: "Aprenda técnicas avançadas de marketing digital para expandir seu negócio online.",
    price: 297.00,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085"],
    createdById: "creator1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Planilha de Gestão Financeira",
    description: "Organize suas finanças pessoais e empresariais com essa planilha completa.",
    price: 49.90,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f"],
    createdById: "creator2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "E-book: Produtividade sem Estresse",
    description: "Descubra como aumentar sua produtividade sem comprometer sua saúde mental.",
    price: 29.90,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1512820790803-83ca734da794"],
    createdById: "creator1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Kit de Agendas e Planners",
    description: "Kit completo com agendas físicas personalizadas e planners para organizar sua rotina.",
    price: 149.90,
    type: "physical",
    images: ["https://images.unsplash.com/photo-1517842645767-c639042777db"],
    createdById: "creator3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Curso de Photoshop Avançado",
    description: "Domine técnicas avançadas de edição de imagem e design gráfico com o Photoshop.",
    price: 397.00,
    type: "digital",
    images: ["https://images.unsplash.com/photo-1581291518857-4e27b48ff24e"],
    createdById: "creator2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Camiseta Exclusiva ClickCenter",
    description: "Camiseta premium de algodão com estampa exclusiva ClickCenter.",
    price: 89.90,
    type: "physical",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    createdById: "creator3",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>(MOCK_PRODUCTS);
  const { toast } = useToast();
  
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Produto adicionado ao carrinho",
      description: `${product.title} foi adicionado ao seu carrinho.`,
    });
    // Aqui adicionaria ao contexto do carrinho
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Descubra produtos incríveis
          </h1>
          <p className="text-muted-foreground">
            Explore nossa seleção de produtos físicos e digitais
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 whitespace-nowrap">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h2 className="text-xl font-medium mb-2">Nenhum produto encontrado</h2>
              <p className="text-muted-foreground">
                Tente ajustar seus filtros de busca ou explore outras categorias.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
