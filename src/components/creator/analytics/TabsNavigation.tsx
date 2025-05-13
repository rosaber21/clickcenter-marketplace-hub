
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsNavigationProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const TabsNavigation: React.FC<TabsNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <TabsList className="w-full flex justify-start bg-background border">
      <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>
        Visão Geral
      </TabsTrigger>
      <TabsTrigger value="traffic" onClick={() => setActiveTab("traffic")}>
        Tráfego
      </TabsTrigger>
      <TabsTrigger value="conversion" onClick={() => setActiveTab("conversion")}>
        Conversão
      </TabsTrigger>
      <TabsTrigger value="engagement" onClick={() => setActiveTab("engagement")}>
        Engajamento
      </TabsTrigger>
      <TabsTrigger value="reports" onClick={() => setActiveTab("reports")}>
        Relatórios
      </TabsTrigger>
    </TabsList>
  );
};
