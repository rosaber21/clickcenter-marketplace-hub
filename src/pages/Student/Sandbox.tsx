
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LessonLogin } from "@/components/student/LessonLogin";

export default function StudentSandbox() {
  const [progress, setProgress] = useState(13);
  const [count, setCount] = useState(0);
  const { toast } = useToast();

  const incrementProgress = () => {
    setProgress((prev) => Math.min(prev + 10, 100));
  };

  const decrementProgress = () => {
    setProgress((prev) => Math.max(prev - 10, 0));
  };
  
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Área de Testes</h1>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="forms">Formulários</TabsTrigger>
          <TabsTrigger value="progress">Progresso</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interações Básicas</CardTitle>
              <CardDescription>Teste diferentes componentes interativos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => toast({ title: "Botão clicado", description: "Este é um toast de exemplo" })}>
                  Mostrar Toast
                </Button>
                <Button variant="outline" onClick={() => setCount(count + 1)}>
                  Contagem: {count}
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Abrir Modal</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Exemplo de Modal</DialogTitle>
                      <DialogDescription>
                        Este é um exemplo de um componente de diálogo modal.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      Conteúdo do modal pode ser colocado aqui.
                    </div>
                    <DialogFooter>
                      <Button type="button">Confirmar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Login da Aula</CardTitle>
              <CardDescription>Entre na aula utilizando seu código e ID de aluno</CardDescription>
            </CardHeader>
            <CardContent>
              <LessonLogin 
                onLoginSuccess={(data) => {
                  console.log("Login bem-sucedido:", data);
                }} 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Formulário Simples</CardTitle>
              <CardDescription>Exemplo de inputs e campos de texto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label htmlFor="name" className="text-sm font-medium mb-2 block">Nome</label>
                  <Input id="name" placeholder="Digite seu nome" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium mb-2 block">Email</label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <Button>Enviar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Barra de Progresso</CardTitle>
              <CardDescription>Controle o progresso usando os botões abaixo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} className="h-2" />
              <div className="text-sm text-muted-foreground text-center">
                {progress}%
              </div>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={decrementProgress}>Diminuir</Button>
                <Button variant="outline" onClick={incrementProgress}>Aumentar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
