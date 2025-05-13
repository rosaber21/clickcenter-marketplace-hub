
import { useState } from "react";

export const useDashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  return {
    activeTab,
    setActiveTab
  };
};
