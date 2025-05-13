
import { useState } from "react";
import { mockCourseData } from "@/data/mockCourseData";

export const useDashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeCourse, setActiveCourse] = useState(mockCourseData[0].id);
  
  // Get the list of courses for the dropdown
  const courses = mockCourseData.map(course => ({
    id: course.id,
    title: course.title
  }));
  
  return {
    activeTab,
    setActiveTab,
    activeCourse,
    setActiveCourse,
    courses
  };
};
