
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface DomainTabProps {
  customDomain: string;
  setCustomDomain: (domain: string) => void;
}

export function DomainTab({ customDomain, setCustomDomain }: DomainTabProps) {
  const { toast } = useToast();
  
  const handleSaveDomain = () => {
    toast({
      title: "Domínio salvo",
      description: "Seu domínio personalizado foi atualizado!"
    });
  };

  return (
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
  );
}
