
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AffiliateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newAffiliateEmail: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isAddingAffiliate: boolean;
}

export const AffiliateDialog = ({
  open,
  onOpenChange,
  newAffiliateEmail,
  onEmailChange,
  onSubmit,
  isAddingAffiliate
}: AffiliateDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Afiliado</DialogTitle>
          <DialogDescription>
            Envie um convite para um novo afiliado se juntar ao seu programa.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit}>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email do Afiliado</Label>
              <Input
                id="email"
                type="email" 
                placeholder="email@example.com"
                value={newAffiliateEmail}
                onChange={onEmailChange}
                required
              />
            </div>
          </div>
          
          <DialogFooter className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isAddingAffiliate || !newAffiliateEmail}
            >
              {isAddingAffiliate ? 'Enviando...' : 'Enviar Convite'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
