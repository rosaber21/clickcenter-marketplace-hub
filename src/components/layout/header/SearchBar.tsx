
import React from "react";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchBarProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
}

export function SearchBar({ onSubmit, className }: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className={`relative ${className || ''}`}>
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      <input 
        type="search" 
        name="query"
        placeholder="Buscar..." 
        className="pl-9 pr-4 py-2 text-sm rounded-full bg-muted border border-transparent focus:border-input focus:bg-background focus:outline-none focus:ring-1 focus:ring-ring w-[180px] transition-all focus:w-[220px]" 
      />
    </form>
  );
}
