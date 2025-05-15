
import React from 'react';
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

interface ManageAffiliatesHeaderProps {
  onToggleInviteForm: () => void;
}

export const ManageAffiliatesHeader: React.FC<ManageAffiliatesHeaderProps> = ({ onToggleInviteForm }) => {
  return (
    <CardHeader className="bg-secondary/5">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <CardTitle className="text-secondary">Gerenciar Afiliados</CardTitle>
          <CardDescription>Gerencie seus afiliados e convites</CardDescription>
        </div>
        <Button onClick={onToggleInviteForm}>
          <UserPlus className="mr-2 h-4 w-4" />
          Convidar Afiliado
        </Button>
      </div>
    </CardHeader>
  );
};
