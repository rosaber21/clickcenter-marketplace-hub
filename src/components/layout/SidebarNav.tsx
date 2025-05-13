
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ShoppingCart,
  Package,
  Settings,
  LogIn,
  Link as LinkIcon,
  Plus,
  BarChart3,
  UserCog,
  Home
} from "lucide-react";
import { UserRole } from "@/types";
import { useToast } from "@/hooks/use-toast";

export function SidebarNav() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Poderia vir de um estado global de autenticação
  const isAuthenticated = false;
  const userRole: UserRole = "aluno";

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-2 px-3 py-2 rounded-md w-full",
      isActive
        ? "bg-sidebar-accent text-accent-foreground font-medium"
        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
    );

  // Helper function to check user role
  const hasRole = (roles: UserRole[]) => {
    return roles.includes(userRole);
  };
  
  const handleNavigation = (path: string, title: string) => {
    navigate(path);
    toast({
      title: `Navegando para ${title}`,
      description: "Redirecionando para a página solicitada",
    });
  };

  return (
    <Sidebar
      className={cn(
        "border-r bg-sidebar",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end text-sidebar-foreground" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/" className={getNavLinkClass} end>
                    <Home className="h-5 w-5" />
                    {!collapsed && <span>Início</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/produtos" className={getNavLinkClass}>
                    <ShoppingCart className="h-5 w-5" />
                    {!collapsed && <span>Produtos</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {isAuthenticated ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/meus-produtos" className={getNavLinkClass}>
                        <Package className="h-5 w-5" />
                        {!collapsed && <span>Meus Produtos</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {hasRole(["afiliado", "criador", "admin"]) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/afiliados" className={getNavLinkClass}>
                          <LinkIcon className="h-5 w-5" />
                          {!collapsed && <span>Afiliação</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                  {hasRole(["criador", "admin"]) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/criador" className={getNavLinkClass}>
                          <Plus className="h-5 w-5" />
                          {!collapsed && <span>Painel Criador</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                  {hasRole(["admin"]) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/admin" className={getNavLinkClass}>
                          <BarChart3 className="h-5 w-5" />
                          {!collapsed && <span>Painel Admin</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                  {hasRole(["afiliado"]) && (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <NavLink to="/afiliado" className={getNavLinkClass}>
                          <BarChart3 className="h-5 w-5" />
                          {!collapsed && <span>Painel Afiliado</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/perfil" className={getNavLinkClass}>
                        <Settings className="h-5 w-5" />
                        {!collapsed && <span>Configurações</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/login" className={getNavLinkClass}>
                        <LogIn className="h-5 w-5" />
                        {!collapsed && <span>Entrar</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/afiliados" className={getNavLinkClass}>
                        <LinkIcon className="h-5 w-5" />
                        {!collapsed && <span>Afiliação</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/admin/login" className={getNavLinkClass}>
                        <UserCog className="h-5 w-5" />
                        {!collapsed && <span>Área Administrativa</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
