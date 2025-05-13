
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const conversionData = [
  { name: "Home", viewed: 1000, converted: 40, rate: 4 },
  { name: "Produto A", viewed: 800, converted: 45, rate: 5.6 },
  { name: "Produto B", viewed: 600, converted: 30, rate: 5 },
  { name: "Blog", viewed: 500, converted: 10, rate: 2 },
  { name: "Sobre", viewed: 300, converted: 5, rate: 1.7 },
];

const funnelData = [
  { name: "Visitantes", value: 2800 },
  { name: "Visualizaram Produto", value: 1680 },
  { name: "Adicionaram ao Carrinho", value: 840 },
  { name: "Iniciaram Checkout", value: 588 },
  { name: "Finalizaram Compra", value: 294 },
];

export const ConversionTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conversão por Página</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                rate: {
                  label: "Taxa",
                  theme: {
                    light: "hsl(var(--primary))",
                    dark: "hsl(var(--primary))"
                  }
                }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="rate" fill="hsl(var(--primary))" name="Taxa de Conversão (%)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Funil de Conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                funnel: {
                  label: "Funil",
                  theme: {
                    light: "hsl(var(--primary))",
                    dark: "hsl(var(--primary))"
                  }
                }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={funnelData} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
