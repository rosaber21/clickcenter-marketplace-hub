
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();
  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    paypalEnabled: false,
    bankTransferEnabled: true,
    commissionRate: "10",
    minWithdrawalAmount: "50",
    autoApprovePayments: false,
  });

  const handlePaymentSettingChange = (key: string, value: string | boolean) => {
    setPaymentSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const savePaymentSettings = () => {
    // Here you would typically save to your backend or database
    console.log("Saving payment settings:", paymentSettings);
    
    // Show success notification
    toast({
      title: "Configurações salvas",
      description: "As configurações de pagamento foram atualizadas com sucesso.",
      variant: "success",
    });
  };

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
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Métodos de Pagamento</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="stripe-toggle" className="font-medium">Stripe</Label>
                        <p className="text-sm text-muted-foreground">Aceitar pagamentos via cartão de crédito e PayPal.</p>
                      </div>
                      <Switch 
                        id="stripe-toggle" 
                        checked={paymentSettings.stripeEnabled}
                        onCheckedChange={(checked) => handlePaymentSettingChange("stripeEnabled", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="paypal-toggle" className="font-medium">PayPal</Label>
                        <p className="text-sm text-muted-foreground">Aceitar pagamentos diretos via PayPal.</p>
                      </div>
                      <Switch 
                        id="paypal-toggle"
                        checked={paymentSettings.paypalEnabled}
                        onCheckedChange={(checked) => handlePaymentSettingChange("paypalEnabled", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="bank-toggle" className="font-medium">Transferência Bancária</Label>
                        <p className="text-sm text-muted-foreground">Aceitar pagamentos via transferência bancária.</p>
                      </div>
                      <Switch 
                        id="bank-toggle"
                        checked={paymentSettings.bankTransferEnabled}
                        onCheckedChange={(checked) => handlePaymentSettingChange("bankTransferEnabled", checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Configurações de Afiliados</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="commission-rate">Taxa de Comissão (%)</Label>
                      <Input 
                        id="commission-rate" 
                        type="number" 
                        value={paymentSettings.commissionRate}
                        onChange={(e) => handlePaymentSettingChange("commissionRate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="min-withdrawal">Valor Mínimo para Saque (€)</Label>
                      <Input 
                        id="min-withdrawal" 
                        type="number"
                        value={paymentSettings.minWithdrawalAmount}
                        onChange={(e) => handlePaymentSettingChange("minWithdrawalAmount", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-approve-toggle" className="font-medium">Aprovação Automática</Label>
                      <p className="text-sm text-muted-foreground">Aprovar automaticamente os pagamentos de afiliados.</p>
                    </div>
                    <Switch 
                      id="auto-approve-toggle"
                      checked={paymentSettings.autoApprovePayments}
                      onCheckedChange={(checked) => handlePaymentSettingChange("autoApprovePayments", checked)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={savePaymentSettings}>Salvar Configurações</Button>
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
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Configurações SMTP</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-server">Servidor SMTP</Label>
                      <Input id="smtp-server" placeholder="smtp.exemplo.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port">Porta SMTP</Label>
                      <Input id="smtp-port" placeholder="587" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-user">Usuário SMTP</Label>
                      <Input id="smtp-user" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-password">Senha SMTP</Label>
                      <Input id="smtp-password" type="password" placeholder="••••••••" />
                    </div>
                  </div>
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
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Integração API</h3>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Chave de API</Label>
                    <div className="flex gap-2">
                      <Input id="api-key" value="api_5f7d23e8b9c1a45d67e9" readOnly className="flex-1" />
                      <Button variant="outline">Gerar Nova</Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Chave secreta para acessar a API da plataforma.</p>
                  </div>
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
