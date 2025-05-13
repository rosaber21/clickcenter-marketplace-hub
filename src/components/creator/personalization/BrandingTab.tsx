
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface BrandingTabProps {
  logoUrl: string;
  setLogoUrl: (url: string) => void;
}

export function BrandingTab({ logoUrl, setLogoUrl }: BrandingTabProps) {
  const { toast } = useToast();
  
  const handleSaveBranding = () => {
    toast({
      title: "Marca atualizada",
      description: "As alterações na sua marca foram salvas com sucesso!"
    });
  };

  return (
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
  );
}
