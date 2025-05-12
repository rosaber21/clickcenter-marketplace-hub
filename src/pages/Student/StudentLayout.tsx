
import React from "react";
import { Outlet } from "react-router-dom";
import { StudentSidebar } from "@/components/student/StudentSidebar";
import { StudentHeader } from "@/components/student/StudentHeader";

export const StudentLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <StudentSidebar />
      <div className="flex flex-col flex-1">
        <StudentHeader />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
