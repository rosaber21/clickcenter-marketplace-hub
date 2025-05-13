
import React, { useState } from "react";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { TabsContent, Tabs } from "@/components/ui/tabs";
import { AnalyticsHeader } from "@/components/creator/analytics/AnalyticsHeader";
import { TabsNavigation } from "@/components/creator/analytics/TabsNavigation";
import { OverviewTab } from "@/components/creator/analytics/OverviewTab";
import { TrafficTab } from "@/components/creator/analytics/TrafficTab";
import { ConversionTab } from "@/components/creator/analytics/ConversionTab";
import { EngagementTab } from "@/components/creator/analytics/EngagementTab";
import { ReportsTab } from "@/components/creator/analytics/ReportsTab";

export default function Analytics() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <CreatorLayout>
      <div className="container py-6">
        <AnalyticsHeader />

        <Tabs value={activeTab} className="space-y-6">
          <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <TabsContent value="overview" className="m-0">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="traffic" className="m-0">
            <TrafficTab />
          </TabsContent>

          <TabsContent value="conversion" className="m-0">
            <ConversionTab />
          </TabsContent>

          <TabsContent value="engagement" className="m-0">
            <EngagementTab />
          </TabsContent>

          <TabsContent value="reports" className="m-0">
            <ReportsTab />
          </TabsContent>
        </Tabs>
      </div>
    </CreatorLayout>
  );
}
