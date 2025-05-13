
import React, { useState } from "react";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Header } from "@/components/creator/personalization/Header";
import { TabsNavigation } from "@/components/creator/personalization/TabsNavigation";
import { ThemesTab } from "@/components/creator/personalization/ThemesTab";
import { BrandingTab } from "@/components/creator/personalization/BrandingTab";
import { DomainTab } from "@/components/creator/personalization/DomainTab";
import { AdvancedTab } from "@/components/creator/personalization/AdvancedTab";

export default function Personalization() {
  const [activeTab, setActiveTab] = useState("themes");
  const [logoUrl, setLogoUrl] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [accentColor, setAccentColor] = useState("#8B5CF6"); // Default purple
  const [enableCustomCss, setEnableCustomCss] = useState(false);
  const [customCss, setCustomCss] = useState("");

  return (
    <CreatorLayout>
      <div className="container py-6">
        <Header />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsNavigation activeTab={activeTab} />

          <TabsContent value="themes">
            <ThemesTab 
              accentColor={accentColor}
              setAccentColor={setAccentColor}
            />
          </TabsContent>

          <TabsContent value="branding">
            <BrandingTab 
              logoUrl={logoUrl}
              setLogoUrl={setLogoUrl}
            />
          </TabsContent>

          <TabsContent value="domain">
            <DomainTab 
              customDomain={customDomain}
              setCustomDomain={setCustomDomain}
            />
          </TabsContent>

          <TabsContent value="advanced">
            <AdvancedTab 
              enableCustomCss={enableCustomCss}
              setEnableCustomCss={setEnableCustomCss}
              customCss={customCss}
              setCustomCss={setCustomCss}
            />
          </TabsContent>
        </Tabs>
      </div>
    </CreatorLayout>
  );
}
