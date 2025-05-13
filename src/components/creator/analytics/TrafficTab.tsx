
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";
import { DataTable } from "@/components/ui/data-table";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { name: "Google", value: 400 },
  { name: "Direto", value: 300 },
  { name: "Referência", value: 200 },
  { name: "Social", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const referralData = [
  { source: "Google", visits: 1432, conversions: 58, rate: "4.1%" },
  { source: "Facebook", visits: 958, conversions: 41, rate: "4.3%" },
  { source: "Instagram", visits: 842, conversions: 32, rate: "3.8%" },
  { source: "YouTube", visits: 612, conversions: 18, rate: "2.9%" },
  { source: "Direto", visits: 542, conversions: 39, rate: "7.2%" },
];

const tableColumns = [
  { key: "source", label: "Fonte" },
  { key: "visits", label: "Visitas" },
  { key: "conversions", label: "Conversões" },
  { key: "rate", label: "Taxa" },
];

export const TrafficTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fontes de Tráfego</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{
                traffic: {
                  label: "Tráfego",
                  theme: {
                    light: "#0088FE",
                    dark: "#0088FE"
                  }
                }
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Fontes de Referência</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              data={referralData}
              columns={tableColumns}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
