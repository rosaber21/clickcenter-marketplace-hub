
import React from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarNav } from "./SidebarNav";
import { 
  User as UserIcon, 
  ShoppingCart, 
  Bell 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cart } from "../cart/Cart";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const [cartOpen, setCartOpen] = React.useState(false);
  const cartItemCount = 0; // Este valor seria dinâmico baseado no contexto do carrinho

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center text-2xl font-bold text-primary"
          >
            Click<span className="text-secondary">Center</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            
            <Link to="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <UserIcon className="h-4 w-4" />
                <span>Entrar</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1">
        {!isMobile && <SidebarNav />}
        <main className="flex-1 container py-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t py-6 bg-muted/40">
        <div className="container flex flex-col gap-2 md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 ClickCenter. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Fundadores: Mário & Rosy
          </p>
        </div>
      </footer>

      {/* Cart drawer */}
      <Cart open={cartOpen} setOpen={setCartOpen} />
    </div>
  );
}
