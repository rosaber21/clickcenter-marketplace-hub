
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

interface LeaderboardUser {
  rank: number;
  name: string;
  points: number;
  level: number;
  badges: number;
  lastActive: string;
}

const leaderboardData: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Ana Silva",
    points: 12450,
    level: 8,
    badges: 14,
    lastActive: "Hoje"
  },
  {
    rank: 2,
    name: "Carlos Mendes",
    points: 10980,
    level: 7,
    badges: 12,
    lastActive: "Hoje"
  },
  {
    rank: 3,
    name: "Fernanda Oliveira",
    points: 9875,
    level: 7,
    badges: 10,
    lastActive: "Ontem"
  },
  {
    rank: 4,
    name: "Rafael Santos",
    points: 9320,
    level: 6,
    badges: 9,
    lastActive: "Hoje"
  },
  {
    rank: 5,
    name: "Mariana Costa",
    points: 8740,
    level: 6,
    badges: 11,
    lastActive: "Há 3 dias"
  },
  {
    rank: 6,
    name: "Pedro Almeida",
    points: 7890,
    level: 5,
    badges: 8,
    lastActive: "Hoje"
  },
  {
    rank: 7,
    name: "Luísa Moreira",
    points: 7450,
    level: 5,
    badges: 7,
    lastActive: "Ontem"
  },
  {
    rank: 8,
    name: "Gabriel Ferreira",
    points: 6980,
    level: 4,
    badges: 6,
    lastActive: "Há 2 dias"
  },
  {
    rank: 9,
    name: "Beatriz Lima",
    points: 6540,
    level: 4,
    badges: 5,
    lastActive: "Hoje"
  },
  {
    rank: 10,
    name: "Ricardo Nunes",
    points: 5980,
    level: 3,
    badges: 4,
    lastActive: "Há 5 dias"
  }
];

const tableColumns = [
  { key: "rank" as keyof LeaderboardUser, label: "Posição" },
  { key: "name" as keyof LeaderboardUser, label: "Nome" },
  { key: "points" as keyof LeaderboardUser, label: "Pontos" },
  { key: "level" as keyof LeaderboardUser, label: "Nível" },
  { key: "badges" as keyof LeaderboardUser, label: "Badges" },
  { key: "lastActive" as keyof LeaderboardUser, label: "Último Acesso" }
];

export const LeaderboardTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ranking de Usuários</h2>
          <p className="text-muted-foreground">
            Veja os usuários com melhor desempenho nos seus cursos
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>
                Classificação atual baseada em pontos e engajamento
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Últimos 30 dias</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            data={leaderboardData}
            columns={tableColumns}
          />
        </CardContent>
      </Card>
    </div>
  );
};
