
import React, { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Search, Filter, Tag, ShoppingBag, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Product } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [activeFilter, setActiveFilter] = useState<"all" | "digital" | "physical">("all");
  const [animate, setAnimate] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && product.type === activeFilter;
  });

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Produto adicionado ao carrinho",
      description: `${product.title} foi adicionado ao seu carrinho.`,
    });
    // Aqui adicionaria ao contexto do carrinho
  };

  const handleViewAllProducts = () => {
    // Scroll to products section
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLearnMore = () => {
    // Navigate to about or info page
    navigate("/afiliados");
  };

  return (
    <MainLayout>
      {/* Hero Banner */}
      <div 
        className="relative overflow-hidden rounded-lg mb-8 bg-gradient-to-r from-primary to-secondary text-white"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.5s ease-out"
        }}
      >
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="relative z-20 px-6 py-16 sm:py-24 sm:px-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Descubra Produtos Incríveis
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore nossa seleção exclusiva de produtos digitais e físicos criados por especialistas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={handleViewAllProducts}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Ver Produtos
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20"
              onClick={handleLearnMore}
            >
              <Zap className="mr-2 h-5 w-5" />
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div 
        className="space-y-6 mb-8"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s ease-out 0.2s"
        }}
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar produtos..."
              className="w-full pl-10 h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 self-start">
            <Button 
              variant={activeFilter === "all" ? "default" : "outline"} 
              className="gap-2"
              onClick={() => setActiveFilter("all")}
            >
              <Filter className="h-4 w-4" />
              Todos
            </Button>
            <Button 
              variant={activeFilter === "digital" ? "default" : "outline"} 
              className="gap-2"
              onClick={() => setActiveFilter("digital")}
            >
              <Tag className="h-4 w-4" />
              Digitais
            </Button>
            <Button 
              variant={activeFilter === "physical" ? "default" : "outline"} 
              className="gap-2"
              onClick={() => setActiveFilter("physical")}
            >
              <ShoppingBag className="h-4 w-4" />
              Físicos
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div 
        id="products-section"
        className="mb-12"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.5s ease-out 0.3s"
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Produtos em Destaque
          </h2>
          <Button 
            variant="link" 
            className="text-primary font-medium"
            onClick={() => setActiveFilter("all")}
          >
            Ver todos
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                style={{
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.5s ease-out ${0.3 + index * 0.1}s`
                }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              </div>
            ))
          ) : (
            <Card className="col-span-full py-12 text-center">
              <CardContent>
                <h2 className="text-xl font-medium mb-2">Nenhum produto encontrado</h2>
                <p className="text-muted-foreground">
                  Tente ajustar seus filtros de busca ou explore outras categorias.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(40px)",
          transition: "all 0.5s ease-out 0.4s"
        }}
      >
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Entrega Instantânea</h3>
            <p className="text-muted-foreground">Produtos digitais com acesso imediato após a compra.</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Produtos de Qualidade</h3>
            <p className="text-muted-foreground">Selecionados e aprovados por nossa equipe de especialistas.</p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Filter className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Suporte Dedicado</h3>
            <p className="text-muted-foreground">Atendimento personalizado para todas as suas dúvidas.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Index;
