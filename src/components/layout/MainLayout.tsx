import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  User as UserIcon, 
  ShoppingCart, 
  Bell,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Cart } from "../cart/Cart";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItemCount = 0; // Este valor seria dinâmico baseado no contexto do carrinho

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header 
        className={cn(
          "sticky top-0 z-50 w-full backdrop-blur transition-all duration-200",
          scrolled 
            ? "bg-background/95 shadow-sm border-b" 
            : "bg-transparent"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center text-3xl font-bold"
            >
              <span className="text-primary">Click</span>
              <span className="text-secondary">Center</span>
            </Link>
            
            {!isMobile && (
              <nav className="hidden md:flex items-center gap-6 ml-6">
                <Link 
                  to="/" 
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  Produtos
                </Link>
                <Link 
                  to="/categorias" 
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  Categorias
                </Link>
                <Link 
                  to="/afiliados" 
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  Afiliados
                </Link>
              </nav>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {!isMobile && (
              <div className="relative mr-2">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="search" 
                  placeholder="Buscar..." 
                  className="pl-9 pr-4 py-2 text-sm rounded-full bg-muted border border-transparent focus:border-input focus:bg-background focus:outline-none focus:ring-1 focus:ring-ring w-[180px] transition-all focus:w-[220px]" 
                />
              </div>
            )}
            
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

      {/* Main content - removed the sidebar */}
      <main className="flex-1">
        <div className="container py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/40">
        <div className="container space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <Link 
                to="/" 
                className="flex items-center text-2xl font-bold"
              >
                <span className="text-primary">Click</span>
                <span className="text-secondary">Center</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                A melhor plataforma para hospedagem e venda de produtos digitais e físicos.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium mb-3">Produtos</h5>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Destaques</Link></li>
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Digitais</Link></li>
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Físicos</Link></li>
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Lançamentos</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium mb-3">Suporte</h5>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Ajuda</Link></li>
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Contato</Link></li>
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Termos de Uso</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium mb-3">Conta</h5>
              <ul className="space-y-2">
                <li><Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">Entrar</Link></li>
                <li><Link to="/cadastro" className="text-sm text-muted-foreground hover:text-foreground">Cadastre-se</Link></li>
                <li><Link to="/afiliados" className="text-sm text-muted-foreground hover:text-foreground">Programa de Afiliados</Link></li>
                <li><Link to="/criadores" className="text-sm text-muted-foreground hover:text-foreground">Seja um Criador</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-muted">
            <p className="text-sm text-muted-foreground">
              © 2025 ClickCenter. Todos os direitos reservados.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              Fundadores: Mário & Rosy
            </p>
          </div>
        </div>
      </footer>

      {/* Cart drawer */}
      <Cart open={cartOpen} setOpen={setCartOpen} />
    </div>
  );
}
