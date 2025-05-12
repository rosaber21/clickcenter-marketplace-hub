
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export default function StudentSandbox() {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [progress, setProgress] = useState(0);
  
  const incrementProgress = () => {
    setProgress(prev => Math.min(100, prev + 10));
    toast.success("Progresso atualizado!");
  };
  
  const resetProgress = () => {
    setProgress(0);
    toast.info("Progresso reiniciado!");
  };
  
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Formulário enviado com sucesso!");
    console.log("Form submitted:", formData);
    setFormData({ name: "", message: "" });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Área de Testes</h1>
        <p className="text-muted-foreground">
          Esta é uma área para testar componentes e funcionalidades.
        </p>
      </div>
      
      <Tabs defaultValue="buttons" className="w-full">
        <TabsList>
          <TabsTrigger value="buttons">Botões</TabsTrigger>
          <TabsTrigger value="forms">Formulários</TabsTrigger>
          <TabsTrigger value="progress">Progresso</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buttons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teste de Botões</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-2">Contagem atual: {count}</p>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => { 
                    setCount(count + 1);
                    toast.success("Incrementado com sucesso!");
                  }}>
                    Incrementar
                  </Button>
                  
                  <Button onClick={() => { 
                    setCount(count - 1);
                    toast.info("Decrementado com sucesso!");
                  }}
                  variant="outline">
                    Decrementar
                  </Button>
                  
                  <Button onClick={() => { 
                    setCount(0);
                    toast.info("Contador reiniciado!");
                  }} 
                  variant="secondary">
                    Resetar
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Variantes de Botões</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button>Padrão</Button>
                  <Button variant="secondary">Secundário</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Fantasma</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destrutivo</Button>
                  <Button disabled>Desabilitado</Button>
                  <Button size="sm">Pequeno</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teste de Formulários</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <label htmlFor="name">Nome</label>
                  <Input
                    id="name"
                    placeholder="Digite seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="grid w-full gap-1.5">
                  <label htmlFor="message">Mensagem</label>
                  <Textarea
                    id="message"
                    placeholder="Digite sua mensagem"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                
                <Button type="submit">Enviar Formulário</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teste de Progresso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="mb-2">Progresso atual: {progress}%</p>
                <Progress value={progress} className="h-2 mb-4" />
                <div className="flex flex-wrap gap-4">
                  <Button onClick={incrementProgress}>
                    Avançar 10%
                  </Button>
                  <Button onClick={resetProgress} variant="outline">
                    Reiniciar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
