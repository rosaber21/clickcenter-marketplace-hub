
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings,
  CreditCard,
  Link as LinkIcon,
  LogOut,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-3 px-3 py-2 rounded-md w-full text-sm transition-colors",
      isActive
        ? "bg-primary/10 text-primary font-medium"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    );
  
  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-sm">
        <div className="p-4 flex items-center gap-2 border-b">
          <Link to="/admin" className="flex items-center text-xl font-bold">
            <span className="text-primary">Click</span>
            <span className="text-secondary">Center</span>
            <span className="ml-1 bg-primary text-white text-xs rounded px-1.5 py-0.5">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/admin" end className={getNavLinkClass}>
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/produtos" className={getNavLinkClass}>
            <Package className="h-4 w-4" />
            <span>Produtos</span>
          </NavLink>
          <NavLink to="/admin/usuarios" className={getNavLinkClass}>
            <Users className="h-4 w-4" />
            <span>Usuários</span>
          </NavLink>
          <NavLink to="/admin/vendas" className={getNavLinkClass}>
            <ShoppingCart className="h-4 w-4" />
            <span>Vendas</span>
          </NavLink>
          <NavLink to="/admin/afiliados" className={getNavLinkClass}>
            <LinkIcon className="h-4 w-4" />
            <span>Afiliados</span>
          </NavLink>
          <NavLink to="/admin/pagamentos" className={getNavLinkClass}>
            <CreditCard className="h-4 w-4" />
            <span>Pagamentos</span>
          </NavLink>
          <NavLink to="/admin/configuracoes" className={getNavLinkClass}>
            <Settings className="h-4 w-4" />
            <span>Configurações</span>
          </NavLink>
        </nav>
        
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Administrador</p>
              <p className="text-xs text-muted-foreground">admin@exemplo.com</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            <span>Sair</span>
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <header className="md:hidden bg-white p-4 border-b flex items-center justify-between sticky top-0 z-10">
          <Link to="/admin" className="flex items-center text-xl font-bold">
            <span className="text-primary">Click</span>
            <span className="text-secondary">Center</span>
          </Link>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-primary/10 text-primary">AD</AvatarFallback>
          </Avatar>
        </header>
        
        {/* Page Content */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2 z-10">
          <NavLink to="/admin" end className={cn("p-2 rounded-md flex flex-col items-center text-xs", 
            location.pathname === "/admin" ? "text-primary" : "text-muted-foreground")}>
            <BarChart3 className="h-5 w-5 mb-1" />
            <span>Painel</span>
          </NavLink>
          <NavLink to="/admin/vendas" className={cn("p-2 rounded-md flex flex-col items-center text-xs", 
            location.pathname === "/admin/vendas" ? "text-primary" : "text-muted-foreground")}>
            <ShoppingCart className="h-5 w-5 mb-1" />
            <span>Vendas</span>
          </NavLink>
          <NavLink to="/admin/produtos" className={cn("p-2 rounded-md flex flex-col items-center text-xs", 
            location.pathname === "/admin/produtos" ? "text-primary" : "text-muted-foreground")}>
            <Package className="h-5 w-5 mb-1" />
            <span>Produtos</span>
          </NavLink>
          <NavLink to="/admin/usuarios" className={cn("p-2 rounded-md flex flex-col items-center text-xs", 
            location.pathname === "/admin/usuarios" ? "text-primary" : "text-muted-foreground")}>
            <Users className="h-5 w-5 mb-1" />
            <span>Usuários</span>
          </NavLink>
          <NavLink to="/admin/pagamentos" className={cn("p-2 rounded-md flex flex-col items-center text-xs", 
            location.pathname === "/admin/pagamentos" ? "text-primary" : "text-muted-foreground")}>
            <CreditCard className="h-5 w-5 mb-1" />
            <span>Pagamentos</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
