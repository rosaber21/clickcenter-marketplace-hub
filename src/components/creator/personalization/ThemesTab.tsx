
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface ThemesTabProps {
  accentColor: string;
  setAccentColor: (color: string) => void;
}

export function ThemesTab({ accentColor, setAccentColor }: ThemesTabProps) {
  const { toast } = useToast();
  
  const handleSaveTheme = () => {
    toast({
      title: "Tema salvo",
      description: "Suas alterações de tema foram salvas com sucesso!"
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
  );
}
