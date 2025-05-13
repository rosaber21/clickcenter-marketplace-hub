
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Plus, Edit, Trash2 } from "lucide-react";

type BadgeItem = {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  color: string;
  unlockCondition: string;
};

const sampleBadges: BadgeItem[] = [
  {
    id: "badge-1",
    name: "Super Estudante",
    description: "Completou todo o conteúdo do curso",
    imageSrc: "https://placehold.co/200x200/gold/white?text=★",
    color: "gold",
    unlockCondition: "Completar 100% do curso"
  },
  {
    id: "badge-2",
    name: "Pensador Crítico",
    description: "Fez 20 comentários relevantes",
    imageSrc: "https://placehold.co/200x200/3b82f6/white?text=✓",
    color: "blue",
    unlockCondition: "Fazer 20 comentários"
  },
  {
    id: "badge-3",
    name: "Madrugador",
    description: "Acessou o curso por 7 dias consecutivos",
    imageSrc: "https://placehold.co/200x200/22c55e/white?text=✓",
    color: "green",
    unlockCondition: "Acessar 7 dias seguidos"
  },
  {
    id: "badge-4",
    name: "Expert",
    description: "Pontuação máxima em todos os testes",
    imageSrc: "https://placehold.co/200x200/a855f7/white?text=✓",
    color: "purple",
    unlockCondition: "100% em todos os testes"
  }
];

export const BadgesTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Emblemas</h3>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Emblema
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleBadges.map((badge) => (
          <Card key={badge.id}>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{badge.name}</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{badge.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="w-24 mx-auto mb-3">
                <AspectRatio ratio={1/1}>
                  <img 
                    src={badge.imageSrc}
                    alt={badge.name}
                    className="rounded-full object-cover"
                  />
                </AspectRatio>
              </div>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condição:</span>
                  <span className="font-medium">{badge.unlockCondition}</span>
                </div>
                <div className="mt-2">
                  <Badge 
                    className="w-full justify-center" 
                    style={{ backgroundColor: badge.color }}
                  >
                    {badge.name}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
