
import React from "react";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface SettingsHeaderProps {
  onSave: () => void;
  isSaving: boolean;
}

export const SettingsHeader = ({ onSave, isSaving }: SettingsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações da sua conta e preferências
        </p>
      </div>
      <Button disabled={isSaving} onClick={onSave}>
        {isSaving ? "Salvando..." : (
          <>
            <Save className="mr-2 h-4 w-4" /> Salvar alterações
          </>
        )}
      </Button>
    </div>
  );
};
