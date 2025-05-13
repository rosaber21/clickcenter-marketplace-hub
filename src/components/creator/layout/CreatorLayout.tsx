
import React, { useState } from "react";
import { CreatorSidebar } from "./CreatorSidebar";
import { Header } from "@/components/layout/Header";

interface CreatorLayoutProps {
  children: React.ReactNode;
}

export const CreatorLayout: React.FC<CreatorLayoutProps> = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Add scroll event listener to set scrolled state
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <CreatorSidebar />
      
      <div className="flex-1 flex flex-col">
        <Header 
          scrolled={scrolled}
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
