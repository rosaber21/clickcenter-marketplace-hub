
import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Video, Users, FileText, MessageSquare, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CoursePreview() {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold text-primary">Ative a sua Máquina do Dólar</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Visualização do Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Esta é uma prévia de como seu curso aparecerá para os alunos. Você pode verificar o conteúdo, 
              as configurações e outros aspectos antes de publicar.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Prévia do Vídeo do Curso</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Ative a sua Máquina do Dólar</h2>
                <p className="text-muted-foreground">
                  Aprenda a criar sistemas automatizados para gerar receita passiva em dólares.
                </p>
                
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center gap-1">
                    <Video className="h-4 w-4" />
                    <span>12 Módulos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>24 Lições</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>328 Alunos</span>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Editar Curso
                  </Button>
                  <Button variant="secondary" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Suporte
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="conteudo">
          <TabsList className="mb-4">
            <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
            <TabsTrigger value="vitrine">Vitrine</TabsTrigger>
            <TabsTrigger value="cadastro">Cadastro gratuito</TabsTrigger>
          </TabsList>
          
          <TabsContent value="conteudo">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {Array.from({length: 3}).map((_, i) => (
                    <div key={i} className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Módulo {i + 1}: Introdução ao Mercado Digital</h3>
                      <div className="space-y-2">
                        {Array.from({length: 3}).map((_, j) => (
                          <div key={j} className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center gap-2">
                              <Video className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Aula {j + 1}: Conceitos Básicos</span>
                            </div>
                            <span className="text-xs text-muted-foreground">10:45</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vitrine">
            <Card>
              <CardContent className="pt-6">
                <p>Informações da vitrine do curso serão exibidas aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cadastro">
            <Card>
              <CardContent className="pt-6">
                <p>Configurações de cadastro gratuito serão exibidas aqui.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
