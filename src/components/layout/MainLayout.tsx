
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileMenu } from "./MobileMenu";
import { Cart } from "../cart/Cart";
import { toast } from "@/hooks/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    
    if (query.trim()) {
      toast({
        title: "Buscando produtos",
        description: `Pesquisando por: ${query}`,
      });
      // Aqui implementaria a busca
    }
  };

  const handleNavigation = (path: string, title: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    toast({
      title: title,
      description: "Navegando para a página solicitada",
    });
  };

  return (
    <div className="min-h-screen flex flex-col main-gradient-bg">
      {/* Only one Header component - TEMPORARILY COMMENTED OUT FOR DIAGNOSIS */}
      {/* 
      <Header 
        scrolled={scrolled} 
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      /> 
      */}

      {/* Mobile Menu */}
      {isMobile && (
        <MobileMenu 
          isOpen={mobileMenuOpen}
          onNavigate={handleNavigation}
          onSearch={handleSearch}
        />
      )}

      {/* Main content */}
      <main className="flex-1">
        <div className="container py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart drawer */}
      <Cart open={cartOpen} setOpen={setCartOpen} />
    </div>
  );
}

