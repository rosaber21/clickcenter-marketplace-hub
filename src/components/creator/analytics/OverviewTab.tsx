
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const salesData = [
  { name: "Jan", value: 2400 },
  { name: "Fev", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Abr", value: 3908 },
  { name: "Mai", value: 4800 },
  { name: "Jun", value: 3800 },
  { name: "Jul", value: 4300 },
];

const visitorsData = [
  { name: "Jan", value: 4000 },
  { name: "Fev", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Abr", value: 7000 },
  { name: "Mai", value: 6000 },
  { name: "Jun", value: 8000 },
  { name: "Jul", value: 9000 },
];

export const OverviewTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Visitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,832</div>
            <p className="text-xs text-muted-foreground">+12.5% neste mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 14.248</div>
            <p className="text-xs text-muted-foreground">+8.2% neste mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5%</div>
            <p className="text-xs text-muted-foreground">+0.8% neste mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alunos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">876</div>
            <p className="text-xs text-muted-foreground">+23.1% neste mês</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Mês</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer 
              config={{
                sales: {
                  label: "Vendas",
                  theme: {
                    light: "hsl(var(--primary))",
                    dark: "hsl(var(--primary))"
                  }
                }
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Visitantes por Mês</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer 
              config={{
                visitors: {
                  label: "Visitantes",
                  theme: {
                    light: "hsl(var(--primary))",
                    dark: "hsl(var(--primary))"
                  }
                }
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visitorsData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
