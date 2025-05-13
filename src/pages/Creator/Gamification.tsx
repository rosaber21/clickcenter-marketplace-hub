
import React, { useState } from "react";
import { CreatorLayout } from "@/components/creator/layout/CreatorLayout";
import { TabsContent, Tabs } from "@/components/ui/tabs";
import { GamificationHeader } from "@/components/creator/gamification/GamificationHeader";
import { TabsNavigation } from "@/components/creator/gamification/TabsNavigation";
import { AchievementsTab } from "@/components/creator/gamification/AchievementsTab";
import { PointsAndLevelsTab } from "@/components/creator/gamification/PointsAndLevelsTab";
import { LeaderboardTab } from "@/components/creator/gamification/LeaderboardTab";
import { BadgesTab } from "@/components/creator/gamification/BadgesTab";

export default function Gamification() {
  const [activeTab, setActiveTab] = useState("achievements");

  return (
    <CreatorLayout>
      <div className="container py-6">
        <GamificationHeader />

        <Tabs value={activeTab} className="space-y-6">
          <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          <TabsContent value="achievements" className="m-0">
            <AchievementsTab />
          </TabsContent>

          <TabsContent value="points" className="m-0">
            <PointsAndLevelsTab />
          </TabsContent>

          <TabsContent value="leaderboard" className="m-0">
            <LeaderboardTab />
          </TabsContent>

          <TabsContent value="badges" className="m-0">
            <BadgesTab />
          </TabsContent>
        </Tabs>
      </div>
    </CreatorLayout>
  );
}
