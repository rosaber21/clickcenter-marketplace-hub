
import React from "react";
import { LineChart } from "lucide-react";

export const AnalyticsHeader = () => {
  return (
    <div className="flex flex-col space-y-2 mb-6">
      <div className="flex items-center gap-2">
        <LineChart className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>
      <p className="text-muted-foreground">
        Acompanhe o desempenho dos seus cursos e produtos com gráficos e estatísticas detalhadas
      </p>
    </div>
  );
};
