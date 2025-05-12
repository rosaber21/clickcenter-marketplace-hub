
import React from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Configurações da Plataforma</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configurações Gerais
                </CardTitle>
                <CardDescription>
                  Configure os detalhes básicos da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Nome da Plataforma</h3>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="ClickCenter"
                  />
                </div>

                <div>
                  <h3 className="font-medium mb-2">Email de Contato</h3>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border rounded-md"
                    defaultValue="contato@clickcenter.com"
                  />
                </div>

                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Comissão de Afiliados (Padrão)</h3>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      className="w-20 px-3 py-2 border rounded-md"
                      defaultValue="15"
                    />
                    <span className="ml-2">%</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Comissão da Plataforma</h3>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      className="w-20 px-3 py-2 border rounded-md"
                      defaultValue="10"
                    />
                    <span className="ml-2">%</span>
                  </div>
                </div>
                
                <Button className="mt-4">Salvar Alterações</Button>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
                <CardDescription>
                  Configure integrações com serviços externos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Processador de Pagamento</p>
                    <p className="text-sm text-muted-foreground">Stripe</p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Email Marketing</p>
                    <p className="text-sm text-muted-foreground">Não configurado</p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <p className="font-medium">Analytics</p>
                    <p className="text-sm text-muted-foreground">Google Analytics</p>
                  </div>
                  <Button variant="outline" size="sm">Configurar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
