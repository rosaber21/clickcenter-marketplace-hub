
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  User as UserIcon, 
  ShoppingCart, 
  Bell,
  Search,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface HeaderProps {
  scrolled: boolean;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
}

export function Header({ scrolled, cartOpen, setCartOpen, setMobileMenuOpen, mobileMenuOpen }: HeaderProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const cartItemCount = 0; // This value would be dynamic based on cart context

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    
    if (query.trim()) {
      toast({
        title: "Buscando produtos",
        description: `Pesquisando por: ${query}`,
      });
      // Here would implement the search
    }
  };

  return (
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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild 
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/">Início</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Produtos</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/produtos"
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Explorar Produtos
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Conheça nossa seleção exclusiva de produtos digitais e físicos.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/categorias" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Categorias</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Navegue por categorias de produtos
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/destaques" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Destaques</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Os produtos mais populares do momento
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Afiliados</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/afiliados" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Programa de Afiliados</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Como se tornar um afiliado e ganhar comissões
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/afiliados/produtos" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Produtos para Afiliação</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Produtos disponíveis para afiliação
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/afiliado/entrar" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Área do Afiliado</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Acesse sua conta de afiliado
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/afiliados/ranking" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Ranking de Afiliados</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Conheça os melhores afiliados da plataforma
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    asChild 
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link to="/contato">Contato</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {!isMobile && (
            <form onSubmit={handleSearch} className="relative mr-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="search" 
                name="query"
                placeholder="Buscar..." 
                className="pl-9 pr-4 py-2 text-sm rounded-full bg-muted border border-transparent focus:border-input focus:bg-background focus:outline-none focus:ring-1 focus:ring-ring w-[180px] transition-all focus:w-[220px]" 
              />
            </form>
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
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              toast({
                title: "Notificações",
                description: "Você não tem novas notificações",
              });
            }}
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          <Link to="/login">
            <Button variant="outline" size="sm" className="gap-2">
              <UserIcon className="h-4 w-4" />
              <span>Entrar</span>
            </Button>
          </Link>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
