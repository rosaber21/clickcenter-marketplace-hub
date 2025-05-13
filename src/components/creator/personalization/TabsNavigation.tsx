
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Brush, Globe, PaintBucket } from "lucide-react";

interface TabsNavigationProps {
  activeTab: string;
}

export function TabsNavigation({ activeTab }: TabsNavigationProps) {
  return (
    <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4">
      <TabsTrigger value="themes" className={activeTab === "themes" ? "active" : ""}>
        <Palette className="mr-2 h-4 w-4" />
        Temas
      </TabsTrigger>
      <TabsTrigger value="branding" className={activeTab === "branding" ? "active" : ""}>
        <Brush className="mr-2 h-4 w-4" />
        Marca
      </TabsTrigger>
      <TabsTrigger value="domain" className={activeTab === "domain" ? "active" : ""}>
        <Globe className="mr-2 h-4 w-4" />
        Domínio
      </TabsTrigger>
      <TabsTrigger value="advanced" className={activeTab === "advanced" ? "active" : ""}>
        <PaintBucket className="mr-2 h-4 w-4" />
        Avançado
      </TabsTrigger>
    </TabsList>
  );
}
