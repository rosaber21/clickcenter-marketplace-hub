
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Link as LinkIcon,
  Users,
  DollarSign,
  Settings,
  LogOut,
  Home
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AffiliateLayout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, this would call an auth logout function
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/afiliado", icon: BarChart3 },
    { name: "Produtos", href: "/afiliado/produtos", icon: LinkIcon },
    { name: "Conversões", href: "/afiliado/conversoes", icon: Users },
    { name: "Pagamentos", href: "/afiliado/pagamentos", icon: DollarSign },
    { name: "Configurações", href: "/afiliado/configuracoes", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto border-r bg-sidebar">
          <div className="px-4 flex items-center mb-6">
            <NavLink to="/" className="flex items-center">
              <span className="text-xl font-bold text-sidebar-foreground">ClickCenter</span>
              <span className="ml-1 text-xs bg-primary text-primary-foreground py-0.5 px-1 rounded">Afiliados</span>
            </NavLink>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-3 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                    )
                  }
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-5 w-5"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
              <NavLink
                to="/"
                className="text-sidebar-foreground hover:bg-sidebar-accent/50 mt-8 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
              >
                <Home className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
                Voltar à Loja
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sidebar-foreground hover:bg-sidebar-accent/50 w-full text-left group flex items-center px-3 py-2 text-sm font-medium rounded-md"
              >
                <LogOut className="mr-3 flex-shrink-0 h-5 w-5" aria-hidden="true" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AffiliateLayout;
