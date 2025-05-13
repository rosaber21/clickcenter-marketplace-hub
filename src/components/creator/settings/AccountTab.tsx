
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export const AccountTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Preferências da Conta</CardTitle>
          <CardDescription>
            Gerencie suas preferências de idioma e região
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">Idioma</Label>
            <Select defaultValue="pt-BR">
              <SelectTrigger id="language">
                <SelectValue placeholder="Selecione um idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timezone">Fuso Horário</Label>
            <Select defaultValue="America/Sao_Paulo">
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Selecione um fuso horário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/Sao_Paulo">Brasília (UTC-3)</SelectItem>
                <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                <SelectItem value="Europe/London">London (UTC+0)</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo (UTC+9)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configurações de Privacidade</CardTitle>
          <CardDescription>
            Controle quem pode ver suas informações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Perfil Público</h4>
              <p className="text-sm text-muted-foreground">
                Tornar seu perfil visível para todos os usuários
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Mostrar Email</h4>
              <p className="text-sm text-muted-foreground">
                Permitir que outros usuários vejam seu email
              </p>
            </div>
            <Switch defaultChecked={false} />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Excluir Conta
          </CardTitle>
          <CardDescription>
            Remover permanentemente sua conta e todos os seus dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
            e removerá seus dados de nossos servidores.
          </p>
          <Button variant="destructive">Excluir Conta</Button>
        </CardContent>
      </Card>
    </div>
  );
};
