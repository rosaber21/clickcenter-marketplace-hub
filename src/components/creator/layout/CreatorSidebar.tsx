
import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Package, 
  Users, 
  MessageSquare, 
  Settings,
  Award,
  BarChart,
  Layers,
  Palette,
  Gamepad2,
  LineChart
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SidebarLink = ({ to, icon, children }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-gray-700 hover:bg-gray-100"
        )
      }
    >
      {icon}
      <span>{children}</span>
    </NavLink>
  );
};

export const CreatorSidebar = () => {
  return (
    <div className="w-64 border-r min-h-screen bg-white p-4 flex flex-col">
      <div className="mb-6">
        <h2 className="font-semibold text-lg px-3">Painel do Produtor</h2>
      </div>
      
      <div className="space-y-1">
        <SidebarLink to="/criador" icon={<Home size={20} />}>
          Início
        </SidebarLink>
        
        <SidebarLink to="/criador/produtos" icon={<Package size={20} />}>
          Produtos
        </SidebarLink>
        
        <SidebarLink to="/criador/comunidades" icon={<Users size={20} />}>
          Comunidades
        </SidebarLink>
        
        <SidebarLink to="/criador/moderacao" icon={<Award size={20} />}>
          Moderação
        </SidebarLink>
        
        <SidebarLink to="/criador/membros" icon={<Users size={20} />}>
          Membros
        </SidebarLink>
        
        <SidebarLink to="/criador/vendas" icon={<BarChart size={20} />}>
          Vendas
        </SidebarLink>
        
        <SidebarLink to="/criador/combos" icon={<Layers size={20} />}>
          Combos
        </SidebarLink>
        
        <SidebarLink to="/criador/personalizacao" icon={<Palette size={20} />}>
          Personalização
        </SidebarLink>
        
        <SidebarLink to="/criador/gamificacao" icon={<Gamepad2 size={20} />}>
          Gamificação
        </SidebarLink>
        
        <SidebarLink to="/criador/analytics" icon={<LineChart size={20} />}>
          Analytics
        </SidebarLink>
        
        <SidebarLink to="/criador/configuracoes" icon={<Settings size={20} />}>
          Configurações
        </SidebarLink>
      </div>
    </div>
  );
};
