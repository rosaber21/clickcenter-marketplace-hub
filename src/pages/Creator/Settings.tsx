
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { useToast } from "@/hooks/use-toast";

// Import components
import { SettingsHeader } from "@/components/creator/settings/SettingsHeader";
import { TabsNavigation } from "@/components/creator/settings/TabsNavigation";
import { ProfileTab } from "@/components/creator/settings/ProfileTab";
import { AccountTab } from "@/components/creator/settings/AccountTab";
import { NotificationsTab } from "@/components/creator/settings/NotificationsTab";
import { PaymentsTab } from "@/components/creator/settings/PaymentsTab";
import { SecurityTab } from "@/components/creator/settings/SecurityTab";
import { ApiTab } from "@/components/creator/settings/ApiTab";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Alterações salvas",
        description: "Suas configurações foram atualizadas com sucesso",
      });
    }, 1500);
  };

  return (
    <CreatorLayout>
      <div className="container py-6">
        <SettingsHeader onSave={handleSave} isSaving={isSaving} />
        
        <Tabs value={activeTab} className="space-y-4">
          <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          
          <TabsContent value="account">
            <AccountTab />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
          
          <TabsContent value="payments">
            <PaymentsTab />
          </TabsContent>
          
          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>
          
          <TabsContent value="api">
            <ApiTab />
          </TabsContent>
        </Tabs>
      </div>
    </CreatorLayout>
  );
}
