
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Tag, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    </MainLayout>
  );
};

export default AffiliateCategories;
