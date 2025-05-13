
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const NotificationsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notificações por Email</CardTitle>
          <CardDescription>
            Gerencie os tipos de emails que você receberá
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Vendas</h4>
              <p className="text-sm text-muted-foreground">
                Receba notificações quando seus produtos forem vendidos
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Novos Membros</h4>
              <p className="text-sm text-muted-foreground">
                Seja notificado quando novos usuários se juntarem às suas comunidades
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Comentários</h4>
              <p className="text-sm text-muted-foreground">
                Receba atualizações sobre comentários em seus conteúdos
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Newsletter</h4>
              <p className="text-sm text-muted-foreground">
                Atualizações sobre novos recursos e melhorias
              </p>
            </div>
            <Switch defaultChecked={false} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferências de Notificação</CardTitle>
          <CardDescription>
            Defina a frequência e o formato das notificações
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequência de Resumos</Label>
            <Select defaultValue="daily">
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Selecione a frequência" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="realtime">Tempo real</SelectItem>
                <SelectItem value="daily">Resumo diário</SelectItem>
                <SelectItem value="weekly">Resumo semanal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Notificações Push</h4>
              <p className="text-sm text-muted-foreground">
                Receba notificações push em seu navegador
              </p>
            </div>
            <Switch defaultChecked={true} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
