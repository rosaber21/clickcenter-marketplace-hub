
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Home,
  BookOpen,
  Bookmark,
  Calendar,
  MessageSquare,
  Certificate,
  FileText,
  ChevronLeft,
  ChevronRight,
  Menu
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/aluno", icon: Home },
  { label: "Meus Cursos", href: "/aluno/cursos", icon: BookOpen },
  { label: "Favoritos", href: "/aluno/favoritos", icon: Bookmark },
  { label: "Agenda", href: "/aluno/agenda", icon: Calendar },
  { label: "Mensagens", href: "/aluno/mensagens", icon: MessageSquare },
  { label: "Certificados", href: "/aluno/certificados", icon: Certificate },
  { label: "Notas", href: "/aluno/notas", icon: FileText },
];

export function StudentSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };
  
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      {/* Mobile menu trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-3.5 left-4 z-50 md:hidden"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full bg-sidebar border-r transition-all duration-300 md:relative md:z-0",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full text-sidebar-foreground">
          <div className="h-16 border-b border-sidebar-border flex items-center justify-center px-4">
            {collapsed ? (
              <div className="text-3xl font-bold text-sidebar-primary">A</div>
            ) : (
              <div className="text-xl font-bold text-sidebar-primary">
                Área do Aluno
              </div>
            )}
          </div>
          
          <nav className="px-3 py-6 flex-1">
            <div className="space-y-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-sidebar-accent/50",
                      isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
                    )
                  }
                  end={item.href === "/aluno"}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </nav>
          
          <div className="p-4 border-t border-sidebar-border flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="hover:bg-sidebar-accent/50 text-sidebar-foreground"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
