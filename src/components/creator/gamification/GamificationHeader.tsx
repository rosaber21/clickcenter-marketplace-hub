
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star } from "lucide-react";

export const GamificationHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Gamificação</h1>
        <Badge className="bg-amber-600 hover:bg-amber-700">
          <Trophy className="w-3 h-3 mr-1" /> Novo
        </Badge>
      </div>
      <p className="text-muted-foreground mt-1">
        Aumente o engajamento dos seus alunos com elementos de gamificação
      </p>
      
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
          <Award className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium">Conquistas</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
          <Star className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium">Pontos</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium">Ranking</span>
        </div>
      </div>
    </div>
  );
};
