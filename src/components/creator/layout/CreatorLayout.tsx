
import React from "react";
import { CreatorSidebar } from "./CreatorSidebar";
import { Header } from "@/components/layout/Header";

interface CreatorLayoutProps {
  children: React.ReactNode;
}

export const CreatorLayout: React.FC<CreatorLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <CreatorSidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
