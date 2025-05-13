
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type LeaderboardUser = {
  position: number;
  name: string;
  email: string;
  points: number;
  level: string;
  achievements: number;
  lastActive: string;
};

const sampleUsers: LeaderboardUser[] = [
  {
    position: 1,
    name: "Ana Silva",
    email: "ana.silva@example.com",
    points: 4250,
    level: "Especialista",
    achievements: 12,
    lastActive: "Hoje"
  },
  {
    position: 2,
    name: "Carlos Mendes",
    email: "carlos@example.com",
    points: 3800,
    level: "Avançado",
    achievements: 10,
    lastActive: "Ontem"
  },
  {
    position: 3,
    name: "Mariana Costa",
    email: "mariana@example.com",
    points: 3500,
    level: "Avançado",
    achievements: 9,
    lastActive: "3 dias atrás"
  },
  {
    position: 4,
    name: "Roberto Alves",
    email: "roberto@example.com",
    points: 2950,
    level: "Intermediário",
    achievements: 8,
    lastActive: "1 semana atrás"
  },
  {
    position: 5,
    name: "Juliana Ferreira",
    email: "juliana@example.com",
    points: 2300,
    level: "Intermediário",
    achievements: 6,
    lastActive: "Hoje"
  }
];

const columns = [
  { key: 'position', label: 'Posição' },
  { key: 'name', label: 'Nome' },
  { key: 'points', label: 'Pontos' },
  { key: 'level', label: 'Nível' },
  { key: 'achievements', label: 'Conquistas' },
  { key: 'lastActive', label: 'Último Acesso' }
];

export const LeaderboardTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Configurações do Ranking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="public-leaderboard" defaultChecked />
            <Label htmlFor="public-leaderboard">Tornar ranking público</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="weekly-reset" />
            <Label htmlFor="weekly-reset">Reiniciar ranking semanalmente</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="email-notifications" defaultChecked />
            <Label htmlFor="email-notifications">Enviar notificações por email</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch id="show-achievements" defaultChecked />
            <Label htmlFor="show-achievements">Mostrar conquistas no ranking</Label>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Ranking Atual</h3>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
        
        <DataTable
          data={sampleUsers}
          columns={columns}
          caption="Top 5 alunos por pontuação"
        />
      </div>
    </div>
  );
};
