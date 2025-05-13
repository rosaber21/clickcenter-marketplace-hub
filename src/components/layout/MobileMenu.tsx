
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onNavigate: (path: string, title: string) => void;
  onSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function MobileMenu({ isOpen, onNavigate, onSearch }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="container py-4 bg-background border-b">
      <div className="space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => onNavigate("/", "Início")}
        >
          Início
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => onNavigate("/produtos", "Produtos")}
        >
          Produtos
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => onNavigate("/categorias", "Categorias")}
        >
          Categorias
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => onNavigate("/afiliados", "Afiliados")}
        >
          Afiliados
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={() => onNavigate("/contato", "Contato")}
        >
          Contato
        </Button>
        <form onSubmit={onSearch} className="pt-2 relative">
          <Search className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
          <input 
            type="search"
            name="query" 
            placeholder="Buscar..." 
            className="w-full pl-9 pr-4 py-2 text-sm rounded-md bg-muted border border-transparent focus:border-input focus:outline-none focus:ring-1 focus:ring-ring" 
          />
        </form>
      </div>
    </div>
  );
}
