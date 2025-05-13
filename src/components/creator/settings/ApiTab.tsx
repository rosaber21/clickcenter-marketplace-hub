
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const ApiTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Chaves de API</CardTitle>
          <CardDescription>
            Gerencie suas chaves de API para integração com outras plataformas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-md p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Chave Principal</h4>
                <p className="text-sm text-muted-foreground">Criada em: 12/05/2025</p>
                <Badge variant="outline" className="mt-1">Produção</Badge>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <Input readOnly value="sk_live_************XXXX" className="font-mono" />
              <Button variant="outline" className="ml-2">
                Revelar
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Chave de Teste</h4>
                <p className="text-sm text-muted-foreground">Criada em: 12/05/2025</p>
                <Badge variant="outline" className="mt-1">Teste</Badge>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <Input readOnly value="sk_test_************XXXX" className="font-mono" />
              <Button variant="outline" className="ml-2">
                Revelar
              </Button>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Gerar Nova Chave
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Webhooks</CardTitle>
          <CardDescription>
            Configure endpoints para receber notificações de eventos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-md p-4 space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Notificações de Vendas</h4>
                <p className="text-sm text-muted-foreground">https://meusite.com/webhook/sales</p>
              </div>
              <Badge>Ativo</Badge>
            </div>
            <div className="flex justify-end space-x-2 mt-2">
              <Button size="sm" variant="outline">Editar</Button>
              <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Adicionar Webhook
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Documentação da API</CardTitle>
          <CardDescription>
            Acesse a documentação completa da nossa API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Nossa API permite que você integre seus sistemas com nossa plataforma.
            Acesse a documentação para obter mais informações sobre endpoints, parâmetros
            e exemplos de requisições.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Ver Documentação</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
