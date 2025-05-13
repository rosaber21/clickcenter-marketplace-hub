
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface AdvancedTabProps {
  enableCustomCss: boolean;
  setEnableCustomCss: (enabled: boolean) => void;
  customCss: string;
  setCustomCss: (css: string) => void;
}

export function AdvancedTab({ 
  enableCustomCss, 
  setEnableCustomCss, 
  customCss, 
  setCustomCss 
}: AdvancedTabProps) {
  const { toast } = useToast();
  
  const handleApplyCss = () => {
    toast({
      title: "CSS aplicado",
      description: "Seu CSS personalizado foi aplicado ao site."
    });
  };

  return (
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
  );
}
