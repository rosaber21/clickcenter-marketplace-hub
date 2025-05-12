
import * as React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line } from "recharts";

interface ChartProps {
  data: number[];
  labels: string[];
  title: string;
}

export const BarChart: React.FC<ChartProps> = ({ data, labels, title }) => {
  // Transform data into the format needed by Recharts
  const chartData = labels.map((label, index) => ({
    name: label,
    value: data[index]
  }));

  return (
    <ChartContainer 
      config={{
        [title]: {
          color: "#0ea5e9"
        }
      }}
    >
      <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" name={title} fill="#0ea5e9" />
      </RechartsBarChart>
    </ChartContainer>
  );
};

export const LineChart: React.FC<ChartProps> = ({ data, labels, title }) => {
  // Transform data into the format needed by Recharts
  const chartData = labels.map((label, index) => ({
    name: label,
    value: data[index]
  }));

  return (
    <ChartContainer 
      config={{
        [title]: {
          color: "#8b5cf6"
        }
      }}
    >
      <RechartsLineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" name={title} stroke="#8b5cf6" strokeWidth={2} />
      </RechartsLineChart>
    </ChartContainer>
  );
};
