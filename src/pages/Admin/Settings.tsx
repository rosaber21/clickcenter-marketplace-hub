
import React, { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function AdminSettings() {
  const [platformSettings, setPlatformSettings] = useState({
    platformName: "ClickCenter",
    contactEmail: "contato@clickcenter.com",
    affiliateCommission: 15,
    platformCommission: 10
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlatformSettings({
      ...platformSettings,
      [name]: name.includes("Commission") ? Number(value) : value
    });
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulação de uma requisição ao servidor
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Configurações salvas com sucesso!", {
        description: "As alterações foram aplicadas na plataforma."
      });
    }, 800);
  };

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
                    name="platformName"
                    className="w-full px-3 py-2 border rounded-md"
                    value={platformSettings.platformName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <h3 className="font-medium mb-2">Email de Contato</h3>
                  <input 
                    type="email" 
                    name="contactEmail"
                    className="w-full px-3 py-2 border rounded-md"
                    value={platformSettings.contactEmail}
                    onChange={handleInputChange}
                  />
                </div>

                <Separator />
                
                <div>
                  <h3 className="font-medium mb-2">Comissão de Afiliados (Padrão)</h3>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      name="affiliateCommission"
                      className="w-20 px-3 py-2 border rounded-md"
                      value={platformSettings.affiliateCommission}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">%</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Comissão da Plataforma</h3>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      name="platformCommission"
                      className="w-20 px-3 py-2 border rounded-md"
                      value={platformSettings.platformCommission}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">%</span>
                  </div>
                </div>
                
                <Button 
                  className="mt-4" 
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                >
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </Button>
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
