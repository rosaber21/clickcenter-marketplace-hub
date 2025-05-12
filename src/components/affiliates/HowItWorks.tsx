
import React from "react";

export const HowItWorks: React.FC = () => {
  return (
    <div className="mt-12 bg-muted/40 rounded-lg p-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Como Funciona o Programa de Afiliados</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4">1</div>
          <h4 className="font-semibold text-lg mb-2">Cadastre-se</h4>
          <p className="text-muted-foreground">
            Faça seu cadastro como afiliado em nossa plataforma e aguarde a aprovação
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4">2</div>
          <h4 className="font-semibold text-lg mb-2">Escolha Produtos</h4>
          <p className="text-muted-foreground">
            Selecione os produtos que deseja promover e gere seus links de afiliado
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4">3</div>
          <h4 className="font-semibold text-lg mb-2">Receba Comissões</h4>
          <p className="text-muted-foreground">
            Acompanhe suas vendas e receba comissões diretamente na sua conta
          </p>
        </div>
      </div>
    </div>
  );
};

