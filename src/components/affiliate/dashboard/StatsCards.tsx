
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, BarChart } from "lucide-react";

// Define DashboardStats locally as a workaround for it not being exported from the read-only hook
interface DashboardStats {
  totalSales: number;
  totalEarnings: number;
  conversionRate: number;
  totalClicks: number;
}

interface StatsCardsProps {
  stats: DashboardStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cardData = [
    { title: "Vendas Totais", value: stats.totalSales, icon: <ShoppingCart className="h-5 w-5 text-muted-foreground" />, description: "Número total de vendas" },
    { title: "Ganhos Totais", value: `R$ ${stats.totalEarnings.toFixed(2)}`, icon: <DollarSign className="h-5 w-5 text-muted-foreground" />, description: "Ganhos totais acumulados" },
    { title: "Taxa de Conversão", value: `${stats.conversionRate.toFixed(1)}%`, icon: <BarChart className="h-5 w-5 text-muted-foreground" />, description: "Percentual de cliques que resultaram em vendas" },
    { title: "Cliques Totais", value: stats.totalClicks, icon: <Users className="h-5 w-5 text-muted-foreground" />, description: "Número total de cliques nos links" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            {card.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
