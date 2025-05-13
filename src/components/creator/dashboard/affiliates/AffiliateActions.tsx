
import React from "react";
import { Button } from "@/components/ui/button";
import { Users, ExternalLink } from "lucide-react";

interface AffiliateActionsProps {
  onGenerateReport: () => void;
  onViewAllAffiliates: () => void;
  onManageAffiliates: () => void;
}

export const AffiliateActions: React.FC<AffiliateActionsProps> = ({
  onGenerateReport,
  onViewAllAffiliates,
  onManageAffiliates
}) => {
  return (
    <>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onGenerateReport}
          className="gap-1"
        >
          <ExternalLink className="h-4 w-4" />
          Relatório
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          onClick={onViewAllAffiliates}
        >
          Ver Todos
        </Button>
      </div>

      {/* Footer Button */}
      <Button 
        className="w-full flex items-center justify-center gap-2"
        onClick={onManageAffiliates}
        variant="secondary"
      >
        <Users className="h-4 w-4" />
        Gerenciar Afiliados
      </Button>
    </>
  );
};
