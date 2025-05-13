
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface HeroBannerProps {
  onViewAllProducts: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onViewAllProducts }) => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleLearnMore = () => {
    navigate("/afiliados");
    toast({
      title: "Programa de afiliados",
      description: "Conheça nosso programa de afiliados",
    });
  };

  return (
    <div 
      className="relative overflow-hidden rounded-lg mb-8 bg-gradient-to-r from-primary to-secondary text-white"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(-20px)",
        transition: "all 0.5s ease-out"
      }}
    >
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      <div className="relative z-20 px-6 py-16 sm:py-24 sm:px-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Descubra Produtos Incríveis
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Explore nossa seleção exclusiva de produtos digitais e físicos criados por especialistas
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90"
            onClick={onViewAllProducts}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Ver Produtos
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/20"
            onClick={handleLearnMore}
          >
            <Zap className="mr-2 h-5 w-5" />
            Saiba Mais
          </Button>
        </div>
      </div>
    </div>
  );
};
