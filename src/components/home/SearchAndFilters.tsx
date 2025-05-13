
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Tag, ShoppingBag } from "lucide-react";

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: "all" | "digital" | "physical";
  setActiveFilter: (filter: "all" | "digital" | "physical") => void;
  animate: boolean;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  animate
}) => {
  return (
    <div 
      className="space-y-6 mb-8"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.5s ease-out 0.2s"
      }}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar produtos..."
            className="w-full pl-10 h-11"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 self-start">
          <Button 
            variant={activeFilter === "all" ? "default" : "outline"} 
            className="gap-2"
            onClick={() => setActiveFilter("all")}
          >
            <Filter className="h-4 w-4" />
            Todos
          </Button>
          <Button 
            variant={activeFilter === "digital" ? "default" : "outline"} 
            className="gap-2"
            onClick={() => setActiveFilter("digital")}
          >
            <Tag className="h-4 w-4" />
            Digitais
          </Button>
          <Button 
            variant={activeFilter === "physical" ? "default" : "outline"} 
            className="gap-2"
            onClick={() => setActiveFilter("physical")}
          >
            <ShoppingBag className="h-4 w-4" />
            Físicos
          </Button>
        </div>
      </div>
    </div>
  );
};
