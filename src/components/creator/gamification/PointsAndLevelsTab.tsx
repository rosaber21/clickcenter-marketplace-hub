
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Star, Save } from "lucide-react";

export const PointsAndLevelsTab = () => {
  const [basePoints, setBasePoints] = React.useState(10);
  const [levels, setLevels] = React.useState([
    { name: "Iniciante", pointsRequired: 0 },
    { name: "Intermediário", pointsRequired: 500 },
    { name: "Avançado", pointsRequired: 1000 },
    { name: "Especialista", pointsRequired: 2000 },
    { name: "Mestre", pointsRequired: 5000 }
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Configurações de Pontos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Pontos base por aula assistida</Label>
              <span className="font-medium">{basePoints}</span>
            </div>
            <Slider 
              value={[basePoints]} 
              min={5} 
              max={50}
              step={5}
              onValueChange={values => setBasePoints(values[0])} 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Pontos por comentário</Label>
            <Input type="number" min={1} defaultValue={5} />
          </div>
          
          <div className="space-y-2">
            <Label>Pontos por exercício completo</Label>
            <Input type="number" min={1} defaultValue={20} />
          </div>
          
          <div className="space-y-2">
            <Label>Multiplicador de bônus diário</Label>
            <Input type="number" min={1} step={0.1} defaultValue={1.5} />
          </div>
          
          <Button className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Níveis</h3>
        <div className="grid gap-4">
          {levels.map((level, index) => (
            <Card key={index} className="p-4 flex items-center">
              <div className="mr-4 bg-primary/10 text-primary p-2 rounded-full">
                {index === levels.length - 1 ? (
                  <Trophy className="h-5 w-5" />
                ) : (
                  <Star className="h-5 w-5" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{level.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {index === 0 
                    ? "Nível inicial" 
                    : `Requer ${level.pointsRequired} pontos`}
                </p>
              </div>
              <Button variant="outline" size="sm">Editar</Button>
            </Card>
          ))}
          <Button variant="outline" className="mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Nível
          </Button>
        </div>
      </div>
    </div>
  );
};

// Note: Plus icon import is missing above
import { Plus } from "lucide-react";
