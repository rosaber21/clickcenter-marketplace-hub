
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
    <TabsList className="w-full flex flex-wrap justify-start bg-background border mb-6">
      <TabsTrigger value="profile" onClick={() => setActiveTab("profile")}>
        Perfil
      </TabsTrigger>
      <TabsTrigger value="account" onClick={() => setActiveTab("account")}>
        Conta
      </TabsTrigger>
      <TabsTrigger value="notifications" onClick={() => setActiveTab("notifications")}>
        Notificações
      </TabsTrigger>
      <TabsTrigger value="payments" onClick={() => setActiveTab("payments")}>
        Pagamentos
      </TabsTrigger>
      <TabsTrigger value="security" onClick={() => setActiveTab("security")}>
        Segurança
      </TabsTrigger>
      <TabsTrigger value="api" onClick={() => setActiveTab("api")}>
        API
      </TabsTrigger>
    </TabsList>
  );
};
