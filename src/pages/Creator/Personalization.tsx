
import React, { useState } from "react";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Palette, Brush, PaintBucket, Swatch } from "lucide-react";

export default function Personalization() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("themes");
  const [logoUrl, setLogoUrl] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [accentColor, setAccentColor] = useState("#8B5CF6"); // Default purple
  const [enableCustomCss, setEnableCustomCss] = useState(false);
  const [customCss, setCustomCss] = useState("");

  const handleSaveTheme = () => {
    toast({
      title: "Tema salvo",
      description: "Suas alterações de tema foram salvas com sucesso!"
    });
  };

  const handleSaveBranding = () => {
    toast({
      title: "Marca atualizada",
      description: "As alterações na sua marca foram salvas com sucesso!"
    });
  };

  const handleSaveDomain = () => {
    toast({
      title: "Domínio salvo",
      description: "Seu domínio personalizado foi atualizado!"
    });
  };

  const handleApplyCss = () => {
    toast({
      title: "CSS aplicado",
      description: "Seu CSS personalizado foi aplicado ao site."
    });
  };

  const colorPresets = [
    { name: "Roxo", value: "#8B5CF6" },
    { name: "Azul", value: "#3B82F6" },
    { name: "Verde", value: "#10B981" },
    { name: "Vermelho", value: "#EF4444" },
    { name: "Amarelo", value: "#F59E0B" },
    { name: "Rosa", value: "#EC4899" }
  ];

  return (
    <CreatorLayout>
      <div className="container py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Personalização</h1>
            <p className="text-muted-foreground">
              Personalize a aparência do seu site e cursos
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="themes">
              <Palette className="mr-2 h-4 w-4" />
              Temas
            </TabsTrigger>
            <TabsTrigger value="branding">
              <Brush className="mr-2 h-4 w-4" />
              Marca
            </TabsTrigger>
            <TabsTrigger value="domain">
              <Swatch className="mr-2 h-4 w-4" />
              Domínio
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <PaintBucket className="mr-2 h-4 w-4" />
              Avançado
            </TabsTrigger>
          </TabsList>

          {/* Theme Tab */}
          <TabsContent value="themes">
            <Card>
              <CardHeader>
                <CardTitle>Temas e Cores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Cor Principal</Label>
                  <div className="flex flex-wrap gap-3">
                    {colorPresets.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setAccentColor(color.value)}
                        className={`w-10 h-10 rounded-full transition-all ${
                          accentColor === color.value ? "ring-2 ring-offset-2 ring-primary" : ""
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                    
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dark-mode">Modo Escuro</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="dark-mode" />
                      <span className="text-sm text-muted-foreground">Habilitar modo escuro automático</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rounded-corners">Cantos Arredondados</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="rounded-corners" defaultChecked />
                      <span className="text-sm text-muted-foreground">Usar cantos arredondados</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleSaveTheme}>Salvar Tema</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Marca e Identidade Visual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="logo-url">URL do Logo</Label>
                  <Input
                    id="logo-url"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://sua-url.com/logo.png"
                  />
                  <p className="text-sm text-muted-foreground">
                    Recomendamos uma imagem PNG transparente de pelo menos 200x50px
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon</Label>
                  <Input id="favicon" type="file" accept=".ico,.png" />
                  <p className="text-sm text-muted-foreground">
                    Upload de um ícone de 32x32 pixels para a aba do navegador
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="footer-text">Texto do Rodapé</Label>
                  <Input
                    id="footer-text"
                    placeholder="© 2025 Sua Empresa. Todos os direitos reservados."
                  />
                </div>

                <Button onClick={handleSaveBranding}>Salvar Marca</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Domain Tab */}
          <TabsContent value="domain">
            <Card>
              <CardHeader>
                <CardTitle>Domínio Personalizado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="custom-domain">Seu Domínio</Label>
                  <Input
                    id="custom-domain"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    placeholder="cursos.seudominio.com.br"
                  />
                  <p className="text-sm text-muted-foreground">
                    Configure um CNAME para seu domínio apontando para nossa plataforma
                  </p>
                </div>

                <div className="space-y-2 p-4 bg-muted rounded-md">
                  <h4 className="font-semibold">Instruções de Configuração DNS</h4>
                  <ol className="list-decimal list-inside text-sm space-y-2">
                    <li>Acesse o painel de gerenciamento do seu domínio</li>
                    <li>Adicione um registro CNAME para o subdomínio desejado</li>
                    <li>Aponte para <code className="bg-background p-1 rounded text-primary">platform.example.com</code></li>
                    <li>Aguarde a propagação DNS (pode levar até 48 horas)</li>
                  </ol>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ssl">Certificado SSL</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="ssl" defaultChecked disabled />
                    <span className="text-sm text-muted-foreground">Ativar HTTPS automático (recomendado)</span>
                  </div>
                </div>

                <Button onClick={handleSaveDomain}>Verificar e Salvar Domínio</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Personalização Avançada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="custom-css" 
                      checked={enableCustomCss}
                      onCheckedChange={setEnableCustomCss}
                    />
                    <Label htmlFor="custom-css">Habilitar CSS personalizado</Label>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use CSS personalizado para ajustes avançados de estilo
                  </p>
                </div>

                {enableCustomCss && (
                  <div className="space-y-2">
                    <Label htmlFor="css-code">Código CSS</Label>
                    <textarea
                      id="css-code"
                      value={customCss}
                      onChange={(e) => setCustomCss(e.target.value)}
                      placeholder=".my-class { color: #8B5CF6; }"
                      className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                      spellCheck={false}
                    />
                    <p className="text-sm text-muted-foreground">
                      Seu CSS personalizado será aplicado em todas as páginas
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="head-scripts">Scripts no Cabeçalho</Label>
                  <textarea
                    id="head-scripts"
                    placeholder="<!-- Google Analytics ou outros scripts -->"
                    className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  />
                  <p className="text-sm text-muted-foreground">
                    Scripts que serão inseridos na tag &lt;head&gt; do seu site
                  </p>
                </div>

                <Button onClick={handleApplyCss}>Aplicar Alterações</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </CreatorLayout>
  );
}
