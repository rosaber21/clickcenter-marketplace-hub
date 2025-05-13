
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabsNavigation = ({ activeTab, setActiveTab }: TabsNavigationProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
        <TabsTrigger value="achievements">Conquistas</TabsTrigger>
        <TabsTrigger value="points">Pontos e Níveis</TabsTrigger>
        <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
        <TabsTrigger value="badges">Emblemas</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
