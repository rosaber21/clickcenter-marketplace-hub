
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Logo } from "./header/Logo";
import { NavMenu } from "./header/NavMenu";
import { SearchBar } from "./header/SearchBar";
import { ActionButtons } from "./header/ActionButtons";

interface HeaderProps {
  scrolled: boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
}

export function Header({ scrolled, cartOpen, setCartOpen, setMobileMenuOpen, mobileMenuOpen }: HeaderProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const cartItemCount = 0; // This value would be dynamic based on cart context

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    
    if (query.trim()) {
      toast({
        title: "Buscando produtos",
        description: `Pesquisando por: ${query}`,
      });
      // Here would implement the search
    }
  };

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur transition-all duration-200 bg-background/95", // Fundo sempre aplicado
        scrolled && "shadow-sm border-b" // Sombra e borda apenas quando rolado
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          
          {!isMobile && <NavMenu />}
        </div>
        
        <div className="flex items-center gap-4">
          {!isMobile && <SearchBar onSubmit={handleSearch} className="mr-2" />}
          
          <ActionButtons 
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            isMobile={isMobile}
            cartItemCount={cartItemCount}
          />
        </div>
      </div>
    </header>
  );
}

