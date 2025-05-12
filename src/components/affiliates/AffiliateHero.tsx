
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AffiliateHeroProps {
  onAffiliateSignup: () => void;
}

export const AffiliateHero: React.FC<AffiliateHeroProps> = ({ onAffiliateSignup }) => {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-lg bg-gradient-to-r from-primary/80 to-secondary/80 p-8 text-white mb-8">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Programa de Afiliados</h1>
        <p className="text-lg mb-6">
          Promova produtos digitais e físicos de alta qualidade e ganhe comissões atrativas. 
          Junte-se a milhares de afiliados que já estão lucrando com nosso programa.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="default" 
            className="bg-white text-primary hover:bg-gray-100"
            onClick={onAffiliateSignup}
          >
            Seja um Afiliado
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white/10"
            onClick={() => navigate("/afiliados/como-funciona")}
          >
            Saiba Mais
          </Button>
        </div>
      </div>
      <div className="absolute right-10 bottom-0 hidden lg:block">
        <div className="text-7xl">🚀</div>
      </div>
    </div>
  );
};

