
import React, { useState, useEffect } from "react";
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
import { Cart } from "../cart/Cart";
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

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    
    if (query.trim()) {
      toast({
        title: "Buscando produtos",
        description: `Pesquisando por: ${query}`,
      });
      // Aqui implementaria a busca
    }
  };

  const handleNavigation = (path: string, title: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    toast({
      title: title,
      description: "Navegando para a página solicitada",
    });
  };

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

        {/* Mobile Menu */}
        {isMobile && mobileMenuOpen && (
          <div className="container py-4 bg-background border-b">
            <div className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation("/", "Início")}
              >
                Início
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation("/produtos", "Produtos")}
              >
                Produtos
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation("/categorias", "Categorias")}
              >
                Categorias
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation("/afiliados", "Afiliados")}
              >
                Afiliados
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start" 
                onClick={() => handleNavigation("/contato", "Contato")}
              >
                Contato
              </Button>
              <form onSubmit={handleSearch} className="pt-2 relative">
                <Search className="absolute left-3 top-5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="search"
                  name="query" 
                  placeholder="Buscar..." 
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-md bg-muted border border-transparent focus:border-input focus:outline-none focus:ring-1 focus:ring-ring" 
                />
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
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
                <li><Link to="/produtos" className="text-sm text-muted-foreground hover:text-foreground">Destaques</Link></li>
                <li><Link to="/produtos/digitais" className="text-sm text-muted-foreground hover:text-foreground">Digitais</Link></li>
                <li><Link to="/produtos/fisicos" className="text-sm text-muted-foreground hover:text-foreground">Físicos</Link></li>
                <li><Link to="/produtos/novos" className="text-sm text-muted-foreground hover:text-foreground">Lançamentos</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium mb-3">Suporte</h5>
              <ul className="space-y-2">
                <li><Link to="/ajuda" className="text-sm text-muted-foreground hover:text-foreground">Ajuda</Link></li>
                <li><Link to="/contato" className="text-sm text-muted-foreground hover:text-foreground">Contato</Link></li>
                <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
                <li><Link to="/termos" className="text-sm text-muted-foreground hover:text-foreground">Termos de Uso</Link></li>
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
