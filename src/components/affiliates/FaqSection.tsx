
import React from "react";

export const FaqSection: React.FC = () => {
  return (
    <div className="bg-muted/30 rounded-lg p-8 mt-8">
      <h3 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-lg mb-2">Como recebo minhas comissões?</h4>
          <p className="text-muted-foreground">
            As comissões são pagas mensalmente via transferência bancária, PayPal ou Pix, de acordo com sua preferência.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">Qual é o percentual de comissão?</h4>
          <p className="text-muted-foreground">
            As comissões variam de 10% a 50%, dependendo da categoria e do produto específico.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">Por quanto tempo recebo comissões?</h4>
          <p className="text-muted-foreground">
            O cookie de afiliado tem duração de 30 dias, garantindo comissão em compras futuras dentro deste período.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">Posso promover os produtos em qualquer lugar?</h4>
          <p className="text-muted-foreground">
            Sim, você pode promover em sites, blogs, redes sociais e e-mail marketing, seguindo nossas políticas éticas.
          </p>
        </div>
      </div>
    </div>
  );
};

