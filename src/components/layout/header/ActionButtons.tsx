
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Bell, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ActionButtonsProps {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isMobile: boolean;
  cartItemCount?: number;
}

export function ActionButtons({
  cartOpen,
  setCartOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
  isMobile,
  cartItemCount = 0
}: ActionButtonsProps) {
  const { toast } = useToast();

  return (
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
          <User className="h-4 w-4" />
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
  );
}
