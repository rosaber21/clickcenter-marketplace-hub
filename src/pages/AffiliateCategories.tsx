
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Tag, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for affiliate categories
const affiliateCategories = [
  { 
    id: 1, 
    name: "Tecnologia", 
    description: "Produtos digitais relacionados a tecnologia e programação", 
    productCount: 120,
    icon: "💻",
    commission: "até 40%"
  },
  { 
    id: 2, 
    name: "Marketing Digital", 
    description: "Ferramentas e cursos para marketing digital", 
    productCount: 85,
    icon: "📱",
    commission: "até 30%"
  },
  { 
    id: 3, 
    name: "Finanças", 
    description: "Cursos e e-books sobre finanças pessoais e investimentos", 
    productCount: 72,
    icon: "💰",
    commission: "até 25%"
  },
  { 
    id: 4, 
    name: "Saúde e Bem-estar", 
    description: "Produtos relacionados a saúde física e mental", 
    productCount: 54,
    icon: "🧘",
    commission: "até 35%"
  },
  { 
    id: 5, 
    name: "Educação", 
    description: "Cursos online e material didático", 
    productCount: 98,
    icon: "📚",
    commission: "até 45%"
  },
  { 
    id: 6, 
    name: "Estilo de Vida", 
    description: "Produtos sobre viagens, culinária e hobbies", 
    productCount: 63,
    icon: "✈️",
    commission: "até 20%"
  }
];

// Mock data for top affiliates
const topAffiliates = [
  { 
    id: 1, 
    name: "João Silva", 
    sales: 538, 
    earnings: "R$ 25.430", 
    avatar: "https://i.pravatar.cc/150?img=1" 
  },
  { 
    id: 2, 
    name: "Ana Costa", 
    sales: 492, 
    earnings: "R$ 21.850", 
    avatar: "https://i.pravatar.cc/150?img=5" 
  },
  { 
    id: 3, 
    name: "Carlos Mendes", 
    sales: 427, 
    earnings: "R$ 18.720", 
    avatar: "https://i.pravatar.cc/150?img=12" 
  }
];

const AffiliateCategories = () => {
  const [selectedTab, setSelectedTab] = useState("categories");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAffiliateSignup = () => {
    // Navegando para a página de login
    navigate("/login");
    toast({
      title: "Redirecionando para cadastro",
      description: "Você precisa fazer login para se tornar um afiliado.",
    });
  };

  const handleViewProducts = (categoryId: number) => {
    // Navegação para a página de produtos da categoria
    navigate(`/afiliados/categoria/${categoryId}`);
    toast({
      title: "Carregando produtos",
      description: `Visualizando produtos da categoria ${affiliateCategories.find(cat => cat.id === categoryId)?.name}`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Hero section */}
        <div className="relative rounded-lg bg-gradient-to-r from-primary/80 to-secondary/80 p-8 text-white mb-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Programa de Afiliados</h1>
            <p className="text-lg mb-6">
              Promova produtos digitais e físicos de alta qualidade e ganhe comissões atrativas. 
              Junte-se a milhares de afiliados que já estão lucrando com nosso programa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="default" 
                className="bg-white text-primary hover:bg-gray-100"
                onClick={handleAffiliateSignup}
              >
                Seja um Afiliado
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/afiliados/como-funciona")}
              >
                Saiba Mais
              </Button>
            </div>
          </div>
          <div className="absolute right-10 bottom-0 hidden lg:block">
            <div className="text-7xl">🚀</div>
          </div>
        </div>
        
        {/* Navigation and filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Categorias para Afiliação</h2>
            <p className="text-muted-foreground">
              Escolha uma categoria para ver os produtos disponíveis para afiliação
            </p>
          </div>
          
          <Tabs defaultValue="categories" className="w-full md:w-auto" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="categories">
                <Tag className="mr-2 h-4 w-4" />
                Categorias
              </TabsTrigger>
              <TabsTrigger value="ranking">
                <Users className="mr-2 h-4 w-4" />
                Ranking
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-0">
          <TabsContent value="categories" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {affiliateCategories.map((category) => (
                <div key={category.id} className="group">
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group-hover:scale-[1.02]">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="text-3xl mb-2">{category.icon}</div>
                        <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20">
                          {category.commission}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {category.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {category.productCount} produtos disponíveis para afiliação
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="ghost" 
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                        onClick={() => handleViewProducts(category.id)}
                      >
                        Ver Produtos
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
            
            {/* How it works section */}
            <div className="mt-12 bg-muted/40 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Como Funciona o Programa de Afiliados</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4">1</div>
                  <h4 className="font-semibold text-lg mb-2">Cadastre-se</h4>
                  <p className="text-muted-foreground">
                    Faça seu cadastro como afiliado em nossa plataforma e aguarde a aprovação
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4">2</div>
                  <h4 className="font-semibold text-lg mb-2">Escolha Produtos</h4>
                  <p className="text-muted-foreground">
                    Selecione os produtos que deseja promover e gere seus links de afiliado
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4">3</div>
                  <h4 className="font-semibold text-lg mb-2">Receba Comissões</h4>
                  <p className="text-muted-foreground">
                    Acompanhe suas vendas e receba comissões diretamente na sua conta
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ranking" className="mt-0">
            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Top Afiliados do Mês</h3>
                <p className="text-muted-foreground mb-6">
                  Os afiliados com melhor desempenho neste mês. Seja o próximo!
                </p>
                
                <div className="space-y-6">
                  {topAffiliates.map((affiliate, index) => (
                    <div key={affiliate.id} className="flex items-center gap-4 p-4 rounded-lg border bg-muted/20">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={affiliate.avatar} 
                          alt={affiliate.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{affiliate.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {affiliate.sales} vendas
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{affiliate.earnings}</p>
                        <p className="text-sm text-muted-foreground">
                          em comissões
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Join banner */}
            <div className="mt-8 p-8 rounded-lg bg-gradient-to-r from-secondary/80 to-primary text-white">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Quer aparecer neste ranking?</h3>
                  <p className="opacity-90">
                    Junte-se ao nosso programa de afiliados e comece a ganhar comissões agora mesmo!
                  </p>
                </div>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={handleAffiliateSignup}
                >
                  Comece Agora
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <div className="bg-muted/30 rounded-lg p-8 mt-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Como recebo minhas comissões?</h4>
              <p className="text-muted-foreground">
                As comissões são pagas mensalmente via transferência bancária, PayPal ou Pix, de acordo com sua preferência.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Qual é o percentual de comissão?</h4>
              <p className="text-muted-foreground">
                As comissões variam de 10% a 50%, dependendo da categoria e do produto específico.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Por quanto tempo recebo comissões?</h4>
              <p className="text-muted-foreground">
                O cookie de afiliado tem duração de 30 dias, garantindo comissão em compras futuras dentro deste período.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">Posso promover os produtos em qualquer lugar?</h4>
              <p className="text-muted-foreground">
                Sim, você pode promover em sites, blogs, redes sociais e e-mail marketing, seguindo nossas políticas éticas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AffiliateCategories;
