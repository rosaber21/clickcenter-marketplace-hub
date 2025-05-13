
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, DollarSign, Users } from "lucide-react";
import { DashboardStats } from "@/hooks/use-affiliate-dashboard";

interface StatsCardsProps {
  stats: DashboardStats;
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Ganhos Totais</CardDescription>
          <CardTitle className="text-3xl">{stats.totalEarnings}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Pendente: <span className="font-medium">{stats.pendingPayment}</span>
          </p>
        </CardContent>
        <CardFooter>
          <DollarSign className="h-5 w-5 text-primary opacity-70" />
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-br from-secondary/5 to-secondary/10 border-secondary/20 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Cliques este mês</CardDescription>
          <CardTitle className="text-3xl">{stats.clicksThisMonth}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Conversões: <span className="font-medium">{stats.conversionsThisMonth}</span>
          </p>
        </CardContent>
        <CardFooter>
          <Users className="h-5 w-5 text-secondary opacity-70" />
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-secondary/10 border-primary/20 hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardDescription>Taxa de conversão</CardDescription>
          <CardTitle className="text-3xl">{stats.conversionRate}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Média do setor: <span className="font-medium">1.2%</span>
          </p>
        </CardContent>
        <CardFooter>
          <BarChart3 className="h-5 w-5 text-primary/70" />
        </CardFooter>
      </Card>
    </div>
  );
};
