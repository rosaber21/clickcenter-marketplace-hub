
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const SecurityTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>
            Atualize sua senha para manter sua conta segura
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input id="current-password" type="password" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova Senha</Label>
            <Input id="new-password" type="password" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Atualizar Senha</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Autenticação de Dois Fatores</CardTitle>
          <CardDescription>
            Adicione uma camada extra de segurança à sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Ativar 2FA</h4>
              <p className="text-sm text-muted-foreground">
                Use um aplicativo autenticador para maior segurança
              </p>
            </div>
            <Switch defaultChecked={false} />
          </div>
          
          <div className="pt-2">
            <Button variant="outline" disabled>Configurar Autenticador</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Sessões Ativas</CardTitle>
          <CardDescription>
            Gerencie dispositivos conectados à sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-md p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">Chrome em Windows</h4>
                <p className="text-sm text-muted-foreground">São Paulo, Brasil • Ativo agora</p>
              </div>
              <div className="bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs">
                Sessão Atual
              </div>
            </div>
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium">Safari em iPhone</h4>
                <p className="text-sm text-muted-foreground">São Paulo, Brasil • Último acesso: há 2 dias</p>
              </div>
              <Button variant="outline" size="sm">Encerrar</Button>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">Encerrar Todas as Outras Sessões</Button>
        </CardContent>
      </Card>
    </div>
  );
};
