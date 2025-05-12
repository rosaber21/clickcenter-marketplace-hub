
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSettings() {
  return (
    <>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Configurações</h1>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="payments">Pagamentos</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="advanced">Avançado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>
                  Gerencie as configurações básicas da sua plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Informações da Plataforma</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="platform-name">Nome da Plataforma</Label>
                      <Input id="platform-name" value="ClickCenter" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platform-url">URL da Plataforma</Label>
                      <Input id="platform-url" value="https://clickcenter.com.br" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platform-description">Descrição</Label>
                    <Textarea id="platform-description" value="A melhor plataforma para hospedagem e venda de produtos digitais e físicos." />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Funcionalidades</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="affiliate-toggle" className="font-medium">Programa de Afiliados</Label>
                        <p className="text-sm text-muted-foreground">Permitir que usuários se tornem afiliados e vendam produtos.</p>
                      </div>
                      <Switch id="affiliate-toggle" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="creator-toggle" className="font-medium">Portal de Criadores</Label>
                        <p className="text-sm text-muted-foreground">Permitir que usuários criem e vendam seus próprios produtos.</p>
                      </div>
                      <Switch id="creator-toggle" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance-toggle" className="font-medium">Modo de Manutenção</Label>
                        <p className="text-sm text-muted-foreground">Ativar o modo de manutenção para realizar atualizações.</p>
                      </div>
                      <Switch id="maintenance-toggle" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Pagamento</CardTitle>
                <CardDescription>
                  Gerencie os métodos e integrações de pagamento.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment settings content */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Configurações de pagamento em desenvolvimento.</p>
                </div>
                
                <div className="flex justify-end">
                  <Button>Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emails">
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Emails</CardTitle>
                <CardDescription>
                  Configure os modelos de email e notificações.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email settings content */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Configurações de email em desenvolvimento.</p>
                </div>
                
                <div className="flex justify-end">
                  <Button>Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Avançadas</CardTitle>
                <CardDescription>
                  Configurações avançadas da plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Advanced settings content */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Configurações avançadas em desenvolvimento.</p>
                </div>
                
                <div className="flex justify-end">
                  <Button>Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
