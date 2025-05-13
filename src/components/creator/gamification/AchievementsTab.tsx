
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Plus, Edit, Trash2 } from "lucide-react";

type Achievement = {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: string;
  unlockCondition: string;
};

const sampleAchievements: Achievement[] = [
  {
    id: "1",
    name: "Primeira Aula",
    description: "Completou a primeira aula do curso",
    points: 50,
    icon: "📚",
    unlockCondition: "Assistir 100% da primeira aula"
  },
  {
    id: "2",
    name: "Participação Ativa",
    description: "Enviou 5 comentários em aulas",
    points: 100,
    icon: "💬",
    unlockCondition: "Enviar pelo menos 5 comentários"
  },
  {
    id: "3",
    name: "Estudante Dedicado",
    description: "Completou 50% do curso",
    points: 250,
    icon: "🏆",
    unlockCondition: "Completar 50% do curso"
  }
];

export const AchievementsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Conquistas</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Conquista
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleAchievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="text-2xl">{achievement.icon}</div>
                  <CardTitle className="text-base">{achievement.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{achievement.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pontos:</span>
                  <span className="font-medium">{achievement.points}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condição:</span>
                  <span className="font-medium">{achievement.unlockCondition}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
