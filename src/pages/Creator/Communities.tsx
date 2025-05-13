
import React from "react";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { Button } from "@/components/ui/button";
import { Globe, Users, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Communities = () => {
  const [activeTab, setActiveTab] = React.useState("all");

  return (
    <CreatorLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Comunidades</h1>
            <p className="text-muted-foreground">
              Gerencie suas comunidades e grupos de discussão
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Nova Comunidade
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="active">Ativas</TabsTrigger>
            <TabsTrigger value="archived">Arquivadas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <CommunityCard key={item} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2].map((item) => (
                <CommunityCard key={item} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="archived">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <CommunityCard archived />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </CreatorLayout>
  );
};

const CommunityCard = ({ archived = false }) => {
  return (
    <Card className={archived ? "opacity-70" : ""}>
      <CardHeader>
        <CardTitle>Comunidade {archived ? "Arquivada" : "Ativa"}</CardTitle>
        <CardDescription>
          {archived 
            ? "Esta comunidade está arquivada" 
            : "Uma comunidade ativa com membros engajados"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">128 membros</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">47 discussões</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Configurações
        </Button>
        <Button size="sm">
          Visualizar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Communities;
