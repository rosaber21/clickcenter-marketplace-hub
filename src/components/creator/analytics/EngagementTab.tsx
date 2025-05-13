
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { DataTable } from "@/components/ui/data-table";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const engagementData = [
  { name: "Seg", value: 5.2 },
  { name: "Ter", value: 4.8 },
  { name: "Qua", value: 6.1 },
  { name: "Qui", value: 5.7 },
  { name: "Sex", value: 4.9 },
  { name: "Sab", value: 3.5 },
  { name: "Dom", value: 3.2 },
];

interface ContentEngagementData {
  content: string;
  views: number;
  completionRate: string;
  avgTime: string;
}

const contentEngagementData: ContentEngagementData[] = [
  { content: "Aula 1: Introdução", views: 876, completionRate: "92%", avgTime: "15:24" },
  { content: "Aula 2: Conceitos Básicos", views: 742, completionRate: "85%", avgTime: "28:12" },
  { content: "Aula 3: Técnicas Avançadas", views: 631, completionRate: "76%", avgTime: "32:45" },
  { content: "Aula 4: Estudo de Caso", views: 524, completionRate: "68%", avgTime: "41:18" },
  { content: "Aula 5: Projeto Final", views: 412, completionRate: "59%", avgTime: "45:30" },
];

const tableColumns = [
  { key: "content" as keyof ContentEngagementData, label: "Conteúdo" },
  { key: "views" as keyof ContentEngagementData, label: "Visualizações" },
  { key: "completionRate" as keyof ContentEngagementData, label: "Taxa de Conclusão" },
  { key: "avgTime" as keyof ContentEngagementData, label: "Tempo Médio" },
];

export const EngagementTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio de Engajamento (minutos)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                engagement: {
                  label: "Engajamento",
                  theme: {
                    light: "hsl(var(--primary))",
                    dark: "hsl(var(--primary))"
                  }
                }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
            <CardTitle>Engajamento por Conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              data={contentEngagementData}
              columns={tableColumns}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
