
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Tag, Users, ArrowLeft, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

// Components
import { AffiliateHero } from "@/components/affiliates/AffiliateHero";
import { CategoriesSection } from "@/components/affiliates/CategoriesSection";
import { AffiliateRanking } from "@/components/affiliates/AffiliateRanking";
import { FaqSection } from "@/components/affiliates/FaqSection";

// Data
import { affiliateCategories, topAffiliates } from "@/data/affiliateData";

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
      variant: "success",
    });
  };

  const handleViewProducts = (categoryId: number) => {
    // Navegação para a página de produtos da categoria
    navigate(`/afiliados/categoria/${categoryId}`);
    toast({
      title: "Carregando produtos",
      description: `Visualizando produtos da categoria ${affiliateCategories.find(cat => cat.id === categoryId)?.name}`,
      variant: "success",
    });
  };
  
  const handleBackToHome = () => {
    navigate("/");
    toast({
      title: "Voltando para a página inicial",
      description: "Redirecionando...",
    });
  };
  
  const handleHowItWorks = () => {
    navigate("/afiliados/como-funciona");
    toast({
      title: "Como funciona",
      description: "Saiba mais sobre nosso programa de afiliados",
    });
  };

  const handleLearnMore = (categoryName: string) => {
    // Navegação para a página de detalhes da categoria
    toast({
      title: "Saiba Mais",
      description: `Detalhes sobre a categoria ${categoryName}`,
      variant: "success",
    });
    navigate(`/afiliados/detalhes-categoria/${categoryName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={handleBackToHome}
          className="gap-2 hover:bg-muted/50"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para início
        </Button>
        
        <Button 
          variant="outline"
          onClick={handleHowItWorks}
        >
          Como funciona?
        </Button>
      </div>
      
      {/* Hero section */}
      <AffiliateHero onAffiliateSignup={handleAffiliateSignup} />
      
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
        <TabsContent value="categories" className="mt-0">
          <CategoriesSection 
            categories={affiliateCategories} 
            onViewProducts={handleViewProducts}
            onLearnMore={handleLearnMore}
          />
        </TabsContent>

        <TabsContent value="ranking" className="mt-0">
          <AffiliateRanking 
            affiliates={topAffiliates} 
            onAffiliateSignup={handleAffiliateSignup}
          />
        </TabsContent>
      </Tabs>

      {/* FAQ Section */}
      <FaqSection />
    </div>
  );
};

export default AffiliateCategories;
